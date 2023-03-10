import { Events, __code__exp__, __code__prefix__ } from "../../constants";
import haversine from "haversine-distance";
import {
  confirmSchema,
  onAuthStateChangeSchema,
  onNewDeviceAuthenticationSchema,
  onUserOnlineSchema,
  profileSchema,
  registerSchema,
  resendVerificationCodeSchema,
  updateAvatarSchema,
  updatePublicDetailsSchema,
  updateUserStateSchema,
} from "../../schema/user.schema";
import { isValidEmail } from "@crispengari/regex-validator";
import { publicProcedure, router } from "../../trpc/trpc";
import {
  sendVerificationCodeAsTxt,
  signJwt,
  verifyJwt,
  sendVerificationCodeAsEmail,
  distanceToReadable,
} from "../../utils";
import { observable } from "@trpc/server/observable";
import { Settings, User, Location } from "@prisma/client";
import EventEmitter from "events";
import { UserOnlineType } from "../../types";

type UserType =
  | (User & {
      location: Location | null;
      settings: Settings | null;
    })
  | null;

const ee = new EventEmitter({
  captureRejections: true,
});

export const userRouter = router({
  updatePublicDetails: publicProcedure
    .input(updatePublicDetailsSchema)
    .mutation(async ({ ctx: { prisma, req }, input: { bio, nickname } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const me = await prisma.user.findFirst({ where: { id } });
        if (!!!me)
          return {
            error: {
              message: "Unable to find the user for whatever reason",
              field: "me",
            },
          };

        const user = await prisma.user.update({
          where: { id },
          data: {
            bio,
            nickname,
          },
          include: {
            location: true,
            settings: true,
          },
        });
        ee.emit(Events.ON_PROFILE_DETAILS_UPDATE, user);
        return {
          user,
        };
      } catch (error) {
        return {
          error: {
            message: "Unable to find the user for whatever reason",
            field: "me",
          },
        };
      }
    }),
  updateAvatar: publicProcedure
    .input(updateAvatarSchema)
    .mutation(async ({ ctx: { prisma, req }, input: { avatar } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const me = await prisma.user.findFirst({ where: { id } });
        if (!!!me)
          return {
            error: {
              message: "Unable to find the user for whatever reason",
              field: "me",
            },
          };

        const user = await prisma.user.update({
          where: { id },
          data: {
            avatar,
          },
          include: {
            location: true,
            settings: true,
          },
        });
        ee.emit(Events.ON_PROFILE_DETAILS_UPDATE, user);
        return {
          user,
        };
      } catch (error) {
        return {
          error: {
            message: "Unable to find the user for whatever reason",
            field: "me",
          },
        };
      }
    }),
  onProfileDetailsUpdate: publicProcedure.subscription(() => {
    return observable<{
      user: UserType;
    }>((emit) => {
      const handleEvent = (user: UserType) => {
        emit.next({
          user,
        });
      };
      ee.on(Events.ON_PROFILE_DETAILS_UPDATE, handleEvent);
      return () => {
        ee.off(Events.ON_PROFILE_DETAILS_UPDATE, handleEvent);
      };
    });
  }),
  onNewDeviceAuthentication: publicProcedure
    .input(onNewDeviceAuthenticationSchema)
    .subscription(({ input: { userId } }) => {
      /**
       * If someone is authenticated we will need to log them out automatically
       * for the new device to be authenticated. This only happen when they
       * confirm the email correctly
       */
      return observable<{
        user: UserType;
        jwt: string;
      }>((emit) => {
        const handleEvent = (user: UserType) => {
          if (!!user) {
            if (user.id === userId) {
              // return jwt token and user is null
              emit.next({
                user: null,
                jwt: "",
              });
            }
          }
        };
        ee.on(Events.ON_NEW_DEVICE_AUTHENTICATION, handleEvent);
        return () => {
          ee.off(Events.ON_NEW_DEVICE_AUTHENTICATION, handleEvent);
        };
      });
    }),
  onAuthStateChange: publicProcedure
    .input(onAuthStateChangeSchema)
    .subscription(({ input: { duid } }) => {
      return observable<{ user: UserType; jwt: string } | null>((emit) => {
        const handleEvent = async (user: UserType) => {
          if (!!user) {
            if (user.duid === duid) {
              const jwt = await signJwt(user);
              emit.next(
                user.isLoggedIn ? { user, jwt } : { user: null, jwt: "" }
              );
            }
          }
        };
        ee.on(Events.ON_AUTH_STATE_CHANGE, handleEvent);
        return () => {
          ee.off(Events.ON_AUTH_STATE_CHANGE, handleEvent);
        };
      });
    }),
  fetchUserOrFail: publicProcedure.mutation(
    async ({ ctx: { req, prisma } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const user = await prisma.user.findFirst({
          where: { id },
          include: {
            location: true,
            settings: true,
          },
        });
        ee.emit(Events.ON_AUTH_STATE_CHANGE, user);
        if (!!user) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
  ),
  logout: publicProcedure.mutation(async ({ ctx: { prisma, req } }) => {
    try {
      const jwt = req.headers?.authorization?.split(/\s/)[1];
      const { id } = await verifyJwt(jwt as string);
      const user = await prisma.user.update({
        where: { id },
        data: {
          isOnline: false,
          isLoggedIn: false,
        },
        include: {
          settings: true,
          location: true,
        },
      });
      ee.emit(Events.ON_AUTH_STATE_CHANGE, user);
      ee.emit(Events.USER_ONLINE, {
        user,
        status: "offline",
      } as UserOnlineType);

      return {
        user: null,
        jwt: "",
      };
    } catch (error) {
      return {
        error: {
          field: "logout",
          message: "Ops! Something went wrong on the server.",
        },
        jwt: "",
      };
    }
  }),
  me: publicProcedure.query(async ({ ctx: { prisma, req } }) => {
    try {
      const jwt = req.headers?.authorization?.split(/\s/)[1];
      const { id } = await verifyJwt(jwt as string);
      const user = await prisma.user.findFirst({
        where: { id },
        include: { settings: true, location: true },
      });
      return {
        user,
      };
    } catch (error) {
      return {
        error: {
          message: "Unable to find the user for whatever reason",
          field: "me",
        },
      };
    }
  }),
  deleteAccount: publicProcedure.mutation(async ({ ctx: { prisma, req } }) => {
    try {
      const jwt = req.headers?.authorization?.split(/\s/)[1];
      const { id } = await verifyJwt(jwt as string);
      const user = await prisma.user.findFirst({ where: { id } });
      if (!!!user) {
        return {
          error: {
            message: "You are not authenticated",
            field: "me",
          },
        };
      }
      const _user = await prisma.user.update({
        where: { id },
        data: {
          isOnline: false,
          isLoggedIn: false,
        },
        include: {
          settings: true,
          location: true,
        },
      });
      ee.emit(Events.USER_ONLINE, {
        user: _user,
        status: "offline",
      } as UserOnlineType);
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      ee.emit(Events.ON_AUTH_STATE_CHANGE, _user);
      return true;
    } catch (error) {
      return {
        error: {
          message: "Unable to find the user for whatever reason",
          field: "me",
        },
      };
    }
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(
      async ({
        ctx: { redis, prisma },
        input: { phoneNumber, duid, email },
      }) => {
        /**
         * if the user phone number is taken we:
         * - update the user
         */
        try {
          const code: string = Math.random().toString().slice(2, 8);

          if (!!email) {
            if (!isValidEmail(email)) {
              return {
                error: {
                  message: "Invalid email address.",
                  field: "email",
                },
              };
            }
          }

          const user = !!phoneNumber
            ? await prisma.user.findFirst({
                where: {
                  phoneNumber,
                },
              })
            : await prisma.user.findFirst({
                where: {
                  email,
                },
              });
          const _user = !!user
            ? !!phoneNumber
              ? await prisma.user.update({
                  where: {
                    phoneNumber,
                  },
                  data: {
                    isOnline: user.isOnline,
                    isLoggedIn: user.isLoggedIn,
                    duid: user.duid,
                  },
                })
              : await prisma.user.update({
                  where: {
                    email,
                  },
                  data: {
                    isOnline: user.isOnline,
                    isLoggedIn: user.isLoggedIn,
                    duid: user.duid,
                  },
                })
            : !!phoneNumber
            ? await prisma.user.create({
                data: {
                  phoneNumber,
                  duid,
                  settings: {
                    create: {
                      maxSpaceDistance: 3,
                      enableNotifications: true,
                    },
                  },
                  location: {
                    create: {
                      lat: 0,
                      lon: 0,
                    },
                  },
                },
              })
            : await prisma.user.create({
                data: {
                  email,
                  duid,
                  settings: {
                    create: {
                      maxSpaceDistance: 3,
                      enableNotifications: true,
                    },
                  },
                  location: {
                    create: {
                      lat: 0,
                      lon: 0,
                    },
                  },
                },
              });
          const value = JSON.stringify({
            phoneNumber: _user.phoneNumber,
            code,
            email: _user.email,
          });
          await redis.setex(
            __code__prefix__ + (!!phoneNumber ? phoneNumber : email),
            __code__exp__,
            value
          );
          if (phoneNumber) {
            await sendVerificationCodeAsTxt(_user!.phoneNumber as any, code);
          } else {
            sendVerificationCodeAsEmail(_user!.email as any, code);
          }
          return {
            user,
            duid,
          };
        } catch (error) {
          return {
            error: {
              field: "server",
              message: "Something went wrong on the server",
            },
          };
        }
      }
    ),

  resendVerificationCode: publicProcedure
    .input(resendVerificationCodeSchema)
    .mutation(
      async ({ ctx: { prisma, redis }, input: { phoneNumber, email } }) => {
        try {
          const key: string =
            __code__prefix__ + (!!phoneNumber ? phoneNumber : email);

          await redis.del(key);
          const code: string = Math.random().toString().slice(2, 8);
          const user = !!phoneNumber
            ? await prisma.user.findFirst({
                where: {
                  phoneNumber,
                },
              })
            : await prisma.user.findFirst({
                where: {
                  email,
                },
              });

          if (!!!user) {
            return {
              error: {
                field: "user",
                message: !!phoneNumber
                  ? "Invalid phone number."
                  : "Invalid email address.",
              },
            };
          }

          !!phoneNumber
            ? await prisma.user.update({
                where: {
                  phoneNumber,
                },
                data: {
                  isOnline: false,
                  isLoggedIn: false,
                },
              })
            : await prisma.user.update({
                where: {
                  email,
                },
                data: {
                  isOnline: false,
                  isLoggedIn: false,
                },
              });
          const value = JSON.stringify({
            phoneNumber: user.phoneNumber,
            code,
            email: user.email,
          });
          await redis.setex(key, __code__exp__, value);
          if (phoneNumber) {
            await sendVerificationCodeAsTxt(user!.phoneNumber as any, code);
          } else {
            sendVerificationCodeAsEmail(user!.email as any, code);
          }
          return {
            user,
          };
        } catch (error) {
          return {
            error: {
              field: "server",
              message: "Something went wrong on the server.",
            },
          };
        }
      }
    ),
  confirm: publicProcedure
    .input(confirmSchema)
    .mutation(
      async ({
        ctx: { prisma, redis },
        input: { code, phoneNumber, email, duid },
      }) => {
        try {
          const user = !!phoneNumber
            ? await prisma.user.findFirst({
                where: {
                  phoneNumber,
                },
              })
            : await prisma.user.findFirst({
                where: {
                  email,
                },
              });
          if (!!!user) {
            return {
              error: {
                field: "user",
                message: !!phoneNumber
                  ? "Invalid phone number."
                  : "Invalid email address.",
              },
            };
          }

          const key =
            __code__prefix__ + (!!phoneNumber ? user.phoneNumber : user.email);
          const value = await redis.get(key);

          if (!!!value) {
            await redis.del(key);
            return {
              error: {
                field: "code",
                message: "Invalid verification code, it might have expired.",
              },
            };
          }

          const payload = JSON.parse(value) as {
            phoneNumber?: string;
            code: string;
            email?: string;
          };

          if (!!phoneNumber) {
            if (payload.phoneNumber !== user.phoneNumber) {
              return {
                error: {
                  field: "phoneNumber",
                  message: "Invalid phone number.",
                },
              };
            }
          } else {
            if (payload.email !== user.email) {
              return {
                error: {
                  field: "email",
                  message: "Invalid email address.",
                },
              };
            }
          }

          if (payload.code !== code) {
            return {
              error: {
                field: "code",
                message: "Invalid verification code.",
              },
            };
          }

          const _user = await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              duid,
            },
            include: {
              location: true,
              messages: true,
            },
          });
          // new device authentication
          ee.emit(Events.ON_NEW_DEVICE_AUTHENTICATION, _user);

          await redis.del(key);
          return {
            user: _user,
          };
        } catch (error) {
          return {
            error: {
              field: "server",
              message: "Something went wrong on the server.",
            },
          };
        }
      }
    ),

  profile: publicProcedure
    .input(profileSchema)
    .mutation(
      async ({
        ctx: { prisma },
        input: { nickname, phoneNumber, avatar, email },
      }) => {
        try {
          const user = !!phoneNumber
            ? await prisma.user.findFirst({
                where: {
                  phoneNumber,
                },
              })
            : await prisma.user.findFirst({
                where: {
                  email,
                },
              });

          if (!!!user) {
            return {
              error: {
                field: "user",
                message: phoneNumber
                  ? "Invalid phone number."
                  : "Invalid email address.",
              },
            };
          }
          const { newUser } = user;
          const _user = !!phoneNumber
            ? await prisma.user.update({
                where: {
                  phoneNumber,
                },
                data: {
                  isOnline: false,
                  isLoggedIn: true,
                  newUser: false,
                  nickname,
                  avatar,
                },
                include: {
                  location: true,
                  settings: true,
                },
              })
            : await prisma.user.update({
                where: {
                  email,
                },
                data: {
                  isOnline: true,
                  isLoggedIn: true,
                  newUser: false,
                  nickname,
                  avatar,
                },
                include: {
                  location: true,
                  settings: true,
                },
              });

          const jwt: string = await signJwt(_user);
          ee.emit(Events.ON_AUTH_STATE_CHANGE, _user);

          if (newUser) {
            ee.emit(Events.ON_NEW_USER_JOINED, _user);
          }
          return {
            user: _user,
            jwt,
          };
        } catch (error) {
          return {
            error: {
              field: "server",
              message: "Something went wrong on the server",
            },
          };
        }
      }
    ),

  updateUserStateAndNotify: publicProcedure
    .input(updateUserStateSchema)
    .mutation(async ({ ctx: { prisma, req }, input: { isOnline } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const user = await prisma.user.findFirst({ where: { id } });
        if (!!!user) return false;
        await prisma.user.update({
          where: { id: user.id },
          data: {
            isOnline,
          },
          include: {
            location: true,
            settings: true,
          },
        });
        ee.emit(Events.USER_ONLINE, {
          user,
          status: isOnline ? "online" : "offline",
        } as UserOnlineType);

        return true;
      } catch (error) {
        return false;
      }
    }),
  onUserOnline: publicProcedure
    .input(onUserOnlineSchema)
    .subscription(({ input: { userId } }) => {
      return observable<UserOnlineType>((emit) => {
        const handleEvent = ({ user, status }: UserOnlineType) => {
          if (!!user) {
            if (user.id !== userId) {
              emit.next({ user, status });
            }
          }
        };
        ee.on(Events.USER_ONLINE, handleEvent);
        return () => {
          ee.off(Events.USER_ONLINE, handleEvent);
        };
      });
    }),
  onNewUserJoined: publicProcedure.subscription(() => {
    return observable<User>((emit) => {
      const handleEvent = (user: User) => {
        emit.next(user);
      };
      ee.on(Events.ON_NEW_USER_JOINED, handleEvent);
      return () => {
        ee.off(Events.ON_NEW_USER_JOINED, handleEvent);
      };
    });
  }),
  users: publicProcedure.query(async ({ ctx: { prisma, req } }) => {
    try {
      const jwt = req.headers?.authorization?.split(/\s/)[1];
      const { id } = await verifyJwt(jwt as string);
      const me = await prisma.user.findFirst({
        where: { id },
        include: { location: true, settings: true },
      });
      if (!!!me) return [];
      const users = await prisma.user.findMany({
        where: {
          NOT: {
            id,
          },
        },
        orderBy: {
          isOnline: "desc",
        },
        include: {
          location: true,
          settings: true,
        },
      });

      return users
        .map((user) => ({
          ...user,
          distance: haversine(
            {
              lat: me.location?.lat ?? 0,
              lon: me.location?.lon ?? 0,
            },
            {
              lat: user.location?.lat ?? 0,
              lon: user.location?.lon ?? 0,
            }
          ),
        }))
        .filter((result) => {
          if (me.settings?.maxSpaceDistance) {
            return result.distance <= me.settings?.maxSpaceDistance * 1000;
          }
        })
        .sort((a, b) => a.distance - b.distance)
        .map((result) => ({
          ...result,
          distance: distanceToReadable(result.distance),
        }));
    } catch (error) {
      return [];
    }
  }),
});

import { Settings, Location, User } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import { Events } from "../../constants";
import {
  onUpdateSettingsSchema,
  updateSettingsSchema,
} from "../../schema/settings.schema";
import { publicProcedure, router } from "../../trpc/trpc";
import { verifyJwt } from "../../utils";
const ee = new EventEmitter({
  captureRejections: true,
});
export const settingsRouter = router({
  onUpdateSettings: publicProcedure
    .input(onUpdateSettingsSchema)
    .subscription(async ({ input: { userId } }) => {
      return observable<
        User & {
          location: Location;
          settings: Settings;
        }
      >((emit) => {
        const handleEvent = (
          user: User & {
            location: Location;
            settings: Settings;
          }
        ) => {
          if (user.id === userId) {
            emit.next(user);
          }
        };
        ee.on(Events.ON_UPDATE_USER_SETTINGS, handleEvent);
        return () => {
          ee.off(Events.ON_UPDATE_USER_SETTINGS, handleEvent);
        };
      });
    }),
  mySettings: publicProcedure.query(async ({ ctx: { req, prisma } }) => {
    try {
      const jwt = req.headers?.authorization?.split(/\s/)[1];
      const { id } = await verifyJwt(jwt as string);
      const settings = await prisma.settings.findFirst({
        where: { userId: id },
      });
      if (!!!settings) {
        return {
          error: {
            message: "Settings could not be found.",
            field: "settings",
          },
        };
      }

      return {
        settings,
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

  updateSettings: publicProcedure
    .input(updateSettingsSchema)
    .mutation(
      async ({
        ctx: { req, prisma },
        input: { allowNotification, distance },
      }) => {
        try {
          const jwt = req.headers?.authorization?.split(/\s/)[1];
          const { id } = await verifyJwt(jwt as string);
          const _settings = await prisma.settings.findFirst({
            where: { userId: id },
          });
          if (!!!_settings) {
            return {
              error: {
                message: "Settings could not be found.",
                field: "settings",
              },
            };
          }
          const settings = await prisma.settings.update({
            where: { id: _settings.id },
            data: {
              enableNotifications: allowNotification,
              maxSpaceDistance: distance,
            },
          });
          const user = await prisma.user.findFirst({
            where: {
              id: settings.userId,
            },
            include: {
              location: true,
              settings: true,
            },
          });
          if (!!user) {
            ee.emit(Events.ON_UPDATE_USER_SETTINGS, user);
          }

          return {
            settings,
          };
        } catch (error) {
          return {
            error: {
              message: "Unable to find the user for whatever reason",
              field: "me",
            },
          };
        }
      }
    ),
});

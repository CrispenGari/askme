import { updateSettingsSchema } from "../../schema/settings.schema";
import { publicProcedure, router } from "../../trpc/trpc";
import { verifyJwt } from "../../utils";

export const settingsRouter = router({
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

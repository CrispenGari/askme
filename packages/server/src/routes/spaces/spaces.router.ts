import {
  joinSpaceSchema,
  leaveSpaceSchema,
  onUserJoinSpaceSchema,
  peopleInMySpaceSchema,
} from "../../schema/spaces.schema";
import { publicProcedure, router } from "../../trpc/trpc";
import haversine from "haversine-distance";
import { Events } from "../../constants";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";

let spaces: Array<{
  userId: string;
  coodinates: {
    lat: number;
    lon: number;
  };
}> = [];

const ee = new EventEmitter({
  captureRejections: true,
});
export const spacesRouter = router({
  joinSpace: publicProcedure.input(joinSpaceSchema).mutation(({ input }) => {
    spaces.push(input);
    spaces = spaces.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.userId === value.userId)
    );
    ee.emit(Events.ON_USER_JOIN_SPACE, spaces);
    return spaces;
  }),

  leaveSpace: publicProcedure
    .input(leaveSpaceSchema)
    .mutation(({ input: { userId } }) => {
      spaces = spaces.filter((s) => s.userId !== userId);
      return spaces;
    }),

  onUserJoinSpace: publicProcedure
    .input(onUserJoinSpaceSchema)
    .subscription(async ({ input: { userId } }) => {
      return observable<
        Array<{
          userId: string;
          coodinates: {
            lat: number;
            lon: number;
          };
        }>
      >((emit) => {
        const onMessage = (
          spaces: Array<{
            userId: string;
            coodinates: {
              lat: number;
              lon: number;
            };
          }>
        ) => {
          emit.next(spaces.filter((s) => s.userId !== userId));
        };
        ee.on(Events.ON_USER_JOIN_SPACE, onMessage);
        return () => {
          ee.off(Events.ON_USER_JOIN_SPACE, onMessage);
        };
      });
    }),

  peopleInMySpace: publicProcedure
    .input(peopleInMySpaceSchema)
    .query(({ input: { userId } }) => {
      const me = spaces.find((s) => s.userId === userId);
      if (!!!me) return [];
      const others = spaces.filter((s) => s.userId !== userId);
      if (others.length === 0) return [];

      return spaces
        .filter((s) => s.userId !== userId)
        .map((space) => ({
          ...space,
          distance: haversine(me.coodinates, space.coodinates), // in meters
        }));
    }),
});

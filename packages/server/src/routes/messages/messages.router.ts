import { observable } from "@trpc/server/observable";
import { Events } from "../../constants";
import { publicProcedure, router } from "../../trpc/trpc";

import {
  sendMessageSchema,
  messageSubSchema,
  Message,
} from "../../schema/messages.schema";
import EventEmitter from "events";
const ee = new EventEmitter({
  captureRejections: true,
});
export const messagesRouter = router({
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(async ({ input: { message, sender } }) => {
      const msg: Message = {
        id: Math.random().toString(),
        message,
        sender,
        sentAt: new Date(),
      };
      ee.emit(Events.SEND_MESSAGE, msg);
      return msg;
    }),
  onSendMessage: publicProcedure.subscription(async ({ input }) => {
    return observable<Message>((emit) => {
      const onMessage = (msg: Message) => {
        console.log("Message..........");
        console.log({ msg });
        emit.next(msg);
      };
      ee.on(Events.SEND_MESSAGE, onMessage);
      return () => {
        ee.off(Events.SEND_MESSAGE, onMessage);
      };
    });
  }),
});

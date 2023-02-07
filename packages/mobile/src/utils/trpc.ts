import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@askme/server";

export const trpc = createTRPCReact<AppRouter>();

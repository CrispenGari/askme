import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import superjson from "superjson";
import { createWSClient, wsLink } from "@trpc/client";
import { AppRouter } from "@askme/server";
import { retrieve } from "../utils";
import { TOKEN_KEY } from "../constants";
interface Props {
  children: React.ReactNode;
}
const client = createWSClient({
  url: "ws://a674-197-98-127-119.ngrok.io/api/trpc",
});
const TRPCProvider: React.FC<Props> = ({ children }) => {
  const links = [
    loggerLink(),
    httpBatchLink({
      url: "https://a674-197-98-127-119.ngrok.io/api/trpc",
      headers: async () => {
        const token = (await retrieve(TOKEN_KEY)) ?? "";
        return token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {};
      },
    }),
    wsLink<AppRouter>({
      client,
    }),
  ];
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links,
      transformer: superjson,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;

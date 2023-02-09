import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink, loggerLink, splitLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import superjson from "superjson";
import { createWSClient, wsLink } from "@trpc/client";
import { AppRouter } from "@askme/server";
import { getDUID, retrieve } from "../utils";
import { TOKEN_KEY } from "../constants";
interface Props {
  children: React.ReactNode;
}
const client = createWSClient({
  url: "ws://ab12-197-98-127-119.ngrok.io/api/trpc",
});
const TRPCProvider: React.FC<Props> = ({ children }) => {
  const links = [
    // loggerLink(),
    splitLink({
      condition: (op) => op.type === "subscription",
      true: wsLink<AppRouter>({ client }),
      false: httpBatchLink({
        url: "https://ab12-197-98-127-119.ngrok.io/api/trpc",
        headers: async () => {
          const token = (await retrieve(TOKEN_KEY)) ?? "";
          return token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {};
        },
      }),
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

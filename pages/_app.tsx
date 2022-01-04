import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "../core/context/AuthContext";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  const isSSR = typeof window !== "undefined";

  const queryClient = new QueryClient();

  return (
    <Auth0Provider
      domain={process.env.auth0_domain}
      clientId={process.env.auth0_client}
      redirectUri={isSSR && window.location.origin}
      useRefreshTokens={true}
      cacheLocation="memory"
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default MyApp;

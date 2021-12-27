import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "../core/context/AuthContext";

function MyApp({ Component, pageProps }) {
  const isSSR = typeof window !== "undefined";

  return (
    <Auth0Provider
      domain={process.env.auth0_domain}
      clientId={process.env.auth0_client}
      redirectUri={isSSR && window.location.origin}
      useRefreshTokens={true}
      cacheLocation="memory"
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Auth0Provider>
  );
}

export default MyApp;

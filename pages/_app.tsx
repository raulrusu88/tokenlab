import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  const isSSR = typeof window !== "undefined";

  return (
    <Auth0Provider
      domain={process.env.auth0_domain}
      clientId={process.env.auth0_client}
      redirectUri={isSSR && window.location.origin}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;

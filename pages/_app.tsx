import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  const isSSR = typeof window !== "undefined";

  const auth0_settings = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT,
  };

  return (
    <Auth0Provider
      {...auth0_settings}
      redirectUri={isSSR && window.location.origin}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;

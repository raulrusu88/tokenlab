module.exports = {
  reactStrictMode: true,
  env: {
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client: process.env.AUTH0_CLIENT,
    auth0_secret: process.env.AUTH0_SECRET,
  },
};

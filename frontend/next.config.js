module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["assets.coingecko.com"],
  },
  env: {
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client: process.env.AUTH0_CLIENT,
    auth0_secret: process.env.AUTH0_SECRET,
    cmc_url: process.env.CMC_URL,
    cmc_api: process.env.CMC_API_KEY,
  },
};

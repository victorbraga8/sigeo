/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL_API: process.env.URL_API_BASE,
    DATABASE_URL: process.env.DATABASE_URL_BASE,
  },
};

export default nextConfig;

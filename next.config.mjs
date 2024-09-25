/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL_API_BASE: "https://json-server-sigeo.vercel.app/data/features",
    DATABASE_URL_BASE:
      "postgresql://testes-victorbraga_owner:3czRqZsNuxw7@ep-soft-thunder-a5fymhd1-pooler.us-east-2.aws.neon.tech/testes-victorbraga?sslmode=require",
  },
};

export default nextConfig;

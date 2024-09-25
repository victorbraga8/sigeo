import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: ".env.local",
});
console.log(process.env.DATABASE_URL);
export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://testes-victorbraga_owner:3czRqZsNuxw7@ep-soft-thunder-a5fymhd1-pooler.us-east-2.aws.neon.tech/testes-victorbraga?sslmode=require",
  },
});

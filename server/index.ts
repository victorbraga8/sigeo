import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/server/schema";

const sql = neon(
  "postgresql://testes-victorbraga_owner:3czRqZsNuxw7@ep-soft-thunder-a5fymhd1-pooler.us-east-2.aws.neon.tech/testes-victorbraga?sslmode=require"
);
export const db = drizzle(sql, { schema, logger: false });

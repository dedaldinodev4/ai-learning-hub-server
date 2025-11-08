import { config } from "./src/config";
import { defineConfig } from "drizzle-kit";


const { DATABASE_URL } = config;

export default defineConfig({
  dialect: 'mysql',
  schema: './src/db/schema.ts',
  out: "./drizzle",
  dbCredentials: {
   url: DATABASE_URL || ""
  },  
})

import { drizzle } from "drizzle-orm/mysql2";
import { config } from "../config";



export const db = drizzle({
  connection: {
    uri: config.DATABASE_URL
  }
})

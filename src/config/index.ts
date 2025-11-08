import dotenv from 'dotenv'

dotenv.config()
export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3333,
  DATABASE_URL: process.env.DATABASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
};
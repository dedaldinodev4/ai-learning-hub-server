import {
  varchar, mysqlTable, timestamp, json, int
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';


export const users = mysqlTable('_users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }),
  provider: varchar('provider', { length: 20}).default("manual").notNull(), //manual | google
  created_at: timestamp('created_at').defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(topics),
}));

export const topics = mysqlTable('_topics', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 256}).notNull(),
  summary: varchar('summary', { length: 256 }).notNull(),
  quiz: json('quiz').notNull(),
  plan: varchar('plan', { length: 256 }).notNull(),
  userId: int('userId').references(() => users.id).notNull(),
  created_at: timestamp('created_at').defaultNow()
});

export const topicsRelations = relations(topics, ({ one }) => ({
  author: one(users, {
    fields: [topics.userId],
    references: [users.id],
  }),
}));
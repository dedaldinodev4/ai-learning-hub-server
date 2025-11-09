import { FastifyInstance } from "fastify"

import { db } from "@/lib/drizzle"
import { SchemaUsers } from "@/db/schema"


export const getAllUsers = async (app: FastifyInstance) => {

  app.get('/users', async (request, reply) => {

    const users = await db
      .select({
        id: SchemaUsers.id,
        name: SchemaUsers.name,
        email: SchemaUsers.email,
        provider: SchemaUsers.provider,
      })
      .from(SchemaUsers)

    return reply.status(200).send(users ?? []);
  })

}
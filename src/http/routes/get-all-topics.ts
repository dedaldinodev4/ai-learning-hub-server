import { FastifyInstance } from "fastify"

import { db } from "@/lib/drizzle"
import { SchemaTopics } from "@/db/schema"


export const getAllTopics = async (app: FastifyInstance) => {
  
  app.get('/topics', async (request, reply) => {
    
    const topics = await db
      .select()
      .from(SchemaTopics)

    return reply.status(200).send(topics ?? []);
  })

}
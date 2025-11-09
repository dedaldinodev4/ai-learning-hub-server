import { FastifyInstance } from "fastify"
import { z } from "zod"
import { eq } from 'drizzle-orm'
import { db } from "@/lib/drizzle"
import { SchemaTopics } from "@/db/schema"


export const getTopic = async (app: FastifyInstance) => {
  
  app.get('/topics/:id', async (request, reply) => {
    const getTopicParams = z.object({
      id: z.int(),
    })

    const { id } = getTopicParams.parse(request.params)

    const [topic] = await db
      .select()
      .from(SchemaTopics)
      .where(eq(SchemaTopics.id, id));

    if (!topic) {
      return reply.status(400).send({ message: 'Topic does not exists.' })
    }

    return reply.status(200).send(topic);
  })

}
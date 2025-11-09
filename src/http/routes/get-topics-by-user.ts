import { FastifyInstance } from "fastify"
import { z } from "zod"
import { eq } from 'drizzle-orm'
import { db } from "@/lib/drizzle"
import { SchemaTopics } from "@/db/schema"


export const getTopicsByUser = async (app: FastifyInstance) => {
  
  app.get('/topics/byUser/:userId', async (request, reply) => {
    const getTopicsByUserParams = z.object({
      userId: z.int(),
    })

    const { userId } = getTopicsByUserParams.parse(request.params)

    const [topics] = await db
      .select()
      .from(SchemaTopics)
      .where(eq(SchemaTopics.userId, userId));

    if (!topics) {
      return reply.status(400).send({ message: 'User does not have topics' })
    }

    return reply.status(200).send(topics);
  })

}
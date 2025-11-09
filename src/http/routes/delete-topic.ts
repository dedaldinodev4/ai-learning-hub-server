import { FastifyInstance } from "fastify"
import { z } from "zod"
import { eq } from 'drizzle-orm'
import { db } from "@/lib/drizzle"
import { SchemaTopics } from "@/db/schema"


export const deleteTopic = async (app: FastifyInstance) => {

  app.delete('/topics/:id', async (request, reply) => {
    const getTopicParams = z.object({
      id: z.int(),
    })

    const { id } = getTopicParams.parse(request.params)

    await db
      .delete(SchemaTopics)
      .where(eq(SchemaTopics.id, id));

    return reply.status(200).send({
      message: "Topic deleted successfully"
    });
  })

}
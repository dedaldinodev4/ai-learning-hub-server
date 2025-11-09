import { FastifyInstance } from "fastify"
import { z } from "zod"
import { db } from "../../lib/drizzle"
import { hashPassword } from "../../utils/auth"
import { generateToken } from "../../utils/jwt"
import { SchemaTopics } from "../../db/schema"
import { eq } from "drizzle-orm"
import { generateTopicSummary } from "../../services/openai.service"



export const createTopic = async (app: FastifyInstance) => {
  app.post('/topics', async (request, reply) => {

    const CreateTopic = z.object({
      title: z.string().min(3),
      description: z.string().optional(),
      userId: z.int()
    })

    const { title, userId, description } = CreateTopic.parse(request.body)

    const generated = await generateTopicSummary(title, description);

    if (generated instanceof Error) {
      return reply.status(400).send({ message: `Error from AI Generate` })
    }
    const { summary, quiz } = generated
    const [topic] = await db
      .insert(SchemaTopics)
      .values({
        title,
        summary,
        description: description ? description : null,
        quiz: JSON.stringify(quiz),
        userId,
      })
      .$returningId();



    const [newTopic] = await db
      .select()
      .from(SchemaTopics)
      .where(eq(SchemaTopics.id, topic.id))

    return reply.status(201).send(newTopic)
  })

}


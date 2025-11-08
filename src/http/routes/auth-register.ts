import { FastifyInstance } from "fastify"
import { z } from "zod"
import { db } from "../../lib/drizzle"
import { hashPassword } from "../../utils/auth"
import { generateToken } from "../../utils/jwt"
import * as schema from "../../db/schema"
import { eq } from "drizzle-orm"



export const authRegister = async (app: FastifyInstance) => {
  app.post('/register', async (request, reply) => {

    const CreateUser = z.object({
      name: z.string().min(3),
      email: z.string()
        .regex(/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i),
      password: z.string().optional()
    })

    const { name, email, password } = CreateUser.parse(request.body)

    const [existing] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))

    if (existing) {
      return reply.status(400).send({ message: `User already exist.` })
    }

    const user = await db.insert(schema.users)
      .values({
        email,
        name,
        password: password ? hashPassword(password) : null
      })

    const { insertId } = user[0]
    const [newUser] = await db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
      })
      .from(schema.users)
      .where(eq(schema.users.id, insertId))

    const currentUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }
    const token = generateToken(currentUser);

    return reply.status(201).send({ 
      user: newUser,
      token
     })
  })

}
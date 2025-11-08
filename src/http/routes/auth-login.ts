import { FastifyInstance } from "fastify"
import { z } from "zod"
import { db } from "../../lib/drizzle"
import { checkUnEncryptedPasswordIsValid } from "../../utils/auth"
import { generateToken } from "../../utils/jwt"
import { SchemaUsers } from "../../db/schema"
import { eq } from "drizzle-orm"



export const authLogin = async (app: FastifyInstance) => {
  app.post('/login', async (request, reply) => {

    const userLogin = z.object({
      email: z.string()
        .regex(/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i),
      password: z.string()
    })

    const { email, password } = userLogin.parse(request.body)

    const [user] = await db
      .select()
      .from(SchemaUsers)
      .where(eq(SchemaUsers.email, email))

    if (!user) {
      return reply.status(400).send({ message: 'Invalid credentials.'})
    }

    const valid = await checkUnEncryptedPasswordIsValid(password, user.password!!);
    if (!valid) {
      return reply.status(400).send({ message: 'Invalid credentials.' })
    }

    const currentUser = { 
      id: user.id, 
      email: user.email, 
      name: user.name 
    }
    
    const token = generateToken(currentUser);

    return reply.status(201).send({
      user: currentUser, 
      token
    })
  })

}
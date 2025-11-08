import fastify from "fastify";

import { authRegister } from "./http/routes/auth-register";

const server = fastify({
  logger: false
})


server.register(authRegister, { prefix: "/api/v1/auth"})

server.get('/', function (req, reply) {
  return reply.send('Hello API')
})



export { server }
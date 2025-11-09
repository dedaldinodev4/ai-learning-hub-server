import fastify from "fastify";

import { authRegister } from "./http/routes/auth-register";
import { authLogin } from "./http/routes/auth-login";
import { createTopic } from "./http/routes/create-topic";

const server = fastify({
  logger: false
})


server.register(authRegister, { prefix: "/api/v1/auth"})
server.register(authLogin, { prefix: "/api/v1/auth"})
server.register(createTopic, { prefix: "/api/v1"})

server.get('/', function (req, reply) {
  return reply.send('Hello API')
})



export { server }
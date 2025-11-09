import fastify from "fastify";

import { authRegister } from "./http/routes/auth-register";
import { authLogin } from "./http/routes/auth-login";
import { createTopic } from "./http/routes/create-topic";
import { getAllTopics } from "./http/routes/get-all-topics";
import { getTopic } from "./http/routes/get-topic";
import { getTopicsByUser } from "./http/routes/get-topics-by-user";
import { deleteTopic } from "./http/routes/delete-topic";
import { getAllUsers } from "./http/routes/get-all-users";


const server = fastify({
  logger: false
})

server.register(authRegister, { prefix: "/api/v1/auth"})
server.register(authLogin, { prefix: "/api/v1/auth"})
server.register(createTopic, { prefix: "/api/v1"})
server.register(getAllTopics, { prefix: "/api/v1"})
server.register(getTopic, { prefix: "/api/v1"})
server.register(getTopicsByUser, { prefix: "/api/v1"})
server.register(getAllUsers, { prefix: "/api/v1"})

server.get('/', function (req, reply) {
  return reply.send('Hello API')
})



export { server }
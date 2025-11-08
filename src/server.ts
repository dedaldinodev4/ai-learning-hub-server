import fastify from "fastify";

const server = fastify({
  logger: false
})

server.get('/', function (req, reply) {
  return reply.send('Hello API')
})

export { server }
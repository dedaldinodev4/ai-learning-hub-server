import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyToken } from '../utils/jwt';

export const ensuredAuthenticated = async (request: FastifyRequest, reply: FastifyReply) => {

  const header = request.headers.authorization;
  if (!header) return reply.status(401).send({ message: 'Unauthorized' });

  const token = header.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    (request as any).user = decoded;
  } catch {
    return reply.status(401).send({ message: 'Invalid token' });
  }
}
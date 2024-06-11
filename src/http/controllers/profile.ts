import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  // try {
  //   const authenticateUseCase = makeAuthenticateUseCase()

  //   await authenticateUseCase.execute({ email, password })
  // } catch (err) {
  //   if (err instanceof InvalidCredentialsError) {
  //     return reply.status(400).send({ message: err.message })
  //   }

  //   throw err
  // }

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}

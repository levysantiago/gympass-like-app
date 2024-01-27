import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface IGetUserProfileUseCaseRequest{
  userId: string
}

interface IGetUserProfileUseCaseResponse{
  user: User
}

export class GetUserProfileUseCase{
  constructor(
    private usersRepository: UsersRepository
  ){}

  async execute({userId}: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse>{
    const user = await this.usersRepository.findById(userId)

    if(!user){
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}
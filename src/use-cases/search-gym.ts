import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface ISearchGymUseCaseDTO {
  query: string
  page: number
}

interface ISearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymUseCaseDTO): Promise<ISearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}

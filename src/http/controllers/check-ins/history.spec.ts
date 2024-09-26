import request from 'supertest'
import { afterAll, beforeAll, expect, it, test } from 'vitest'
import { app } from "@/app"
import { describe } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-end-authenticate-user'
import { prisma } from '@/lib/prisma'

describe("Check-in History (e2e)", ()=>{
  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it("should be able to list check-ins", async ()=>{
    const {token} = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data:{
        title: "JavaScript Gym",
        latitude: -14.7763777,
        longitude: -39.2632495,
      }
    })

    await prisma.checkIn.createMany({
      data:[
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
    .get('/check-ins/history')
    .set("Authorization", `Bearer ${token}`)
    .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      })
    ])
  })
})

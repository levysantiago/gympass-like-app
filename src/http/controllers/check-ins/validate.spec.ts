import request from 'supertest'
import { afterAll, beforeAll, expect, it, test } from 'vitest'
import { app } from "@/app"
import { describe } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-end-authenticate-user'
import { prisma } from '@/lib/prisma'

describe("Validate Check-in (e2e)", ()=>{
  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it("should be able to validate a check-in", async ()=>{
    const {token} = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data:{
        title: "JavaScript Gym",
        latitude: -14.7763777,
        longitude: -39.2632495,
      }
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })

    const profileResponse = await request(app.server)
    .patch(`/check-ins/${checkIn.id}/validate`)
    .set("Authorization", `Bearer ${token}`)
    .send()

    expect(profileResponse.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      }
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})

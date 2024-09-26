import request from 'supertest'
import { afterAll, beforeAll, expect, it, test } from 'vitest'
import { app } from "@/app"
import { describe } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-end-authenticate-user'
import { prisma } from '@/lib/prisma'

describe("Create Check-in (e2e)", ()=>{
  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it("should be able to create a check-in", async ()=>{
    const {token} = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data:{
        title: "JavaScript Gym",
        latitude: -14.7763777,
        longitude: -39.2632495,
      }
    })

    const profileResponse = await request(app.server)
    .post(`/gyms/${gym.id}/check-ins`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      latitude: -14.7763777,
      longitude: -39.2632495,
    })

    expect(profileResponse.statusCode).toEqual(201)
  })
})

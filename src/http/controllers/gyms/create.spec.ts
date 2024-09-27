import request from 'supertest'
import { afterAll, beforeAll, expect, it, test } from 'vitest'
import { app } from "@/app"
import { describe } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-end-authenticate-user'

describe("Create Gym (e2e)", ()=>{
  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it("should be able to create gym", async ()=>{
    const {token} = await createAndAuthenticateUser(app, true)

    const profileResponse = await request(app.server)
    .post("/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "JavaScript Gym",
      description: "Some description",
      phone: "1199999999",
      latitude: -14.7763777,
      longitude: -39.2632495,
    })

    expect(profileResponse.statusCode).toEqual(201)
  })
})

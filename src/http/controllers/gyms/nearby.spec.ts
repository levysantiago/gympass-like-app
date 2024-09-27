import request from 'supertest'
import { afterAll, beforeAll, expect, it, test } from 'vitest'
import { app } from "@/app"
import { describe } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-end-authenticate-user'

describe("Search Nearby Gyms (e2e)", ()=>{
  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it("should be able to list nearby gyms", async ()=>{
    const {token} = await createAndAuthenticateUser(app, true)

    await request(app.server)
    .post("/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "JavaScript Gym",
      description: "Some description",
      phone: "1199999999",
      latitude: -14.780562,
      longitude: -39.2687152,
    })

    const creation = await request(app.server)
    .post("/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "TypeScript Gym",
      description: "Some description",
      phone: "1199999999",
      latitude: -14.790752569325958,
      longitude: -39.053625994030554,
    })
    

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -14.780562,
        longitude: -39.2687152,
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      })
    ])
  })
})

import request from 'supertest'
import { afterAll, beforeAll, expect, it, test } from 'vitest'
import { app } from "@/app"
import { describe } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-end-authenticate-user'

describe("Search Gyms (e2e)", ()=>{
  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it("should be able to search gyms by title", async ()=>{
    const {token} = await createAndAuthenticateUser(app)

    await request(app.server)
    .post("/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "JavaScript Gym",
      description: "Some description",
      phone: "1199999999",
      latitude: -14.7763777,
      longitude: -39.2632495,
    })

    const creation = await request(app.server)
    .post("/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "TypeScript Gym",
      description: "Some description",
      phone: "1199999999",
      latitude: -14.7763777,
      longitude: -39.2632495,
    })
    

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "JavaScript"
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

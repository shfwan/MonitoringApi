import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import bcrypt from 'bcrypt'
import supertest from "supertest";
import { app } from "../app/app.js";
import { v4 as uuid } from "uuid";
import { 
    createSupirData,
    getAllSupirData,
    getUserByName,
    register,
    removeSupirDataByName,
    removeUserDataByName,
    removeUserProfile } from "./test-util";

describe("GET /api/v0/user/login", () => {
    beforeEach(async () => {
        await createSupirData()
    })
    
    afterEach(async () => {
        await removeUserDataByName()
        await removeSupirDataByName()
    })

    it("Check Phone Number in database", async () => {
        const checkPhoneNumber = await getAllSupirData()
        const result = await supertest(app)
            .get("/api/v0/user/login")
            .send({
                phoneNumber: checkPhoneNumber.phoneNumber
            })

        expect(result.status).toBe(200)
    })
})

describe("POST /api/v0/user/register", () => {
    beforeEach(async () => {
        await createSupirData()
    })



    afterEach(async () => {
        await removeUserProfile()
        await removeUserDataByName()
        await removeSupirDataByName()
    })

    it("Successfully registered user", async () => {
        const checkPhoneNumber = await getAllSupirData()
        const result = await supertest(app)
            .post('/api/v0/user/register')
            .send({
                username: checkPhoneNumber.name,
                password: await bcrypt.hash("Ongko123",10),
            })
        expect(result.status).toBe(200)
        expect(result.body.username).toBe()
    })
    
})

describe("PATCH /api/v0/user/login", () => {
    beforeEach(async () => {
        await createSupirData()
        await register()
    })

    afterEach(async () => {
        await removeUserProfile()
        await removeUserDataByName()
        await removeSupirDataByName()
    })

    it("Success login", async () => {
        const userId = await getUserByName()
        // const result = await supertest(app)
        //     .patch(`/api/v0/users/login/${userId.id}`)
        //     .send({
        //         token: uuid().toString()
        //     })
        // expect(result.status).toBe(200)
        // expect(result.body.token).toBe()
    })

})
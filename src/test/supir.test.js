import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { app } from "../app/app.js";
import { 
    createSupirData,
    getSupirDataByName,
    removeSupirDataByName
} from "./test-util";


describe("GET api/v1/supir", () => {
    beforeEach(async () => {
        await createSupirData()
    })

    afterEach(async () => {
        await removeSupirDataByName()
    })

    it('success get supir data ', async () => {
        const result = await supertest(app).get('/api/v1/supir')
        expect(result.status).toBe(200)
    })
    
    it('failed get supir data', async () => {
        const result = await supertest(app).get('/api/v1/supisd')
        expect(result.status).toBe(404)
    })
})

describe('GET /api/v1/supir/:id', () => {
    beforeEach(async () => {
        await createSupirData()
    })

    afterEach(async () => {
        await removeSupirDataByName()
    })

    it('success get data by name', async () => {

        const testSupir = await getSupirDataByName()
        const result = await supertest(app).get(`/api/v1/supir/${testSupir.id}`)
        
        expect(result.status).toBe(200)
        expect(result.body.name).toBe("Ongko")
        expect(result.body.alamat).toBe("Galunggung")
        expect(result.body.phoneNumber).toBe("081218987160")
    })

    it('fail get supir data', async () => {
        const result = await supertest(app).get('/api/v1/users/915414a1-3521-4025-ad18-59aac65b7d50')
        expect(result.status).toBe(404)
    })
})

describe('PATCH api/v2/supir/:name', () => { 
    beforeEach(async () => {
        await createSupirData()
    })

    afterEach(async () => {
        await removeSupirDataByName()
    })

    it('success update alamat by name', async() => {
        const testSupir = await getSupirDataByName()

        const result = await supertest(app)
            .patch(`/api/v2/supir/${testSupir.id}`)
            .send({
                alamat: "Poka"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.alamat).toBe("Poka")
        
    })
})

describe('POST /api/v2/supir', () => {
    afterEach( async () => {
        await removeSupirDataByName()
    })
    
    it('success add supir and user to database', async () => {
        const result = await supertest(app)
            .post('/api/v2/supir/')
            .send({
                name: "Ongko",
                alamat: "Galunggung",
                phoneNumber: "081218987160"
            })

        expect(result.status).toBe(201)
        expect(result.body.data.name).toBe('Ongko')
        expect(result.body.data.alamat).toBe('Galunggung')
        expect(result.body.data.phoneNumber).toBe('081218987160')
    })
})

describe('PATCH /api/v2/supir/:name', () => {
    beforeEach(async () => {
        await createSupirData()
    })
    
    afterEach(async () => {
        await removeSupirDataByName()
    })

    it('succes update alamat supir', async() => {
        const testSupir = await getSupirDataByName()
        const result = await supertest(app)
            .patch(`/api/v2/supir/${testSupir.id}`)
            .send({
                phoneNumber: "081234567890"
            })
        expect(result.status).toBe(200)
        expect(result.body.data.phoneNumber).toBe("081234567890")
            
    })

})

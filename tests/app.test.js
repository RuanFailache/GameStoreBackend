import app from "../src/app.js";
import supertest from "supertest";

describe("GET /products", ()=>{

    test("returns 200 for successful get products", async() =>{
        const result = await supertest(app).get("/products");
        const status = result.status;

        expect(status).toEqual(200);
    });
});
const request = require('supertest')
const { expect } = require('@jest/globals');
const app = require("./src/app.js");
const Restaurant = require('./models/Restaurant.js');
const syncSeed = require("./seed.js")
let restQuantity;


beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll({});
    restQuantity = restaurants.length;
});

describe('verify methods can GET, PUT, POST, DELETE', () => {

    test('returns a status code of 200', async () => {
            const response = await request(app).get("/restaurants");
            expect(response.statusCode).toBe(200);
    })

    test('returns an array of restaurants', async () => {
            const response = await request(app).get("/restaurants");
            expect(Array.isArray(response.body)).toBe(true);
            expect(restQuantity).toBeGreaterThan(0);
    })

    test('return the correct number of restaurants', async () => {
            const response = await request(app).get("/restaurants");
            expect(response.body.length).toEqual(restQuantity);
    })

    test('return the correct restaurant data', async () => {
            const response = await request(app).get("/restaurants/1");
            (expect.objectContaining({
                id: 1,
                name: "Applebees",
                location: "Texas", 
                cuisine: "FastFood",
            }))
     
    })

     test('return the correct restaurant', async () => {
            const response = await request(app).get("/restaurants/1");
            (expect.objectContaining({
                id: 1,
                name: "Applebees",
                location: "Texas", 
                cuisine: "FastFood",
            })
        )   
    })

    test('should return a larger restaurant array', async () => {
        const response = await request(app)
        .post("/restaurants")
        .send({name: "Oghane", location: "California", cuisine: "korean"});
        const restaurants = await Restaurant.findAll({});
        expect(restaurants.length).toEqual(restQuantity + 1);
    })

    test('should update first item in database', async () => {
        await request(app) 
        .put("/restaurants/1")
        .send({name: "Oghane", location: "California", cuisine: "korean"});
        const restaurant = await Restaurant.findByPk(1);
        expect(restaurant.name).toEqual("Oghane");
}) 

    test('should delete db entry by id', async () => {
        await request(app).delete("/restaurants/1");
        const restaurants = await Restaurant.findAll({});
        expect(restaurants.length).toEqual(restQuantity);
        expect(restaurants[1].id).not.toEqual(1);
})
    test('should return error array', async () => {
        const response = await request(app)
        .post("/restaurants")
        .send({name: "", location: "", cuisine: ""});
        expect(response.body.errors.length).toBeGreaterThan(0);
})

})

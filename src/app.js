const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll({});
    (res.json(restaurants));
});

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const restaurantsId = await Restaurant.findByPk(id);
    res.json(restaurantsId);
});

app.post("/restaurants", async (req,res) => {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
})

app.put("/restaurants/:id", async (req, res) => {
    const updatedRest = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(updatedRest);
})

app.delete("restaurants/:id" , async (req, res) => {
    const deleteRest = await Restaurant.destroy({where: {id: req.params.id}});
    res.json(deleteRest);
})


module.exports = app;

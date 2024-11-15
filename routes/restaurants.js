const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant.js");

router.get("/", async (req, res) => {
    const restaurants = await Restaurant.findAll({});
    (res.json(restaurants));
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const restaurantsId = await Restaurant.findByPk(id);
    res.json(restaurantsId);
});

router.post("/", async (req,res) => {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
})

router.put("/:id", async (req, res) => {
    const updatedRest = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(updatedRest);
})

router.delete("/:id" , async (req, res) => {
    const deleteRest = await Restaurant.destroy({where: {id: req.params.id}});
    res.json(deleteRest);
})


module.exports = router;
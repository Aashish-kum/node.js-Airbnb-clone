

// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeControllers");

storeRouter.get("/", storeController.getIndex);

storeRouter.get("/homes", storeController.getHomes);

storeRouter.get("/bookings", storeController.getBookings);

storeRouter.get("/favourites", storeController.getfavouriteList);

storeRouter.get("/homes/:homeid", storeController.getHomeById);

storeRouter.post("/favourites", storeController.pastAddToFavouriteList);

storeRouter.post("/favourites/delete/:homeid", storeController.postRemoveFromFavourite);


module.exports = storeRouter;
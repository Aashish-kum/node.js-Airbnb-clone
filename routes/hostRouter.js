

// External Module
const express = require('express');
const hostRouter = express.Router();



const hostController = require("../controllers/hostControllers");

hostRouter.get("/add-home", hostController.getAddhome);
hostRouter.post("/add-home", hostController.postAddhome);
hostRouter.get("/editHomes/:homeid", hostController.getEditHomes);
hostRouter.get("/Homeslist",hostController.getHostHomeslist);
hostRouter.post("/editHomes", hostController.postEditHomes);
hostRouter.post("/Delete-home/:homeid", hostController.postDeleteHome);

module.exports = hostRouter;


const express = require('express');
const authRouter = express.Router();

const authController = require("../controllers/authControllers");


authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.get("/logout", authController.getLogout);
authRouter.post("/logout", authController.postLogout);
authRouter.get("/signup", authController.getSignUp);
authRouter.post("/signup", authController.postSignUp);


module.exports = authRouter;// Local Module

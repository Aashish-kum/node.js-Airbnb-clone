const express = require('express');
const webPageRouter = express.Router();

const webPageController = require("../controllers/webPageControllers");



// Support
webPageRouter.get("/help", webPageController.getHelpCenter);
webPageRouter.get("/airCover", webPageController.getAirCover);
webPageRouter.get("/antiDis", webPageController.getAntiDis);
webPageRouter.get("/support", webPageController.getDisSupport);
webPageRouter.get("/cancel-options", webPageController.getCancelOption);
// hosting
webPageRouter.get("/yourHome", webPageController.getYourHome);
webPageRouter.get("/airCover-Host", webPageController.getAirCover);
webPageRouter.get("/Explore-Hosting", webPageController.getExploreHosting);
webPageRouter.get("/community-forum", webPageController.getCommunityforum);
// Company
webPageRouter.get("/about",webPageController.getAboutus);
webPageRouter.get("/careers",webPageController.getCareers);
webPageRouter.get("/news-room", webPageController.getNewsroom);
webPageRouter.get("/investors",webPageController.getInvestors);

// Discover
webPageRouter.get("/Trust-Safety", webPageController.getTrustSafety);
webPageRouter.get("/Travel-Credit", webPageController.getTravelCredit);
webPageRouter.get("/Gift-Cards", webPageController.getGiftCards);

// copy

webPageRouter.get("/privacy", webPageController.getPrivacy);
webPageRouter.get("/terms", webPageController.getTerms);
webPageRouter.get("/sitemap", webPageController.getSitemap);


module.exports = webPageRouter;// Local Module

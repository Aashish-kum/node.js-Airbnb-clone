
const Home = require("../models/home");
const User = require('../models/user');


exports.getIndex = (req, res, next) => {
  console.log("Session Object:", req.session);
  Home.find().then(registeredHomes => {
    res.render('store/index', { 
      registeredHomes: registeredHomes, 
      pageTitle: 'Index', 
      currentPage: 'index', 
      isloggedIn: req.session.isloggedIn || false, 
      user: req.session.user || null, 
      userType: req.session.user ? req.session.user.userType : null
    });
  });

  // console.log(registeredHomes);
}

exports.getHomes = (req, res, next) => {

  Home.find().then(registeredHomes => {
    res.render('store/home-list', { 
      registeredHomes: registeredHomes, 
      pageTitle: 'airbnb Home', 
      currentPage: 'Home', 
      isloggedIn: req.session.isloggedIn || false, 
      user: req.session.user || null, 
      userType: req.session.user ? req.session.user.userType : null
    });
  });

  // console.log(registeredHomes);
}



exports.getBookings = (req, res, next) => {

  res.render('store/bookings', { 
    pageTitle: 'My Bookings', 
    currentPage: 'bookings', 
    isloggedIn: req.session.isloggedIn || false, 
    user: req.session.user || null, 
    userType: req.session.user ? req.session.user.userType : null
  });
  // console.log(registeredHomes);  
}

exports.getfavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render('store/favourite-list', { 
    favouriteHomes: user.favourites, 
    pageTitle: 'My favourite-list', 
    currentPage: 'favourite', 
    isloggedIn: req.session.isloggedIn || false, 
    user: req.session.user || null, 
    userType: req.session.user ? req.session.user.userType : null
  });

  // console.log(registeredHomes);
}


exports.pastAddToFavouriteList = async (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeId)){
    user.favourites.push(homeId);
    await user.save();
  }

      res.redirect('/favourites');

};


exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeid;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)){
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }

    res.redirect('/favourites');
  
}

exports.getHomeById = (req, res, next) => {
  const homeId = req.params.homeid;
  Home.findById(homeId).then(home => {

    if (!home) {
      console.log("Home not found with id: " + home);
      return res.status(404).render('404', { 
        pageTitle: 'Page Not Found', 
        currentPage: 'not-found', 
        isloggedIn: req.session.isloggedIn || false, 
        user: req.session.user || null, 
        userType: req.session.user ? req.session.user.userType : null 
      });
      // res.redirect('/homes'); // Redirect to home page if home not found

    } else {
      console.log("Home found with id: " + home);
      res.render('store/home-detail', { 
        home: home, 
        pageTitle: home.houseName, 
        currentPage: 'home-detail', 
        isloggedIn: req.session.isloggedIn || false, 
        user: req.session.user || null, 
        userType: req.session.user ? req.session.user.userType : null 
      });
    }
  });

  console.log(homeId);
}










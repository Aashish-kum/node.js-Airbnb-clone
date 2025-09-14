const Home = require('../models/home');
const User = require('../models/user');
const fs = require('fs');



exports.getAddhome = (req, res, next) => {
  res.render('host/addHome', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'addHome',
    editing: false,
    isloggedIn: req.session.isloggedIn || false, 
    user: req.session.user || null, 
    userType: req.session.user ? req.session.user.userType : null 
  });
}



exports.getEditHomes = (req, res, next) => {
  const homeId = req.params.homeid;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log('Home not found for editing');
      return res.redirect('/host/Homeslist');
    }
    console.log('Editing:', editing);
    console.log('Home ID:', homeId);
    console.log('Home Details:', home);
    res.render('host/addHome', {
      pageTitle: 'Edit Home',
      currentPage: 'hostHome',
      home: home,
      editing: editing,
      isloggedIn: req.session.isloggedIn || false, 
      user: req.session.user || null, 
      userType: req.session.user ? req.session.user.userType : null 
    });
  });
};




exports.postAddhome = async (req, res, next) => {
  try {
    console.log('Home Registration successful for:', req.body);

    if (!req.session.user) {
      return res.redirect('/login');
    }

    const userId = req.session.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { houseName, price, location, rating, description } = req.body;

    if (!req.file) {
      console.log("No image provided");
      return res.status(422).send("No image provided");
    }

    const photo = req.file.path;

    const home = new Home({
      houseName,
      price,
      location,
      rating,
      photo,
      description,
      host: userId  // Store host ID in the home
    });

    const savedHome = await home.save();

    // ✅ Use the correct field 'host', not 'hosthomelist'
    if (!user.host.includes(savedHome._id)) {
      user.host.push(savedHome._id);
      await user.save();
    }

    console.log('Home saved successfully');
    res.redirect('/host/Homeslist');
  } catch (err) {
    console.error('Error adding home:', err);
    res.status(500).send('Server error');
  }
};




exports.getHostHomeslist = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('host');
  console.log("user : ",user);

    res.render('host/host-home-list', { 
      registeredHomes: user.host, 
      pageTitle: 'Host-Home', currentPage: 'hostHome', 
      isloggedIn: req.session.isloggedIn || false, 
      user: req.session.user || null, 
      userType: req.session.user ? req.session.user.userType : null 
    });

  // console.log(registeredHomes);
}




exports.postEditHomes = (req, res, next) => {
  console.log('Home Edit successful for:', req.body);

  const { id, houseName, price, location, rating, description } = req.body;
  Home.findById(id).then(home => {
    if (!home) {
      console.log('Home not found for updating');
      return res.redirect('/host/Homeslist');
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.description = description;

    if(req.file){
      fs.unlink(home.photo, (err) =>{
        if(err){
          console.log("Error Will Delete File",err);
        }
      })
      home.photo = req.file.path;
    }

    home.save().then((result) => {
      console.log('Home updated successfully', result);
    }).catch(err => {
      console.error('Error finding home for update:', err);
    });
    res.redirect('/host/Homeslist');
  });
}

exports.postDeleteHome = async(req, res, next) => {
  const homeId = req.params.homeid;
  const userId = req.session.user._id;
    const user = await User.findById(userId);
    if (user.host.includes(homeId)){
      user.host = user.host.filter(fav => fav != homeId);
      await user.save();
    }
  console.log('Deleting home with ID:', homeId);

  Home.findByIdAndDelete(homeId).then(() => {
    console.log('Home deleted successfully');
    res.redirect('/host/Homeslist');
  }).catch(err => {
    console.error('Error deleting home:', err);
    res.redirect('/host/Homeslist');
  });
}
const Home = require('../models/home');
const fs = require('fs');



exports.getAddhome = (req, res, next) => {
  res.render('host/addHome', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'addHome',
    editing: false,
    isloggedIn: req.isloggedIn,
    user: req.session.user
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
      isloggedIn: req.isloggedIn,
      user: req.session.user
    });
  });
};




exports.postAddhome = (req, res, next) => {
  console.log('Home Registration successful for:', req.body);

  const { houseName, price, location, rating, description } = req.body;
  console.log(req.file);
  if(!req.file){
    console.log("No image Provided");
    // return res.redirect('/host/add-home');
    return res.status(422).send("No image provided");
  }

  const photo = req.file.path;

  const home = new Home({
     houseName, 
     price, 
     location, 
     rating, 
     photo, 
     description
     });
  
  home.save().then(() => {
    console.log('Home saved successfully');
  }).catch(err => {
    console.error('Error saving home:', err);
  });
  res.redirect('/host/Homeslist');
}



exports.getHostHomeslist = (req, res, next) => {

  Home.find().then(registeredHomes => {
    res.render('host/host-home-list', { registeredHomes: registeredHomes, pageTitle: 'Host-Home', currentPage: 'hostHome', isloggedIn: req.isloggedIn, user: req.session.user });
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

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeid;
  console.log('Deleting home with ID:', homeId);

  Home.findByIdAndDelete(homeId).then(() => {
    console.log('Home deleted successfully');
    res.redirect('/host/Homeslist');
  }).catch(err => {
    console.error('Error deleting home:', err);
    res.redirect('/host/Homeslist');
  });
}









// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const multer = require('multer');

const db_PATH = 'mongodb+srv://Agent:agent47@getforcode.2birdsz.mongodb.net/airbnbMongoose?retryWrites=true&w=majority&appName=GetforCode';

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");

const errorController = require("./controllers/error");
const {default: mongoose} = require("mongoose");





const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongodbStore({
  uri: db_PATH,
  collection: 'sessions'
});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) =>{
    // cb(null, new Date().toISOString()+'-'+file.originalname);
    cb(null, randomString(10) + '-' + file.originalname);
  }

})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOptions = {
  storage, fileFilter
}

app.use(express.urlencoded());
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir, 'public')));
app.use("/uploads",express.static(path.join(rootDir, 'uploads')));
app.use("/host/uploads",express.static(path.join(rootDir, 'uploads')));
app.use("/homes/uploads",express.static(path.join(rootDir, 'uploads')));

app.use(session({
  //Secret for encrypting the session ID cookie
  secret: "my secret key",
  //Forces the session to be saved back to the session store, even if the session was never modified during the request
  resave: false,
  //Forces a session that is "uninitialized" to be saved to the store
  saveUninitialized: true,
  //Setting up the session store
  store: store
}));


app.use((req, res, next) => {
  req.isloggedIn = req.session.isloggedIn;
  next();
});

app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.isloggedIn) {
    return res.redirect('/login');
  }
  next();
});
app.use("/host", hostRouter);
app.use(authRouter);




app.use(errorController.pageNotFound);

const PORT = 3000;



mongoose.connect(db_PATH).then(() => {
  console.log("Connected to MongoDB using Mongoose");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log("Error connecting to MongoDB using Mongoose:", err);
});

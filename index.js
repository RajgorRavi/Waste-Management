const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { connectToMongoDB } = require("./connect");
const staticRoute = require("./routes/staticRoute");
const { sessionActivityTracker, addSessionToLocals } = require("./middlewares/sessionMiddleware");
const { Script } = require("vm");


const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use('/Style',express.static('Style'));
app.use('/wasteExchange',express.static('wasteExchange'));
app.use('/Script',express.static('Script'));
app.use('/HTML',express.static('HTML'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: 'waste-management-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/Waste_Manag_System",
    collectionName: 'sessions'
  }),
  cookie: {
    secure: false, // set to true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Session activity tracking middleware
app.use(sessionActivityTracker);

// Add session data to all responses
app.use(addSessionToLocals);





connectToMongoDB("mongodb://localhost:27017/Waste_Manag_System").then(() =>
  console.log("Mongodb connected")
);

app.use("/",staticRoute);

app.use("/homepage",(req,res)=>{
  return res.render("homePage");
});











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const staticRoute = require("./routes/staticRoute");
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





connectToMongoDB("mongodb://localhost:27017/Waste_Manag_System").then(() =>
  console.log("Mongodb connected")
);

app.use("/",staticRoute);

app.use("/homepage",(req,res)=>{
  return res.render("homePage");
});











const PORT = 8000;
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
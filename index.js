const express = require("express");
const path = require("path");
const URL = require("./models/url.model")
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly, checkAuth}= require("./middlewares/auth.middleware");
const mongoose = require("mongoose")
const urlRoute = require("./routes/url.route");
const staticRoute = require("./routes/static.route");
const userRoute = require("./routes/user.route");
const { CLIENT_RENEG_WINDOW } = require("tls");
require("dotenv").config();
const app = express();
const PORT = 8000
const URI = process.env.MONGO_URI
//Connecting EJS File
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



//Database Connection
mongoose.connect("mongodb://localhost:27017/qr-generate",{
    
})
.then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
  process.exit(1);
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/test", async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {urls: allUrls});
})

//Routes
app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use('/', express.static(path.join(__dirname, 'public')));
        

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})
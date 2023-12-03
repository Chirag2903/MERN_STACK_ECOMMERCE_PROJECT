const express = require("express");
const app = express();
const errormiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");

//Configure
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "Backend/congif/.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

//Import Route
const product = require("./routes/productroute");
const user = require("./routes/userroutes");
const order = require("./routes/orderroute");
const payment = require("./routes/paymentroute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
})

//Middleware for error
app.use(errormiddleware);

module.exports = app; 
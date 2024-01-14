const app = require("./app");
const cloudinary = require("cloudinary")
const connectDatabase = require("./congif/database")

//Handling Uncaught Exception (console.log(youtube)  ye error dega youtube not defined )
process.on('uncaughtException', (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting Dwon the server due to Uncaught Exception`);
    process.exit(1);
})


//Configure
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "Backend/congif/.env" });
}


//Connect Database , Config ke baad hi call karna hai
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is Listening on http://localhost:${process.env.PORT}`);
})


//Unhandles Promise Rejection  (What is galti se server  ka naam change ho jaye isliiye jab aisa ho toh server band kar do)
process.on("unhandledRejection", err => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting Dwon the server due to Unhandles Promise Rejection`)

    server.close(() => {
        process.exit(1);
    });
});
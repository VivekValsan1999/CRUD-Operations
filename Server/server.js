const express = require("express");
const app = new express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const connectToDB = require("./server1/database/connectToDB")
const noteModel = require("./server1/model/noteSchema");
const notesController = require("./server1/controller/notesController");
const cors = require("cors")
const routes = require("./server1/routes/routes");
const routeNotFound=require("../Server/server1/middleware/routeNotFound");
const errorHandleMiddleware=require("./server1/middleware/errorHanderMiddleware")

// Importing PORT
if (process.env.NODE_ENV != 'production') {
    dotenv.config({ path: "./config.env" });
}
const PORT = process.env.PORT || 8080;

// Parsing the request
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// setting up express app
app.use(express.json());
app.use(express.static("./public"))

// setting up logs
app.use(morgan('tiny'));


// routes
app.use("/notes", routes);
app.use(routeNotFound);//to deal with unknown routes
app.use(errorHandleMiddleware);//to deal with errors

// server will run after setting up the database
const start = async () => {
    try {
        await connectToDB();
        // PORT setup
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:4000`)
        });
    }catch(error){
        console.log(`Error found ${error}`)
    }
};

start();

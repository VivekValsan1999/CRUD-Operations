const express=require("express");
const app=new express();
const dotenv=require("dotenv");
const morgan=require("morgan");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const connectToDB=require("./server1/database/connectToDB")
const noteModel=require("./server1/model/noteSchema");
const notesController=require("./server1/controller/notesController");
const cors=require("cors")
const routes=require("./server1/routes/routes");

// Importing PORT
if(process.env.NODE_ENV != 'production')
{
    dotenv.config({path:"./config.env"});  
}
const PORT =process.env.PORT || 8080;

// Parsing the request
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

// setting up express app
app.use(express.json());
app.use(cors());

// setting up logs
app.use(morgan('tiny'));

// connecting to DB
connectToDB()

// routes
app.use("/notes",routes);


// PORT setup
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:4000`)
});
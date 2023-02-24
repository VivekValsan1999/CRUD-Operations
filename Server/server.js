const express=require("express");
const app=new express();
const dotenv=require("dotenv");
const morgan=require("morgan");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const connectToDB=require("./server1/database/connectToDB")
const noteModel=require("./server1/model/noteSchema");
const notesController=require("./server1/controller/notesController")\
const cors=require("cors")

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
// to get the note data
app.get("/notes", notesController.fetchNotes)

// to get note by a particular id
app.get("/notes/:id",notesController.fetchNotesById)

// to post a book
app.post("/notes",notesController.createNote)

// to update a note
app.put("/notes/:id",notesController.updateNote)

// deleting a note
app.delete("/notes/:id", notesController.deleteNote)

// PORT setup
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:4000`)
});
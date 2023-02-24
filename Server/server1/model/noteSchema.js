const mongoose=require("mongoose");

// schema model

const noteSchema= new mongoose.Schema({
    name:String,
    body:String
});

// compiling the schema to module
const noteModel= mongoose.model("noteModel", noteSchema);

module.exports=noteModel;

const noteModel=require("../model/noteSchema");
const mongoose=require("mongoose");

const fetchNotes=async (req,res)=>{
    try{
        const getNote=await noteModel.find();
        res.status(200).json(getNote);
    }
    catch(err){
        res.status(500).json(`Error found: ${err}`)
    }
};

const fetchNotesById=async(req,res)=>{
    try{
         getNoteById=await noteModel.find({$or:[{name:req.params.id},{body:req.params.id}]}).exec();
        if(!getNoteById){
             return res.status(404).json({message:`Couldn't find a matching result`})
        }
        else{
        res.status(200).json(getNoteById)}
    }catch(error){
        res.status(500).json({message:error.message})
    }
};

const createNote=async(req,res)=>{
    // get the data from the req
    const namePost=req.body.name;
    const bodyPost=req.body.body;
    const emailPost=req.body.email;
    const phoneNumberpost=req.body.phoneNumber;
    // create a new entry to the modek
    try{
        const notePost= await noteModel.create({
            name:namePost,
            body:bodyPost,
            email:emailPost,
            phoneNumber:phoneNumberpost
        })
        res.status(201).json(notePost)
    }catch(error){
        res.status(500).json({message:error.message})
    }
};

const updateNote=async (req,res)=>{
    // get the data from the req
    const nameUpdate=req.body.name;
    const bodyUpdate=req.body.body;
    const emailUpdate=req.body.email;
    const phoneNumberUpdate=req.body.phoneNumber;
    
    // editing the entry in the book
    try {
        await noteModel.findByIdAndUpdate(req.params.id,{
            name:nameUpdate,
            body:bodyUpdate,
            email:emailUpdate,
            phoneNumber:phoneNumberUpdate
        },{
            new:true,
            runValidators:true
        })
        const noteUpdate=  await noteModel.findById(req.params.id)
        res.status(200).json(noteUpdate)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
};

const deleteNote=async(req,res)=>{
    try{
        const noteDeleted=await noteModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:`Note of id :- ${req.params.id} has been successfully deleted`})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports={
    fetchNotes,fetchNotesById,createNote,updateNote,deleteNote
}
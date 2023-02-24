const noteModel=require("../model/noteSchema");

const fetchNotes=async (req,res)=>{
    try{
        const getNote=await noteModel.find();
        res.json(getNote);
    }
    catch(err){
        console.log(`Error found: ${err}`)
    }
};

const fetchNotesById=async(req,res)=>{
    try{
        const getNoteById=await noteModel.findById(req.params.id);
        res.json(getNoteById)
    }catch(error){
        res.json({message:error.message})
    }
};

const createNote=async(req,res)=>{
    // get the data from the req
    const namePost=req.body.name;
    const bodyPost=req.body.body;

    // create a new entry to the modek
    try{
        const notePost= await noteModel.create({
            name:namePost,
            body:bodyPost
        })
        res.json(notePost)
    }catch(error){
        res.json({message:error.message})
    }
};

const updateNote=async (req,res)=>{
    // get the data from the req
    const nameUpdate=req.body.name;
    const bodyUpdate=req.body.body;
    
    // editing the entry in the book
    try {
        await noteModel.findByIdAndUpdate(req.params.id,{
            name:nameUpdate,
            body:bodyUpdate
        })
        const noteUpdate=  await noteModel.findById(req.params.id)
        res.json(noteUpdate)
    }
    catch(error){
        res.json({message:error.message})
    }
};

const deleteNote=async(req,res)=>{
    try{
        const noteDeleted=await noteModel.findByIdAndDelete(req.params.id);
        res.json({message:`Note of id :- ${req.params.id} has been successfully deleted`})
    }catch(error){
        res.json({message:error.message})
    }
}

module.exports={
    fetchNotes,fetchNotesById,createNote,updateNote,deleteNote
}
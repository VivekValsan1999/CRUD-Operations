const noteModel = require("../model/noteSchema");
const mongoose = require("mongoose");
const asyncWrapper=require("../middleware/asynwrapper");
const {createCustomError}=require("../errors/customError")

const fetchNotes = asyncWrapper( async (req, res) => {
        const getNote = await noteModel.find();
        res.status(200).json(getNote);
});

const fetchNotesById =asyncWrapper( async (req, res,next) => {
        getNoteById = await noteModel.findById(req.params.id);
        if (!getNoteById) {
            return next(createCustomError(`Couldn't find a matching result ${req.params.id}`,404))
        }
            res.status(200).json(getNoteById)
});

const createNote =asyncWrapper(async (req, res) => {
    // get the data from the req
    const namePost = req.body.name;
    const bodyPost = req.body.body;
    const emailPost = req.body.email;
    const phoneNumberpost = req.body.phoneNumber;

    // create a new entry to the modek
        const notePost = await noteModel.create({
            name: namePost,
            body: bodyPost,
            email: emailPost,
            phoneNumber: phoneNumberpost
        })
        res.status(201).json(notePost)
    
});

const updateNote =asyncWrapper(async (req, res,next) =>{
    // get the data from the req

    // editing the entry in the book
            await noteModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            body: req.body.body,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        }, {
            new: true,
            runValidators: true
        })
        const noteUpdate= await noteModel.findById(req.params.id)
        if (!noteUpdate){
            return  next(createCustomError(`Couldn't find a matching result ${req.params.id}`,404))
        } 
        res.status(200).json(noteUpdate)
});

const deleteNote =asyncWrapper(async (req, res) => {
        const noteDeleted = await noteModel.findByIdAndDelete(req.params.id);
        if (!noteDeleted) {
            return  next(createCustomError(`Couldn't find a matching result ${req.params.id}`,404))
        } else {
            return res.status(200).json({ message: `Note of id :- ${req.params.id} has been successfully deleted` })
        }
});

module.exports = {
    fetchNotes, fetchNotesById, createNote, updateNote, deleteNote
}
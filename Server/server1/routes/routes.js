const express=require("express");
const router=express.Router();
const notesController=require("../controller/notesController")

router.get('/',notesController.fetchNotes );
router.get("/:id",notesController.fetchNotesById);
router.post("/",notesController.createNote);
router.patch("/:id",notesController.updateNote);
router.delete("/:id",notesController.deleteNote);

module.exports=router;


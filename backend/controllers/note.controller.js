import Note from "../models/notes.js"

export const getNotesInFolder = async (req,res) =>{
    try {
        const {folderId} = req.params;
        const notes = await Note.find({folderId});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getNote = async (req,res) =>{
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }  
};

export const createNote = async(req,res) => {
    try {
        const { folderId } = req.params;
        const {userId,title,content,tag} = req.body;
        const newNote = await Note.create({
            userId,folderId,title,content,tag
        });
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteNote = async(req,res) => {
    try {
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json({message : "Note deleted !"});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


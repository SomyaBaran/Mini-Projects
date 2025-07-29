const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/notes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.za01tsl.mongodb.net/notes-app")

//Get route
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.send(notes);
    }
    catch (err) {
        res.status(500).send({ error: "something went wrong" })
    }
})

// Post Route
app.post("/notes", async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

   if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

    try{
        const newNote = new Note({title, content});
        const savedNotes = await newNote.save();
        res.status(201).json(savedNotes);
    }
    catch(err){
        res.status(500).json({error: "Could not save Notes."});
    }
});


// Delete Route
 app.delete("/notes/:id", async (req, res) => {
    const noteId = req.params.id;
    try {
        const deleteNote = await Note.findByIdAndDelete(noteId);

        if (!deleteNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully", deleteNote });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete the note" });
    }
});

// Put Route
app.put("/notes/:id", async(req, res) => {
    const noteId = req.params.id;
    const updateData = req.body;

    try{
        const updateNote = await Note.findByIdAndUpdate(noteId, updateData);

        if(!updateNote){
            return res.status(404).json({error: "Note not found"})
        }
        res.status(200).json({message: "Note updated successfully", updateNote})
    }
    catch(err){
        res.status(500).json({error: "Failed to update Note"})
    }
})

app.listen(3000, () => {
    console.log("the port is running on localhost:3000")
})
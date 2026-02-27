import axios from "axios";
import { useState, useEffect } from "react";

const NoteList = ({ selectedFolder, onSelectNote }) => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNote, setNewNote] = useState([]);
  const [tag, setTag] = useState("");

  const token = localStorage.getItem("token");

  const handleNewNote = async () => {
    try {
      const res = await axios.post(
        `http://localhost:6005/api/notes/folder/${selectedFolder._id}`,
        { title: newNoteTitle, content: newNote, tag: tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNotes(prev=>[...prev, res.data]);
      setNewNoteTitle("");
      setNewNote("");
      setTag("");
      console.log("Created note:", res.data);
    } catch (error) {
      console.error("Error creating notes", error);
    }
  };

  useEffect(() => {
    if (!selectedFolder) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:6005/api/notes/folder/${selectedFolder._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setNotes(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [selectedFolder, token]);

  if (!selectedFolder) return null;

  return (
    <>
      <h3>Notes in {selectedFolder.title}</h3>

      {/* Create Note Section */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Note title"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />

        <textarea
          placeholder="Note content"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button onClick={handleNewNote}>Create Note</button>
      </div>

      {notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{ cursor: "pointer", marginBottom: "6px" }}
            onClick={() => onSelectNote(note)}
          >
            {note.title}
          </div>
        ))
      )}
    </>
  );
};

export default NoteList;

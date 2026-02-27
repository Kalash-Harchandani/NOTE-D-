import axios from "axios";
import { useState, useEffect } from "react";

const NoteList = ({ selectedFolder, onSelectNote }) => {
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");

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
          }
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
import axios from "axios";
import { useState, useEffect, use } from "react";
import React from "react";

const Dashboard = () => {
  const [folders, setFolder] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await axios.get("http://localhost:6005/api/folders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Folders : ", res.data);
        setFolder(res.data);
      } catch (error) {
        console.error("Error fetching folder : ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFolders();
  }, [token]);

  useEffect(() => {
    console.log("Selected Folder for notes:", selectedFolder?._id);
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

        console.log("Notes response:", res.data);

        setNotes(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };

    fetchNotes();
  }, [selectedFolder, token]);

  if (loading) return <h2>"Loading....."</h2>;
  return (
    <>
      <div>
        <h1>Dashboard</h1>

        <h3>Your Folders:</h3>

        {folders.length === 0 ? (
          <p>No folders found</p>
        ) : (
          folders.map((folder) => (
            <div
              key={folder._id}
              style={{ cursor: "pointer", marginBottom: "8px" }}
              onClick={() => {
                console.log("Clicked folder ID:", folder._id);
                setSelectedFolder(folder);
              }}
            >
              {folder.title}
            </div>
          ))
        )}

        {selectedFolder && (
          <div style={{ marginTop: "20px" }}>
            <h3>Notes in {selectedFolder.title}</h3>

            {notes.length === 0 ? (
              <p>No notes found</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id}
                  style={{ cursor: "pointer", marginBottom: "6px" }}
                  onClick={() => setSelectedNote(note)}
                >
                  {note.title}
                </div>
              ))
            )}

            {selectedNote && (
              <div style={{ marginTop: "20px" }}>
                <h3>{selectedNote.title}</h3>
                <p>{selectedNote.content}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
 
import { useState } from "react";
import FolderList from "./FolderList";
import NoteList from "./NoteList";
import NoteView from "./NoteView";

const Dashboard = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <>
      <h1>Dashboard</h1>

      <FolderList
        selectedFolder={selectedFolder}
        onSelectFolder={(folder) => {
          setSelectedFolder(folder);
          setSelectedNote(null);
        }}
      />

      <NoteList
        selectedFolder={selectedFolder}
        selectedNote = {selectedNote}
        onSelectNote={setSelectedNote}
      />

      <NoteView selectedNote={selectedNote} />
    </>
  );
};

export default Dashboard;
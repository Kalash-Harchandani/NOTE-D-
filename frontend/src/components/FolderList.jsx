import axios from "axios";
import { useState, useEffect } from "react";

const FolderList = ({ selectedFolder,onSelectFolder }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFolderTitle, setNewFolderTitle] = useState("");

  const token = localStorage.getItem("token");

  const handleDeleteFolder = async () => {
    try {
      await axios.delete(
        `http://localhost:6005/api/folders/${selectedFolder._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFolders((prev) =>
        prev.filter((folder) => folder._id != selectedFolder._id),
      );
      onSelectFolder(null);
    } catch (error) {
      console.error("Error Delecting the Folder", error);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderTitle.trim()) return;
    try {
      const res = axios.post(
        "http://localhost:6005/api/folders",
        { title: newFolderTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFolders([...folders, (await res).data]);
      setNewFolderTitle("");
    } catch (error) {
      console.error("Error creating folder", error);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await axios.get("http://localhost:6005/api/folders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFolders(res.data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, [token]);

  if (loading) return <p>Loading folders...</p>;

  return (
    <>
      <h3>Your Folders:</h3>

      {folders.length === 0 ? (
        <p>No folders found</p>
      ) : (
        folders.map((folder) => (
          <div
            key={folder._id}
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() => onSelectFolder(folder)}
          >
            {folder.title}
          </div>
        ))
      )}

      <button onClick={handleCreateFolder}>Create New Folder</button>

      {selectedFolder && (
         <button onClick={handleDeleteFolder}>
          Delete Folder
         </button>
      )
      }

      <input
        type="text"
        placeholder="New Folder Name"
        value={newFolderTitle}
        onChange={(e) => {
          setNewFolderTitle(e.target.value);
        }}
      />
    </>
  );
};

export default FolderList;

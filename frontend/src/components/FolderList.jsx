import axios from "axios";
import { useState, useEffect } from "react";

const FolderList = ({ onSelectFolder }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6005/api/folders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    </>
  );
};

export default FolderList;
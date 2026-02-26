import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const Dashboard = () => {
  const [folders, setFolder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const token = localStorage.getItem("token");
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
  }, []);

  if (loading) return <h2>"Loading....."</h2>;

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Your Folders:</h3>

      {folders.length === 0 ? (
        <p>No folders found</p>
      ) : (
        folders.map((folder) => <div key={folder._id}>{folder.title}</div>)
      )}
    </div>
  );
};

export default Dashboard;

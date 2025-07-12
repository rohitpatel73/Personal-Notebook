import React, { useState } from "react";
import NoteContext from "./noteContext";

const URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:5000';

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch All Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${URL}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      const json = await response.json();
      console.log("Fetched Notes:", json);

      // Ensure it's an array
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("API did not return an array:", json);
        setNotes([]);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      setNotes([]);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${URL}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();

      if (note && typeof note === "object" && note._id) {
        setNotes([...notes, note]); // Use spread instead of concat for better readability
      } else {
        console.error("Failed to add note. Response:", note);
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${URL}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${URL}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      await response.json();

      const newNotes = JSON.parse(JSON.stringify(notes));
      for (let i = 0; i < newNotes.length; i++) {
        if (newNotes[i]._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

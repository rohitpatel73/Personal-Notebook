import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    showAlert('Added Successfully', 'success');
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" name="title" value={note.title} onChange={onChange} className="form-control" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" name="description" value={note.description} onChange={onChange} className="form-control" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" name="tag" value={note.tag} onChange={onChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick}>Add Note</button>
      </form>
    </div>
  );
};
export default AddNote;
// Notes.js
import React, { useState } from 'react';

const NotesWall = () => {
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteInput.trim() === '') return;

        const newNote = {
            text: noteInput,
            timestamp: new Date().toLocaleString(),
        };

        setNotes([newNote, ...notes]);
        setNoteInput('');
    };

    return (
        <div>
            <h2>Notes Wall</h2>
            <form className="note-form" onSubmit={handleSubmit}>
                <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    rows="3"
                    placeholder="Write your note here..."
                ></textarea>
                <button type="submit">Post Note</button>
            </form>
            <div className="notes-wall">
                {notes.map((note, index) => (
                    <div key={index} className="note">
                        <p>{note.text}</p>
                        <div className="timestamp">{note.timestamp}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesWall;
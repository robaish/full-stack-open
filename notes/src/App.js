import React, { useEffect, useState } from 'react';
import noteService from './services/notes'
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('%c effect starts', 'color: red;');
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('%c promise fulfilled', 'color: green;');
        setNotes(initialNotes);
    })
  }, []);
  // At first 'render 0 notes' is printed, updates after data arrives from server
  console.log('render', notes.length, 'notes');

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id); // find note
    const changedNote = { ...note, important: !note.important } // new note object with reversed importance
  
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      // setNotes: new array with note replaced by updated version
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      setNotes(notes.filter(n => n.id !== id));
    });
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App 
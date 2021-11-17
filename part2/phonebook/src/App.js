import React, { useState, useEffect, useRef } from 'react'
import personDB from './services/personDB';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import PersonList from './components/PersonList';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');
  const [ notification, setNotification ] = useState({state: null, message: ''});

  // Get contacts from server
  useEffect(() => {
    personDB
      .getAll()
      .then(initialContacts => {
        console.log('%c promise fulfilled, got contacts:', 'color: green;');
        setPersons(initialContacts);
      })
  },[]);
  console.log('render', persons.length, 'contacts');

  // Add contact
  const addPerson = event => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber, 
    }

    persons.some(p => p.name === newName)
    ? updatePerson(newName, newNumber)
    : personDB
        .create(person)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact));
          setNewName('');
          setNewNumber('');
          setNotification({state: 'success', message: `Added ${returnedContact.name} 👍`});
          setTimeout(() => setNotification({state: null}), 5000);
        })  
  }

  // Update contact
  const updatePerson = (newName, newNumber) => {
    if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
      const person = persons.find(p => p.name === newName);
      const updatedPerson = {...person, number: newNumber}
      
      personDB
        .update(person.id, updatedPerson)
        .then(returnedContact => {
          setPersons(persons.map(p => {
            return p.id !== person.id ? p : returnedContact;
          }));
          setNewName('');
          setNewNumber('');
          setNotification({state: 'success', message: `Updated ${returnedContact.name}'s info 👍`});
          setTimeout(() => setNotification({state: null}), 5000);
        })
        .catch(error => {
          console.log(error, error.message);
          setNotification({state: 'danger', message: `The information of ${newName} has already been deleted.`});
          setTimeout(() => setNotification({state: null}), 5000)
          setPersons(persons.filter(p => p.id !== person.id));
        });
    }
  }

  // Remove contact
  const removePerson = event => {
    event.preventDefault();
    const deleteId = event.target.value;
    const deleteName = persons.find(p => p.id === deleteId).name;
    console.log(deleteId, persons);
    
    if (window.confirm(`Do you really want to remove ${deleteName}?`)) {
    personDB
      .remove(event.target.value)
      .then(() => {
        setPersons(persons.filter(p => p.id !== deleteId));
        setNotification({state: 'success', message: `Deleted ${deleteName}`});
        setTimeout(() => setNotification({state: null}), 5000);
      })
      .catch(error => {
        console.log('Contact has already been removed.', error);
        setNotification({state: 'danger', message: `The information of ${deleteName} has already been deleted.`});
        setTimeout(() => setNotification({state: null}), 5000);
        setPersons(persons.filter(p => p.id !== deleteId));
      })
    }
  }
  
  // Filter phonebook
  const filterByName = event => {
    setFilterName(event.target.value.toLowerCase());
  }
  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().includes(filterName)
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div className="wrapper">
      <Notification notification={notification} />
      <h1>Phonebook</h1>
      <Filter filterByName={filterByName} />
      <h2>Add / update contacts</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>All contacts</h2>
      <PersonList
        filteredPersons={filteredPersons} 
        removePerson={removePerson}
      />
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
      .catch(err => console.log(err))
  }, []);

  const handleChanged = e => setNewPerson({ ...newPerson, [e.target.name]: e.target.value });

  const addName = e => {
    e.preventDefault();
    const nameExisted = persons.filter(person => person.name.toLowerCase() === newPerson.name.trim().toLowerCase())

    if (nameExisted.length > 0) {
      const shouldUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`);

      shouldUpdate &&
        personService.updatePerson(nameExisted[0].id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));

            setSuccessMsg(`Updated ${returnedPerson.name}`);
            setTimeout(() => setSuccessMsg(null), 5000);
          })
          .catch(err => {
            setSuccessMsg(`Information of ${newPerson.name} has already been removed from server`);
            setTimeout(() => setSuccessMsg(null), 5000);
          })

    } else {
      personService.create(newPerson)
        .then(data => {
          setPersons(persons.concat(data));
          setNewPerson({ name: '', number: '' });

          setSuccessMsg(`Added ${data.name}`);
          setTimeout(() => setSuccessMsg(null), 5000);
        })
        .catch(err => { console.error(err) })
    }
  }

  const handleFilter = e => setFilter(e.target.value.toLowerCase());

  const deletePerson = person => {
    const { id, name } = person;
    const shouldDelete = window.confirm(`Delete ${name}?`);

    shouldDelete &&
      personService.deletePerson(id)
        .then(() => {
          const updatedPersons = persons.filter(p => p.id !== id);
          setPersons(updatedPersons);
        })
        .catch(err => console.error(err))
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMsg} />
      <Filter handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newPerson={newPerson}
        handleChanged={handleChanged}
      />

      <h2>Numbers</h2>
      <Persons
        filterPersons={filterPersons}
        handleDelete={deletePerson}
      />
    </div>
  )
}

export default App
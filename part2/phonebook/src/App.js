import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Filter = (props) => <div> filter shown with <input value={props.filterValue} onChange={props.handleNewFilter} /> </div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [status, setStatus] = useState(true)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const handleNewFilter = (event) => setFilterValue(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addNumber = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (persons.findIndex(person => person.name === newName) === -1) {
      phonebookService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          const msg = `Added ${newName}`
          setStatus(true)
          setErrorMessage(msg)
          setTimeout(() => setErrorMessage(null), 5000)
        })
        .catch(error => {
          setStatus(false)
          setErrorMessage(error.response.data)
          setTimeout(() => setErrorMessage(null), 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const sid = persons.filter(person => person.name === newName).map(person => person.id).toString()
        const id = sid
        phonebookService
          .update(id, contactObject)
          .then(returnedPerson => {
            const newPersons = persons.filter(person => person.id !== id).concat(returnedPerson)
            setPersons(newPersons)
            const msg = `Changed ${newName}'s number`
            setStatus(true)
            setErrorMessage(msg)
            setTimeout(() => setErrorMessage(null), 5000)
          })
          .catch(error => {
          setStatus(false)
          setErrorMessage(error.response.data)
          setTimeout(() => setErrorMessage(null), 5000)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
      const msg = `Deleted ${name}`
      setStatus(true)
      setErrorMessage(msg)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} status={status} />
      <Filter filterValue={filterValue} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addNumber={addNumber} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleClick={handleDelete} />
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Filter = (props) => <div> filter shown with <input value={props.filterValue} onChange={props.handleNewFilter} /> </div>

const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        <div><button type="submit" onClick={props.addNumber}>add</button></div>
      </form>
    </div>
  )
}

const Persons = (props) => <div>{props.personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

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
        })
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addNumber={addNumber} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
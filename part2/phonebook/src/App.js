import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')

  const handleNumberChange = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    console.log(newName)
    const numberObject = {
      name: newName
    }
    if(persons.findIndex( person => person.name === newName) === -1) {
      setPersons(persons.concat(numberObject))
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addNumber}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <div key={person.name}>{person.name}</div>)}</div>
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './components/SearchForm'
import CountriesToShow from './components/CountriesToShow'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()))

  const handleFilter = (event) => setFilterValue(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        <SearchForm filterValue={filterValue} handleFilter={handleFilter} />
      </div>
      <div>
        <CountriesToShow filterValue={filterValue} filteredCountries={filteredCountries} setFilter={setFilterValue} />
      </div>
    </div>
  )
}

export default App;

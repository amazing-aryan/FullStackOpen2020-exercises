import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const SearchForm = (props) => {
  return (<div>
    <form>
      <div>find countries <input value={props.filterValue} onChange={props.handleFilter} /></div>
    </form>
  </div>)
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const CountriesToShow = ({ filterValue, filteredCountries, setFilter }) => {
  if (filterValue === "")
    return (<div>Start typing to find about a country ...</div>)
  else if (filteredCountries.length === 0)
    return (<div>No country found</div>)
  else if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length > 1) {
    return (<div><Countries countriesToShow={filteredCountries} setFilter={setFilter} /></div>)
  } else {
    return (<div><CountryDetails filteredCountry={filteredCountries} /></div>)
  }
}

const Countries = ({ countriesToShow, setFilter }) => {
  return (
    <div>
      {countriesToShow.map
        (country => {
          return (<div key={country.name}>
            {country.name}
            <Button handleClick={() => setFilter(country.name)} text={'show'} />
          </div>
          )
        })
      }
    </div>)
}

const CountryDetails = ({ filteredCountry }) => {
  const name = filteredCountry.map(country => country.name)
  const capital = filteredCountry.map(country => country.capital)
  const population = filteredCountry.map(country => country.population)
  const languages = filteredCountry.map(country => country.languages)
  const flag = filteredCountry.map(country => country.flag)
  return (
    <div>
      <h1>{name}</h1>
      <div>Capital : {capital}</div>
      <div>Population : {population}</div>
      <div>
        <h2>Languages</h2>
        <Languages languages={languages} />
      </div>
      <div>
        <img height={120} width={180} src={flag} alt={name} />
      </div>
    </div>
  )
}

const Languages = ({ languages }) => {
  const languagesToShow = languages.length === 0 ? [] : languages[0]
  return (
    <div>
      {languagesToShow.map(language => <li key={language.name}>{language.name}</li>)}
    </div>
  )
}

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

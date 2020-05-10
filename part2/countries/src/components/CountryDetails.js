import React from 'react'
import Languages from './Languages'

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

export default CountryDetails;
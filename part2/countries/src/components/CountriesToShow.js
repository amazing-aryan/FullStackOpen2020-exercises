import React from 'react'
import Countries from './Countries'
import CountryDetails from './CountryDetails'

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

export default CountriesToShow;

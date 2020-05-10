import React from 'react'
import Button from './Button'

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

export default Countries;
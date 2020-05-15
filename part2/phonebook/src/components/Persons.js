import React from 'react'

const Persons = (props) => <div>{props.personsToShow.map(person => {
    return (
        <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => props.handleClick(person.id, person.name)}>Delete</button>
        </div>
    )
}
)}
</div>

export default Persons;
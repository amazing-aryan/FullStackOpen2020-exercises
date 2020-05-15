import React from 'react'

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

export default PersonForm;
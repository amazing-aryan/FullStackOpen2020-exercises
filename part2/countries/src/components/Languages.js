import React from 'react'

const Languages = ({ languages }) => {
    const languagesToShow = languages.length === 0 ? [] : languages[0]
    return (
        <div>
            {languagesToShow.map(language => <li key={language.name}>{language.name}</li>)}
        </div>
    )
}


export default Languages;
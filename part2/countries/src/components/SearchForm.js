import React from 'react'

const SearchForm = (props) => {
    return (<div>
        <form>
            <div>find countries <input value={props.filterValue} onChange={props.handleFilter} /></div>
        </form>
    </div>)
}

export default SearchForm;
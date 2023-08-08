import React, { useState } from 'react'
import './Searche.css'

const SearchResult = ({result}) => {

  return (
    <div className='e--search' onClick={e => alert(`you clicked on ${result}`)}>
 <p>{result.title}</p>
    </div>
  )
}

export default SearchResult
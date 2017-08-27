// For rendinering a search box to allow the use to type a search term to find books.

import React from 'react'
import { Link } from 'react-router-dom'

 const BookSearch = ({ onSearch, query }) =>
  <div>
    <h2>Please start typing a term to search the book database:</h2>
    <form className="book-search-form">
      <div className="search-books-bar">
        <input
          value={query}
          autoFocus
          className='search-term'
          type="text"
          placeholder="Seach terms"
          onChange={(event) => onSearch(event.target.value)}
        />
        <Link className="close-search" to="/">
        </Link>
      </div>
    </form>
  </div>

export default BookSearch
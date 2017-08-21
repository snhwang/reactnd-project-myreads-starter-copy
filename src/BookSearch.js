// To render a search box to allow the use to type a search term to find books.

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export const BookSearch = ({ onSearch, query }) =>
  <div>
    <h2>Search Component</h2>
    <form className="book-search-form">
      <div className="search-details">
        <input
          value={query}
          autoFocus
          className='search-term'
          type="text"
          placeholder="Seach terms"
          onChange={(event) => onSearch(event.target.value)}
        />
        <Link className="close-book-search" to="/">Close</Link>
      </div>
    </form>
  </div>

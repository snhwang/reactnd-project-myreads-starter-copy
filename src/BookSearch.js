/* Adapted from ListContact.js from the Udacity contacts tutorial  */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import SingleBook from './SingleBook'

class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }
  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
  }

  clearQuery = (query) => {
    this.setState({
      query: ''
    })
  }

  searchBooks = (query) => {
    if (query !== '') {
      this.updateQuery(query)
      BooksAPI.search(query, 50).then((books) =>
        this.setState({
          books: books,
          query: query
        })
      )
    } else {
      this.setState({
        books:[],
        query: ''
      })
    }  
  }

  render() {
    const { books, query } = this.state
    const { onMoveBook } =this.props

    return(
      <div>
        <form className="book-search-form">
          <div className="search-details">
            <input
              className='search-term'
              type="text"
              placeholder="Seach terms"
              value={query}
              autoFocus
              onChange={(event) => this.searchBooks(event.target.value)}
            />
            <Link className="close-book-search" to="/">Close</Link>
          </div>
        </form>
        <div className="search-books-results">
          {books.length}
          <ol className="books-grid">
            {books.map((book) => 
              // Return book component with book's details
              // <li>{book.title}</li>
                <SingleBook
                  onMoveBook={onMoveBook} 
                  book={book}
                />
            )}

          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SingleBook from './SingleBook'
import BookSearch from './BookSearch'
import './App.css'

class BookApp extends Component {
  state = {
    books: [],
    searchedBooks: [],
    query: ''
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  moveBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  searchBooks = (query) => {
    this.setState({
      searchedBooks:[],
      query: query
    })
    BooksAPI.search(query, 50).then((searched) =>
      this.setState({
        searchedBooks: searched,
        query: query
      })
    )
  }

  render() {
    const currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
    const finishedReading = this.state.books.filter((book) => book.shelf === 'read')
    const otherShelves = this.state.books.filter((book) =>
      book.shelf !== 'currentlyReading' && book.shelf !== 'wantToRead' && book.shelf !== 'read')

    return (
      <div className="BookApp">
        <Route exact path="/" render={() => (
// Main page. Shows the 3 shelves.
          <div className="bookshelves">
            <div className="list-books">
              <h2>Currently Reading</h2>
              <div className="books-grid">
                {currentlyReading.map((book) => 
                  <SingleBook
                    onMoveBook={this.moveBook} 
                    book={book}
                    key={book.id}
                  />
                )}
              </div>
              <h2>Want to Read</h2>
              <div className="books-grid">
                {wantToRead.map((book) => 
                  <SingleBook
                    onMoveBook={this.moveBook} 
                    book={book}
                    key={book.id}
                  />
                )}
              </div>
              <h2>Finished Reading</h2>
              <div className="books-grid">
                {finishedReading.map((book) => 
                  <SingleBook
                    onMoveBook={this.moveBook} 
                    book={book}
                    key={book.id}
                  />
                )}
              </div>
            </div>
            <Link
              to='/search'
              className='book-search'
            >Search and Add Books</Link>
          </div>
        )}/>
        <Route path="/search" render={({ history }) => (
// The search page.
// The list of books is rendered as the user types a term into the search box.
// Books are divided into 4 groups: not on shelf and one group for each of the searched books already on a shelf
          <div className="search-display">
            <BookSearch onMoveBook={this.moveBook} onSearch={this.searchBooks} query={this.state.query}/>
            <h2>Searched Books: not on Shelves</h2>
            <div className="books-grid">
              {this.state.searchedBooks.filter(b =>
                this.state.books.filter(book => b.id === book.id).length < 1).map(matched =>
                  <SingleBook
                    onMoveBook={this.moveBook} 
                    book={matched}
                    key={matched.id}
                  />
                )
              }
            </div>
            <h2>Searched Books: Want to Read</h2>
            <div className="books-grid">
              {this.state.searchedBooks.map(b =>
                wantToRead.filter(book => b.id === book.id).map(matched =>
                  <SingleBook
                    onMoveBook={this.moveBook} 
                    book={matched}
                    key={matched.id}
                  />
                )
              )}
            </div>
            <h2>Searched Books: Currently Reading</h2>
            <div className="books-grid">
              {this.state.searchedBooks.map(b =>
                currentlyReading.filter(book => b.id === book.id).map(matched =>
                  <SingleBook
                    onMoveBook={this.moveBook} 
                    book={matched}
                    key={matched.id}
                  />
                )
              )}
            </div>         
            <h2>Searched Books: Already Read</h2>
            <div className="books-grid">
              {this.state.searchedBooks.map(b =>
                finishedReading.filter(book => b.id === book.id).map(matched =>
                  <SingleBook
                    onMoveBook={this.moveBook} 
                    book={matched}
                    key={matched.id}
                  />
                )
              )} 
            </div>         
          </div>
        )}/>
      </div>
    )
  }
}

export default BookApp;

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SingleBook from './SingleBook'
import BookSearch from './BookSearch'
import './App.css'

class BookApp extends Component {
  state = {
    books: []
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

  render() {
    const currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
    const finishedReading = this.state.books.filter((book) => book.shelf === 'read')
    const otherShelves = this.state.books.filter((book) =>
      book.shelf !== 'currentlyReading' && book.shelf !== 'wantToRead' && book.shelf !== 'read')
    return (
      <div className="BookApp">
        <Route exact path="/" render={() => (
          <div className="bookshelves">
            <div className="list-books">
              <h2>Currently Reading</h2>
              {currentlyReading.map((book) => 
                <SingleBook
                  onMoveBook={this.moveBook} 
                  key={book.id}
                  book={book}
                />
              )}
              <h2>Want to Read</h2>
              {wantToRead.map((book) => 
                <SingleBook
                  onMoveBook={this.moveBook} 
                  key={book.id}
                  book={book}
                />
              )}
              <h2>Finished Reading</h2>
              {finishedReading.map((book) => 
                <SingleBook
                  onMoveBook={this.moveBook} 
                  key={book.id}
                  book={book}
                />
              )}
              <h2>Other</h2>
              {otherShelves.map((book) => 
                <SingleBook
                  onMoveBook={this.moveBook} 
                  key={book.id}
                  book={book}
                />
              )}
            </div>
            <Link
              to='/search'
              className='book-search'
            >Search and Add Books</Link>
          </div>
        )}/>
        <Route path="/search" render={({ history }) => (
          <BookSearch onMoveBook={this.moveBook}/>
        )}/>
      </div>
    )
  }
}

export default BookApp;

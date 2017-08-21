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
    BooksAPI.update(book, newShelf).then(b => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
  }

  searchBooks = (query) => {
    this.setState({
      searchedBooks:[],
      query: query
    })
// Changed to 50 to 20 as suggested by the Udacity reviewer since the search evidently maxes out at 20
    BooksAPI.search(query, 20).then((searched) =>
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
    const searchedNotOnShelves = this.state.searchedBooks.filter(b =>
      this.state.books.filter(book => b.id === book.id).length < 1)
// I initial defined these other sub lists of the searched books but decided to define
// a more generalized method to render the intersection of 2 lists implemented as BookListIntersection
/* 
    const searchedWantToRead = this.state.searchedBooks.filter(b =>
      wantToRead.filter(book => b.id === book.id).length > 0)
    const searchedCurrentlyReading = this.state.searchedBooks.filter(b =>
      currentlyReading.filter(book => b.id === book.id).length > 0)
    const searchedFinishedReading = this.state.searchedBooks.filter(b =>
      finishedReading.filter(book => b.id === book.id).length > 0)
    const intersectionList = ({ bookList1, bookList2 }) =>
      bookList1.filter(b =>
        bookList2.filter(book => b.id === book.id).length > 0)
*/

// Defined const BookList as suggested by the Udacity reviewer
    const BookList = ({ books, onMove }) => 
      <div className="books-grid">
        {books.map(book => 
          <SingleBook
            onMoveBook={onMove} 
            book={book}
            shelf={book.shelf}
          />
        )}
      </div>

// Resorted to this since books which were found on searching were sometimes already assigned a shelf even though
// they had not been placed on a shelf
    const BookListNoShelf = ({ books, onMove }) => 
      <div className="books-grid">
        {books.map(book => 
          <SingleBook
            onMoveBook={onMove} 
            book={book}
            shelf={"none"}
          />
        )}
      </div>

// Renders the list of books that result from the intersection of 2 other lists
  const BookListIntersection = ({ bookList1, bookList2, onMove }) => 
      <div className="books-grid">
        {bookList1.filter(b => bookList2.filter(book => b.id === book.id).length > 0).map(book => 
          <SingleBook
            onMoveBook={onMove} 
            book={book}
            shelf={book.shelf}
          />
        )}
      </div>

    return (
      <div className="BookApp">
        <Route exact path="/" render={() => (
// Main page. Shows the 3 shelves.
          <div className="bookshelves">
            <div className="list-books">
              <h2>Currently Reading</h2>
              <BookList books={currentlyReading} onMove={this.moveBook}/>
              <h2>Want to Read</h2>
              <BookList books={wantToRead} onMove={this.moveBook}/>
              <h2>Finished Reading</h2>
              <BookList books={finishedReading} onMove={this.moveBook}/>
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
            <BookSearch onSearch={this.searchBooks} query={this.state.query}/>
            <h2>Searched Books: not on Shelves</h2>
            <BookListNoShelf books={searchedNotOnShelves} onMove={this.moveBook}/>
            <h2>Searched Books: Currently Reading</h2>
            <BookListIntersection
              bookList1={this.state.searchedBooks} bookList2={currentlyReading} onMove={this.moveBook}/>
            <h2>Searched Books: Want to Read</h2>
            <BookListIntersection
              bookList1={this.state.searchedBooks} bookList2={wantToRead} onMove={this.moveBook}/>
             <h2>Searched Books: Finished Reading</h2>
            <BookListIntersection
              bookList1={this.state.searchedBooks} bookList2={finishedReading} onMove={this.moveBook}/>
           </div>
        )}/>
      </div>
    )
  }
}

export default BookApp;

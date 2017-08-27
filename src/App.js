import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SingleBook from './SingleBook'
import BookSearch from './BookSearch'
import BookList from './BookList'
import BookListNoShelf from './BookListNoShelf'
import BookListIntersection from './BookListIntersection'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
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

    return (
      <div className="BookApp">
        <Route exact path="/" render={() => (
// Main page. Shows the 3 shelves.
            <div>
              <MainPage books={this.state.books} onMove={this.moveBook}/>
              <Link to='/search' className='book-search'>
                Search and Add Books
              </Link>
            </div>
          )}/>
        <Route path="/search" render={({ history }) => (
// The search page.
// The list of books is rendered as the user types a term into the search box.
// Books are divided into 4 groups: not on shelf and one group for each of the searched books already on a shelf
            <div>
              <BookSearch onSearch={this.searchBooks} query={this.state.query}/>
              <SearchPage
                books={this.state.books}
                searchedBooks={this.state.searchedBooks}
                onMove={this.moveBook}
              />
            </div>
          )}/>
      </div>
    )
  }
}

export default BookApp;

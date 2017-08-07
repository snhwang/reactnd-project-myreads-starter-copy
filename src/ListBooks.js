import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      value: 'Currently Reading',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(book, event) {
    this.setState({
      value: event.target.value,
    })
    this.props.onMoveBook(book, event.target.value)
    
  }

  handleSubmit(event) {
    alert('Your choice is: ' + this.state.titleToChange)
    event.preventDefault();
  }

  render() {
    const { books } = this.state
    return (
      <ol className='book-list'>
        <h2>hey</h2>
        {this.props.books.map((book) => (
          <li key={book.title} className='book-list-item'>
            <div className='book-cover' style={{
                width: 128, height: 192, 
                backgroundImage: `url(${book.coverURL})`
            }}/>

            <div className="book-shelf-changer">
              <form>
                <label>
                  Set new shelf to:
                  <select value={"none"} onChange={this.handleChange.bind(this, book)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Want to Read">Want to Read</option>
                    <option value="Read">Finished Reading</option>
                  </select>
                </label>
              </form>
            </div>

            <div className='book-details'>
              <p>{book.title}</p>
              <p>{book.author}</p>
            </div>
          </li>
        ))}
      </ol>
      )
    }
  }

export default ListBooks
//For rendinering a single book with a dropdown menu to place the book in a shelf

import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class SingleBook extends Component {
  static propTypes = {
    onMoveBook: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      book: this.props.book
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(book, event) {
    this.props.onMoveBook(book, event.target.value)
  }

  render() {
    const { book } = this.state

    // From the Slack forum to check to see if the cover thumbnail is defined
    let coverURL = (book.imageLinks && book.imageLinks.thumbnail) ?
      book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
    
    return (
      <ol className="book">
        <div className="book-with-shelf-mover">
          <div className='book-cover' style={{
              width: 128, height: 192, 
              backgroundImage: `url(${coverURL})`
          }}/>
          <div className="book-shelf-mover">
            <select value={"none"} onChange={this.handleChange.bind(this, book)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Finished Reading</option>
              <option value="remove">Remove</option>
            </select>
          </div>
        </div>
        <p className="book-title">{book.title}</p>
        <p className="book-authors">{book.authors}</p>
      </ol>
    )
  }
}

export default SingleBook
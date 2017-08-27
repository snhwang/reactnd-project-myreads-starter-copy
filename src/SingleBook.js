//For rendinering a single book with a dropdown menu to place the book on a shelf

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
  }
// Changed to a fat arrow function and removed the explicit bind as suggested by the Udacity reviewer.
  handleChange = (event) => {
    this.props.onMoveBook(this.state.book, event.target.value)
  }

  render() {
    const { book } = this.state

    // From the Slack forum to check to see if the cover thumbnail is defined
    let coverURL = (book.imageLinks && book.imageLinks.thumbnail) ?
      book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
  
    // The initial value of the drop down menu is set to this.props.shelf instead of book.shelf
    // because the books that were found on searching were often already assigned a shelf even
    // though they had not been yet placed on a shelf
    return (
      <ol className="book">
        <div className="book-with-shelf-mover">
          <div className='book-cover' style={{
              backgroundImage: `url(${coverURL})`
          }}/>
          <div className="book-shelf-mover">
            <select value={this.props.shelf} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Finished Reading</option>
              <option value="remove">Remove</option>
            </select>
          </div>
        </div>
        <p className="book-title">{book.title ? book.title: ''}</p>
        <p className="book-authors">{book.authors ? book.authors.join(', '): ''}</p>
      </ol>
    )
  }
}

export default SingleBook
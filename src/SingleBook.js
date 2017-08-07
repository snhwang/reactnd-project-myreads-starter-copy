import React, { Component } from 'react'

class SingleBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Currently Reading',
      book: this.props.book
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(book, event) {
    this.setState({
      value: event.target.value,
    })
    this.props.onMoveBook(book, event.target.value)
  }

  render() {
    const { book } = this.state
    return (
      <ol className="book">
        <div className="book-with-shelf-mover">
          <div className='book-cover' style={{
              width: 128, height: 192, 
              backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}/>
          <div className="book-shelf-mover">
            <select value={"none"} onChange={this.handleChange.bind(this, book)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Finished Reading</option>
            </select>
          </div>
        </div>
        <p className="book-title">{book.title}</p>
        <p className="book-authors">{book.authors}</p>
        <p className="book-id">{book.id}</p>
      </ol>
    )
  }
}

export default SingleBook;
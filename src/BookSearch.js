// To render a search box to allow the use to type a search term to find books.

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookSearch extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  render() {
    return(
      <div>
        <form className="book-search-form">
          <div className="search-details">
            <input
              className='search-term'
              type="text"
              placeholder="Seach terms"
              value={this.props.query}
              autoFocus
              onChange={(event) => this.props.onSearch(event.target.value)}
            />
            <Link className="close-book-search" to="/">Close</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default BookSearch

import React from 'react'
import SingleBook from './SingleBook'

const BookList = ({ shelfTitle, shelf, books, onMove }) => 
    <div>
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="books-grid">
            {books.filter((book) => book.shelf === shelf).map(book => 
                <SingleBook
                    key={book.id}
                    onMoveBook={onMove} 
                    book={book}
                    shelf={book.shelf}
                />
            )}
        </div>
    </div>

export default BookList

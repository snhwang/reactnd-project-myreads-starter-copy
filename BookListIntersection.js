import React from 'react'
import BookList from './BookList'

// Renders the list of books that result from the intersection of 2 other lists
const BookListIntersection = ({ shelfTitle, shelf, books, searchedBooks, onMove }) =>
    <div>
        {searchedBooks ?
            <BookList
                shelfTitle={shelfTitle}
                shelf={shelf}
                books={books.filter(b => searchedBooks.filter(book => b.id === book.id).length > 0)}
                onMove={onMove} 
            />
            : ''}
    </div>

export default BookListIntersection
// List the searched books which are not already on a shelf
import React from 'react'
import SingleBook from './SingleBook'

// Resorted to specifying shelf as "none" since books which were found on searching were sometimes already
// assigned a shelf even though they had not been placed on a shelf
const BookListNoShelf = ({ books, searchedBooks, onMove }) => 
    <div>
        {searchedBooks ?
            <div>
                <h2>Searched Books: not on Shelves</h2>
                <div className="books-grid">
                    {searchedBooks.filter(b => books.filter(book => b.id === book.id).length < 1).map(book => 
                        <SingleBook
                            key={book.id}
                            onMoveBook={onMove} 
                            book={book}
                            shelf={"none"}
                        />    
                    )}
                </div>
            </div>
            : ''
        }
    </div>

export default BookListNoShelf
// Search page which shows the box for entering a search term and the list of books organized in 4 groups:
// 1) Search books not already on a shelf, 2) Searched books currently being read, 3) Searched books wanted to
// be read, and 3) Searched books which are already read
import React from 'react'
import BookSearch from './BookSearch'
import BookListNoShelf from './BookListNoShelf'
import BookListIntersection from './BookListIntersection'

const SearchPage = ({ books, searchedBooks, onMove }) =>
    <div className="search-display">
        <BookListNoShelf books={books} searchedBooks={searchedBooks} onMove={onMove}/>
        <BookListIntersection
            shelfTitle={"Searched Books: Currently Reading"}
            shelf={"currentlyReading"}
            books={books}
            searchedBooks={searchedBooks}
            onMove={onMove}/>
        <BookListIntersection
            shelfTitle={"Searched Books: Want to Read"}
            shelf={"wantToRead"}
            books={books}
            searchedBooks={searchedBooks}
            onMove={onMove}/>
        <BookListIntersection
            shelfTitle={"Searched Books: Finished Reading"}
            shelf={"read"}
            books={books}
            searchedBooks={searchedBooks}
            onMove={onMove}/>
    </div>

export default SearchPage
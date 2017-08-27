// Main page. Shows the 3 shelves.
import React from 'react'
import BookList from './BookList'

const MainPage = ({ books, onMove }) =>
    <div className="list-books">
        <BookList
            shelfTitle={"Currently Reading"}
            shelf={"currentlyReading"}
            books={books}
            onMove={onMove}
        />
        <BookList
            shelfTitle={"Want To Read"}
            shelf={"wantToRead"}
            books={books}
            onMove={onMove}
        />
        <BookList
            shelfTitle={"Finished Reading"}
            shelf={"read"}
            books={books}
            onMove={onMove}
        />
    </div>

export default MainPage
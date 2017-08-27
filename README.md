8/27/2017

Scott Hwang

snhwang@alum.mit.edu

This is my submission for the first project for Udacity's React nanodegree course. The program program provides a means of keeping an inventory of books on 3 "shelves": "Currently Reading," "Want to Read," and "Finished Reading." The user can also search a data base to  add more books to the shelves. 

# Instructions
On the main page, the books on the three shelves are displayed (cover pic, title, and author). A drop down menu with each book enables the user to move the book to a shelf or to remove it from the list.

The user can click on a link (the symbol "+" in the upper right corner) to jump to a simple search page with a single input box. 

Typing a search term searches the book database and immediately displays a list. The list is divided into 4 groups: "Search Books: not on Shelves," "SearchedBooks: Want To Read," "Searched Books: Currently Reading," and "Searched Books: Already Read." Clicking on the "Close" link returns the user back to the first main page. The same drop down menu is shown with each book. The user can assign the searched books into a shelf and and lists are automatically upda8ted. The actual search terms are limited and can be found in the file SEARCH_TERMS.md. This was provided by the starter template.

Clicking on the back-arrow at the right of the search bar returns the user back to the main page showing the shelved books.

# Installation
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). To run this program, first install Node.js, which also installs npm (https://nodejs.org/en/download/). '

After downloading reactnd-project-myreads-starter-copy folder, enter the following 2 commands from within the folder on the command line:

npm install

npm start

The program should then be running on your browser.

# Changes and Notes

## 8/27/2017
The changes recommended by the Udacity reviewer were implemented. The code was separated into more modules. I could not reproduce the error message that was found in the second review so am not sure that it is fixed. The error indicated "TypeError: this.state.searchedBooks.filter is not a function." This occurred in Apps.js when changing between results. Since the searched books are now not filtered until the user is at the Search Page, perhaps this will not happen now. I also added conditional statements to test for the absence of searched books.

# Code / Files
The code was implemented by building upon a template provided by Udacity. The original template just include a static example of the CSS and HTML markup.  The code was initially also derived from the code for the "contacts" tutorial from the Udacity course, so there are likely similarities. Input from other students on the Slack forum were also helpful.

## App.js
Root of the application. 

## App.css
Provided styles for the application. I made minimal changes to specify the dimensions of the displayed book covers. I also minimally changed the location of the "+" sign used for the link to the "search and add" page.
## App.test.js
Provided in the original template for testing purposes. I did not have time to use this. 
## BooksAPI.js
Provided with the starter template. Provides methods for accessing and searching the book database. I did not modify this file. I used the following:
### getAll()
Returns a promise which resolves to a JSON object containing a collection of book objects. This collection represents the books currently in the bookshelves.
### update(book, shelf)
* book: An `<Object>` which contains at least an `id` attribute
* shelf: A `<String>` which contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a promise which resolves to a JSON object containing the response data of the POST request
### search(query, maxResults)
* query: A `<String>` search term
* maxResults: An `<Integer>` indicating the maximum number of results. However, due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only.

## BookList.js
Renders a list of books in a specified book shelf.

## BookListIntersection.js
Renders a list of books that were found by a search and are present and are already placed in a specified shelf.

## BookListNoShelf.js
Redners a list of books without specifying a shelf.

## BookSearch.js
Renders a search box to allow the user to type a search term to find books.

## Index.js
Provided by the original template for DOM rendering. I did not modifty this file.

## MainPage.js
Provides the main page with the 3 books shelfs: 1) currently reading 2) want to read 3) finished reading

## SearchPage.js
Renders 4 lists of books found on search: 1) search books not already on a shelf 2) searched books currently being read 3) searched books that I want to read 4) search books that have already been read

## SingleBooks.js
Renders a single book with a dropdown menu to place the book on a shelf

## package.json
npm package manager file.

# Search Terms
The software currently only has a limited list of search terms, which are listed in SEARCH_TERMS.md. This was provided with the starter template:

'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'

Note that a search will be performed with after a search terms is only partially typed.

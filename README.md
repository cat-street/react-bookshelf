# React Bookshelf
**A sample frontend project on React-TypeScript-Redux**

![React Bookshelf](./bookshelf_gh.png)

A frontend for a sample electronic library application with pagination, search, sorting and authentication.

* Current live version at [https://zen-austin-25d292.netlify.app](https://zen-austin-25d292.netlify.app)

---
## Features

* Books are loaded from a mock backend server (JSON data file is used) into a global state (database access emulation)
* If there are more than 10 books to load, a pagination at the bottom of the page appears
* Users can do a basic library search (title/author/description fields are used)
* Users can sort the library by title/author/rating
* The main library page features a basic info of every book and a rating, authenticated users can vote here
* A click on a 'Read more' link leads to a single book page view
* There is a detailed info on a single book page, as well as comments section
* Authenticated users can vote, leave comments or edit fields of the book they added ('test-user' is binded to some books from the mock database)
* Users can log in/log out by the link of the top of the page (test id: *test-user*, test password: *12345*). Errors are shown, if the username or the password is incorrect.
* Authentication is checked by a token created in a browser's local storage during the successful sign in.
* Edits, ratings and comments are saved during the session unless the page is refreshed.

## Updates

* 29.05.2021 - total Redux store refactor, now it's on hooks with Toolkit

## Technology

* React (functional components, hooks, router)
* Redux (hooks, toolkit)
* TypeScript
* JavaScript (ES6)
* Bootstrap (bootstrap-react)
* Mirage.js backend emulation
* Airbnb-typescript ESLint codestyle

## To Do
* Ascending/Descending sorting by multiple clicks
* A separate '/search' route
* A '/category' route
* Forms validation
* Ability to delete comments
* Ability to add new books
* Refactoring
* Design improvements

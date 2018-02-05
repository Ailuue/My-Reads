import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import * as _ from 'lodash';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  };

  //Allows app to load before making api calls
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  //Passed down function for making an api call to change shelf
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      BooksAPI.getAll().then(books => this.setState({ books }))
    );
  };

  //Passed down function for making a search api call
  search = query => {
    if (query !== '') {
      BooksAPI.search(query).then(searchBooks =>
        this.setState({ searchBooks })
      );
    }
  };

  getShelf = bookId => {
    return BooksAPI.get(bookId).then(book => book.shelf);
  };

  render() {
    const bookSearch = _.debounce(query => {
      this.search(query);
    }, 500);

    console.log('Hi');
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookShelf
              booksList={this.state.books}
              changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBooks
              booksList={this.state.searchBooks}
              search={bookSearch}
              changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
              getShelf={bookId => this.getShelf(bookId)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

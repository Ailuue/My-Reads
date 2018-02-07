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
    this.handleChange();
  }

  //Passed down function for making an api call to change shelf
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.handleChange());
  };

  //Passed down function for making a search api call
  //Thanks to Pablo on Slack for helping me with this function
  search = query => {
    if (query !== '') {
      BooksAPI.search(query).then(booksList => {
        if (booksList.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({
            searchBooks: booksList.map(item => {
              let book = this.state.books.find(book => book.id === item.id);
              return book || item;
            })
          });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };

  getShelf = bookId => {
    return BooksAPI.get(bookId).then(book => book.shelf);
  };

  handleChange() {
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
      .then(() => this.search(this.search1.state.query));
  }

  render() {
    const bookSearch = _.debounce(query => {
      this.search(query);
    }, 500);

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
              ref={search1 => {
                this.search1 = search1;
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

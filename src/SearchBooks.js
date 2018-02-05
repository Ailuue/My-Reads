import React from 'react';
import { Link } from 'react-router-dom';

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchBooks: []
    };
  }

  //Updates state after search term change && handles api call to search
  updateQuery = query => {
    this.setState({ query });
    this.props.search(query);
  };

  //Handles the api call after shelf change
  handleChange = (event, book) => {
    this.props.changeShelf(book, event.target.value);
  };

  render() {
    const { query } = this.state;
    const { booksList, search } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" on>
            Go Back
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksList.length <= 0 ? (
              <div>
                <h1>No Results Found</h1>
              </div>
            ) : (
              booksList.map(book => {
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        {book.imageLinks ? (
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`
                            }}
                          />
                        ) : (
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage: `url(${'http://via.placeholder.com/128x193?text=No%20Cover'})`
                            }}
                          />
                        )}
                        <div className="book-shelf-changer">
                          {console.log(book)}
                          <select
                            value={book.shelf ? book.shelf : 'none'}
                            onChange={event => this.handleChange(event, book)}
                          >
                            <option value="none" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">
                        <h4>{book.title}</h4>
                        {book.authors
                          ? book.authors.map(name => {
                              return <p key={name}>{name}</p>;
                            })
                          : null}
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class BookShelf extends React.Component {
  render() {
    const { booksList, changeShelf } = this.props;

    //Handles the api call after shelf change
    let handleChange = (event, book) => {
      changeShelf(book, event.target.value);
    };

    //DRY function for displaying books
    let generateBooks = shelf => {
      return booksList.filter(book => book.shelf === shelf).map(book => {
        return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 192,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    value={shelf}
                    onChange={event => handleChange(event, book)}
                  >
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">
                <h4>{book.title}</h4>
                {book.authors.map(name => {
                  return <p key={name}>{name}</p>;
                })}
              </div>
            </div>
          </li>
        );
      });
    };

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {generateBooks('currentlyReading')}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{generateBooks('wantToRead')}</ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{generateBooks('read')}</ol>
              </div>
            </div>
          </div>
        </div>

        <Link to="/search" className="open-search">
          Add a book
        </Link>
      </div>
    );
  }
}

export default BookShelf;

// <li>
//                     <div className="book">
//                       <div className="book-top">
//                         <div
//                           className="book-cover"
//                           style={{
//                             width: 128,
//                             height: 192,
//                             backgroundImage:
//                               'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")'
//                           }}
//                         />
//                         <div className="book-shelf-changer">
//                           <select>
//                             <option value="none" disabled>
//                               Move to...
//                             </option>
//                             <option value="currentlyReading">
//                               Currently Reading
//                             </option>
//                             <option value="wantToRead">Want to Read</option>
//                             <option value="read">Read</option>
//                             <option value="none">None</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="book-title">
//                         The Adventures of Tom Sawyer
//                       </div>
//                       <div className="book-authors">Mark Twain</div>
//                     </div>
//                   </li>

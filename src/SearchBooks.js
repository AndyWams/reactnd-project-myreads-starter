import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { debounce } from "throttle-debounce";

class SearchBooks extends Component {
  state = {
    query: "",
    searchBooks: [],
  };

  searchQuery = (query) => {
    this.setState({ query });
    this.debouncedSearchQuery(query);
  };
  debouncedSearchQuery = debounce(300, false, (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });

  moveBook = (e, book) => {
    this.props.updateShelf(e.target.value, book);
    this.props.history.push("/");
  };
  render() {
    const { query, searchBooks } = this.state;
    const { books } = this.props;

    let verifiedBooks = [];
    if (books.length > 0) {
      verifiedBooks = searchBooks.map((book) => {
        books.forEach((bookOnShelf) => {
          // check wether book is already on shelf
          if (book.id === bookOnShelf.id) {
            // if yes get the shelf data from BooksOnShelf
            book.shelf = bookOnShelf.shelf;
          }
        });

        return book;
      });
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.searchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query === ""
              ? null
              : verifiedBooks
                  .filter((q) =>
                    q.title.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((book) => {
                    return (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks &&
                                  book.imageLinks.thumbnail})`,
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf ? book.shelf : "none"}
                                onChange={(e) => {
                                  this.moveBook(e, book);
                                }}
                              >
                                <option value="move" disabled>
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
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">
                            {book.authors && book.authors.join(", ")}
                          </div>
                        </div>
                      </li>
                    );
                  })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

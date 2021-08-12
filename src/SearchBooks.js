import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    query: "",
    search: [],
    error: "",
  };
  searchQuery = (query) => {
    this.setState({ query }, () => {
      if (query !== "") {
        const trimedQuery = query.trim();
        BooksAPI.search(trimedQuery).then((search) => {
          this.setState(() => ({ search }));
        });
      }
    });
  };
  clearQuery = () => {
    this.updateQuery("");
  };
  moveBook = (e, book) => {
    this.props.updateShelf(e.target.value, book);
    this.props.history.push("/");
  };
  render() {
    const { query, search } = this.state;

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
              : search.error === ""
              ? search
                  .filter((s) =>
                    s.title.toLowerCase().includes(query.toLowerCase())
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
                                backgroundImage: `url(${
                                  book.imageLinks.thumbnail
                                })`,
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf}
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
                            {book.authors.map((author) => author)}
                          </div>
                        </div>
                      </li>
                    );
                  })
              : search.error}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

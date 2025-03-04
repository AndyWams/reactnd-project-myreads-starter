import React from "react";
import "./App.css";
import PropTypes from "prop-types";

const BookShelf = ({ books, shelfTitle, updateShelf, shelfState }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length === 0
            ? "Loading"
            : books
                .filter((book) => book.shelf.includes(shelfState))
                .map((filtered) => {
                  return (
                    <li key={filtered.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                filtered.imageLinks.thumbnail
                              })`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value={filtered.shelf}
                              onChange={(e) => {
                                updateShelf(e.target.value, filtered);
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
                        <div className="book-title">{filtered.title}</div>
                        <div className="book-authors">
                          {filtered.authors.map((author) => author)}
                        </div>
                      </div>
                    </li>
                  );
                })}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  shelfState: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default BookShelf;

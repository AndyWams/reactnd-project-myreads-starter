import React, { Component } from "react";
import BookShelf from "./Shelf";
import { Link } from "react-router-dom";
class ListBooks extends Component {
  state = {};
  render() {
    const { books, updateShelf } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelfTitle={"Currently Reading"}
              books={books}
              shelfState={"currentlyReading"}
              updateShelf={updateShelf}
            />
            <BookShelf
              shelfTitle={"Want to Read"}
              books={books}
              shelfState={"wantToRead"}
              updateShelf={updateShelf}
            />
            <BookShelf
              shelfTitle={"Read"}
              books={books}
              shelfState={"read"}
              updateShelf={updateShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;

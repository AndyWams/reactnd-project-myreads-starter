import React from "react";
import * as BooksAPI from "./BooksAPI";

import "./App.css";
import SearchBooks from "./SearchBooks";
import { Route, withRouter } from "react-router-dom";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false,
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  updateShelf = (event, book) => {
    BooksAPI.update(book, event).then(() =>
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    );
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <ListBooks books={books} updateShelf={this.updateShelf} />
          )}
        />
        <Route
          path="/search"
          render={(props) => (
            <SearchBooks
              {...props}
              books={books}
              updateShelf={this.updateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(BooksApp);

import React, { Component } from "react";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Frame from "./components/Frame/Frame";

const browserHistory = createHistory();

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={browserHistory}>
          <Frame />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

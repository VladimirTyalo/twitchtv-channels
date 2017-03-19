import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './Header';
import Main from './Main';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    );
  }
}

export default connect()(App);

import React, { Component } from 'react';
import '../Style/App.css';
import Transition from './Transition';

class App extends Component {

  render() {
    return (
      <div className="generalGrid">
        <div className="titleGridPos titleFlexLayout">
          <h1 className="climate">Climate</h1>
          <h1 className="change"><span/>Change</h1>
        </div>
        <Transition/>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import '../Style/App.css';
import Transition from './Transition';

class App extends Component {
  state = {tweets: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(tweet => {
        for(let i = 0; i < tweet.length; ++i)
        {
            console.log(tweet[i].user.location);
        }   
        this.setState({tweets: tweet})
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="title">
          <h1>Climate</h1>
          <h1><span/>Change</h1>
        </div>
        <Transition/>
      </React.Fragment>
    );
  }
}

export default App;
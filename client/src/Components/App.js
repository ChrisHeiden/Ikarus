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
/*


   <CSSTransition
               in={true}
               classNames="fade"
               appear={true}
               timeout={5000}>
                <div>
                    <h1>Step One</h1>
                </div>
            </CSSTransition>
*/
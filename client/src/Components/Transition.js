import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/InfoVis.css';
import InfoVis from './InfoVis';
import Button from './Button';

class Transition extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="transition generalGrid">
        <div className="transitionHeader transitionHeaderGridPos">
          <h1>Climate Change</h1>
        </div>
        <div className="buttonLayout buttonGridPos">
          <Button content="i"/>
          <Button content="<"/>
        </div>
        <div className="infoVisGridPos">
          <InfoVis/>
        </div>
      </div>
    );


  }
}

export default Transition;
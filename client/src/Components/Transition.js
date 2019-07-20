import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/InfoVis.css';
import InfoVis from './InfoVis';
import Button from './Button';
import InputBox from './InputBox';
import InfoBox from './InfoBox';

class Transition extends Component {
  
  constructor(props) {
    super(props);
    this.state ={
      showInfoBox: false,
      showInputField: false
    }; 
    this.showInfoBoxFunc = this.showInfoBoxFunc.bind(this);
    this.showInputBoxFunc = this.showInputBoxFunc.bind(this);

  }


  showInfoBoxFunc(info){
    this.setState({ showInfoBox: info });
  }

  showInputBoxFunc(info){
    this.setState({ showInputField: info });
  }

  render() {

    let showInfoBox;
    let showInputField;

    if(this.state.showInputField === true){
      showInputField = <InputBox/>;
    }

    if(this.state.showInfoBox === true){
      showInfoBox = <InfoBox/>;
    }

    return (
      <div className="transition generalGrid">
        <div className="transitionHeader transitionHeaderGridPos">
          <h1>Climate Change</h1>
        </div>
        <div className="buttonLayout buttonGridPos">
          <Button content="i" click={this.showInfoBoxFunc}/>
          <Button content="<" click={this.showInputBoxFunc}/>
        </div>
        <div className="mainFocusGridPos mainFocus">
          <InfoVis/>
          <div className="showBoxes">
            {showInfoBox}
            {showInputField}
          </div>
        </div>
      </div>
    );


  }
}

export default Transition;
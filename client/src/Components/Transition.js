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
      showInputField: false,
      amountTweets: 0,
      buttonInfoLabel: "i",
      buttonInputLabel: "<",
    }; 
    this.showInfoBoxFunc = this.showInfoBoxFunc.bind(this);
    this.showInputBoxFunc = this.showInputBoxFunc.bind(this);
    this.amountTweets = 0;
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(tweet => {
        this.amountTweets= tweet.length;  
      });
  };

  showInfoBoxFunc(info){
    this.setState({ showInfoBox: info });
  }

  showInputBoxFunc(info){
    this.setState({ showInputField: info });
    if(this.state.buttonInputLabel == ">") {
      this.setState({ buttonInputLabel: "<" });
    }else{
      this.setState({ buttonInputLabel: ">" });
    }
  }

  render() {

    let showInfoBox;
    let showInputField;

    if(this.state.showInputField === true){
      console.log(this.amountTweets)
      showInputField = <InputBox amountTw={this.amountTweets}/>;
    }

    if(this.state.showInfoBox === true){
      showInfoBox = <InfoBox/>;
    }
    const infoStyle = {
      gridColumnStart: 1,
      gridColumnEnd: 1,
      gridRowStart: 1,
      gridRowEnd: 1,
    };

    const inputStyle = {
      gridColumnStart: 1,
      gridColumnEnd: 1,
      gridRowStart: 3,
      gridRowEnd: 3,
    };

    return (


      <div className="transition generalGrid transitionAnimation">
        <div className="transitionHeader transitionHeaderGridPos">
          <h1>Climate Change</h1>
        </div>
        <div className="buttonLayout buttonGridPos">
          <Button content="i" click={this.showInfoBoxFunc} styleButton={infoStyle}/>
          <Button content={this.state.buttonInputLabel} click={this.showInputBoxFunc} styleButton={inputStyle}/>
        </div>
        <div className="mainFocusGridPos mainFocus">
          <InfoVis getTweetsNumber={this.getAmountOfTweets}/>
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

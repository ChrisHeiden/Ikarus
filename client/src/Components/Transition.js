import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/InfoVis.css';
import InfoVis from './InfoVis';
import Button from './Button';
import InputBox from './InputBox';
import InfoBox from './InfoBox';
import PlattformDot from './PlattformDot';

class Transition extends Component {
  
  constructor(props) {
    super(props);
    this.state ={
      showInfoBox: false,
      showInputField: false,
      buttonInputLabel: ">",
      amountFilter: 100,
      removeOldDatasetValue: 100,
      removeNewDatasetValue: 0,
      searchLocation: "",
      twitter: true,
      tumblr: true,
      instagram: true,
      showAllLocations: true,
    }; 
    this.showInfoBoxFunc = this.showInfoBoxFunc.bind(this);
    this.showInputBoxFunc = this.showInputBoxFunc.bind(this);
    this.getAmount = this.getAmount.bind(this);
    this.removeOldDatasets = this.removeOldDatasets.bind(this);
    this.removeNewDatasets = this.removeNewDatasets.bind(this);
    this.searchLocationData = this.searchLocationData.bind(this);
    this.lookUpPlattform = this.lookUpPlattform.bind(this);
    this.removeLoctionSearch = this.removeLoctionSearch.bind(this);
    this.getAmountOfDots = this.getAmountOfDots.bind(this);
    this.amountTweets = 0;
  }

  showInfoBoxFunc(info){
    this.setState({ showInfoBox: info },() => {})
  }

  showInputBoxFunc(info){
    this.setState({ showInputField: info },() => {});
    if(this.state.buttonInputLabel == ">") {
      this.setState({ buttonInputLabel: "<" },() => {})
    }else{
      this.setState({ buttonInputLabel: ">" },() => {})
    }
  }

  removeOldDatasets(number){
    this.setState({
      removeOldDatasetValue: number
    },() => {}); 
  }

  removeNewDatasets(number){
    this.setState({
      removeNewDatasetValue: number
    },() => {});  
  }

  searchLocationData(location) {
    this.setState({
      searchLocation: location
    },() => {});
  } 

  getAmount(number){
    this.setState({
      amountFilter: number
    },() => {});
  }

  lookUpPlattform(tumblr, twitter, instagram){
    this.setState({
      tumblr: tumblr,
      twitter: twitter,
      instagram: instagram
    },() => {});
  }

  removeLoctionSearch(event){
    this.setState({showAllLocations: event});
  }

  getAmountOfDots(number){
    this.setState({ 
      amountFilter: number,
      removeOldDatasetValue: number
    })
  }


  render() {

    let showInfoBox;
    let showInputField;

    if(this.state.showInputField === true){
      showInputField = <InputBox amountFilter={this.state.amountFilter} removeLoctionSearch={this.removeLoctionSearch} lookUpPlattform ={this.lookUpPlattform} searchLocationData={this.searchLocationData} removeNewDatasets={this.removeNewDatasets} removeOldDatasets={this.removeOldDatasets} getAmount={this.getAmount} amountTw={this.amountTweets}/>;
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
          <h1>{this.props.title}</h1>
        </div>
        <div className="buttonLayout buttonGridPos">
          <Button content="i" click={this.showInfoBoxFunc} styleButton={infoStyle}/>
          <Button content={this.state.buttonInputLabel} click={this.showInputBoxFunc} styleButton={inputStyle}/>
        </div>
        <div className="mainFocusGridPos mainFocus">
          <InfoVis 
                  getAmountOfDots={this.getAmountOfDots}
                  showAllLocations={this.state.showAllLocations}
                  twitter={this.state.twitter} 
                  instagram={this.state.instagram}
                  tumblr={this.state.tumblr}
                  searchLocation={this.state.searchLocation} 
                  removeNewDatasetValue={this.state.removeNewDatasetValue} 
                  removeOldDatasetValue={this.state.removeOldDatasetValue} />
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

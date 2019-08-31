import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/InfoVis.css';
import '../Style/General.css';
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
      buttonInputLabel: ">",
      amountFilter: 1000,
      removeOldDatasetValue: 1000,
      removeNewDatasetValue: 0,
      twitter: true,
      tumblr: true,
      instagram: true,

      dotRightClick: false,


      filterYear: -1,
      searchLocation: "",

      showAll: true,
      showAllTime: true,
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
    this.removeTimeSearch = this.removeTimeSearch.bind(this);
    this.getAmountOfDots = this.getAmountOfDots.bind(this);
    this.searchYear = this.searchYear.bind(this);
    this.showAllDots = this.showAllDots.bind(this);
    this.removeSearch = this.removeSearch.bind(this);
    this.hideDots = this.hideDots.bind(this);
    this.visbleDots = this.visbleDots.bind(this);
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
      searchLocation: location,
      search: 1
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

  removeLoctionSearch(){
    this.setState({searchLocation: ""});
  }

  removeTimeSearch(){
    this.setState({filterYear: -1,});
  }

  getAmountOfDots(number){
    this.setState({ 
      amountFilter: number,
      removeOldDatasetValue: number
    })
    this.forceUpdate();
  }

  searchYear(number){
    this.setState({ filterYear: number});
  }

  showAllDots(){
    this.setState({showAll: true, dotRightClick: false}, () => {})
  }

   
  hideDots(value){
    this.setState({dotRightClick: value, showAll: false}, () => {console.log(this.state.dotRightClick)})
  }

  removeSearch(){
    this.removeLoctionSearch();
    this.removeTimeSearch();
  }

  visbleDots(){

  }

  render() {

    let showInfoBox;
    let showInputField;

    if(this.state.showInputField === true){
      showInputField = <InputBox 
        showAllDots={this.showAllDots}
        visbleDots={this.visbleDots}
        removeSearch={this.removeSearch}
        hideDots={this.state.dotRightClick}         
        searchYear={this.searchYear} 
        amountFilter={this.state.amountFilter} 
        removeLoctionSearch={this.removeLoctionSearch} 
        removeTimeSearch={this.removeTimeSearch} 
        lookUpPlattform ={this.lookUpPlattform} 
        searchLocationData={this.searchLocationData} 
        removeNewDatasets={this.removeNewDatasets} 
        removeOldDatasets={this.removeOldDatasets} 
        getAmount={this.getAmount} 
        amountTw={this.amountTweets}/>;
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
      <div className="transition generalGrid transitionAnimation notSelectable">
        <div className="transitionHeader transitionHeaderGridPos">
          <h1>{this.props.title}</h1>
        </div>
        <div className="buttonLayout buttonGridPos">
          <Button content="i" click={this.showInfoBoxFunc} styleButton={infoStyle}/>
          <Button content={this.state.buttonInputLabel} click={this.showInputBoxFunc} styleButton={inputStyle}/>
        </div>
        <div className="mainFocusGridPos mainFocus">
          <InfoVis 
            hideDots={this.hideDots}
            
            showAllDots={this.state.showAll}

            filterYear={this.state.filterYear}
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

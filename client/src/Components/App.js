import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import '../Style/App.css';
import Transition from './Transition';
import CheckBox from './CheckBox';
import SearchBox from './SearchBox'

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      climateChange: false,
      economy: false,
      pollution: false,
      speciesExtinction: false,
      gotServerResponse: false,
    };
    this.socket;

    this.sendTag = this.sendTag.bind(this);
    this.isChecked = this.isChecked.bind(this);
    //this.getServerResponse = this.getServerResponse.bind(this);
   
  }

  componentDidMount() {
    this.socket = socketIOClient('http://localhost:3000');
    this.socket.on("gotInfo", data => this.setState({ gotServerResponse: data }));
  }

  isChecked(event)
  { 
    const title = event.target.innerHTML;
    if(title === "#ClimateChange")
    {
      if(this.state.climateChange == true)
      {
        this.setState({
          climateChange: false
        })
      }
      else
      {
        this.setState({
          climateChange: true,
          speciesExtinction: false,
          economy: false,
          pollution: false
        })
      }
    }
    else if(title === "#SpeciesExtinction")
    {
      if(this.state.speciesExtinction == true)
      {
        this.setState({
          speciesExtinction: false
        })
      }
      else
      {
        this.setState({
          speciesExtinction: true,
          climateChange: false,
          economy: false,
          pollution: false
        })
      }
    }
    else if(title === "#Economy")
    {
      if(this.state.economy == true)
      {
        this.setState({
          economy: false
        })
      }
      else
      {
        this.setState({
          economy: true,
          climateChange: false,
          speciesExtinction: false,
          pollution: false
        })
      }
    }
    else if(title === "#Pollution")
    {
      if(this.state.pollution == true)
      {
        this.setState({
          pollution: false
        })
      }
      else
      {
        this.setState({
          pollution: true,
          climateChange: false,
          speciesExtinction: false,
          economy: false,
        })
      }
    }
  }


  sendTag(tag){
    if(tag == '#Pollution')
    {
      this.socket.emit('sendTag', "Pollution");
    }
    else if(tag == '#ClimateChange')
    {
      this.socket.emit('sendTag', "ClimateChange");
    }
    else if(tag == '#Economy')
    {
      this.socket.emit('sendTag', "Economy");
    }
    else if(tag == '#SpeciesExtinction')
    {
      this.socket.emit('sendTag', "SpeciesExtinction");
    }
  }
  /*
  getServerResponse(data){
    console.log(data);
  }
  */
  render() {
    let transition;
    let animation;

    if(this.state.gotServerResponse == true)
    {
      transition = <Transition/>
      animation = {
        animationName: 'fadeOut',
        animationDuration: '2s',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        animationIterationCount: '1',
        animationFillMode: 'forwards',
      };
      
    }

    

    return (
        <div className="generalGrid">
          <div style={animation} className={"titleGridPos titleFlexLayout"} >
            <h1 className="climate">Projection</h1>
            <h1 className="change"><span/>Ikarus</h1>
            <div className="tagBox tagPoxGridPos tagGrid">
              <h1 className="tagSearchTitle">Search a Tag</h1>
              <div className="line"></div>
              <div className="tagGridPos tagSearch tagMenu">
                <SearchBox title={'#ClimateChange'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="1" gridRowEnd="1" />
                <SearchBox title={'#SpeciesExtinction'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="2" gridRowEnd="2" />
                <SearchBox title={'#Economy'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="3" gridRowEnd="3" />
                <SearchBox title={'#Pollution'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="4" gridRowEnd="4" />
              </div>
            </div>
          </div>
          {transition}
        </div>
    );
  }
}

export default App;



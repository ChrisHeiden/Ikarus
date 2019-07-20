import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import Dot from './Dot';

class InfoVis extends Component {
    constructor(props){
        super(props);
        this.state = {
            gotInformation: false,
            tweets: [],
            amountOfTweets: -1
        };
    } 
    

    componentDidMount() {
      fetch('/users')
        .then(res => res.json())
        .then(tweet => {
            this.setState({amountOfTweets: tweet.length});            
            this.setState({tweets: tweet});          
            this.setState({gotInformation: true});          
        });
        this.forceUpdate();
    };

    render() {
        console.log("***********************");
        console.log("Rerender");
        console.log(this.state.amountOfTweets);
        console.log(this.state.tweets);
        console.log("***********************");

        //let info = <p>{this.state.amountOfTweets}, {this.state.tweets}</p>
        if(this.state.gotInformation === false)
        {
            return(<React.Fragment/>);
        }
        else
        {
             
            for(let i = 0; i < this.state.amountOfTweets; ++i)
            {
                console.log(this.state.tweets[i].user.location);
            } 

            console.log("******LAST ONE*******");
            console.log(this.state.amountOfTweets);
            console.log(this.state.tweets);
    
            return (
                <div className="infoVisGridPos">
                    <div /*style={divStyle}*/ className="dot"/>
                </div>
            );
        }
  }
}

export default InfoVis;
//<Dot big={this.state.amountOfTweets} amount={this.state.amountOfTweets}/>
//                  <Dot amount = {this.state.amountOfTweets} size = {this.state.amountOfTweets}/>

/*
        function calY (x)
        {
            //return Math.sqrt(Math.pow(x,2) + Math.pow(Math.sqrt(Math.pow(-x,2) + Math.pow(radius,2))));
        }
  */ 
// <Dot xPos={window.innerWidth} yPos={window.innerHeight} radius={this.amountOfTweets} />

//                  <p style={{color: '#fff'}}>here you can find the infovis</p>
              

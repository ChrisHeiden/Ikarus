import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import Dot from './Dot';

class InfoVis extends Component {
    constructor(props){
        super(props);
        this.amountOfTweets = 1;
    } 
    
    state = {tweets: []}

    componentDidMount() {
      fetch('/users')
        .then(res => res.json())
        .then(tweet => {

            this.amountOfTweets = tweet.length;
            console.log(this.amountOfTweets);
            for(let i = 0; i < this.amountOfTweets; ++i)
            {
                console.log(tweet[i].user.location);
            }   
            this.setState({tweets: tweet});          
        });

        
    };

    render() {
/*
        function calY (x)
        {
            //return Math.sqrt(Math.pow(x,2) + Math.pow(Math.sqrt(Math.pow(-x,2) + Math.pow(radius,2))));
        }
  */   
        return (
            <React.Fragment>
                <Dot xPos={window.innerWidth} yPos={window.innerHeight} radius={this.amountOfTweets} />
            </React.Fragment>
    );
  }
}

export default InfoVis;
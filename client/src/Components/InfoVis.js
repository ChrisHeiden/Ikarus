import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';

import Dot from './Dot';

class InfoVis extends Component {
    constructor(props){
        super(props);
        this.state = {
            gotInformation: false,
            tweets: [],
            amountOfTweets: -1,
            xPos: 0,
            yPos: 0,
        };

        this.xPos = 0;
        this.yPos = 0;
        this.radius = 0;

        this.calcDots = this.calcDots.bind(this);
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
    
    
    refCallback = element => {
        const pos = element.getBoundingClientRect();
        this.xPos = pos.x;
        this.yPos = pos.y;
        this.radius = this.state.amountOfTweets/2;

        this.setState({xPos: pos.x});            
        this.setState({yPos: pos.y});          
    };

    calcDots() {
//        const numbers = [95, 95, 95, 95, 50, 50, 50, 50, 50, 75, 75, 75, 75, 75,] //max height is 95
        const tweets = this.state.tweets;
        let listItems = tweets.map((tweet, index) =>
            <Dot key={index} angle={index*2} y={this.state.xPos} x={this.state.yPos} radius={this.state.amountOfTweets/2}>{tweet.user.location}></Dot>
        )
        return listItems
    }

    render() {
        if(this.state.gotInformation === false)
        {
            return(<React.Fragment/>);
        }
        else{    
            let heightDiv = this.state.amountOfTweets * 2;
            let widthDiv = this.state.amountOfTweets * 2;

            let styles = {
                width: widthDiv+'px',
                height: heightDiv+'px',
            };
            return (
                <div className="infoVisGridPos dotPos">
                    <div ref={this.refCallback} className="dot mainDot" style={styles}/>
                    {this.calcDots()}
                </div>
            );
        }
    }
}

export default InfoVis;


/*
                    <Dot radius={this.radius}  x={this.xPos} y={this.yPos}/>


    calcDots() {
        const numbers = this.state.tweets;
        const dots = numbers.map((number, index) => {
            <Dot radius={this.radius} x={this.xPos} y={this.yPos} angle={index}/>
        });
        return(dots);
    }


    render() {
        if(this.state.gotInformation === false)
        {
            return(<React.Fragment/>);
        }
        else{    
            let heightDiv = this.state.amountOfTweets * 2;
            let widthDiv = this.state.amountOfTweets * 2;

            let styles = {
                width: widthDiv+'px',
                height: heightDiv+'px',
            };

            return (
                <div className="infoVisGridPos dotPos">
                    <div ref={this.refCallback} className="dot mainDot" style={styles}/>
                    {this.calcDots()}
                </div>
            );
        }
    }
}

*/
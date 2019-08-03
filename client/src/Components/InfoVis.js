import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import MiddleDot from './MiddleDot'

import Dot from './Dot';

class InfoVis extends Component {
    constructor(props){
        super(props);
        this.state = {
            gotInformationTwitter: false,
            gotInformationTumblr: false,
            gotInformationInstagram: false,

            tweets: [],
            tumbs: [],
            instas: [],

            amountOfTweets: 1,
            amountOfTumbs: 1,
            amountOfInstas: 1,
            
            xPos: 0,
            yPos: 0,

            tumblrXPos: 0,
            tumblrYPos: 0,

            twitterXPos: 0,
            twitterYPos: 0,

            instagramXPos: 0,
            instagramYPos: 0,

            radius: 0,
        };


        this.tumblrDots;
        this.twitterDots;
        this.instagramDots;

        this.circleRadius = 360;
        this.calcDots = this.calcDots.bind(this);
        this.calcTwitterDots = this.calcTwitterDots.bind(this);
        this.calcTumblrDots = this.calcTumblrDots.bind(this);
        this.calcInstagramDots = this.calcInstagramDots.bind(this);
    } 
    


    calcInstagramDots(){
        const instas = this.state.instas;
        let step = this.circleRadius /this.state.amountOfInstas;


        let listItems = instas.map((tumb, index) =>  
            <Dot key={index} location={instas[index].location} angle={index} y={500} x={100} radius={this.state.radius}></Dot>
        )
        return listItems
    }

    calcTumblrDots(){
        const tumbs = this.state.tumbs;
        let step = this.circleRadius /this.state.amountOfTumbs;


        let listItems = tumbs.map((tumb, index) =>  
            <Dot key={index} 
                 middleX={this.state.xPos} 
                 middleY={this.state.yPos} 
                 date={tumbs[index].location} 
                 location={tumbs[index].location} 
                 y={this.state.tumblrYPos} 
                 x={this.state.tumblrXPos}></Dot>
        )
        return listItems
    }

    calcTwitterDots(){
        const tweets = this.state.tweets;
        let step = this.circleRadius /this.state.amountOfTweets;


        let listItems = tweets.map((tweet, index) =>  
            <Dot key={index} location={tweets[index].user.location} angle={index} y={this.state.yPos} x={this.state.xPos} radius={this.state.radius}></Dot>
        )
        return listItems
    }
    
    calcDots() {
        const tweets = this.state.tweets;
        let step = this.circleRadius /this.state.amountOfTweets;


        let listItems = tweets.map((tweet, index) =>  
            <Dot key={index} location={tweets[index].user.location} angle={index} y={this.state.yPos} x={this.state.xPos} radius={this.state.radius}></Dot>
        )
        return listItems
    }

    render() {
        return (
            <div className="infoVisGridPos dotPos gridVis">
                <MiddleDot alignSelf="center" justifySelf="center" opacity=".1"/>   
            </div>
        );
    }
}


export default InfoVis;
/*
            //this.state.gotInformationInstagram === true){    

 <div name="Twitter" ref={this.refCallback}>
                        {this.calcTwitterDots()}
                    </div>


<PlattformDot alignSelf="end" justifySelf="end" opacity="1" title="Twitter" />
                    <div ref={this.refCallback} className="dot" style={styles}>
                    </div>
                    {this.calcDots()}
                    {this.calcTwitterDots()}

                    */
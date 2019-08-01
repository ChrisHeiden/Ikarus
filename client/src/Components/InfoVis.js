import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import PlattformDot from './PlattformDot'
import PropTypes from 'prop-types';

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
            xPos: 0,
            radius: 0,
        };
        this.circleRadius = 360;
        this.calcDots = this.calcDots.bind(this);
        this.calcTwitterDots = this.calcTwitterDots.bind(this);
        this.calcTumblrDots = this.calcTumblrDots.bind(this);
        this.calcInstagramDots = this.calcInstagramDots.bind(this);
    } 
    

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(tweet => {
                this.setState({amountOfTweets: tweet.length});            
                this.setState({tweets: tweet});          
                this.setState({gotInformationTwitter: true});          
            });

            fetch('/tumblr')
            .then(res => res.json())
            .then(tumb => {
                this.setState({amountOfTumbs: tumb.length});            
                this.setState({tumbs: tumb});          
                this.setState({gotInformationTumblr: true});          
            });

            /*
            fetch('/insta')
            .then(res => res.json())
            .then(tumb => {
                this.setState({amountOfTumbs: tumb.length});            
                this.setState({tumbs: tumb});          
                this.setState({gotInformationTumblr: true});          
            });*/
        this.forceUpdate();
    };
    
    
    refCallback = element => {
        const pos = element.getBoundingClientRect();
        this.setState({radius: this.state.amountOfTweets});            
        this.setState({xPos: pos.x});            
        this.setState({yPos: pos.y});          
    };

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
            <Dot key={index} location={tumbs[index].location} angle={index} y={100} x={300} radius={this.state.radius}></Dot>
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
        if(this.state.gotInformationTwitter === false)
        {
            return(<React.Fragment/>);
        }
        else if(this.state.gotInformationTwitter === true){    
            let heightDiv = this.state.amountOfTweets;
            let widthDiv = this.state.amountOfTweets;

            let styles = {
            };


            return (
                <div className="infoVisGridPos dotPos gridVis">
                    <PlattformDot alignSelf="start" justifySelf="center" opacity="1" title="Tumblr" />
                    <div ref={this.refCallback} style={styles}>
                        {this.calcTumblrDots()}
                    </div>
                    <PlattformDot alignSelf="end" justifySelf="end" opacity="1" title="Twitter" />
                    <div ref={this.refCallback} style={styles}>
                        {this.calcTwitterDots()}
                    </div>
                    <PlattformDot alignSelf="end" justifySelf="start" opacity="1" title="Instagram" />
                    <PlattformDot alignSelf="center" justifySelf="center" opacity=".1" title="" />
                </div>
            );
        }
    }
}


export default InfoVis;
/* <PlattformDot alignSelf="end" justifySelf="end" opacity="1" title="Twitter" />
                    <div ref={this.refCallback} className="dot" style={styles}>
                    </div>
                    {this.calcDots()}
                    {this.calcTwitterDots()}

                    */
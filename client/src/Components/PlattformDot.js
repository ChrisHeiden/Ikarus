import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import Dot from './Dot'

class PlattformDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           click: false,
           gotInformation: false,
           x: 0,
           y: 0,
           dates: [],
           locations: [],
           diameter: 50,
        };
        this.onClick = this.onClick.bind(this);
        this.calcDistance = this.calcDistance.bind(this);
        this.findNewestPost = this.findNewestPost.bind(this);
        this.findOldestPost = this.findOldestPost.bind(this);            
        this.calcDots = this.calcDots.bind(this);            
    }

    
    componentDidMount() {
        if(this.props.title === 'Tumblr')
        {
            fetch('/tumblr')
                .then(res => res.json())
                .then(tumb => {
                    let date = [];
                    let location = [];
                    let size = tumb.length;
                    location.push("******************************************");
                    location.push("*****************Tumblr***************");
                    for(let x = 0; x <size; ++x)
                    {
                        console.log(tumb[x]);
                        location.push(tumb[x].location);
                        date.push(new Date(tumb[x].date));
                    }
                    this.setState({
                        dates: date,
                        locations: location,
                        gotInformation: true
                    });          
                });
                console.log("");
        }
        else if(this.props.title === 'Twitter')
        {
            fetch('/twitter')
                .then(res => res.json())
                .then(tweet => {
                    let date = [];
                    let location = [];
                    let size = tweet.length;
                    location.push("******************************************");
                    location.push("*****************Twitter***************");

                    for(let x = 0; x <size; ++x)
                    {
                        console.log(tweet[x]);
                        date.push(new Date(tweet[x].user.created_at));
                        location.push(tweet[x].user.location);
                    }
                    this.setState({
                        dates: date,
                        locations: location,
                        gotInformation: true
                    });          
                    
                }); 
        }
        else if(this.props.title === 'Instagram')
        {
            /*
            fetch('/insta')
            .then(res => res.json())
            .then(tumb => {
                    this.setState({posts: tumb});          
                    this.setState({gotInformation: true});     
            });*/
        }     
        this.forceUpdate();
    };

    findNewestPost(){
        let newestPost = this.state.dates[0];
        let size = this.state.dates.length;
        for(let x = 0; x <size; ++x)
        {
            if(newestPost < this.state.dates[x])
            {
                newestPost = this.state.dates[x];
            }
        }
        /*
        if(this.props.title === 'Tumblr')
        {
            console.log("newestPost:" + newestPost);
            console.log();
        }
        */
       return newestPost;
    }

    findOldestPost(){
        let oldestPost = this.state.dates[0];
        let size = this.state.dates.length;
        for(let x = 0; x <size; ++x)
        {
            if(oldestPost > this.state.dates[x])
            {
                oldestPost = this.state.dates[x];
            }
        }
        /*
        if(this.props.title === 'Tumblr')
        {
            console.log("oldestPost:" + oldestPost);
            console.log();
        }
        */
       return oldestPost;
    }
    

    refCallback = element => {
        const pos = element.getBoundingClientRect();
                 
        this.setState({
            x: pos.x,
            y: pos.y
        });            
    }

    onClick(){
        if(this.state.click == false)
        {
            this.setState({click: true})
        }
        else
        {
            this.setState({click: false})
        }
    }

    calcDistance(){
        let distance = {x: 0, y:0}
        let x = this.props.middleX - this.state.x
        let y = this.props.middleY - this.state.y
        distance.x = x;
        distance.y = y;
        
        return distance;
    }

    calcDots(distance, oldestPost, newestPost){
        const dates = this.state.dates;

        let listItems = dates.map((date, index) =>  
            <Dot key={index} 
                 middleX={this.props.middleX} 
                 middleY={this.props.middleY} 
                 
                 plattformPosX={this.state.x} 
                 plattformPosY={this.state.y} 
                 location={this.state.locations[index]} 
                 date={date}
                 distance={distance} 
                 oldest={oldestPost} 
                 newest={newestPost} 
                 diameter={this.state.diameter} 
                ></Dot>
        )
        return listItems
    }

    render() {

        if(this.state.gotInformation == false)
        {
            return (
                <React.Fragment/>
            )
        }
        else
        {
            let distance = this.calcDistance();
            const oldest = this.findOldestPost();
            const newest = this.findNewestPost();
          
            let click;

            
            let styles = {
                alignSelf: this.props.alignSelf, 
                justifySelf: this.props.justifySelf, 
                opacity: this.props.opacity,
                width: this.state.diameter + "px",
                height: this.state.diameter + "px",
            };

            if(this.state.click == true)
            {
                click = <p>{this.props.title}</p>
            }

              
            return (
                <div ref={this.refCallback} className="testDot" style={styles} onClick={this.onClick}>
                    {click}
                    {this.calcDots(distance, oldest, newest)}
                </div>
            );
        }        
    }
}


export default PlattformDot;

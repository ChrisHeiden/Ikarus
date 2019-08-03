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
                    for(let x = 0; x <size; ++x)
                    {
                        location.push(tumb[x].location);
                        date.push(tumb[x].date);
                        //console.log(tumb[x].date);
                    }
                    this.setState({
                        dates: date,
                        locations: location,
                        gotInformation: true
                    });          
                });

        }
        else if(this.props.title === 'Twitter')
        {
            fetch('/twitter')
                .then(res => res.json())
                .then(tweet => {
                    let date = [];
                    let location = [];
                    let size = tweet.length;
                    for(let x = 0; x <size; ++x)
                    {
                        date.push(tweet[x].user.created_at);
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
        let x = Math.pow((this.props.middleX - this.state.x), 2);
        let y = Math.pow((this.props.middleY - this.state.y), 2);
        let dist = Math.sqrt(x + y);
        //console.log(dist);
        return dist;
    }

    calcDots(distance, oldestPost, newestPost){
        const dates = this.state.dates;
        let step = this.circleRadius /this.state.amountOfTumbs;


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
            const distance = this.calcDistance();
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

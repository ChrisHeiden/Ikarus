import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import PlattformDot from './PlattformDot'

class MiddleDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           x: 0,
           y: 0,
        };
    }

    refCallback = element => {
        const pos = element.getBoundingClientRect();
        this.setState({x: pos.x});            
        this.setState({y: pos.y});
    }

    render() {        
        let styles = {
            alignSelf: this.props.alignSelf, 
            justifySelf: this.props.justifySelf, 
            opacity: this.props.opacity,
            width: 50 + "px",
            height: 50 + "px",
        };


        return (
            <div className="infoVisGridPos dotPos gridVis">
                <div ref={this.refCallback} className="testDot" style={styles}></div>
                <PlattformDot alignSelf="start" justifySelf="center" opacity="1" title="Tumblr" middleX={this.state.x} middleY={this.state.y}/>
                <PlattformDot alignSelf="end" justifySelf="end" opacity="1" title="Twitter" middleX={this.state.x} middleY={this.state.y}/>

            </div>
        ); 
    }
}

export default MiddleDot;

/*

                <PlattformDot alignSelf="end" justifySelf="start" opacity="1" title="Instagram" middleX={this.state.x} middleY={this.state.y}/>            

                */
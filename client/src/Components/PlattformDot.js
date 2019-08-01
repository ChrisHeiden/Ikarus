import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';

class PlattformDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           click: false,
        };
        this.onClick = this.onClick.bind(this);
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

    render() {

        let styles = {
            alignSelf: this.props.alignSelf, 
            justifySelf: this.props.justifySelf, 
            opacity: this.props.opacity,
        };

        let click;
        if(this.state.click == true)
        {
            click = <p>{this.props.title}</p>
        }

        return (
             <div className="testDot" style={styles} onClick={this.onClick}>
                 {click}
            </div>
        ); 
        
    }
}


export default PlattformDot;

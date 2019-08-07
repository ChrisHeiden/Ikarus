import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/Button.css';

class Button extends Component {
  
    constructor(props) {
        super(props);
        this.state ={
            height: 0,
            showBox: false
        }; 
       this.showBox = this.showBox.bind(this);
    }


    showBox(){
        if(this.state.showBox === false)
        {
            this.setState({ showBox: true },() => { this.props.click(this.state.showBox); })
        }
        else{
            this.setState({ showBox: false },() => { this.props.click(this.state.showBox); })
        }
        
    }

    render() {
        return (
        <React.Fragment>
            <button className="button" onClick={this.showBox} style={this.props.styleButton}>
                <h1>{this.props.content}</h1>
            </button>
        </React.Fragment>
        );
  }
}

Button.propTypes = {
   click: PropTypes.func
}

export default Button;
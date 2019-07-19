import React, { Component } from 'react';
import '../Style/Button.css';
import InputBox from './InputBox';

class Button extends Component {
  
    constructor(props) {
        super(props);

        this.showBox = this.showBox.bind(this);
    }

    showBox(){
        console.log("Hallo");
    }

    render() {
        return (
        <React.Fragment>
            <button>{this.props.content}</button>
        </React.Fragment>
        );
  }
}

export default Button;

//<InputBox/>

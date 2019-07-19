import React, { Component } from 'react';
import '../Style/InputBox.css';

class InputBox extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            sliderValue: 0,
            textValue: "",            
        };

        this.handleSlider = this.handleSlider.bind(this);
        this.handleText = this.handleText.bind(this);
    } 

    handleSlider(event){
        this.setState({sliderValue: event.target.value});
    }

    handleText(event) {
        this.setState({textValue: event.target.value});
    }

    render() {
        return (
            <div className="inputBox">
                <p>Amount of Locations</p>
                <input type="range" min="0" max="100" value={this.state.SliderValue} onChange={this.handleSlider}/>

                <p>Name of the Locations</p>
                <input  type="text" value={this.state.textValue} onChange={this.handleText}/>
            </div>
        );
    }
}

//TODO: change max to real Max value that has been found
export default InputBox;
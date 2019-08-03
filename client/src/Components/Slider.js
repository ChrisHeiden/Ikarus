import React, { Component } from 'react';
import '../Style/InputBox.css';
import '../Style/General.css';

class InputBox extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            sliderValue: 0,
        };

        this.handleSlider = this.handleSlider.bind(this);
    } 

    componentWillMount() {
        this.setState({sliderValue: this.props.value});
    }

    handleSlider(event){
        this.setState({sliderValue: event.target.value});
    }


    render() {
        return (
            <input 
                type="range" 
                min={this.props.min} max={this.props.max} 
                value={this.state.sliderValue} 
                onChange={this.handleSlider}
                step={this.props.step}/>
        );
    }
}

//TODO: change max to real Max value that has been found
export default InputBox;
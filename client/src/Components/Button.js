import React, { Component } from 'react';
import '../Style/Button.css';
import InputBox from './InputBox';

class Button extends Component {
  
    constructor(props) {
        super(props);
        this.state ={
            height: 0,
            showBox: false
        }; 

        this.showBox = this.showBox.bind(this);
    }
    componentDidMount(){
        console.log(this.refs.button.getBoundingClientRect());
        console.log(this.refs.button.getBoundingClientRect().width);
        this.state.height = this.refs.button.getBoundingClientRect().width;
        this.forceUpdate();
    }

    showBox(){
        if(this.state.showBox === false)
        {
            this.setState({ showBox: true });
        }
        else{
            this.setState({ showBox: false });
        }
    }

    render() {
        let showBoxComp;

       
        if(this.state.showBox === true)
        {
            showBoxComp = <InputBox/>;
        };
        return (
        <React.Fragment>
            <button style={{height: this.state.height}} ref="button" onClick={this.showBox}>{this.props.content}</button>
            {showBoxComp}
        </React.Fragment>
        );
  }
}

export default Button;

//  
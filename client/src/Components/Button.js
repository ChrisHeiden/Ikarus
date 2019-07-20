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

    //componentDidMount(){
    //    this.state.height = this.refs.button.getBoundingClientRect().width;
    //    this.forceUpdate();
    //}

    showBox(){
        if(this.state.showBox === false)
        {
            this.setState({ showBox: true });
        }
        else{
            this.setState({ showBox: false });
        }
        this.props.click(this.state.showBox);
    }

    render() {
        return (
        <React.Fragment>
            <button onClick={this.showBox}>{this.props.content}</button>
        </React.Fragment>
        );
  }
}

Button.propTypes = {
   click: PropTypes.func
}

export default Button;
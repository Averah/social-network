import React from "react";
import { connect } from "react-redux";
import {
  addNumber,
  substractNumber,
} from "../../redux/counterReducer";


class Counter extends React.Component {


  render() {
    
    return (
      <div>
      <div>{this.props.number}</div>
      <button onClick={this.props.substractNumber}>-1</button>
      <button onClick={this.props.addNumber}>+1</button>
      </div>
    )
    
  }
 
  }
  
  
  let mapStateToProps = (state) => {
    return {
      number: state.counter.number
    };
  };

  export default connect(mapStateToProps, {
    addNumber,
    substractNumber
  })(Counter);
  
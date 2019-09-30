import React from 'react';
import Button from '../src/Comp';
import { addOne, minOne } from './redux/actions';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ test: 'clicked ' });
  }
  plusOne = () => {
    this.props.P1()
  }
  minusOne = () => {
    this.props.M1()
  }
  render() {
    return (
      <div className='container' tabindex="1">
        <div className='div1'>
          <Button className='btn' onClick={this.plusOne} id='+1'>
          </Button>
          <Button className='btn' onClick={this.minusOne} id='-1'>
          </Button>
          <div>
            {this.props.number}
          </div>
        </div>
        <div className='div2'>
          Div 2
        </div>
        <div className='div3'>
          Div 3
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.num
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    P1: () => {
      dispatch(addOne());
    },
    M1: () => {
      dispatch(minOne());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
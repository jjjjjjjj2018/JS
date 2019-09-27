import React from 'react';
import Button from '../src/Comp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'click me'
    }
    this.handleClick = this.handleClick.bind(this);
  } handleClick() {
    this.setState({ test: 'clicked ' });
  }
  render() {
    return (
      <div className='container' tabindex="1">
        <Button className='btn' onClick={this.handleClick} id='Click'>
        </Button>
        <span>
          {this.state.test}
        </span>
        <div>
          Div 2
        </div>
      </div>
    );
  }
}


export default App;
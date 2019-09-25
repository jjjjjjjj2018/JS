import React, { Component } from 'react';


class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      suggestions: []
    }
  }
  render() {

    return (
      <Autosuggest/>
    );
  }

}
export default App;
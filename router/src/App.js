import React, {Component} from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

/* Home component */
const Create = () => (
  <div>
    <h2>Create Done</h2>
    <WithHomeButton />
  </div>
);
const toCreate = props => {
  return (
    <button
      onClick={() => {
        props.history.push('/create');
      }}>
      Create
    </button>
  );
};

const WithCreateButton = withRouter(toCreate);


const Edit = () => (
  <div>
    <h2>Edit Done</h2>
    <WithHomeButton />
  </div>
);

const toHome = props => {
  return (
    <button
      onClick={() => {
        props.history.push('/');
      }}>
      Done
    </button>
  );
};

const WithHomeButton = withRouter(toHome);


const toEdit = props => {
  return (
    <button
      onClick={() => {
        props.history.push('/edit');
      }}>
      edit
    </button>
  );
};

const WithEditButton = withRouter(toEdit);


/* Login component */
const List = props => {
  console.log(props);
  return (
    <div>
      <h2>Create</h2>
      <WithCreateButton />
      <h2>Edit</h2>
      <WithEditButton />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={List} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/edit" component={Edit} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
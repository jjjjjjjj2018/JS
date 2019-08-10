import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Edit from './components/App/Edit/Edit';
import Create from './components/App/Create/Create';
import store from "./redux/store";
import { Route } from 'react-router';

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/edit" component={Edit}></Route>
        <Route exact path="/create" component={Create}></Route>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
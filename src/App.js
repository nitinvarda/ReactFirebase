import React from 'react';

import './App.css';
import Todo from './components/Todo';
import Signin from './components/Signin';
import Signup from './components/Signup';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>

          <Route path="/login" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={Todo} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;

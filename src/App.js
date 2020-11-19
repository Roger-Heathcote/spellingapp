import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from "./components/MainPage"

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" component={MainPage} />
        </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Auth } from './pages/Auth/Auth';
import { Courses } from './pages/Courses/Courses';
import { NotFound } from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="routes-wrapper">
        <Switch>
          <Route exact path="/" >
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/courses" component={Courses} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Auth } from './pages/Auth/Auth';
import { Courses } from './pages/Courses/Courses';
import { NotFound } from './pages/NotFound/NotFound';
import { Logout } from './pages/Logout/Logout';
import { Proffesores } from './pages/Proffesores/Proffesores';



const App = () => {
  const credentials: any = localStorage.getItem('credentials');
  let token = "";
  let name = "";
  if (credentials && credentials !== null) {
    let { token: t, name: n } = JSON.parse(credentials);
    token = t;
    name = n
  }
  console.log(token)


  return (
    <Router>
      <Navbar name={name} token={token} />
      <div className="routes-wrapper">
        <Switch>
          <Route exact path="/" >
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          {!token &&
            <Route path="/auth" component={Auth} />
          }
          {token &&
            <Route path="/courses" component={Courses} />
          }
          <Route path="/logout" component={Logout} />
          {token &&
            <Route path="/proffesores" component={Proffesores} />
          }
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

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
import "bootstrap/dist/css/bootstrap.css";


const App = () => {
  const [user, setUser] = React.useState({ name: "", token: "", role: "" })
  const credentials: any = localStorage.getItem('credentials');
  React.useEffect(() => {

    if (credentials !== null) {
      const { name, token, role } = JSON.parse(credentials)
      setUser({ name, token, role })
    }
  }, [credentials])

  return (
    <Router>
      <Navbar name={user.name} token={user.token} role={user.role} />
      <div className="routes-wrapper">
        <Switch>
          <Route exact path="/" >
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          {!user.token &&
            <Route path="/auth" component={Auth} />
          }
          {user.token &&
            <Route path="/courses" component={Courses} />
          }
          <Route path="/logout" component={Logout} />
          {user.token &&
            <Route path="/proffesores" component={Proffesores} />
          }
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

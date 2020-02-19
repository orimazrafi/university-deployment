import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Auth } from './pages/Auth/Auth';
import { Courses } from './pages/Courses/Courses';
import { NotFound } from './pages/NotFound/NotFound';
import { Logout } from './pages/Logout/Logout';
import { Proffesores } from './pages/Proffesores/Proffesores';
import { Activity } from './pages/Activity/Activity';
import { Profile } from './pages/Profile/Profile';
import { Students } from './pages/Students/Students';
import { Payments } from './pages/Payments/Payments';
import { Chat } from './pages/Chat/Chat';

import './App.css';
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [user, setUser] = React.useState({ name: "", token: "", role: "", userId: "" })
  const credentials: any = localStorage.getItem('credentials');
  React.useEffect(() => {
    if (credentials !== null) {
      const { name, token, role, userId } = JSON.parse(credentials)
      setUser({ name, token, role, userId })
    }
  }, [credentials])

  return (
    <Router>
      <Navbar name={user.name} token={user.token} role={user.role} />
      <div className="routes-wrapper">
        <Switch>

          {user.token && user.role === "Student" &&
            <Route exact path="/auth" >
              <Redirect to="/courses" />
            </Route>
          }
          {user.token && user.role === "Proffesor" &&
            <Route exact path="/auth" >
              <Redirect to="/activity" />
            </Route>
          }
          {user.token && user.role === "Admin" &&
            <Route exact path="/auth" >
              <Redirect to="/payments" />
            </Route>
          }
          {user.token &&
            <Route exact path="/auth" >
              <Redirect to="/home" />
            </Route>
          }
          {!user.token &&
            <Route exact path="/" >
              <Redirect to="/auth" />
            </Route>
          }
          {/* <Route exact path="/" >
            <Redirect to="/home" />
          </Route> */}

          <Route path="/home" component={Home} />
          <Route path="/auth" component={Auth} />
          {user.token && user.role !== "Proffesor" &&
            <Route path="/courses" >
              <Courses userId={user.userId} role={user.role} />
            </Route>
          }
          <Route path="/logout" component={Logout} />
          {user.token && user.role === 'Admin' &&
            <Route path="/proffesores" component={Proffesores} />
          }
          {user.token && user.role === 'Admin' &&
            <Route path="/students" component={Students} />
          }
          {user.token && user.role === 'Admin' &&
            <Route path="/payments" component={Payments} />
          }
          {user.token &&
            <Route path="/activity" >
              <Activity name={user.name} role={user.role} userId={user.userId} />
            </Route>
          }
          <Route path="/my-profile" >
            <Profile userId={user.userId} role={user.role} />
          </Route>

          <Route path="/chat/:id" component={Chat} />

          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

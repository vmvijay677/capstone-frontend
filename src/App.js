import './App.css';
import { Route, Switch, Link } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { PrivateScreen } from './Components/PrivateScreen';
import { ForgotPassword } from './Components/ForgotPassword';
import { ResetPassword } from './Components/ResetPassword';
import { BlogList } from './Components/BlogList';
import { AddBlogs } from './Components/AddBlogs';
import { EditBlogs } from './Components/EditBlogs';
import Slide from 'react-reveal/Slide';

function App() {
  return (
    <div className="App">
      <Slide bottom>
        <Switch>
          <PrivateRoute exact path="/">
            <Slide bottom>
              <PrivateScreen />
            </Slide>
          </PrivateRoute>
          <PrivateRoute exact path="/blogs/view">
            <Slide bottom>
              <BlogList />
            </Slide>
          </PrivateRoute>
          <PrivateRoute exact path="/blogs/add">
            <Slide bottom>
              <AddBlogs />
            </Slide>
          </PrivateRoute>
          <PrivateRoute exact path="/blogs/edit/:id">
            <Slide bottom>
              <EditBlogs />
            </Slide>
          </PrivateRoute>
          <Route path="/login">
            <Slide bottom>
              <Login />
            </Slide>
          </Route>
          <Route exact path="/register">
            <Slide bottom>
              <Register />
            </Slide>
          </Route>
          <Route exact path="/forgot-password">
            <Slide bottom>
              <ForgotPassword />
            </Slide>
          </Route>
          <Route exact path="/resetpassword/:resetToken">
            <Slide bottom>
              <ResetPassword />
            </Slide>
          </Route>
        </Switch>
      </Slide>
    </div>
  );
}

export default App;

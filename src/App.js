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

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/">
          <PrivateScreen />
        </PrivateRoute>
        <PrivateRoute exact path="/blogs/view">
          <BlogList />
        </PrivateRoute>
        <PrivateRoute exact path="/blogs/add">
          <AddBlogs />
        </PrivateRoute>
        <PrivateRoute exact path="/blogs/edit/:id">
          <EditBlogs />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/resetpassword/:resetToken">
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

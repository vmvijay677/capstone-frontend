import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post("https://capstone--backend.herokuapp.com/auth/login", { email, password }, config);
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className='login-container'>
      <div className='login-page'>
        <form onSubmit={loginHandler} className='login-page-form'>
          <h2 className="login-heading">Login Here</h2>
          {error && <span className="login-error">{error}</span>}
          <TextField
            className='login-input'
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <br></br>
          <TextField
            className='login-input'
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <br></br>
          <Button variant="contained" type="submit" color="success">Login</Button>
          <br></br>
        </form>
        <h4 className='forgot-signin'><Link to="/forgot-password">Forgot Password</Link></h4>
        <h4 className='signup-signin'>Don't have an account? <Link to="/register">Register</Link></h4>
      </div>
      <div>
        <img className='login-image' src="https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80"></img>
      </div>
    </div>
  );
}



import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password mismatch!");
    }

    try {
      const { data } = await axios.post("https://capstone--backend.herokuapp.com/auth/register", { username, email, password }, config);
      localStorage.setItem("authToken", data.token);
      history.push("/login");
      alert("Registered successfully!");
    } catch (error) {
      setError(error.response.data.erorr);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className='register-container'>
      <div className='register-page'>
        <form onSubmit={registerHandler} className='register-page-form'>
          <h2 className="register-heading">Register Here</h2>
          {error && <span className="register-error">{error}</span>}
          <TextField
            className='register-input'
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <br></br>
          <TextField
            className='register-input'
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <br></br>
          <TextField
            className='register-input'
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <br></br>
          <TextField
            className='register-input'
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          <br></br>
          <Button variant="contained" type="submit" color="success">Register</Button>
          <br></br>
        </form>
        <h4 className='signin-register'>Already have an account? <Link to="/login">Login</Link></h4>
      </div>
      <div>
        <img className='register-image' src="https://cdn.pixabay.com/photo/2020/09/27/23/39/sunset-5608136_1280.jpg"></img>
      </div>
    </div>
  );
}

import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function ResetPassword({ match }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  const resetPasswordHandler = async (e) => {
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
      return setError("Passwords Mismatch!");
    }

    try {
      const { data } = await axios.put(`https://capstone--backend.herokuapp.com/auth/resetpassword/${match.params.resetToken}`, { password }, config);
      //console.log(data.data);
      setSuccess(data.data);
      history.push("/login");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div>
      <div className='login-container'>
        <div className='login-page'>
          <form onSubmit={resetPasswordHandler} className='login-page-form'>
            <h2 className="rp-heading">Reset Password</h2>
            <p className="rp-content">Enter your new password</p>
            {error && <span className="error-message">{error}</span>}
            {success && (
              <span>{success} <Link to="/login">Login</Link></span>
            )}
            <TextField
              className='login-input'
              id="outlined-password-input"
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <TextField
              className='login-input'
              id="outlined-password-input"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <br></br>
            <Button variant="contained" type="submit" color="success">Reset</Button>
            <br></br>
          </form>
        </div>
        <div>
        <img className='login-image' src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/portrait-of-waterfalls-tammy-ray.jpg"></img>
      </div>
      </div>
    </div>
  );
}

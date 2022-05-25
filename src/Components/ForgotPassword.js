import { useHistory } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post("https://capstone--backend.herokuapp.com/auth/forgotpassword", { email }, config);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className='fp-container'>
        <div className='fp-page'>
          <form onSubmit={forgotPasswordHandler} className='fp-page-form'>
            <h2 className="fp-heading">Forgot Password</h2>
            {error && <span className="fp-error">{error}</span>}
            {success && <span className='success-message'>{success}</span>}
            <p className='fp-content'>Please enter your registered email address. We will send you the reset password confirmation to this email.</p>
            <TextField
              className='login-input'
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <br></br>
            <Button variant="contained" type="submit" color="success">Send Email</Button>
            {success && <h4>Back to <Link to="/login">Login</Link> Page</h4>}
          </form>
        </div>
        <div>
        <img className='fp-image' src="https://images.unsplash.com/photo-1434873740857-1bc5653afda8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlnaHQlMjBob3VzZXxlbnwwfHwwfHw%3D&w=1000&q=80"></img>
      </div>
      </div>
    </div>
  );
}

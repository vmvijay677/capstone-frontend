import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export function PrivateScreen() {
  const history = useHistory();
  const [error, setError] = useState();
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async (e) => {
      e.preventDefault();

      const config = {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      };

      try {
        const { data } = await axios.get("https://capstone--backend.herokuapp.com/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError(error.response.data.error);
      }
    };

    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <div>
      {error && <span className="error-message">{error}</span>}
      <ThemeProvider theme={theme}>
        <Paper className="ps-background" style={{ borderRadius: "0px", minHeight: "123vh" }} elevation={4}>
          <div className="appbar">
            <AppBar position="fixed">
              <Toolbar>
                <Button color="inherit" onClick={() => history.push("/")} size="large">BLOGGER.IN</Button>
                <div className='blog-toolbar'>
                  <Button color="inherit" onClick={() => history.push("/")}>Home</Button>
                  <Button color="inherit" onClick={() => history.push("/blogs/view")}>All Blogs</Button>
                  <Button color="inherit" onClick={() => history.push("/blogs/add")}>Add Blogs</Button>
                </div>
                <Button
                  color="inherit"
                  startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  style={{ marginLeft: "auto" }}
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}>{mode === "light" ? "Dark" : "Light"}</Button>
                <Button color="inherit" onClick={logoutHandler}>Logout</Button>
              </Toolbar>
            </AppBar>
          </div>
          <h1 className="home-content">Welcome to Blogger.in</h1>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

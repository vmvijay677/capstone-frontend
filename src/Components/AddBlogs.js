import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export function AddBlogs() {
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [image, setImage] = useState(" ");
  const [user, setUser] = useState(" ");
  const history = useHistory();
  const [blogsList, setBlogsList] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    } else {
      fetch(`https://capstone--backend.herokuapp.com/private/blogs`, {
        method: "GET",
      })
        .then((data) => data.json()) //response object
        .then((bls) => setBlogsList(bls.blogs))
        .catch((err) => console.log(err));
    }
  }, []);

  const addBlogs = () => {
    const newBlogs = {
      title: title,
      description: description,
      image: image,
      user: user
    };

    fetch(`https://capstone--backend.herokuapp.com/private/blogs/add`, {
      method: "POST",
      body: JSON.stringify(newBlogs),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => history.push("/blogs/view"));
    setBlogsList([...blogsList, newBlogs]);
  };

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
      <ThemeProvider theme={theme}>
        <Paper className="add-background" style={{ borderRadius: "0px", minHeight: "150vh" }} elevation={4}>
          <div className="appbar">
            <AppBar position="fixed" style={mode === "light" ? {backgroundColor: "purple"} : {backgroundColor: "rgb(24, 21, 21)"}}>
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
          <div className='add-container' style={mode === "light" ? {backgroundColor: "white"} : {backgroundColor: "rgb(24, 21, 21)"}}>
            <h2 className="add-heading">ADD YOUR  FAVOURITE BLOG</h2>
            <TextField
              id="outlined-basic"
              className="input-field"
              label="Blog Title"
              color="primary"
              variant="outlined"
              onChange={(event) => setTitle(event.target.value)} />
            <br></br>
            <TextField
              id="outlined-basic"
              className="input-field"
              label="Blog Description"
              color="primary"
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)} />
            <br></br>
            <TextField
              id="outlined-basic"
              className="input-field"
              label="Username"
              color="primary"
              variant="outlined"
              onChange={(event) => setUser(event.target.value)} />
            <br></br>
            <TextField
              id="outlined-basic"
              className="input-field"
              label="Blog Image"
              color="primary"
              variant="outlined"
              onChange={(event) => setImage(event.target.value)} />
            <br></br>
            <div className="button-container">
              <Button id="button" variant="contained" color="warning" onClick={addBlogs}>Add Blog</Button>
              <Button id="button" variant="contained" color="primary" onClick={() => { history.push("/blogs/view") }}>Cancel</Button>
            </div>
          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

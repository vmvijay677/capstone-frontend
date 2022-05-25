import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BlogsContainer } from "./BlogsContainer";

export function BlogList() {
  const [blogList, setBlogList] = useState([]);
  const history = useHistory();

  const getBlogs = () => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    } else {
      fetch(`https://capstone--backend.herokuapp.com/private/blogs`, {
        method: "GET",
      }) //promise
        .then((data) => data.json())
        .then((bls) => setBlogList(bls.blogs));
    }
  };

  useEffect(() => getBlogs(), []);

  const deleteBlogs = (id) => {
    fetch(`https://capstone--backend.herokuapp.com/private/blogs/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => getBlogs());
  };

  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper className="blogs-background" style={{ borderRadius: "0px", minHeight: "173vh" }} elevation={4}>
          <div className="appbar">
            <AppBar position="fixed" style={mode === "light" ? {backgroundColor: "rgb(8, 184, 37)"} : {backgroundColor: "rgb(24, 21, 21)"}}>
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
          <div className='blogs-container'>
            {blogList.map(({ title, description, image, user, id, _id }, index) => <BlogsContainer
              key={_id}
              title={title}
              description={description}
              image={image}
              user={user}
              deleteButton={<IconButton aria-label="delete" style={{ marginLeft: "auto" }} color="error"
                onClick={() => deleteBlogs(_id)}
              ><DeleteIcon /></IconButton>}
              editButton={<IconButton aria-label="delete" size="large" color="primary" onClick={() => {
                //console.log(index); 
                history.push(`/blogs/edit/${_id}`);
              }}>
                <EditIcon fontSize="inherit" />
              </IconButton>}
              id={_id} />)}
          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

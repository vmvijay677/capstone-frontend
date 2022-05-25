import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { EditBlogsForm } from './EditBlogsForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Button from '@mui/material/Button';

export function EditBlogs() {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    } else {
      const fetchDetails = async () => {
        const res = await axios
          .get(`https://capstone--backend.herokuapp.com/private/blogs/${id}`)
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      };
      fetchDetails()
        .then((data) => setBlog(data.blog))
        .catch((err) => console.log(err));
    }
  }, [id]);
  //console.log(blog);

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
        <Paper className="edit-background" style={{ borderRadius: "0px", minHeight: "150vh" }} elevation={4}>
          <div className="appbar">
            <AppBar position="fixed" style={mode === "light" ? { backgroundColor: "skyblue" } : { backgroundColor: "rgb(24, 21, 21)" }}>
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
          {blog ? <EditBlogsForm blog={blog} style={mode === "light" ? {backgroundColor: "white"} : {backgroundColor: "rgb(24, 21, 21)"}}/> : <h2 style={{ margin: "20px", fontSize: "35px" }}>Loading...</h2>}
        </Paper>
      </ThemeProvider>
    </div>
  );
}

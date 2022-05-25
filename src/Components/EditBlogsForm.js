import { useHistory } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function EditBlogsForm({ blog, style }) {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [image, setImage] = useState(blog.image);
  const history = useHistory();

  const editBlogs = () => {
    const updatedBlog = {
      title: title,
      description: description,
      image: image
    };

    fetch(`https://capstone--backend.herokuapp.com/private/blogs/update/${blog._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBlog),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => history.push("/blogs/view"));
  };
  return (
    <div>
      <div className='edit-container' style={style}>
        <h2 className="add-heading">EDIT YOUR BLOG</h2>
        <TextField
          value={title}
          id="outlined-basic"
          className="input-field"
          label="Blog Title"
          color="primary"
          variant="outlined"
          onChange={(event) => setTitle(event.target.value)} />
        <br></br>
        <TextField
          value={description}
          id="outlined-basic"
          className="input-field"
          label="Blog Description"
          color="primary"
          variant="outlined"
          onChange={(event) => setDescription(event.target.value)} />
        <br></br>
        <TextField
          value={image}
          id="outlined-basic"
          className="input-field"
          label="Blog Image"
          color="primary"
          variant="outlined"
          onChange={(event) => setImage(event.target.value)} />
        <br></br>
        <div className="button-container">
          <Button id="button" variant="contained" color="warning" onClick={editBlogs}>Save Blog</Button>
          <Button id="button" variant="contained" color="primary" onClick={() => { history.push("/blogs/view") }}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

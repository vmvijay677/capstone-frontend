import Heart from "react-heart";
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export function BlogsContainer({ title, description, image, user, deleteButton, id, editButton }) {
  const [active, setActive] = useState(false);
  return (
    <div>
      <Card sx={{ width: 350, margin: 'auto', mt: 3, padding: 1 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="username">B</Avatar>}
          action={<IconButton aria-label="options">
            <MoreVertIcon />
          </IconButton>}
          title={user}
          subheader={title} />
        <CardMedia
          className='card-media'
          component="img"
          height="250"
          width="300"
          image={image}
          alt="image"
          padding="25" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Heart style={{ width: "1.5rem" }} isActive={active} onClick={() => setActive(!active)} />
          </IconButton>
          <div className='icons'>
            {deleteButton}
            {editButton}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

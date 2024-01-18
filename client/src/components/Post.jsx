import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

import {
  Card,
  Chip,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import noImage from "../images/no_image.svg";

const StyledRoot = styled("div")(({ theme }) => ({
  maxWidth: 374,
  position: "relative",
}));


const StyledChip = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const StyledOverlay = styled("div")({
  position: "absolute",
  top: "20px",
  left: "20px",
  color: "white",
});

const Post = ({ _id, title, subtitle, content, tag, image, createdAt }) => {
  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  return (
    <StyledRoot>
      <Card>
        <CardMedia
          component="img"
          height="194"
          borderRadius="5"
          marginTop="theme.spacing(3)"
          marginBottom="theme.spacing(4)"
          image={image || noImage}
          alt="Post"
        />
        <StyledOverlay>
      
            <Typography variant="h6">Mahir</Typography>
            <Typography variant="body2">
              {convertRelativeTime(createdAt)}
            </Typography>
     
        </StyledOverlay>
        <CardContent>
          <Typography variant="h6" component="p" gutterBottom>
            {title}
          </Typography>{" "}
          <Typography variant="overline" component="p" gutterBottom>
            {subtitle}
          </Typography>{" "}
          <Typography variant="body2" component="p" gutterBottom>
            {content?.substring(0, 150) + "..."}
          </Typography>
          <StyledChip>
            <Chip label={`# ${tag}`} variant="outlined" />
          </StyledChip>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`/posts/${_id}`}>Daha Fazla</Link>
          </Button>
        </CardActions>
      </Card>
    </StyledRoot>
  );
};

export default Post;

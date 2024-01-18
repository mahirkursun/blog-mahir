import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Typography, Paper, Divider, Button, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noImage from "../images/no_image.svg";
import { fetchSinglePost, deletePost } from "../actions/post";
import { useNavigate, useParams } from "react-router-dom";
import EditPostForm from "./EditPostForm";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(8),
}));

const StyledHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const StyledContent = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  borderRadius: 5,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPost = useSelector((state) => state.posts.currentPost);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    navigate("/posts");
  };

  const openEditMode = () => {
    setEditMode(true);
  };
  const closeEditMode = () => {
    setEditMode(false);
    navigate(`/posts/${currentPost._id}`);
  };

  return (
    <>
      <StyledPaper elevation={0}>
        {editMode ? (
          <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
        ) : (
          <div>
            <StyledHeader>
              <Typography variant="h5" gutterBottom>
                {currentPost?.title}
              </Typography>
              <div>
                <StyledButton
                  variant="outlined"
                  color="quaternary"
                  startIcon={<EditIcon />}
                  onClick={openEditMode}
                >
                  Düzenle
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="tertiary"
                  onClick={removePost}
                  startIcon={<DeleteIcon />}
                >
                  Sil
                </StyledButton>
              </div>
            </StyledHeader>
            <Divider />
            <Typography variant="overline" gutterBottom>
              {currentPost?.subtitle}
            </Typography>
            <Typography variant="caption" component="p" gutterBottom>
              {convertRelativeTime(currentPost?.createdAt)} by Mahir
            </Typography>
            <StyledChip label={`# ${currentPost?.tag}`} variant="outlined" />

            <StyledContent>
              <StyledImage src={currentPost?.image || noImage} alt="Post" />
              <Typography variant="body1">{currentPost?.content}</Typography>
            </StyledContent>
          </div>
        )}
      </StyledPaper>
    </>
  );
};

export default PostDetails;

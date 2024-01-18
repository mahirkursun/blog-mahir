import React, { useState } from "react";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import {
  Button,
  TextField,
  Select, 
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPost } from "../actions/post";
import { Paper } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
})); 
const tags = [
  "funny",
  "programming",
  "health",
  "science",
  "history",
  "politics",
];
const postSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(3).max(255),
  subtitle: yup.string().required("Subtitle is required").min(3).max(255),
  content: yup.string().required("Content is required").min(20),
  tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(postSchema),
  });
  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };
  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    //Dispatch create post action
    //dispatch(createPost(data));
    clearForm();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Yeni bir yazı oluşturmak için aşağıdaki formu doldurunuz.
        </DialogContentText>
        <StyledPaper elevation={0}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  id="title"
                  label="Başlık"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //error={errors.title ? true : false}
                />
              )}
            />
            <Controller
              name="subtitle"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  id="subtitle"
                  label="Alt Başlık"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //error={errors.subtitle ? true : false}
                />
              )}
            />

            <Controller
              name="tag"
              control={control}
              defaultValue={tags[0]}
              render={({ field }) => (
                <Select {...field} input={<Input />} fullWidth>
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  id="content"
                  label="İçerik"
                  multiline
                  rows={4}
                  variant="outlined"
                  size="small"
                  fullWidth
                  //error={errors.content ? true : false}
                />
              )}
            />
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
          </form>
        </StyledPaper>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearForm} color="inherit">
          Vazgeç
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Oluştur
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;

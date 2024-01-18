import React, { useState } from "react";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { Button, TextField, Select, Input, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePost } from "../actions/post";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButtons = styled("div")(({ theme }) => ({
 
  manginBottom: theme.spacing(2),
  float: "right",
}));
const StyledSelect = styled(Select)(({ theme }) => ({
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

const EditPostForm = ({ post, closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    };
    dispatch(updatePost(post._id, updatedPost));

    reset();
    setFile(null);
    closeEditMode();
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue={post?.title}
          render={({ field }) => (
            <StyledTextField
              {...field}
              id="title"
              label="Başlık"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
        <Controller
          name="subtitle"
          control={control}
          defaultValue={post?.subtitle}
          render={({ field }) => (
            <StyledTextField
              {...field}
              id="subtitle"
              label="Alt Başlık"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />

        <Controller
          render={({ field }) => (
            <StyledSelect {...field} input={<Input />} fullWidth>
              {tags.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </StyledSelect>
          )}
          name="tag"
          control={control}
          defaultValue={post?.tag}
        />
        <Controller
          name="content"
          control={control}
          defaultValue={post?.content}
          render={({ field }) => (
            <StyledTextField
              {...field}
              id="content"
              label="İçerik"
              multiline
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <StyledButtons>
          <Button color="tertiary" variant="outlined" onClick={closeEditMode}>
            Vazgeç
          </Button>{" "}
          <Button color="quaternary" variant="outlined" type="submit">
            Kaydet
          </Button>
        </StyledButtons>
      </form>
    </>
  );
};

export default EditPostForm;

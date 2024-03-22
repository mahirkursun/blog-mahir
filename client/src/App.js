import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PenIcon from "@mui/icons-material/Create";
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import { fetchPosts } from "./actions/post";
import PostDetails from "./components/PostDetails";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5', // light gray for background
    },
    primary: {
      main: '#757575', // dark gray for primary color
    },
    secondary: {
      main: '#ffffff', // white for secondary color
    },
    tertiary: {
      main: '#DD1414', // red for tertiary color
    },
    quaternary: {
      main: '#007BFF', // blue for quaternary color
    },
  },
});
const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  }; 
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar >
            <StyledIconButton edge="start" color="inherit" />
            <StyledTypography variant="h6" color="secondary">
              <a href="/posts">Blog-Mahir</a>
            </StyledTypography>
            <Button color="quaternary" variant="outlined" startIcon={<PenIcon />} onClick={handleOpen}>
              Yeni Yazı
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item xs={12}>
            <Router>
              <Routes>
                <Route path="/posts" element={<PostsList />} />
                <Route path="/posts/:id" element={<PostDetails />} />
              </Routes>
              <Link from="/" to="/posts" />
            </Router>
          </Grid>
        </Grid>
      </StyledContainer>

      <AddPostForm open={open} handleClose={handleClose} />
    </ThemeProvider>
  );
};

export default App;
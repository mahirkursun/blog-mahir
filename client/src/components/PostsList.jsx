import React, { useState } from "react";
import { styled } from '@mui/system';

import { useSelector } from "react-redux";
import { Grid, Button } from "@mui/material";
import Post from "./Post";
import gridFour from "../images/grid_four.svg";
import gridThree from "../images/grid_three.svg";

const LayoutShifter = styled('div')(({ theme }) => ({
  float: "right",
  margin: theme.spacing(2),
}));

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);

  const [layout, setLayout] = useState("gridThree");

  const calculateMd = () => {
    return layout === "gridThree" ? 4 : 3;
  };


  //xs={12} sm={6} md={6}
  return (
    <>
      {/* Layout Shifter */}
      <LayoutShifter>
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridThree")}
        >
          <img
            src={gridThree}
            alt="Three Colums Grid Layout"
            style={{ background: layout === "gridThree" ? "#ccc" : "" }}
          />
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridFour")}
        >
          <img
            src={gridFour}
            alt="Three Colums Grid Layout"
            style={{ background: layout === "gridThree" ? "#ccc" : "" }}
          />
        </Button>
        </LayoutShifter>
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={12} md={calculateMd()}>
              <Post {...post} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostsList;

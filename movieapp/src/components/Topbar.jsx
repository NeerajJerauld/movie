import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchTextField from "./SearchTextField";
import { useState } from "react";
import Home from "./Home";

const Topbar = ({val}) => {

 
  


  return (
    <div>
      <Grid
        container
        spacing={2}
        padding={"40px"}
        style={{ backgroundColor: "black" }}
      >
        <Grid item xs={3}>
          {/* <Typography fontSize={25}  color={"white"}>Movie Management App</Typography> */}
        </Grid>
        <Grid item xs={5} container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <Button variant="contained" color="primary">
              <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              <Link
                to={"/movie"}
                style={{ color: "white", textDecoration: "none" }}
              >
                Add Movie
              </Link>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              <Link
                to={"/aboutus"}
                style={{ color: "white", textDecoration: "none" }}
              >
                About us
              </Link>
            </Button>
          </Grid>
        </Grid>



        <Grid item xs={4}>
        {/* <SearchTextField onSearch={handleSearch}/> */}

      </Grid>



      </Grid>
    </div>
  );
};

export default Topbar;

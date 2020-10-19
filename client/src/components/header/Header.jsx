import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Button } from "@material-ui/core";
import CreateUser from "../users/CreateUser";
import CreateTeam from "../teams/CreateTeam";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 40px",
    height: "65px",
    position: "fixed",
    zIndex: "100",
    width: "100%",
    backgroundColor: "black",
    "& .height": {
      height: "65px",
    },
    "& a": {
      textDecoration: "none",
      fontSize: "16px",
      marginRight: "25px",
      fontWeight: "bold",
      color: "#b3b3b3",
    },
    "& button": {
      marginRight: "15px",
    },
    "& a:hover": {
      color: "rgb(73, 117, 208)",
    },
    "& h1": {
      fontWeight: "bold",
      color: "#b3b3b3",
      fontSize: "26px",
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container alignItems='center' classes={{ root: classes.root }}>
      <Grid container item alignItems='center' className='height' xs={7}>
        <h1>Dreamquark</h1>
      </Grid>
      <Grid item container alignItems='center' justify='flex-end' xs={5}>
        <Link to={`/users`}>Users</Link>
        <Link to={`/teams`}>Teams</Link>
      </Grid>
    </Grid>
  );
};

export default Header;

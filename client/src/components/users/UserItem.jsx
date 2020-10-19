import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddUserToTeam from "./AddUserToTeam";
import { Grid, Box, Typography, ButtonGroup, Button } from "@material-ui/core";
import { enumSquad } from "../constant/enumSquad";
import { capitalize } from "./utils";
import FormUpdateUser from "./FormUpdateUser";
const useStyles = makeStyles((theme) => ({
  root: {
    "& img": {
      transition: "border 1s",
      width: "280px",
      borderRadius: "140px",
    },

    "& .buttons button": {
      padding: "12px 24px",
      "& span span": {
        whiteSpace: "nowrap",
        fontSize: "16px",
      },
    },
  },
}));

const UserItem = ({ user }) => {
  const classes = useStyles();
  return (
    <Box
      mt={3}
      classes={{ root: classes.root }}
      bgcolor='black'
      borderRadius={10}
      padding={4}
      pl={6}
    >
      <Grid container justify='flex-start'>
        <Grid item xs={3} container>
          <img
            src={"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"}
            alt=''
          />
        </Grid>
        <Grid xs={6} item container direction='column'>
          <Grid item xs={8}>
            <Grid item container>
              <Typography variant='h4'>
                {capitalize(user.firstName)}&nbsp;
                {capitalize(user.lastName)}
              </Typography>
            </Grid>
            <Box mt={1}>
              <Typography variant='subtitle1'>
                <Grid item>{user.userRole}</Grid>
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant='subtitle2'>
                <Grid item>{user.email}</Grid>
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant='subtitle2'>
                <Grid item>
                  {user.team ? (
                    <> Member of: {user.team.name}</>
                  ) : (
                    <>no team yet</>
                  )}
                </Grid>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          spacing={2}
          container
          alignItems='baseline'
          direction='column'
          justify='flex-start'
        >
          <Grid item size={6}>
            <FormUpdateUser user={user} />
          </Grid>
          {!user.team && (
            <Grid item size={6}>
              <AddUserToTeam user={user} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserItem;

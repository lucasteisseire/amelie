import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { capitalize } from "./utils";
import { Grid, Box, Typography, ButtonGroup, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& img": {
      transition: "border 1s",
      width: "280px",
      borderRadius: "140px",
    },
    "& .box-member": {
      padding: "30px",
      width: "fit-content",
      backgroundColor: "rgb(73,117,208)",
      borderRadius: "20px",
      marginRight: "30px",
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

const TeamItem = ({ team }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <Grid container spacing={2}>
        <Grid container item xs={3}>
          <img
            src={
              "https://image.freepik.com/vecteurs-libre/quelques-superhero_23-2147501836.jpg?1"
            }
            alt=''
          />
        </Grid>
        <Grid xs={9} item container direction='column'>
          <Typography variant='h4'>{capitalize(team.name)}</Typography>
          <Typography variant='subtitle2'>Members of teams</Typography>
          <Grid container>
            {team.users.map((user) => {
              return (
                <Grid key={user.id} container className='box-member'>
                  <Grid item>
                    <Grid container>
                      <Typography variant='body2'>
                        {capitalize(user.firstName)}
                      </Typography>
                      &nbsp;
                      <Typography variant='body2'>
                        {capitalize(user.lastName)}
                      </Typography>
                    </Grid>
                    <Typography variant='body2'>
                      {capitalize(user.userRole)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamItem;

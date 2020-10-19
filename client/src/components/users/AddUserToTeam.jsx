import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER_TO_TEAM } from "../../graphql/mutation";
import { useForm, Controller } from "react-hook-form";
import { capitalize } from "./utils";

import {
  FormControlLabel,
  Grid,
  Box,
  Button,
  Typography,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { Error } from "../styled/index";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../ui/modal";
import { GET_TEAMS, GET_USERS } from "../../graphql/query";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .text-center": {
      textAlign: "center",
    },
  },
}));

const AddUserToTeam = ({ user }) => {
  const { loading, data, error, refetch } = useQuery(GET_TEAMS);
  const [updateErrors, setUpdateErrors] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [addUserToTeam, { data: dataUser }] = useMutation(ADD_USER_TO_TEAM, {
    refetchQueries: [{ query: GET_USERS }],
    onError(err) {
      setIsOpen(true);
      setUpdateErrors(err.graphQLErrors[0].message);
    },
    onCompleted() {
      setIsOpen(false);
      setUpdateErrors(null);
    },
  });
  useEffect(() => {
    if (data && updateErrors) {
      setIsOpen(true);
    }
  }, [data, dataUser]);
  const classes = useStyles();
  const { handleSubmit, errors, control } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      teamId: "",
    },
  });

  const onSubmit = (data) => {
    const { teamId } = data;
    addUserToTeam({
      variables: {
        userId: user.id,
        teamId,
      },
    }).then((data) => {
      setIsOpen(true);
      refetch();
    });
  };
  if (loading) return <div>loading...</div>;
  if (error) return <div>An error occurred</div>;
  if (!data?.getTeams.length)
    return <Typography>No teams: go to teams page to create!</Typography>;
  if (data.getTeams) {
    const { getTeams } = data;
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>add user to a team</Button>
        <Modal onClose={() => setIsOpen(false)} open={isOpen}>
          <Box padding={2} pl={5} pr={5} classes={{ root: classes.root }}>
            <Typography className='text-center' variant='subtitle1'>
              Add user to a team
            </Typography>
            <form className='large' onSubmit={handleSubmit(onSubmit)}>
              <Box pb={2} mt={4}>
                <Grid item>
                  <Controller
                    as={
                      <RadioGroup aria-label='gender'>
                        {getTeams.map((team) => {
                          return (
                            <FormControlLabel
                              key={team.id}
                              color='primary'
                              value={team.id}
                              control={<Radio />}
                              label={`${capitalize(team.name)} `}
                            />
                          );
                        })}
                      </RadioGroup>
                    }
                    name='teamId'
                    control={control}
                  />
                  <Error>{updateErrors}</Error>
                </Grid>
                <Grid
                  item
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      size='large'
                      color='primary'
                      onClick={() => setIsOpen(false)}
                    >
                      cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button size='large' color='primary' type='submit'>
                      validate
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Modal>
      </>
    );
  }
};

export default AddUserToTeam;

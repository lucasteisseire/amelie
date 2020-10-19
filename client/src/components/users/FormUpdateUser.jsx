import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/mutation";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  Box,
  Button,
  Typography,
  ButtonGroup,
} from "@material-ui/core";
import { Error } from "../styled/index";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../ui/modal";
import { enumSquad } from "../constant/enumSquad";
import { GET_USERS } from "../../graphql/query";

const useStyles = makeStyles(() => ({
  root: {
    "& .text-center": {
      textAlign: "center",
    },
    "& .checked": {
      backgroundColor: "purple",
    },
    "& button": {
      backgroundColor: "transparent",
      borderColor: "white",
    },
  },
}));

const FormUpdateUser = ({ user }) => {
  const [updateErrors, setUpdateErrors] = useState(null);
  const [updateUser, { data }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onError(err) {
      setIsOpen(true);
      setUpdateErrors(err.graphQLErrors[0].message);
    },
    onCompleted() {
      setUpdateErrors(null);
      setIsOpen(false);
    },
  });
  useEffect(() => {
    if (data && updateErrors) {
      setIsOpen(true);
      setSquadValue({
        checked: squadValue.checked,
        value: user.userRole,
      });
    }
  }, [data, updateErrors]);

  const [isOpen, setIsOpen] = useState(false);
  const [squadValue, setSquadValue] = useState(null);
  const classes = useStyles();
  const { handleSubmit, errors, control } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const onSubmit = (data) => {
    const { firstName, lastName, email } = data;
    updateUser({
      variables: {
        updateUserInput: {
          userId: user.id,
          firstName,
          lastName,
          email,
          userRole: squadValue || user.userRole,
        },
      },
    }).then((data) => {
      setSquadValue(null);
    });
  };
  const handleClick = (e) => {
    if (squadValue === e.currentTarget.value) {
      setSquadValue(null);
    } else {
      setSquadValue(e.currentTarget.value);
    }
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>update</Button>
      <Modal onClose={() => setIsOpen(false)} open={isOpen}>
        <Box padding={2} pl={5} pr={5} classes={{ root: classes.root }}>
          <Typography className='text-center' variant='subtitle1'>
            {`update ${user.firstName} ${user.lastName} `}
            {user.team?.name && `member of ${user.team.name}`}
          </Typography>
          <form className='large' onSubmit={handleSubmit(onSubmit)}>
            <Box pb={2} mt={4}>
              <Grid
                container
                direction='column'
                justify='space-between'
                spacing={3}
              >
                <Grid item>
                  {errors && errors.firstName && (
                    <span className='error'></span>
                  )}

                  <Controller
                    as={<TextField label='first name' variant='outlined' />}
                    name='firstName'
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\D*$/,
                        message: "Are you Louis XIV ?",
                      },
                      minLength: {
                        value: 2,
                        message: "First name must bet at least 2 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: "Your first name cant be that long",
                      },
                    }}
                  />
                  {errors && errors.firstName && (
                    <Error>{errors.firstName.message}</Error>
                  )}
                </Grid>
                <Grid item>
                  {errors && errors.lastName && <span className='error'></span>}
                  <Controller
                    as={<TextField label='last name' variant='outlined' />}
                    name='lastName'
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\D*$/,
                        message: "Are you Louis XIV ?",
                      },
                      minLength: {
                        value: 2,
                        message: "last name must bet at least 2 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: "last name cant be that long",
                      },
                    }}
                  />
                  {errors && errors.lastName && (
                    <Error>{errors.lastName.message}</Error>
                  )}
                </Grid>
                <Grid item>
                  {errors && errors.email && <span className='error'></span>}
                  <Controller
                    as={
                      <TextField
                        type='email'
                        label='email'
                        variant='outlined'
                      />
                    }
                    name='email'
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Your email is not valid",
                      },
                    }}
                  />
                  {errors && errors.email && (
                    <Error>{errors.email.message}</Error>
                  )}
                </Grid>
                <Grid item>
                  <ButtonGroup>
                    {user.userRole === enumSquad.STAGIAIRE && (
                      <Button
                        onClick={(e) => handleClick(e)}
                        value={enumSquad.SQUAD_MEMBER}
                        className={
                          squadValue === enumSquad.SQUAD_MEMBER
                            ? "checked"
                            : null
                        }
                      >
                        Be a member
                      </Button>
                    )}
                    {user.userRole === enumSquad.SQUAD_MEMBER && (
                      <ButtonGroup>
                        <Button
                          onClick={(e) => handleClick(e)}
                          value={enumSquad.SQUAD_LEADER}
                          className={
                            squadValue === enumSquad.SQUAD_LEADER
                              ? "checked"
                              : null
                          }
                        >
                          Be a Leader
                        </Button>
                        <Button
                          onClick={(e) => handleClick(e)}
                          value={enumSquad.STAGIAIRE}
                          className={
                            squadValue === enumSquad.STAGIAIRE
                              ? "checked"
                              : null
                          }
                        >
                          Be a stagiaire
                        </Button>
                      </ButtonGroup>
                    )}
                    {user.userRole === enumSquad.SQUAD_LEADER && (
                      <Button
                        onClick={(e) => handleClick(e)}
                        value={enumSquad.SQUAD_MEMBER}
                        className={
                          squadValue === enumSquad.SQUAD_MEMBER
                            ? "checked"
                            : null
                        }
                      >
                        Become member
                      </Button>
                    )}
                  </ButtonGroup>
                  <Error>{updateErrors ? updateErrors : null}</Error>
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
              </Grid>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default FormUpdateUser;

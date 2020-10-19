import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutation";
import { useForm, Controller } from "react-hook-form";
import { TextField, Grid, Box, Button, Typography } from "@material-ui/core";
import { Error } from "../styled/index";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../ui/modal";
import { GET_USERS } from "../../graphql/query";
import { gql } from "@apollo/client";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .text-center": {
      textAlign: "center",
    },
  },
}));

const CreateUser = ({ refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const { handleSubmit, errors, control } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const { firstName, lastName, email, password } = data;
    createUser({
      variables: {
        userInput: {
          firstName,
          lastName,
          email,
          password,
        },
      },
    }).then((data) => {
      setIsOpen(false);
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add new user</Button>
      <Modal onClose={() => setIsOpen(false)} open={isOpen}>
        <Box padding={2} pl={5} pr={5} classes={{ root: classes.root }}>
          <Typography className='text-center' variant='subtitle1'>
            Add a new user
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
                  {errors && errors.password && <span className='error'></span>}
                  <Controller
                    as={
                      <TextField
                        type='password'
                        label='password'
                        variant='outlined'
                      />
                    }
                    name='password'
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must bet at least 8 characters",
                      },
                    }}
                  />
                  {errors && errors.password && (
                    <Error>{errors.password.message}</Error>
                  )}
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

export default CreateUser;

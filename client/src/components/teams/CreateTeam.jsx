import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "../../graphql/mutation";
import { useForm, Controller } from "react-hook-form";
import { TextField, Grid, Box, Button, Typography } from "@material-ui/core";
import { Error } from "../styled/index";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../ui/modal";
import { GET_TEAMS } from "../../graphql/query";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .text-center": {
      textAlign: "center",
    },
  },
}));

const CreateTeam = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const [createTeam] = useMutation(CREATE_TEAM, {
    refetchQueries: [{ query: GET_TEAMS }],
  });
  const { handleSubmit, errors, control } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data) => {
    const { name } = data;
    createTeam({
      variables: { name },
    }).then((data) => {
      setIsOpen(false);
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add new Team</Button>
      <Modal onClose={() => setIsOpen(false)} open={isOpen}>
        <Box padding={2} pl={5} pr={5} classes={{ root: classes.root }}>
          <Typography className='text-center' variant='subtitle1'>
            Add a new team
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
                  {errors && errors.name && <span className='error'></span>}

                  <Controller
                    as={<TextField label='name' variant='outlined' />}
                    name='name'
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
                  {errors && errors.name && (
                    <Error>{errors.name.message}</Error>
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

export default CreateTeam;

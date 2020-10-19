import React from "react";
import AllUsers from "./AllUsers";
import { Box, Typography } from "@material-ui/core";
import CreateUser from "./CreateUser";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/query";
const Users = () => {
  const { loading, data, error, refetch } = useQuery(GET_USERS);
  if (loading) return <div>loading...</div>;
  if (error) return <div>An error occurred</div>;
  if (!data) return <div>No users found!</div>;
  if (data) {
    const { getUsers } = data;
    return (
      <Box>
        <Typography variant='h2'>All Users</Typography>
        <CreateUser refetch={refetch} />
        <AllUsers users={getUsers} />
      </Box>
    );
  }
};

export default Users;

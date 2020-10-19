import React from "react";
import AllTeams from "./AllTeams";
import { useQuery } from "@apollo/client";
import { GET_TEAMS } from "../../graphql/query";
import { Box, Typography } from "@material-ui/core";
import CreateTeam from "./CreateTeam";

const Teams = () => {
  const { loading, data, error } = useQuery(GET_TEAMS);
  if (loading) return <div>loading...</div>;
  if (error) return <div>An error occurred</div>;
  if (!data) return <div>No teams found!</div>;
  if (data) {
    const { getTeams } = data;

    return (
      <Box>
        <Typography variant='h2'>All Teams</Typography>
        <CreateTeam />
        <AllTeams teams={getTeams} />
      </Box>
    );
  }
};

export default Teams;

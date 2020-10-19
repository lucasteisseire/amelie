import React from "react";
import TeamItem from "./TeamItem.jsx";

const AllTeams = ({ teams }) => {
  return (
    <>
      {teams.map((team) => {
        return <TeamItem key={team.id} team={team} />;
      })}
    </>
  );
};

export default AllTeams;

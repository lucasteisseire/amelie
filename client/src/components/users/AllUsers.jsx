import React from "react";
import UserItem from "./UserItem";

const AllUsers = ({ users, client }) => {
  return (
    <>
      {users?.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </>
  );
};

export default AllUsers;

import React from "react";

const UserData = props => {
  return (
    <div className="user-info">
      <p> {JSON.stringify(props)} </p>
    </div>
  );
};

export default UserData;
import React from "react";
import UserData from '../UserData';

import { Alert } from 'antd';

function onChange(date, dateString) {
  console.log(date, dateString);
}
const UserInfo = props => {
  return (
    <div className="user-info">

      <Alert message="Success Text" type="success" />
      <Alert message="Info Text" type="info" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" />

      <div className="avatar">
        <img src={props.user.avatar_url} alt="avatar" width="250px" />
      </div>
      <div className="content">
        <h1>{props.user.name}</h1>
        <UserData user={props.user} />
      </div>
    </div>
  );
};

export default UserInfo;
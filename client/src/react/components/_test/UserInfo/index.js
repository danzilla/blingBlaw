import React from "react";
import UserData from '../UserData';

import { Button } from 'antd';
import { DatePicker } from 'antd';

function onChange(date, dateString) {
  console.log(date, dateString);
}
const UserInfo = props => {
  return (
    <div className="user-info">


<Button type="primary">Dashed</Button>

<div>
  </div>
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
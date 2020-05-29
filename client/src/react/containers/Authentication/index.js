'use strict';
import React from "react";
// Load module
import Login from '../../components/Authentication/login_page';
import Register from '../../components/Authentication/register_page';
import FirstRun from '../../components/Authentication/firstRun_page';
// Authentication
const Authentication = () => {
  return (
    <div className="user-info">
      <Login />
      <Register />
      <FirstRun />
    </div>
  );
};
// Export
export default Authentication;
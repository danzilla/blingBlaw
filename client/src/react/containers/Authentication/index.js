'use strict';
import React from "react";
// React components
import Login from '../../components/authentication/login_page';
import Register from '../../components/authentication/register_page';
import FirstRun from '../../components/authentication/firstRun_page';
// Authentication
function Authentication() {
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
import React, { useState } from "react";
// Load module
import Login from '../../components/Authentication/login_page';
import Register from '../../components/Authentication/register_page';
import FirstRun from '../../components/Authentication/firstRun_page';
// Authentication
const Authentication = () => {
  // ActivePages
  const [ActivePage, setActivePage] = useState({
    loginPage: true,
    registerPage: false,
    initalDBPage: false
  })
  // Triggers
  const activeLogin = () => {
    setActivePage({ loginPage: true, registerPage: false, initalDBPage: false })
  }
  const activeRegister = () => {
    setActivePage({ loginPage: false, registerPage: true, initalDBPage: false })
  }
  const activeDB = () => {
    setActivePage({ loginPage: false, registerPage: false, initalDBPage: true })
  }
  // Display Pages
  let DisplayPage;
  if (ActivePage.loginPage == true) {
    DisplayPage = <Login activeRegister={activeRegister} activeDB={activeDB} />
  } else if (ActivePage.registerPage == true) {
    DisplayPage = <Register activeLogin={activeLogin} activeDB={activeDB} />
  } else if (ActivePage.initalDBPage == true) {
    DisplayPage = <FirstRun activeRegister={activeRegister} />
  } else {
    DisplayPage = <Login activeRegister={activeRegister} />
  }
  // Render
  return (<div className="user-info">{DisplayPage}</div>);
};
// Export
export default Authentication;
// Authentication Page
import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
// Contents 
import LoginPage from '../../react/containers/authentication/login_page';
import RegisterForm from '../../react/containers/authentication/register_page';
import FirstRunPage from '../../react/containers/authentication/firstRun_page';
// Authentication
function Authentication(props) {
  // React-hookz - authDisplay
  const [authDisplay, setAuthDisplay] = useState({
    isLogin: true,
    isRegister: false,
    isFirstRun: false
  });
  // Display triggers
  const activeLogin = () => {
    setAuthDisplay({
      ...authDisplay, isLogin: true, isRegister: false, isFirstRun:false 
    });
  };
  const activeRegister = () => {
    setAuthDisplay({
      ...authDisplay, isLogin: false, isRegister: true, isFirstRun:false 
    });
  };
  const activeFirstRun = () => {
    setAuthDisplay({
      ...authDisplay, isLogin: false, isRegister: false, isFirstRun:true 
    });
  };
  // Shuffle through which page to display
  let displayPage;
  if(authDisplay.isLogin === true){
    displayPage = <LoginPage activeRegister={activeRegister} activeFirstRun={activeFirstRun} />
  } else if(authDisplay.isRegister === true){
    displayPage = <RegisterForm activeLogin={activeLogin} activeFirstRun={activeFirstRun} />
  } else if(authDisplay.isFirstRun === true){
    displayPage = <FirstRunPage activeRegister={activeRegister} activeLogin={activeLogin}  />
  } else {
    displayPage = <LoginPage activeRegister={activeRegister} activeFirstRun={activeFirstRun} />
  }
  // Authentication view
  return (displayPage);
}
export default withRouter(Authentication);
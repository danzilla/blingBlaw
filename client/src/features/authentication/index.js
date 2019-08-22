// Authentication Page
import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col} from 'antd';
import { emojify } from 'react-emojione';

// Contents 
import LoginPage from '../../containers/authentication/login_page';
import RegisterForm from '../../containers/authentication/register_page';
import FirstRunPage from '../../containers/authentication/firstRun_page';

// Authentication
function Authentication(props) {
  // React-hookz - authDisplay
  const [authDisplay, setAuthDisplay] = useState({
    isLogin: false,
    isRegister: false,
    isFirstRun: true
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
      ...authDisplay, isLogin: true, isRegister: false, isFirstRun:true 
    });
  };
  // Shuffle through which page to display
  let pageName, displayPage;
  if(authDisplay.isLogin === true){
    pageName = "Sign-in ";
    displayPage = <LoginPage activeRegister={activeRegister} />
  } else if(authDisplay.isRegister === true){
    pageName = "Register ";
    displayPage = <RegisterForm activeLogin={activeLogin} />
  } else if(authDisplay.isFirstRun === true){
    pageName = "First-run ";
    displayPage = <FirstRunPage activeRegister={activeRegister} />
  } else {
    pageName = "Login ";
    displayPage = <LoginPage activeRegister={activeRegister} />
  }
  // Authentication view
  return (
    <Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
      <Col xs={20} sm={15} md={10} lg={5} className="card-2 p-2">
        {displayPage}
      </Col>
    </Row>
  );
}
export default withRouter(Authentication);



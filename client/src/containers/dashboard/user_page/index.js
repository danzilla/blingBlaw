import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Alert, Col, Row, Button } from 'antd';
// axios-post 
import axios from 'axios';
// UserContent
function UserContent(props){
    // React-hookz - userAddInfo
    const [userAddInfo, setUserAddInfo] = useState({
        userName: ""
    });
    // onChange - get and set state for Login form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserAddInfo({...userAddInfo, [name]: value});
    };
    // onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    // UserContent
    return (
        <Row type="flex">
            <h1>User_page {emojify(":hamster:")}</h1>
            <Alert
                message="user SessionInfo"
                description={JSON.stringify(props.userSessionInfo)}
                type="success"
                showIcon />
        </Row>
    );
}
export default withRouter(UserContent);
import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Col } from 'antd';
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
        <h1>Account_Page {emojify(":hamster:")}</h1>
    );
}
export default withRouter(UserContent);
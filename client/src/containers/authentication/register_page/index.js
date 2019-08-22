import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Row, Form, Icon, Button, message } from 'antd';
// axios-post 
import axios from 'axios';
// RegisterForm
function RegisterForm(props){
    // React-hookz - userAddInfo
    const [userAddInfo, setUserAddInfo] = useState({
        userName: "",
        userPassword: "",
        userFannyPack: ""
    });
    // onChange - get and set state for Login form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserAddInfo({...userAddInfo, [name]: value});
    };
    // onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!userAddInfo.userName || !userAddInfo.userPassword || !userAddInfo.userFannyPack ){
             message.warning("User name and Password are required");
        } else {
        // axios_fetch_post
        axios.post("http://localhost:5000/user/add", {
                userName: userAddInfo.userName,
                userPassword: userAddInfo.userPassword,
                userFannyPack: userAddInfo.userFannyPack
            })
            .then((data) => {
                if(data.data.pageMessage.checked === "checked"){
                    message.success(data.data.pageMessage.message, 2.5);
                } else {
                    message.warning(data.data.pageMessage.message, 2.5);
                }
            })
            .catch((err) => {
                message.error(err.message);
            });
        }
    };
    // RegisterForm
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item> 
                <Input
                    name="userFannyPack" 
                    value={userAddInfo.userFannyPack} type="text" placeholder="FannyPackz"
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={handleChange} required />
            </Form.Item>
            <Form.Item> 
                <Input
                    placeholder="Username"
                    name="userName" 
                    value={userAddInfo.userName}
                    type="text"
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={handleChange} required />
            </Form.Item>
            <Form.Item>
                <Input.Password 
                    placeholder="Password"
                    name="userPassword" 
                    value={userAddInfo.userPassword} 
                    type="password"
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,1,.25)' }} />}
                    onChange={handleChange} required />
            </Form.Item>
            <Form.Item>
                <Row type="flex" justify="center">
                    <Button
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button">
                        Register
                    </Button> 
                    <Button 
                        onClick={props.activeLogin}
                        type="link">
                        Sign-in
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
}
export default withRouter(RegisterForm);
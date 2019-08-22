import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Row, Form, Icon, Button, message } from 'antd';
// axios-post 
import axios from 'axios';
// LoginForm
function LoginForm(props){
    // React-hookz - loginInfo
    const [loginInfo, setLoginInfo] = useState({
        userName: "",
        userPassword: ""
    });
    // onChange - get and set state for Login form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name]: value});
    };
    // onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!loginInfo.userName || !loginInfo.userPassword ){
            message.warning("User name and Password are required");
        } else {
        // axios_fetch_post
        axios.post("http://localhost:5000/user/login", {
                userName: loginInfo.userName,
                userPassword: loginInfo.userPassword
            })
            .then((data) => {
                if(data.data.pageMessage.checked === "checked"){
                    message.success(data.data.pageMessage.message, 1.5);
                    localStorage.setItem('blingBlaw', data.data.pageMessage.result);
                } else {
                    message.warning(data.data.pageMessage.message, 1.5);
                }
            })
            .catch((err) => {
                message.error(err.message);
            });
        }
    };
    // LoginForm
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item> 
                <Input
                    name="userName" 
                    value={loginInfo.userName} type="text" placeholder="Username"
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={handleChange} required />
            </Form.Item>
            <Form.Item>
                <Input.Password 
                    placeholder="Password"
                    name="userPassword" 
                    value={loginInfo.userPassword} 
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
                        Log in
                    </Button> 
                    <Button
                        onClick={props.activeRegister}
                        type="link">
                        Register
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
}
export default withRouter(LoginForm);
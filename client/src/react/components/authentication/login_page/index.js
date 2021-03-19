import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Input, Col, Row, Form, Icon, Button, message } from 'antd';
// axios-post 
import axios from 'axios';
// LoginForm
const LoginForm = (props) => {
    
    // UseEffects
    let session;
    useEffect(() => {
        session = sessionStorage.getItem('session');
        if (session) { 
            message.success("Welcome back!");
            props.history.push("/dashboard");
        }
    }, [session]);

    // React-hookz - loginInfo
    const [loginInfo, setLoginInfo] = useState({ userName: "", userPassword: "" });
    // onChange - get and set state for Login form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    // onSubmit
    const handleSubmit = (e) => {
        // axios_fetch_post
        e.preventDefault();
        if (!loginInfo.userName || !loginInfo.userPassword) {
            message.warning("User name and Password are required");
        } else {
            // axios_fetch_post
            axios.post("http://localhost:5000/api/user/login", {
                user: loginInfo.userName, password: loginInfo.userPassword
            })
                .then((data) => {    
                    if (data.data.status == true) {
                        console.log("User: " + data.data.data[0].rows[0].user_name);
                        // If all good - setLocalStorage
                        // let userInfo = JSON.stringify(data.data.pageMessage.result);
                        // localStorage.setItem('sessionID', userInfo);
                        // Why not session too
                        // Check Box? or Default?
                        sessionStorage.setItem('session', JSON.stringify(data.data.data[0].rows[0]));
                        message.success(data.data.message, 2.5);
                        props.history.push("/dashboard");
                    } else if (data.data.data.code == "3D000") {
                        props.activeDB()
                        message.warning(data.data.message, 2.5); 
                    } else { 
                        message.warning(data.data.message, 2.5); 
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err));
                    message.error(err.message); 
                });
        }
    };

    // displayContent
    let displayContent = <Form onSubmit={handleSubmit}>
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
                    onClick={handleSubmit}
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
    </Form>;

    // LoginForm
    return (
        <Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
            <Col xs={20} sm={15} md={8} lg={8} className="card-2 p-2">
                <h1>Sign-in {emojify(":rocket:")}</h1>
                {displayContent}
            </Col>
        </Row>
    );
}
export default withRouter(LoginForm);
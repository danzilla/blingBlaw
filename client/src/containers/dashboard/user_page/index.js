import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Alert, Row } from 'antd';
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
    let dummyData = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus";
    return (
        <Row type="flex">
            <h1>User_page {emojify(":hamster:")}</h1>
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="error"
                showIcon />
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="info"
                showIcon />
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="success"
                showIcon />
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="error"
                showIcon />
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="warning"
                showIcon />
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="info"
                showIcon />
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="success"
                showIcon />
            <Alert
                message="user SessionInfo"
                description={dummyData}
                type="error"
                showIcon />
        </Row>
    );
}
export default withRouter(UserContent);
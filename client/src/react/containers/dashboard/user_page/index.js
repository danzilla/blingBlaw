import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';

import { Alert, Row, Col } from 'antd';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;


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
        <Layout 
            className="p-4 overflowN" 
            style={{ height: '100vh', backgroundColor: '#000000', color: '#ffffff' }}>
            
            <Content 
                className="card-2 p-4"
                style={{ height: '100vh', backgroundColor: '#ffffff', color: '#000000' }}>

                    <Row type="flex" justify="center" align="middle">
                        
                        <Col xs={8} sm={8} md={8} lg={8} className="card-1 p-2">
                            <h1>FannyPackz</h1>
                            {dummyData}
                            {dummyData}
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} className="card-1 p-2">
                            {dummyData}
                            {dummyData}
                        </Col>

                    </Row>
                    
            </Content>

        </Layout>
    );
}
export default withRouter(UserContent);

/*
<Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
            <Col xs={5} sm={5} md={5} lg={5} className="card-2 p-2">
                <h1>User_page {emojify(":hamster:")}</h1>
                <Alert
                    message="user SessionInfo"
                    description={dummyData}
                    type="error"
                    showIcon />
            </Col>
            <Col xs={15} sm={15} md={15} lg={15} className="card-2 p-2">
                {JSON.stringify(props)}
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
            </Col>
        </Row>  


*/
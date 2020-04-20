import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Popover, Timeline, Button, message, Row, Col, Icon } from 'antd';
// axios-post 
import axios from 'axios';
// FirstRunForm
function FirstRunForm(props){
    const [firstRunResult, setFirstRunResult] = useState({});
    const [fetchLoading, setFetchLocading] = useState(false);
    // onSubmit
    const handleSubmit = (e) => {
        setFetchLocading(true);
        e.preventDefault();
        // axios_fetch_post
        axios.get("http://localhost:5000/firstrun")
        .then((data) => {
            if (data.data.pageMessage.checked === "checked"){
                setFirstRunResult(data.data.pageMessage.result);
                message.success(data.data.pageMessage.message, 2.5);
            } else {
                setFirstRunResult(data.data.pageMessage.result);
                message.warning(data.data.pageMessage.message, 2.5);
            }
        })
        .catch((err) => {
            message.error(err.message);
        });
    };    // displayContent
    let displayContent;
    if(!firstRunResult.length > 0){
        displayContent = <Row type="flex" justify="center">
                            <Button
                                className="card-2"
                                style={{ fontSize: '40px', height:"100%"}}
                                type="link"
                                onClick={handleSubmit}
                                loading={fetchLoading}>
                                Intiate First-run setup {emojify(":stars:")}
                            </Button>
                        </Row>
    } else {
        displayContent = <Row type="flex" justify="center" align="middle">
                    <Col span={22}>
                        <h1>Intial First-run {emojify(":kiss:")}</h1>
                    </Col>
                    <Col span={22}>
                        <Timeline>
                            {firstRunResult.length > 0 &&
                                firstRunResult.map((value, index) => {
                                    let color;
                                    if(value.checked === "checked") {
                                        color = "green"
                                    } else { color = "red" }
                                    return <Popover content={JSON.stringify(value.result)} title={value.title}>
                                        <Timeline.Item key={index} color={color}>{value.title}</Timeline.Item>
                                    </Popover>
                                })
                            }
                        </Timeline>
                    </Col>
                    <Col span={22}>
                        <Button
                            onClick={props.activeRegister} 
                            type="primary">
                            <Icon type="left" />
                            Register
                        </Button>
                    </Col>
                </Row>
    }
    // FirstRunForm
    return (
        <Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
            <Col xs={20} sm={15} md={10} lg={5}>
                {displayContent}
            </Col>
        </Row>
    );
}
export default withRouter(FirstRunForm);
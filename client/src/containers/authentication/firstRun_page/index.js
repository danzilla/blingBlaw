import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { Timeline, Button, message, Row } from 'antd';
// axios-post 
import axios from 'axios';
// FirstRunForm
function FirstRunForm(props){
    const [firstRunResult, setFirstRunResult] = useState({});
    // onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        // axios_fetch_post
        axios.get("http://localhost:5000/firstrun")
        .then((data) => {
            if(data.data.pageMessage.checked === "checked"){
                setFirstRunResult(data.data.pageMessage.result);
                message.success(data.data.pageMessage.message, 1.5);
            } else {
                setFirstRunResult(data.data.pageMessage.result);
                message.warning(data.data.pageMessage.message, 1.5);
            }
        })
        .catch((err) => {
            message.error(err.message);
        });
    };
    // FirstRunForm
    return (
        <div>
            <Row type="flex" justify="center">
                <Button 
                    onClick={handleSubmit}
                    type="danger" 
                    size="large">
                    Intiate First-Run setup
                </Button>
            </Row>
            <Timeline>
                {firstRunResult.length > 0 &&
                    firstRunResult.map((value, index) => {
                        let color;
                        if(value.checked == "checked") {
                            color = "green"
                        } else { color = "red" }
                        return <Timeline.Item key={index} color={color}>{value.title}</Timeline.Item>
                    })
                }
            </Timeline>
        </div>
    );
}
export default withRouter(FirstRunForm);
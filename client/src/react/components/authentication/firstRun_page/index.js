import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Button, message, Row, Col } from 'antd';
// axios-post 
import axios from 'axios';
// FirstRunForm
const FirstRunForm = (props) => {
    const [is_db_good, setIsDB] = useState(false);
    const [fetchLoading, setFetchLocading] = useState(false);
    const [resData, setResData] = useState({});
    // onSubmit
    const handleSubmit = (e) => {
        setFetchLocading(true);
        e.preventDefault();
        // axios_fetch_post
        axios.get("http://localhost:5000/api/install")
            .then((data) => {
                if (data.data.code = "42P04") {
                    message.warning(data.data.message);
                    setFetchLocading(false);
                    setIsDB(true);
                    setResData(data.data);
                }
                else if(data.data.status == true){
                    message.success(data.data.message);
                    setFetchLocading(false);
                    setIsDB(true);
                    setResData(data.data);
                } else {
                    message.error("Something else wrong...");
                    setFetchLocading(false);
                    setIsDB(false);
                    setResData(data.data);
                }
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
                message.error(err.message);
                setFetchLocading(false);
            });
    };    // displayContent
    let displayContent;
    if (!is_db_good) {
        displayContent = <Row type="flex" justify="center">
            <Button
                className="card-2"
                style={{ fontSize: '40px', height: "100%" }}
                type="link"
                onClick={handleSubmit}
                loading={fetchLoading}>
                Intiate First-run setup {emojify(":stars:")}
            </Button>
        </Row>
    } else {
        displayContent = <Row type="flex" justify="center">
            <Button
                className="card-1-no"
                style={{ fontSize: '40px', height: "100%" }}
                type="link"
                loading={fetchLoading}>
                Database and structure initialised!  {emojify(":kiss:")}
            </Button>
            <Button
                onClick={props.activeRegister}
                style={{ fontSize: '25px', height: "100%" }}
                type="danger"> 
                Register an Account
            </Button>
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
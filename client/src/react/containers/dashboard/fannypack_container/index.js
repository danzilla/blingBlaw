import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Row, Col, Button, Icon  } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const ButtonGroup = Button.Group;

// FannyContainer
function FannyContainer(props){
    // emojify - Font size
    const emojifyOptions = {
        style: {
            height: 70,
        }
    };
    let dummyData = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus";
    return (
        <div className="p-2">
            <Row type="flex" justify="end" align="middle">
                <a href="/" className="brand-logo px-2 left">{emojify(':rocket:', emojifyOptions)}</a>
            </Row>
            <Row type="flex" justify="start" align="">
                <Title>FannyPackz 
                    <ButtonGroup className="px-1">
                        <Button type="primary" icon="plus" />
                        <Button type="primary" icon="sync" />
                    </ButtonGroup>
                </Title>
            </Row>
            <Row type="flex" justify="center" align="middle">
                <Col> 
                    {props.fannyPackz.map(function(item, i){
                        return <p key={i}>{item.fannypack_serial}</p>
                    })}
                </Col>
            </Row>
        </div>
    );
}
export default withRouter(FannyContainer);

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { emojify } from 'react-emojione';
import { Input, Card, Row, Col, Form, Icon, Button } from 'antd';

// Login
class Login extends Component {
  // states
  constructor(props) {
    super(props)
    this.state = { 
      pageName: "BlingBlaw"
   }
  }

  // onSubmit
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // Login
  render() {
    return (
      <Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
        <Col span={6}>
          <Card title={this.state.pageName} className="card-1">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text" placeholder="Username" />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,1,.25)' }} />}
                  type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Row type="flex" justify="center">
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button> 
                  <Button type="link">
                    Register
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default withRouter(Login);
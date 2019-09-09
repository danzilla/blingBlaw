import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import { emojify } from 'react-emojione';

import { Layout, Row, Col } from 'antd';
import { Alert, message, Tabs, Menu, Modal, Dropdown, Icon, Form } from 'antd';
import { Typography, Button, Input, Select } from 'antd';
import { List, Avatar, Skeleton, Card } from 'antd';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Text, Paragraph } = Typography;
// AccountRecords
function AccountRecords(props){
    // Account State
    const [newAccount, setNewAccount] = useState({ AccountAddModalVisable: false, newAccountName: "", accountType: "", accountFanny: "" });
    const ShowAccountAddModal = (state) => { setNewAccount({...newAccount, accountType: "", newAccountName: "",  AccountAddModalVisable: state})};
    const CreateNewAccount = () => {
        // getSess
        let sessInfo = sessionStorage.getItem('sessionID');
        // axios_fetch_post
        axios.post("http://localhost:5000/Account/add", {
            userSerial: sessInfo, 
            accountName: newAccount.newAccountName, 
            accountType: newAccount.accountType, 
            fannyPack: newAccount.accountFanny.fannypack_serial
        })
        .then((data) => { message.success(JSON.stringify(data), 2.5); props.Refresh_FannyPack_Account(); })
        .catch((err) => { message.info(JSON.stringify(err), 2.5); })
        // Clear field and close form
        setNewAccount({...newAccount, accountType: "", newAccountName: "",  AccountAddModalVisable: false})
    };
    // AccountTypes
    const changeAccountType = (value) => {
        setNewAccount({...newAccount, accountType: value});
    }
    const AccountTypes = (
        <Select onChange={changeAccountType} value="1" style={{ width: '100%'}}>
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
        </Select>
      );
    // User Effect and pass => props with []
    useEffect(() => {
        setNewAccount({...newAccount, accountFanny: props.activeFannyPack});
    }, [props.fannyAccountz]);

    // Account Records
    return (
        <Layout>
            {/* Add new Account Modal */}
            <Modal centered visible={newAccount.AccountAddModalVisable}
                onOk={(CreateNewAccount)}
                onCancel={() => ShowAccountAddModal(false)}
                okText="Create"
                cancelText="Cancel">
                <Title>Create Account {emojify(":money_with_wings:")}</Title>
                <Row type="flex" justify="center" align="middle" className="p-1">

                    <InputGroup size="large">
                        <Row type="flex" justify="center" align="middle">
                            <Col span={8}>
                                <Input defaultValue={newAccount.accountFanny.fannypack_name} disabled />
                            </Col>
                            <Col span={16}>
                                <Input
                                    addonBefore={AccountTypes}
                                    placeholder="New Account" size="large" type="text"
                                    value={newAccount.newAccountName} 
                                    onChange={e => setNewAccount({...newAccount, newAccountName: e.target.value})}
                                    prefix={<Icon type="wallet" theme="twoTone" />} allowClear />
                            </Col>
                        </Row>
                    </InputGroup>
                </Row>
            </Modal>
            <Card 
                className="card-1"
                title={<Title level={3}>Accountz</Title>}
                bordered={true}
                extra={
                    <ButtonGroup>
                        <Button onClick={() => ShowAccountAddModal(true)} className="card-2" type="link"><Icon size="large" type="plus" /></Button>,
                        <Button onClick={() => props.Refresh_FannyPack_Account()} className="card-2" type="link"><Icon size="large" type="sync" /></Button>
                    </ButtonGroup>}>

                    <List
                        className="demo-loadmore-list"
                        loading={false}
                        itemLayout="horizontal"
                        dataSource={props.fannyAccountz}
                        renderItem={item => (
                        <List.Item 
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}>
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta title={<a href="#">{item.account_name} - {item.account_type_id} - {item.account_lastmodify}</a>} />
                            </Skeleton>
                        </List.Item>
                        )}
                    />
            </Card>
        </Layout>
    );
}
export default withRouter(AccountRecords);

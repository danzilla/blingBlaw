import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';
import { Layout, Row, Col, List, Skeleton, Card, message, Modal, Icon, Typography, Button, Input  } from 'antd';
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Title } = Typography;
// AccountTypes
function AccountTypes(props){
    // AccountTypes State
    let accountType = { accountTypeName: "", accountFanny: props.activeFannyPack };
    const [newAccountTypes, setNewAccountTypes] = useState(accountType);
    const [accountTypeAddModal, setAccountTypeAddModal] = useState(false);
    const accountTypeModalVisable = (visableState) => {setAccountTypeAddModal(visableState)};
    // Account Types
    const CreateNewAccountTypes = () => {
        axios.post("http://localhost:5000/Account/type/add", {
            accountTypeName: newAccountTypes.accountTypeName, 
            fannyPack: newAccountTypes.accountFanny.fannypack_serial
        })
        .then((data) => { message.success(JSON.stringify(data), 2.5); props.Refresh_FannyPack_Account(); })
        .catch((err) => { message.info(JSON.stringify(err), 2.5); });
        // Clear field and close form 
        accountTypeModalVisable(false);
        setNewAccountTypes(accountType);
    };
    let isLoading = true;
    // Check if its array
    if(Array.isArray(props.fannyAccountType)){ isLoading = false; };
    // User Effect and pass => props with []
    useEffect(() => { 
        setNewAccountTypes({...newAccountTypes, accountFanny: props.activeFannyPack});
    }, [props.activeFannyPack]);
    // Account Types
    return (
        <Layout>
            {/* Add new Account Modal */}
            <Modal centered visible={accountTypeAddModal}
                onOk={(CreateNewAccountTypes)}
                onCancel={() => accountTypeModalVisable(false)}
                okText="Create"
                cancelText="Cancel">
                <Title>Account Types {emojify(":money_with_wings:")}</Title>
                <Row type="flex" justify="center" align="middle" className="p-1">
                    <InputGroup size="large">
                        <Row type="flex" justify="center" align="middle">
                            <Col span={20}>
                                <Input
                                    placeholder="New Account type" size="large" type="text"
                                    value={newAccountTypes.accountTypeName} 
                                    onChange={e => setNewAccountTypes({...newAccountTypes, accountTypeName: e.target.value})}
                                    prefix={<Icon type="wallet" theme="twoTone" />} allowClear />
                            </Col>
                        </Row>
                    </InputGroup>
                </Row>
            </Modal>
            <Card 
                className="card-1"
                title={<Title level={3}>Account Types</Title>}
                bordered={true}
                extra={<ButtonGroup>
                            <Button onClick={() => accountTypeModalVisable(true)} className="card-2" type="link"><Icon size="large" type="plus" /></Button>,
                            <Button onClick={() => props.Refresh_FannyPack_Account()} className="card-2" type="link"><Icon size="large" type="sync" /></Button>
                        </ButtonGroup>}>
                <List
                    loading={isLoading}
                    itemLayout="horizontal"
                    dataSource={props.fannyAccountType}
                    renderItem={item => (
                    <List.Item 
                        actions={[<Button type="link" key="list-loadmore-edit">edit</Button>, <Button type="link" key="list-loadmore-more">more</Button>]}>
                        <Skeleton avatar title={false} loading={isLoading} active>
                            <List.Item.Meta title={<Button type="link">{item.account_type_id} - {item.account_type_name} - {item.account_type_created} - {item.account_type_lastmodify}</Button>} />
                        </Skeleton>
                    </List.Item>
                )} />
            </Card>
        </Layout>
    );
}
export default withRouter(AccountTypes);

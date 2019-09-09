import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';
import { Layout, Row, Col, List, Skeleton, Card, message, Modal, Icon, Typography, Button, Input, Select  } from 'antd';
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Title } = Typography;
// AccountTypes
function AccountTypes(props){
    // AccountTypes State
    const [newAccountTypes, setNewAccountTypes] = useState({  newAccountTypesName: "", AccountTypeAddModalVisable: false });
    const ShowAccountTypeAddModal = (state) => { setNewAccountTypes({...newAccountTypes, newAccountTypesName: "",  AccountTypeAddModalVisable: state})};
    const CreateNewAccountTypes = () => {
        // getSess
        let sessionID = sessionStorage.getItem('sessionID');
        // axios_fetch_post
        axios.post("http://localhost:5000/Account/type/add", {
            accountTypeName: newAccountTypes.newAccountTypesName, 
            fannyPack: newAccountTypes.accountFanny.fannypack_serial
        })
        .then((data) => { message.success(JSON.stringify(data), 2.5); props.Refresh_FannyPack_Account(); })
        .catch((err) => { message.info(JSON.stringify(err), 2.5); })
        // Clear field and close form
        setNewAccountTypes({...newAccountTypes, accountType: "", newAccountTypesName: "",  AccountTypeAddModalVisable: false})
    };
    let isLoading = true;
    // Check if its array
    if(Array.isArray(props.fannyAccountType)){ isLoading = false; };
    let AccountTypes = <List
                            loading={isLoading}
                            itemLayout="horizontal"
                            dataSource={props.fannyAccountType}
                            renderItem={item => (
                            <List.Item 
                                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}>
                                <Skeleton avatar title={false} loading={isLoading} active>
                                    <List.Item.Meta title={<a href="#">{item.account_type_id} - {item.account_type_name} - {item.account_type_created} - {item.account_type_lastmodify}</a>} />
                                </Skeleton>
                            </List.Item>
                            )}
                        />;
    // User Effect and pass => props with []
    useEffect(() => { setNewAccountTypes({...newAccountTypes, accountFanny: props.activeFannyPack}); }, [props.activeFannyPack]);
    // Account Records
    return (
        <Layout>
            {/* Add new Account Modal */}
            <Modal centered visible={newAccountTypes.AccountTypeAddModalVisable}
                onOk={(CreateNewAccountTypes)}
                onCancel={() => ShowAccountTypeAddModal(false)}
                okText="Create"
                cancelText="Cancel">
                <Title>Account Types {emojify(":money_with_wings:")}</Title>
                <Row type="flex" justify="center" align="middle" className="p-1">
                    <InputGroup size="large">
                        <Row type="flex" justify="center" align="middle">
                            <Col span={20}>
                                <Input
                                    placeholder="New Account type" size="large" type="text"
                                    value={newAccountTypes.newAccountTypesName} 
                                    onChange={e => setNewAccountTypes({...newAccountTypes, newAccountTypesName: e.target.value})}
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
                            <Button onClick={() => ShowAccountTypeAddModal(true)} className="card-2" type="link"><Icon size="large" type="plus" /></Button>,
                            <Button onClick={() => props.Refresh_FannyPack_Account()} className="card-2" type="link"><Icon size="large" type="sync" /></Button>
                        </ButtonGroup>}>
                {AccountTypes}
            </Card>
        </Layout>
    );
}
export default withRouter(AccountTypes);

import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';
import { Layout, Row, Col, List, Skeleton, Card, message, Modal, Icon, Typography, Button, Input, Select  } from 'antd';
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Title } = Typography;
// AccountCategory
function AccountCategory(props){
    // AccountCategory State
    const [newAccountCategory, setNewAccountCategory] = useState({  newCategoryName: "", newCategoryParentName: "", AccountCategoryAddModalVisable: false });
    const ShowAccountCategoryAddModal = (state) => { setNewAccountCategory({...newAccountCategory, newCategoryName: "", newCategoryParentName: "",  AccountCategoryAddModalVisable: state})};
    const CreateNewAccountCategory = () => {
        // getSess
        let sessionID = sessionStorage.getItem('sessionID');
        // axios_fetch_post
        axios.post("http://localhost:5000/Account/category/add", {
            categoryName: newAccountCategory.newCategoryName, 
            categoryParent: newAccountCategory.newCategoryParentName,
            fannyPack: newAccountCategory.accountFanny.fannypack_serial
        })
        .then((data) => { message.success(JSON.stringify(data), 2.5); props.Refresh_FannyPack_Account(); })
        .catch((err) => { message.info(JSON.stringify(err), 2.5); })
        // Clear field and close form
        setNewAccountCategory({...newAccountCategory, newCategoryName: "", newCategoryParentName: "",  AccountCategoryAddModalVisable: false})
    };
    // EventAccountCategory - on Event
    const EventAccountCategory = (value) => { setNewAccountCategory({...newAccountCategory, newCategoryParentName: value}); }
    
    
    let isLoading = true;
    let CategoryOptions = [];
    // Check if its array
    if(Array.isArray(props.fannyAccountCategory)){ 
        isLoading = false; 
    };
    // CategoryList
    const CategoryList = (
        <Select style={{width: '100%'}} onChange={EventAccountCategory} defaultValue="root">
                <Option value="root">Which Category (Default Parent)</Option>
                {Array.isArray(props.fannyAccountCategory) && 
                    props.fannyAccountCategory.map((item, i) => 
                    <Option value={item.category_id}>{item.category_name} - {item.category_parent}</Option>
                )}
        </Select>
    );
    let  AccountCategory = <List
                                loading={isLoading}
                                itemLayout="horizontal"
                                dataSource={props.fannyAccountCategory}
                                renderItem={item => (
                                <List.Item 
                                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}>
                                    <Skeleton avatar title={false} loading={isLoading} active>
                                        <List.Item.Meta title={<a href="#">{item.category_id} - {item.category_name} - {item.category_parent} - {item.category_created}</a>} />
                                    </Skeleton>
                                </List.Item>
                                )}
                            />;
    // User Effect and pass => props with []
    useEffect(() => { setNewAccountCategory({...newAccountCategory, accountFanny: props.activeFannyPack}); }, [props.activeFannyPack]);
    // Account Records
    return (
        <Layout>
            {/* Add new Account Modal */}
            <Modal centered visible={newAccountCategory.AccountCategoryAddModalVisable}
                onOk={(CreateNewAccountCategory)}
                onCancel={() => ShowAccountCategoryAddModal(false)}
                okText="Create"
                cancelText="Cancel">
                <Title>Create Category {emojify(":money_with_wings:")}</Title>
                <Row type="flex" justify="center" align="middle" className="p-1">
                    <InputGroup size="large">
                        <Row type="flex" justify="center" align="middle">
                            <Col span={20}> <Row>{CategoryList}</Row> </Col>
                            <Col span={20} className="py-1">
                                <Input
                                    placeholder="New Category name" size="large" type="text"
                                    value={newAccountCategory.newCategoryName} 
                                    onChange={e => setNewAccountCategory({...newAccountCategory, newCategoryName: e.target.value})}
                                    prefix={<Icon type="wallet" theme="twoTone" />} allowClear />
                            </Col>
                        </Row>
                    </InputGroup>
                </Row>
            </Modal>
            <Card 
                className="card-1"
                title={<Title level={3}>Account Category</Title>}
                bordered={true}
                extra={<ButtonGroup>
                            <Button onClick={() => ShowAccountCategoryAddModal(true)} className="card-2" type="link"><Icon size="large" type="plus" /></Button>,
                            <Button onClick={() => props.Refresh_FannyPack_Account()} className="card-2" type="link"><Icon size="large" type="sync" /></Button>
                        </ButtonGroup>}>
                {AccountCategory}
            </Card>
        </Layout>
    );
}
export default withRouter(AccountCategory);

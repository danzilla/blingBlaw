import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';
import { Layout, Row, Col, Card, message, Modal, Icon, Typography, Button, Input, Select  } from 'antd';
// ViewCategory
import ViewCategory from './viewCategory';
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Title } = Typography;
// AccountCategory
function AccountCategory(props){
    // AccountCategory State
    let addCategory = { categoryName: "", categoryParent: "root", accountFanny: props.activeFannyPack };
    const [newAccountCategory, setNewAccountCategory] = useState(addCategory);
    const [accountModal, setAccountModal] = useState(false);
    const accountModalVisable = (visableState) => {setAccountModal(visableState)};
    // Create New Category
    const CreateNewAccountCategory = () => {
        axios.post("http://localhost:5000/Account/category/add", {
            categoryName: newAccountCategory.categoryName, 
            categoryParent: newAccountCategory.categoryParent,
            fannyPack: newAccountCategory.accountFanny.fannypack_serial
        })
        .then((data) => { 
            message.success(JSON.stringify(data), 2.5); 
            props.Refresh_FannyPack_Account(); 
        })
        .catch((err) => { 
            message.info(JSON.stringify(err), 2.5); 
        })
        // Clear field and close form
        accountModalVisable(false);
        setNewAccountCategory(addCategory);
    };
    let isLoading = true;
    let CategoryList = "";
    // Check if its array
    if(Array.isArray(props.fannyAccountCategory)) {  
        isLoading = false;
        // CategoryList
        CategoryList = (
            <Select 
                style={{width: '100%'}} 
                onChange={(value) => setNewAccountCategory({...newAccountCategory, categoryParent: value}) } 
                defaultValue="root">
                    <Option value="root">Which Category (Default Parent)</Option>
                    {Array.isArray(props.fannyAccountCategory) && 
                        props.fannyAccountCategory.map((item, i) => 
                        <Option value={item.category_id}>{item.category_name} - {item.category_parent}</Option>
                    )}
            </Select>
        );
     };
    // User Effect and pass => props with []
    useEffect(() => { setNewAccountCategory({...newAccountCategory, accountFanny: props.activeFannyPack}); }, [props.activeFannyPack]);
    // Account Records
    return (
        <Layout>
            {/* Add new Account Modal */}
            <Modal centered visible={accountModal}
                onOk={(CreateNewAccountCategory)}
                onCancel={() => setAccountModal(false)}
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
                                    value={newAccountCategory.categoryName} 
                                    onChange={e => setNewAccountCategory({...newAccountCategory, categoryName: e.target.value})}
                                    prefix={<Icon type="wallet" theme="twoTone" />} allowClear />
                            </Col>
                        </Row>
                    </InputGroup>
                </Row>
            </Modal>
            <Card 
                title={<Title level={3}>Account Category</Title>}
                className="card-1"
                bordered={true}
                extra={<ButtonGroup>
                            <Button onClick={() => setAccountModal(true)} className="card-2" type="link"><Icon size="large" type="plus" /></Button>,
                            <Button onClick={() => props.Refresh_FannyPack_Account()} className="card-2" type="link"><Icon size="large" type="sync" /></Button>
                        </ButtonGroup>}>

                    <ViewCategory
                        isLoading={isLoading}
                        fannyAccountCategory={props.fannyAccountCategory} />
            </Card>
        </Layout>
    );
}
export default withRouter(AccountCategory);

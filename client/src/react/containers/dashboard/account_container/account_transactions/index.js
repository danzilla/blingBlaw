import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';
import { notification, Popover, Popconfirm, Upload, Table, Divider, Tag, Layout, Row, Col, List, Skeleton, Card, message, Modal, Icon, Typography, Button, Input, Select  } from 'antd';

import Papa from './papaCSVReader';

const { TextArea } = Input;
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Title } = Typography;
const { Text } = Typography;
// AccountTransactions
function AccountTransactions(props){
  /* 
  * Transaction _ VIEW 
  */
  // Transactions State
  const [accountTransaction, setAccountTransaction] = useState([]);
  // Refresh_Account_Transaction
  const Refresh_Account_Transaction = () => {
    axios.post("http://localhost:5000/account/transaction/view", {
        fannyPack: props.activeFannyPack.fannypack_serial,
        accountSerial: props.account.account_serial
    })
    .then((data) => {
        setAccountTransaction(data);
        message.info("Account Transactions fatched!", 1.5);
    })
    .catch((err) => { message.info(JSON.stringify(err), 2.5); })
  };
  // User Effect and pass => props with []
  useEffect(() => {  Refresh_Account_Transaction(); }, [props.account]);
  /* 
  * Transaction _ ADD 
  */
  // Review Table for Submit
  // Get CSV from Papa (callback)
  const [CSVreviewData, setCSVreviewData] = useState(null);
  const getReviewData = (data) => { setCSVreviewData(data); };
  // AddTransaction Modal Size when data is empty
  let transactionModel_SIZE = "";
  const proccessTransactions = [];
  if(Array.isArray(CSVreviewData)){
    // Set Width of Mdel to 75% - When there is Data
    transactionModel_SIZE = "w-75";
    CSVreviewData.map((value, i) => {
      proccessTransactions.push({
        key: i,
        transaction_Date: value.field1,
        transaction_Desc: value.field2,
        transaction_Deposits: value.field3,
        transaction_Withdrawls: value.field4,
        transaction_Balance: value.field5,
        transaction_Category: "",
        transaction_Comments: ""
      });
    });
  };
  // Table Datasource - Set to State
  const [reviewTransactions, setReviewTransactions] = useState([]);
  // User Effect and pass => props with []
  useEffect(() => {  setReviewTransactions(proccessTransactions); }, [CSVreviewData]);
  // setTransaction_Category
  const setTransaction_Category = (eventValue, record, text) => {
    // copy array || array[find_obj].category
    let duplocateReviewTransactions = [...reviewTransactions];
    duplocateReviewTransactions[record.key].transaction_Category = eventValue;
    setReviewTransactions(duplocateReviewTransactions);
    notification.open({ description: JSON.stringify(duplocateReviewTransactions[record.key])});
  };
  // setTransaction_Comments
  const setTransaction_comments = (eventValue, record, text) => {
    // copy array || array[find_obj].category
    let duplocateReviewTransactions = [...reviewTransactions];
    duplocateReviewTransactions[record.key].transaction_Comments = eventValue;
    setReviewTransactions(duplocateReviewTransactions);
  };
  // columnsHeads Table config
  const columnsHeads = [
    { title: 'Date', dataIndex: 'transaction_Date', key: 'transaction_Date', },
    { title: 'Description', dataIndex: 'transaction_Desc', key: 'transaction_Desc', },
    { title: 'Deposite', dataIndex: 'transaction_Deposits', key: 'transaction_Deposits', },
    { title: 'Withdrawl', dataIndex: 'transaction_Withdrawls', key: 'transaction_Withdrawls', },
    { title: 'Balance', dataIndex: 'transaction_Balance', key: 'transaction_Balance', },
    { title: 'Labels and Category',  dataIndex: 'transaction_Category', key: 'transaction_Category', 
      render: (text, record) => (
        <Select 
          mode="tags"
          size="large"
          placeholder="Select a category and label"
          defaultValue={[]}
          onChange={(e) => setTransaction_Category(e, record, text)}
          style={{ width: '100%' }}>
            {Array.isArray(props.fannyAccountCategory) && 
              props.fannyAccountCategory.map((item, i) => 
              <Option key={item.category_id} value={item.category_id}>{item.category_name} - {item.category_parent}</Option>
            )}
        </Select>),
    },
    { title: 'Notes', dataIndex: 'transaction_Comments', key: 'transaction_Comments',
      render: (text, record) => (
        <Popover title="Add note" content={
          <TextArea 
              value={reviewTransactions[record.key].transaction_Comments}
              onChange={({ target: { value } }) => setTransaction_comments(value, record, text)}
              placeholder="Why would I do this?" 
              autosize={{ minRows: 2, maxRows: 3 }} />
        }> <Button type="link"> {emojify(":writing_hand:")} </Button> </Popover>),
    },
  ];
  // Account Add Transactions Modal
  const [accountTransactionModal, setAccountTransactionModal] = useState(false);
  const ShowTransactionAddModal = (state) => { setAccountTransactionModal(state); setCSVreviewData(null);};
  // AddNewTransactions
  const AddNewTransactions = () => {
    // getSess
    let sessionID = sessionStorage.getItem('sessionID');
    axios.post("http://localhost:5000/Account/transaction/add", {
        transactions: reviewTransactions,
        accountSerial: props.account.account_serial,
        fannyPack: props.activeFannyPack.fannypack_serial, 
        userSerial: sessionID
    })
    .then((data) => {
      Refresh_Account_Transaction();
      message.success(JSON.stringify(data.data.pageMessage), 2.5);
    })
    .catch((err) => { 
      message.info(JSON.stringify(err), 2.5); 
    });
    // Bling
    let transactionsBlings = JSON.stringify(reviewTransactions);
    // Clear field and close form
    setAccountTransactionModal(false);
    setCSVreviewData(null);
  };  
  // Sparkles
  let UploadBtnCSS = { padding: '.4em', display: 'inline', margin: 0 };
  // Account Transactions
  return (
    <Row>
      <Col span={24} style={{backgroundColor: "#e91e63"}}>
        {/* Add Account Transaction Modal */}
        <Modal
          centered
          className={transactionModel_SIZE}
          visible={accountTransactionModal}
          onOk={() => AddNewTransactions()}
          onCancel={() => ShowTransactionAddModal(false)}
          okText="Add transactions"
          cancelText="Cancel">
            <Row className="p-1" type="flex" justify="center" align="middle">
              <Title level={2} style={UploadBtnCSS} className="card-2"> 
                <Papa reviewData={getReviewData} />
              </Title>
              <Title level={3} style={UploadBtnCSS}>
                & Review transaction {emojify(":money_with_wings:")}
              </Title>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col span={20}>
                {reviewTransactions.length > 1 &&
                  <Table size="small" dataSource={reviewTransactions} columns={columnsHeads} />
                }
              </Col>
            </Row>
        </Modal>
        <Card 
          className="card-1"
          title={<Title level={3}>Account Transaction {JSON.stringify(props.account)}</Title>}
          bordered={true}
          extra={<ButtonGroup>
                      <Button onClick={() => ShowTransactionAddModal(true)} className="card-2" type="link"><Icon size="large" type="plus" /></Button>,
                      <Button onClick={() => Refresh_Account_Transaction()} className="card-2" type="link"><Icon size="large" type="sync" /></Button>
                  </ButtonGroup>}>
          {JSON.stringify(props.activeFannyPack)}
          <br />
          {JSON.stringify(accountTransaction)}
        </Card>
      </Col>
    </Row>
  );
}
export default withRouter(AccountTransactions);

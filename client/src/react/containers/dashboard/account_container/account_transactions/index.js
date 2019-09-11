import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { emojify } from 'react-emojione';
import {  Upload, Table, Divider, Tag, Layout, Row, Col, List, Skeleton, Card, message, Modal, Icon, Typography, Button, Input, Select  } from 'antd';

import Papa from './papaCSVReader';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const { Option } = Select;
const { Title } = Typography;
const { Text } = Typography;
// AccountTransactions
function AccountTransactions(props){
  // Transactions State
  const [accountTransaction, setAccountTransaction] = useState([]);
  // Refresh_Account_Transaction
  const Refresh_Account_Transaction = () => {
    // Fetch all
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
  // Review Table
  const [CSVreviewData, setCSVreviewData] = useState(null);
  const getReviewData = (data) => { setCSVreviewData(data); };


  /*
    fannypack_${userData.fannyPack_serial}.account_${userData.account_serial}
    (
      transaction_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
      transaction_serial VARCHAR(36) NOT NULL UNIQUE,
      transaction_Date DATE NOT NULL,
      transaction_Desc VARCHAR(254) NOT NULL,
      transaction_Withdrawls VARCHAR(254) NOT NULL,
      transaction_Deposits VARCHAR(254) NOT NULL,
      transaction_Balance VARCHAR(254) NOT NULL,
      transaction_Category text[],
      transaction_Comments text[],
      transaction_Updated text[],
      transaction_UpdateUser VARCHAR(254)
    );`;
  */


  // Table Datasource 
  const transactions = [];
  let transactionModel_SIZE = "";
  if((Array.isArray(CSVreviewData))){
    // Set Width of Mdel to 75%
    transactionModel_SIZE = "w-75";
    CSVreviewData.map((value, i) => {
      transactions.push({
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
  // Account Add Transactions Modal
  const [accountTransactionModal, setAccountTransactionModal] = useState(false);
  const ShowTransactionAddModal = (state) => { setAccountTransactionModal(state); setCSVreviewData(null);};
  // AddNewTransactions
  const AddNewTransactions = () => {
    // getSess
    let sessionID = sessionStorage.getItem('sessionID');
    // axios_fetch_post
    axios.post("http://localhost:5000/Account/transaction/add", {
        transactions: transactions,
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
    })
    // Clear field and close form
    setAccountTransactionModal(false);
    setCSVreviewData(null);
  };
  // Table config
  const columnsHeads = [
    { title: 'Date', dataIndex: 'transaction_Date', key: 'transaction_Date', },
    { title: 'Description', dataIndex: 'transaction_Desc', key: 'transaction_Desc', },
    { title: 'Deposite', dataIndex: 'transaction_Deposits', key: 'transaction_Deposits', },
    { title: 'Withdrawl', dataIndex: 'transaction_Withdrawls', key: 'transaction_Withdrawls', },
    { title: 'Balance', dataIndex: 'transaction_Balance', key: 'transaction_Balance', },
    { title: 'Notes', dataIndex: 'transaction_Comments', key: 'transaction_Comments', },
    { title: 'Labels and Category',  dataIndex: 'transaction_Category', key: 'transaction_Category', 
      render: (text, record) => (
        <Select 
          mode="tags"
          size="large"
          placeholder="Select a category and label"
          defaultValue={[]}
          onChange={(e) => message.success(JSON.stringify(e), 2.5)}
          style={{ width: '100%' }}>
            {Array.isArray(props.fannyAccountCategory) && 
              props.fannyAccountCategory.map((item, i) => 
              <Option key={item.category_id} value={item.category_id}>{item.category_name} - {item.category_parent}</Option>
            )}
        </Select>),
    },
  ];
  // User Effect and pass => props with []
  useEffect(() => {  Refresh_Account_Transaction(); }, [props.account]);
  // Sparkles
  let UploadBtnCSS = {
    padding: '.4em',
    display: 'inline',
    margin: 0
  }
  // Account Records
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
                {transactions.length > 1 &&
                  <Table dataSource={transactions} columns={columnsHeads} />
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
                      <Button className="card-2" type="link"><Icon size="large" type="sync" /></Button>
                  </ButtonGroup>}>
          
          {JSON.stringify(props.activeFannyPack)}
          {JSON.stringify(accountTransaction)}
        </Card>

      </Col>
    </Row>
  );
}
export default withRouter(AccountTransactions);

import React from 'react';
import {withRouter} from 'react-router-dom';
import { Tabs  } from 'antd';

import AccountRecord from './account_records';
import AccountCategory from './account_category';
import AccountType from './account_types';

const { TabPane } = Tabs;

// AccountContainer
function AccountContainer(props){
    return (
        <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="AccountRecord 3" key="1">
                <AccountRecord />
            </TabPane>
            <TabPane tab="AccountCategory 3" key="2">
                <AccountCategory />
            </TabPane>
            <TabPane tab="AccountType 3" key="3">
                <AccountType />
            </TabPane>
        </Tabs>
    );
}
export default withRouter(AccountContainer);

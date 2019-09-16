import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button, List, Skeleton } from 'antd';
// Account Category View
function AccountCategoryView(props){
    // Account Category
    return (
        <List
            loading={props.isLoading}
            itemLayout="horizontal"
            dataSource={props.fannyAccountCategory}
            renderItem={item => (
            <List.Item 
                actions={[<Button type="link" key="list-loadmore-edit">edit</Button>, <Button type="link" key="list-loadmore-more">more</Button>]}>
                <Skeleton avatar title={false} loading={props.isLoading} active>
                    <List.Item.Meta title={<Button type="link">{item.category_id} - {item.category_name} - {item.category_parent} - {item.category_created}</Button>} />
                </Skeleton>
            </List.Item>
            )}
        />
    );
}
export default withRouter(AccountCategoryView);

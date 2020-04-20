import React from 'react';
import {withRouter} from 'react-router-dom';
import { Layout, Button, List, Skeleton } from 'antd';
import { Tree, Icon } from 'antd';

const { TreeNode } = Tree;
const { Header, Footer, Sider, Content } = Layout;
// Account Category View
function AccountCategoryView(props){
    // Account Category View
    return (
        <Content>

            <Tree
                showIcon
                // defaultExpandAll
                defaultSelectedKeys={['0-0']}
                switcherIcon={<Icon type="down" />}>
                <TreeNode icon={<Icon type="smile-o" />} title="parent 1" key="0-0">
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-0" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-1" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-2" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-3" />
                </TreeNode>
                <TreeNode icon={<Icon type="smile-o" />} title="parent 2" key="0-1">
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-1-0" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-1-1" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-1-2" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-1-3" />
                </TreeNode>
                <TreeNode icon={<Icon type="smile-o" />} title="parent 3" key="0-2">
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-2-0" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-2-1" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-2-2" />
                    <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-2-3" />
                </TreeNode>
            </Tree>

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
        </Content>
    );
}
export default withRouter(AccountCategoryView);

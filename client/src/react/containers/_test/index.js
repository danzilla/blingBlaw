import React, { Component } from "react";
import { connect } from "react-redux";
import UserInfo from "../../components/_test/UserInfo";
import Form1 from "../../components/_test/Form";

import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

class Dashboard extends Component {
  render() {
    return (
      <div className="container">

    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        {/* Props details */}
        {this.props ? <p> {JSON.stringify(this.props)} </p> : <p>connect not working</p>}
        {/* Form */}
        <Form1 />
        {/*Body*/}
        {this.props.data.isFetching ? <h3>Loading...</h3> : null}
        {this.props.data.isError ? (<h3 className="error">No such User exists.</h3>) : null}
        {Object.keys(this.props.data.userData).length > 0 ? (<UserInfo user={this.props.data.userData} />) : null}
    </Form>
       
      </div>
    );
  }
}

//
const mapStateToProps = state => {
  return { data: state };
};
export default connect(mapStateToProps)(Dashboard);






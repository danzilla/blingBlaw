// SampleData Page
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { Layout, message, Button, Drawer } from 'antd';
// SampleData
function SampleData(props) {
  // React-hookz - loginInfo
  const [sess, setSess] = useState({ sessionID: "Session_Loading", sessionInfo: "Session_Loading"});
  const [sampleData, setSampleData] = useState("Loading");
  // getSampleData
  const getSampleData = () => {
    axios.post("http://localhost:5000/sampledata", { fannyPack: "sess.sessionID" })
    .then((data) => { 
      setSampleData(data.data.pageMessage);
      message.info("fatched!", 1.5);
    })
    .catch((err) => { 
      message.error("Fetched faild :(", 2.5);
      message.error(err.message, 2.5);
    });
  };

  const getSess = () => {
    setSess({...sess, 
      sessionID: sessionStorage.getItem('sessionID'),
      sessionInfo: sessionStorage.getItem('sessionInfo')
    });
    getSampleData();
  }
  // Use Effect and pass => props with []
  useEffect(() => { getSess(); }, []);
  // SampleData view
  return (
      <Layout>
        <Button type="danger" onClick={() => getSess()}> Sess </Button>
          {JSON.stringify(sess)}
          {JSON.stringify(sampleData)}
      </Layout>
  );
}
export default withRouter(SampleData);
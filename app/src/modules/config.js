


// App Config
const appConfig = {
  appName: "BlingBlaw",
  appPort: 3000,
  appMsg: ""
}


// pageInfo detailes
let pageInfo = {
  title: "",
  page: "",
  request: "",
  sessionName: ""
}
// flashData
let flashData = {
  page: pageInfo.page,
  pageMesage: "",
  info: "",
  bgColor: ""
}

module.exports.appConfig = appConfig;
module.exports.pageInfo = pageInfo;
module.exports.flashData = flashData;

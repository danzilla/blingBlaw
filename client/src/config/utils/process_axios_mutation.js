// Process query mutatation 
import axios from 'axios';
// Export - axios_post(url, payLoad, Results)
function axios_post(url, payLoad, Results) {
    // PageMessage
    let pageMessage = { title:"axios_post", message: "", checked: "", result: "" };
    axios.post(url, payLoad)
        .then((data) => {
            console.log(JSON.stringify(data));
            pageMessage = {
                message: "Post return good!",
                checked: "checked",
                result: data
            }
        })
        .catch((err) => {
            console.log(JSON.stringify(err));
            pageMessage = {
                message: "Post return Bad!",
                checked: err.code,
                result: err
            }
        })
        Results.push(pageMessage);
        return pageMessage;
};
// Export 
const axios_fetch = {
    post: axios_post
}
module.exports = axios_fetch;
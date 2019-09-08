// Process query mutatation 
import axios from 'axios';
// Export - axios_post(url, payLoad, Results)
export function axios_post(url, payLoad) {
    // PageMessage
    let pageMessage = { title:"axios_post", message: "", checked: "", result: "" };
    axios.post(url, payLoad)
    .then((data) => {
        console.log(JSON.stringify(data));
        pageMessage = {
            message: "Post return Good!",
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
    return pageMessage;
};
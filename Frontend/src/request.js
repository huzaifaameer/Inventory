import axios from 'axios';

function request(options){
    const onSuccess = res =>{
        if(res.data.statusCode === 400){
            localStorage.removeItem("auth");
            // window.location.reload();
        }
        else{
            return res.data;
        }
    }
    const onError = err => {
        Promise.reject(err)
    }
    const client = axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("auth") } });
    return client(options).then(onSuccess).catch(onError);
}

export default request;
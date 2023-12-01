import request from "./request";


const API = process.env.REACT_APP_API_URL;

const Service = {
    getInventoryList : () => {
        return request({
            url: `${API}record`,
            method: 'GET'
        });
    },
    getInventory : (id) => {
        return request({
            url: `${API}record?recordId=${id}`,
            method: 'GET'
        });
    },
    addInventory : (data) => {
        return request({
            url: `${API}record`,
            method: 'POST',
            data
        });
    },
    updateInventory : (data) => {
        return request({
            url: `${API}record?recordId=${data._id}`,
            method: 'PUT',
            data
        });
    },
    login : (data) => {
        return request({
            url: `${API}auth/login`,
            method: 'POST',
            data
        });
    },
    verifyOtp : (data) => {
        return request({
            url: `${API}auth/verifyOtp`,
            method: 'POST',
            data
        });
    }
}

export default Service;
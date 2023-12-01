class response {
    constructor(statusCode, data, message) {
        this.statusCode = 200;
        this.message = "Success";
        this.data = {};
    }
}

const successResponse = (data) => {
    let resp = new response()
    resp.data = data
    return resp
}


const errorResponse = (message) => {
    let resp = new response()
    resp.statusCode = 400
    resp.message = message
    return resp
}

module.exports = { successResponse, errorResponse, response }
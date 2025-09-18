class ApiResponse{
    constructor(statusCode, data, msg = "Success"){ // constructor is created everytime when a response needs to be sent back to the client
        this.statusCode = statusCode
        this.data = data
        this.msg = msg
        this.success = statusCode<400 // automatically sets success property as TRUE
    }
}

export  { ApiResponse }
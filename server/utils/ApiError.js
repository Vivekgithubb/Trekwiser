class ApiError extends Error{
    constructor(  //constructor is called whenever new instance of ApiError is created 
        statusCode,
        msg = "Something went wrong",
        error = [],
        stack = ""
    ){
        super(msg)
        this.statusCode =  statusCode
        this.data = null
        this.msg = msg
        this.error = error
        this.success = false;

        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }

}

export { ApiError}
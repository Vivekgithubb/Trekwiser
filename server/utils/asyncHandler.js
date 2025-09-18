const asyncHandler = (reqHandler) =>{ //handling errors in asynchronus func. without try-catch
        return (req, res, next) => {
            Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));
        };
};
export { asyncHandler }
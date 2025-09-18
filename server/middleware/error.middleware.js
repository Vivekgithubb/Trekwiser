const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    data: null,
    msg: err.msg || "Internal Server Error",
    error: err.error || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined //snd error to the stack if its development team or else undefined for production team
  });
};

export { errorMiddleware };

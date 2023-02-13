export const errorHandler = (err, req, res, next) => {
  let status = res.statusCode ?? 500;
  if (err._message?.includes('validation failed')) {
    status = 500;
  }
  const { message, stack } = err;
  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack }),
  });
};

export const errorHandler = (err, req, res, next) => {
  let status = res.statusCode ?? 500;
  if (status == 200) status = 500;

  const { message, stack } = err;

  if (message?.includes('invalid signature')) {
    status = 401;
  }
  // erro thrown by Mongoose Model and can't set status
  if (message?.includes('validation failed')) {
    status = 500;
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack }),
  });
};

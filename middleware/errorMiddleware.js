export const errorHandler = (err, req, res, next) => {
  let status = res.statusCode ?? 500;
  if (status == 200) status = 500;

  let { message, stack } = err;
  if (status == 500) message = 'unexpected server error';

  if (message?.includes('jwt expired')) {
    status = 401;
    message = 'jwt expired'
  }

  // erro thrown by Mongoose Model and can't set status
  if (message?.includes('validation failed')) {
    status = 400;
    message = `${Object.values(err.errors)}`
  }


  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack }),
  });
};
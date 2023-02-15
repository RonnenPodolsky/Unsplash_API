import mongoose from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  let status = res.statusCode ?? 500;
  if (status == 200) status = 500;

  let { message, stack } = err;
  if (status == 500) message = 'Server error. Please try again later.';

  if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
    message = `${Object.values(err.errors)}`
  }

  if (err instanceof mongoose.Error.CastError) {
    status = 404;
    message = 'invalid photo id'
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack }),
  });
};
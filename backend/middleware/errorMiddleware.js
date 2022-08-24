const ErrorHandler = require('../utils/errorHandler');

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message || 'Internal Server Error';

    // wrong mongoose object id error
    if (err.name === 'CastError') {
      err.message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(404, err.message);
    }
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(404, message);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = errorMiddleware;

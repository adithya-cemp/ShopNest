function notFound(req, res, next) {
  res.status(404);
  next(Object.assign(new Error(`Route not found: ${req.method} ${req.originalUrl}`), { statusCode: 404 }));
}
function errorHandler(err, req, res, next) {
  let status = err.statusCode || err.status || res.statusCode;
  if (!status || status < 400) status = 500;
  if (err.name === 'ValidationError') status = 400;
  if (err.name === 'CastError') status = 400;
  if (err.code === 11000) status = 409;
  const message = err.code === 11000 ? 'A record with this value already exists.' : (status === 500 && process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message || 'Internal server error.');
  res.status(status).json({ success: false, message, ...(process.env.NODE_ENV !== 'production' ? { error: err.name, stack: err.stack } : {}) });
}
module.exports = { notFound, errorHandler };

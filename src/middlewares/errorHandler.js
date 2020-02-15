export default (err, req, res, next) => {
  res.locals.data = { message: err.message };
  res.locals.status = err.status;

  next();
};

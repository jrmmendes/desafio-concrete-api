export default (err, req, res, next) => {
  res.locals.data = { mensagem: err.message };
  res.locals.status = err.status;

  next();
};

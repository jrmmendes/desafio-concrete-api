export default (req, res, next) => {
  if (!res.locals.status && !res.locals.data) {
    return next({
      status: 404,
      message: 'Não foi possível encontrar o recurso solicitado',
    });
  }
  return next();
};

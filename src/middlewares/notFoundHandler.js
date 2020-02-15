export default (req, res, next) => {
  if (!res.locals.status && !res.locals.data) {
    next({
      status: 404,
      message: 'Não foi possível encontrar o recurso solicitado',
    });
  }
};

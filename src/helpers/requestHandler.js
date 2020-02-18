export default (req, res) => {
  const { data, status } = res.locals;
  res
    .status(status || 200)
    .json(data);
};

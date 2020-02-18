export default (user) => ({
  id: user._id,
  nome: user.nome,
  email: user.email,
  ultimo_login: user.ultimo_login,
  data_criacao: user.data_criacao,
  data_atualizacao: user.data_atualizacao,
  telefones: user.telefones,
  token: user.token,
});

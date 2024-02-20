const { buscarProduto } = require("../services/database");
const resposta = require("../utils/response");

const verificaProduto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produto = await buscarProduto(id);

    if (!produto) {
      return resposta(res, 404, "Produto não existe");
    }

    next();
  } catch (error) {
    return resposta(res, 500, "Erro interno do servidor");
  }
};

module.exports = { verificaProduto };

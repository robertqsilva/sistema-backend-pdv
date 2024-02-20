const { buscarClientePorId } = require("../services/database");
const resposta = require("../utils/response");

const verificaCliente = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cliente = await buscarClientePorId(id);

    if (!cliente) {
      return resposta(res, 404, "Cliente Inexistente");
    }

    next();
  } catch (error) {
    return resposta(res, 500, "Erro interno do servidor");
  }
};

module.exports = { verificaCliente };

const { verificaToken } = require("../services/jwt");
const resposta = require("../utils/response");

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return resposta(
      res,
      400,
      "Para acessar este recurso um token de autenticação válido deve ser enviado"
    );
  }
  const token = authorization.split(" ")[1];
  try {
    const validaToken = await verificaToken(token);

    if (!validaToken) {
      return resposta(
        res,
        403,
        "Para acessar este recurso um token de autenticação válido deve ser enviado"
      );
    }
    req.usuario = validaToken;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado",
      });
  }
};

module.exports = verificaLogin;

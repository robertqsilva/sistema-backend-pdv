function resposta(res, status, resposta) {
  if (!resposta) {
    return res.status(status).json();
  }

  if (typeof resposta === "object") {
    return res.status(status).json(resposta);
  }

  return res.status(status).json({ mensagem: resposta });
}

module.exports = resposta;

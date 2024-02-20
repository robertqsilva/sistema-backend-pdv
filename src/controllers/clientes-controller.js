const {
  buscarCliente,
  cadastrarCliente,
  atualizarCliente,
  buscarClienteEditado,
  buscarCpf,
  listarClientes,
  buscarDetalhesdoCliente,
  buscarCpfExistente
} = require("../services/database");

const resposta = require("../utils/response");

const cadastroCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const clienteExistente = await buscarCliente(email);

    if (clienteExistente) {
      return resposta(res, 400, "Cliente já cadastrado");
    }

    const cpfExistente = await buscarCpf(cpf)
    if (cpfExistente) {
      return resposta(res, 400, "Cliente já cadastrado")
    }
    const cadastro = await cadastrarCliente(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);

    return resposta(res, 201, cadastro);
  } catch (error) {
    return resposta(res, 500, "Erro interno no servidor");
  }
};

const editarCliente = async (req, res) => {
  const { id } = req.params;

  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {

    const verificaEmail = await buscarClienteEditado(email, id);

    if (verificaEmail) {
      return resposta(res, 400, "Cliente já cadastrado");
    }


    const cpfExistente = await buscarCpfExistente(cpf, id);

    if (cpfExistente) {
      return resposta(res, 400, "Cpf já cadastrado");
    }

    await atualizarCliente(
      id,
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    );

    return resposta(res, 200, "Cliente Atualizado");
  } catch (error) {
    console.log(error);
    return resposta(res, 500, "Erro interno do servidor");
  }
};

const buscarDetalhesClientes = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await buscarDetalhesdoCliente(id);
    return resposta(res, 200, cliente);
  } catch (error) {
    return resposta(res, 500, "Erro interno no servidor");
  }
};

const listarClientesController = async (req, res) => {
  try {
    const clientes = await listarClientes()
    return resposta(res, 200, clientes)
  } catch (error) {
    return resposta(res, 500, "erro interno do servidor");
  }

}

module.exports = {
  cadastroCliente,
  editarCliente,
  buscarDetalhesClientes,
  listarClientesController
}
const {
  criptografarSenha,
  verificarSenha,
} = require("../services/bcrypt-services");

const {
  buscarUsuario,
  cadastrarUsuario,
  buscarUsuarioEditado,
  atualizarUsuario,
  buscarDetalhesdoUsuario,
  listarCategorias,
} = require("../services/database");

const { criandoToken } = require("../services/jwt");
const resposta = require("../utils/response");

const cadastroUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await buscarUsuario(email);

    if (usuarioExistente) {
      return resposta(res, 400, "Usuario já cadastrado");
    }
    const senhaCriptografada = await criptografarSenha(senha);
    const cadastro = await cadastrarUsuario(nome, email, senhaCriptografada);

    return resposta(res, 201, cadastro);
  } catch (error) {
    return resposta(res, 500, "Erro interno no servidor");
  }
};

const editarUsuario = async (req, res) => {
  try {
    const { id } = req.usuario;

    const { nome, email, senha } = req.body;
    const usuarioExistente = await buscarUsuarioEditado(email, id);

    if (usuarioExistente) {
      return resposta(res, 400, "Usuario já cadastrado");
    }
    const senhaCriptografada = await criptografarSenha(senha);
    const usuarioEditado = await atualizarUsuario(
      id,
      nome,
      email,
      senhaCriptografada
    );

    return resposta(res, 200, usuarioEditado);
  } catch (error) {
    return resposta(res, 500, "Erro interno do servidor");
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await buscarUsuario(email, senha);

    if (!usuario) {
      return resposta(res, 400, "Email ou senha Incorreta");
    }

    const verificaSenha = await verificarSenha(senha, usuario.senha);

    if (!verificaSenha) {
      return resposta(res, 400, "Email ou senha Incorreta");
    }

    const token = await criandoToken(usuario.id);

    const { senha: _, ...usuarioLogado } = usuario;

    return resposta(res, 200, { usuario: usuarioLogado, token });
  } catch (error) {
    return resposta(res, 500, "erro interno do servidor");
  }
};

const pegarUsuario = async (req, res) => {
  const { id } = req.usuario;
  try {
    const detalhesDoUsuario = await buscarDetalhesdoUsuario(id);
    const { senha: _, ...usuarioDetalhado } = detalhesDoUsuario;

    return res.json(usuarioDetalhado);
  } catch (error) {
    return resposta(res, 500, "erro interno do servidor");
  }
};

const listarCategoria = async (req, res) => {
  try {
    const categorias = await listarCategorias();

    return resposta(res, 200, categorias);
  } catch (error) {
    return resposta(res, 500, "erro interno do servidor");
  }
};

module.exports = {
  cadastroUsuario,
  loginUsuario,
  editarUsuario,
  pegarUsuario,
  listarCategoria,
};

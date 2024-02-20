const { uploadArquivos, excluirImagem } = require("../services/aws-sdk");
const {
  buscarCategoria,
  buscarProduto,
  atualizarProduto,
  excluirProduto,
  listarProdutos,
  cadastrarProduto,
  cadastrarProdutoComImg,
  atualizarProdutoComImg,
  verificarProdutoEmPedido,
} = require("../services/database");
const { obterPath } = require("../utils/getPath");

const resposta = require("../utils/response");

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const arquivo = req.files;
  let body = req.body;

  if (req.body.json) {
    body = JSON.parse(req.body.json);
  }
  const { descricao, quantidade_estoque, valor, categoria_id } = body;

  try {
    const existeProduto = await buscarProduto(id);
    if (!existeProduto) {
      return resposta(res, 404, "Produto não encontrado");
    }

    const existeCategoria = await buscarCategoria(categoria_id);
    if (!existeCategoria) {
      return resposta(res, 404, "Categoria não encontrada");
    }

    if (!arquivo) {
      const produtoEditado = await atualizarProduto(
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        id
      );
      return resposta(res, 200, produtoEditado);
    }

    const upload = await uploadArquivos(
      `imagem/${descricao}/${arquivo.produto_imagem[0].originalname}`,
      arquivo.produto_imagem[0].buffer,
      arquivo.produto_imagem[0].mimetype
    );

    if (!upload) {
      resposta(res, 500, "Ocorreu um erro ao fazer o upload do arquivo");
    }

    const produto = await atualizarProdutoComImg(
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      id,
      upload.url
    );

    return resposta(res, 201, produto);
  } catch (error) {
    return resposta(res, 500, "Erro interno do servidor");
  }
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const { produto_imagem } = await buscarProduto(id);
    const path = await obterPath(produto_imagem);

    const produto = await verificarProdutoEmPedido(id);
    if (produto) {
      return resposta(
        res,
        400,
        "Produto existente em um pedido. Não é possível excluir. "
      );
    }

    const excluidoDoBd = await excluirProduto(id);

    if (excluidoDoBd) {
      await excluirImagem(path);

      return resposta(res, 200, "Produto Excluído");
    }
  } catch (error) {
    return resposta(res, 500, "Erro interno do servidor");
  }
};

const listar_produtos = async (req, res) => {
  try {
    const produtos = await listarProdutos();
    return resposta(res, 200, produtos);
  } catch (error) {
    return resposta(res, 500, "erro interno do servidor");
  }
};

const cadastroProduto = async (req, res) => {
  const arquivo = req.files;
  let body = req.body;

  if (req.body.json) {
    body = JSON.parse(req.body.json);
  }
  const { descricao, quantidade_estoque, valor, categoria_id } = body;
  try {
    const categoria = await buscarCategoria(categoria_id);

    if (!categoria) {
      return resposta(res, 400, "Categoria não encontrada");
    }

    if (!arquivo) {
      const produto = await cadastrarProduto(
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
      );
      return resposta(res, 201, produto);
    }

    const upload = await uploadArquivos(
      `imagem/${descricao}/${arquivo.produto_imagem[0].originalname}`,
      arquivo.produto_imagem[0].buffer,
      arquivo.produto_imagem[0].mimetype
    );

    if (!upload) {
      resposta(res, 500, "Ocorreu um erro ao fazer o upload do arquivo");
    }

    const produto = await cadastrarProdutoComImg(
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      upload.url
    );

    return resposta(res, 201, produto);
  } catch (error) {
    return resposta(res, 500, "erro interno do servidor");
  }
};

const buscarDetalhesdoProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtos = await buscarProduto(id);
    return resposta(res, 200, produtos);
  } catch (error) {
    return resposta(res, 500, "erro interno do servidor");
  }
};

module.exports = {
  editarProduto,
  deletarProduto,
  listar_produtos,
  cadastroProduto,
  buscarDetalhesdoProduto,
};

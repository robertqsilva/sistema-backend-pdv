const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    ssl: { rejectUnauthorized: false },
  },
});

module.exports = {
  buscarUsuario: async (email) => {
    return await knex("usuarios").where({ email }).first();
  },
  buscarDetalhesdoUsuario: async (id) => {
    return await knex("usuarios").where({ id }).first();
  },

  cadastrarUsuario: async (nome, email, senha) => {
    const usuario = await knex("usuarios")
      .returning(["id", "nome", "email"])
      .insert({ nome, email, senha });
    return usuario[0];
  },

  buscarUsuarioEditado: async (email, id) => {
    return await knex("usuarios")
      .where({ email })
      .andWhere("id", "!=", id)
      .select("*")
      .first();
  },

  atualizarUsuario: async (id, nome, email, senha) => {
    const usuarioAtualizado = await knex("usuarios")
      .where({ id })
      .update({
        nome,
        email,
        senha,
      })
      .returning(["id", "nome", "email"]);
    return usuarioAtualizado[0];
  },

  listarCategorias: async () => {
    return await knex("categorias");
  },

  buscarCategoria: async (id) => {
    return await knex("categorias").where({ id }).first();
  },

  buscarProduto: async (id) => {
    return await knex("produtos").where({ id }).first();
  },

  listarProdutos: async () => {
    return await knex("produtos");
  },

  atualizarProduto: async (
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    id
  ) => {
    const produto = await knex("produtos")
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");
    return produto[0];
  },
  atualizarProdutoComImg: async (
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    id,
    produto_imagem
  ) => {
    const produto = await knex("produtos")
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem,
      })
      .returning("*");
    return produto[0];
  },

  excluirProduto: async (id) => {
    return await knex("produtos").where({ id }).delete();
  },

  buscarCliente: async (email) => {
    return await knex("clientes").where({ email }).first();
  },

  buscarClientePorId: async (id) => {
    return await knex("clientes").where({ id }).first();
  },

  cadastrarCliente: async (
    nome,
    email,
    cpf,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado
  ) => {
    const cliente = await knex("clientes")
      .returning("*")
      .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });
    return cliente[0];
  },

  cadastrarProduto: async (
    descricao,
    quantidade_estoque,
    valor,
    categoria_id
  ) => {
    const produto = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");
    return produto[0];
  },

  cadastrarProdutoComImg: async (
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    produto_imagem
  ) => {
    const produto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem,
      })
      .returning("*");
    return produto[0];
  },

  buscarClienteEditado: async (email, id) => {
    return await knex("clientes")
      .where({ email })
      .andWhere("id", "!=", id)
      .select("*")
      .first();
  },

  buscarCpf: async (cpf) => {
    return await knex("clientes").where({ cpf }).first();
  },

  buscarCpfExistente: async (cpf, id) => {
    return await knex("clientes")
      .where({ cpf })
      .andWhere("id", "!=", id)
      .first();
  },

  atualizarCliente: async (
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
  ) => {
    return await knex("clientes").where({ id }).update({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });
  },

  listarClientes: async () => {
    return await knex("clientes");
  },

  buscarDetalhesdoCliente: async (id) => {
    return await knex("clientes").where({ id }).first();
  },
  listarPedidosComid: async (id) => {
    return await knex
      .select(
        "pedidos.*",
        "produtos.*",
        "pedido_produtos.*",
        "pedido_produtos.id as pedido_produto_id"
      )
      .from("pedidos")
      .join("clientes", "pedidos.cliente_id", "=", "clientes.id")
      .join("pedido_produtos", "pedidos.id", "=", "pedido_produtos.pedido_id")
      .join("produtos", "pedido_produtos.produto_id", "=", "produtos.id")
      .where("clientes.id", "=", id);
  },
  listarPedidosSemId: async () => {
    return await knex
      .select("pedidos.*", "produtos.*", "pedido_produtos.*")
      .from("pedidos")
      .join("pedido_produtos", "pedidos.id", "=", "pedido_produtos.pedido_id")
      .join("produtos", "pedido_produtos.produto_id", "=", "produtos.id");
  },
  cadastrarPedidoDB: async (cliente_id, observacao, valor_total) => {
    const pedido = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total,
      })
      .returning("*");

    return pedido[0];
  },

  cadastrarPedido_ProdutoDB: async (
    pedido_id,
    produto_id,
    quantidade_produto,
    valor_produto
  ) => {
    const pedidoProduto = await knex("pedido_produtos")
      .insert({
        pedido_id,
        produto_id,
        quantidade_produto,
        valor_produto,
      })
      .returning("*");
    return pedidoProduto[0];
  },

  verificaEstoque: async (id, quantidade_produto) => {
    const estoque = await knex("produtos")
      .where({ id })
      .select("quantidade_estoque");
    if (estoque < quantidade_produto) {
      return false;
    }
    return true;
  },

  obterValorProduto: async (id) => {
    const valor = await knex("produtos").where({ id }).select("valor");

    return valor;
  },

  listarPedidos: async (id) => {
    return await knex
      .select("*")
      .from("pedidos")
      .where(
        "id",
        "=",
        knex.select("pedido_id").from("pedido_produtos").where("id", "=", id)
      );
  },
  verificarProdutoEmPedido: async (id) => {
    return await knex("pedido_produtos").where({ produto_id: id }).first();
  },
};

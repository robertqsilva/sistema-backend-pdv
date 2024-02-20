const {
    verificaEstoque,
    buscarProduto,
    buscarClientePorId,
    listarPedidos,
    listarPedidosComid,
    listarPedidosSemId,
} = require("../services/database");

const {
    cadastrarPedido,
    cadastrarPedido_Produto
} = require("../utils/cadastrarPedido");

const resposta = require("../utils/response");
const somarQuantidades = require("../utils/somaProdutos");
const transport = require('../services/envioEmail');
const compiladorHtlm = require("../utils/compiladorHtml");

const listarPedidoCId = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const pedidos = await listarPedidosComid(id);

            const pedidosDes = {
                pedido: pedidos.map((item) => ({
                    id: item.id,
                    pedido_id: item.pedido_id,
                    valor_total: item.valor_total,
                    observacao: item.observacao,
                    cliente_id: item.cliente_id,
                })),
                produtos: pedidos.map((item) => ({
                    id: item.pedido_produto_id,
                    pedido_id: item.pedido_id,
                    produto_id: item.produto_id,
                    quantidade_estoque: item.quantidade_estoque,
                    valor: item.valor,
                })),
            };

            return resposta(res, 200, pedidosDes);
        }

        return resposta(res, 200, pedidosDes);
    } catch (error) {
        return resposta(res, 500, "erro interno do servidor");
    }
};

const listarPedidosSId = async (req, res) => {
    try {
        const pedidos = await listarPedidosSemId();

        const pedidosDes = {
            pedido: pedidos.map((item) => ({
                id: item.id,
                pedido_id: item.pedido_id,
                valor_total: item.valor_total,
                observacao: item.observacao,
                cliente_id: item.cliente_id,
            })),
            produtos: pedidos.map((item) => ({
                id: item.pedido_produto_id,
                pedido_id: item.pedido_id,
                produto_id: item.produto_id,
                quantidade_estoque: item.quantidade_estoque,
                valor: item.valor,
            })),
        };
        return resposta(res, 200, pedidosDes);
    } catch (error) {
        return resposta(res, 500, "erro interno do servidor");
    }
};

const cadastrarNovoPedido = async (req, res) => {

    const { cliente_id, observacao, pedido_produtos } = req.body

    try {

        const cliente = await buscarClientePorId(cliente_id);
        if (!cliente) {
            return resposta(res, 404, "Cliente não encontrado")
        }
        const quantidadeTotal = somarQuantidades(pedido_produtos)

        for (let obj of quantidadeTotal) {
            const existeProduto = await buscarProduto(obj.produto_id)
            if (!existeProduto) {
                return resposta(res, 404, `Produto de ID ${obj.produto_id} não existe`)
            }
        }

        for (let obj of quantidadeTotal) {
            const { produto_id, quantidade_produto } = obj
            const temEstoque = await verificaEstoque(produto_id, quantidade_produto)
            if (!temEstoque) {
                return resposta(res, 400, `Não tem estoque suficiente para o  produto de Id ${produto_id}`)
            }
        }

        const pedido = await cadastrarPedido(quantidadeTotal, cliente_id, observacao)

        const pedidoProduto = await cadastrarPedido_Produto(quantidadeTotal, pedido.id)


        const html = await compiladorHtlm('./src/utils/emailPedido.html', {
            nomecliente: cliente.nome,
            novopedido: [pedido.cliente_id, pedido.observacao, pedido.valor_total],
            detalhespedido: [
                pedidoProduto.pedido_id,
                pedidoProduto.produto_id,
                pedidoProduto.quantidade_produto,
                pedidoProduto.valor_total
            ]

        })

        transport.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: "Pedido registrado com sucesso!",
            html
        })

        return resposta(res, 201, { pedido, pedidos_produtos: pedidoProduto })

    } catch (error) {
        return resposta(res, 500, "Erro interno do servidor");
    }
}

const listarPedido = async (req, res) => {
    const { id } = req.query
    try {
        const pedidos = await listarPedidos(id)

        return resposta(res, 200, pedidos);
    } catch (error) {

        return resposta(res, 500, "erro interno do servidor");
    }
}


module.exports = {
    cadastrarNovoPedido,
    listarPedidoCId,
    listarPedidosSId,
    listarPedido
};


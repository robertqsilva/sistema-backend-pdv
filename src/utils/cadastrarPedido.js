const { obterValorProduto, cadastrarPedido_ProdutoDB, cadastrarPedidoDB, } = require("../services/database")

const cadastrarPedido = async (produtos, cliente_id, observacao) => {
    let valorTotal = 0

    for (let i = 0; i < produtos.length; i++) {
        const valorProduto = await obterValorProduto(produtos[i].produto_id)
        valorTotal += (valorProduto[0].valor * produtos[i].quantidade_produto)
    }

    const pedidoCadastrado = await cadastrarPedidoDB(cliente_id, observacao, valorTotal)
    return pedidoCadastrado
}

const cadastrarPedido_Produto = async (quantidadeTotal, pedidoId) => {
    let cadastroPedidoProduto = []

    for (let produto of quantidadeTotal) {

        const valorProdutoUnitario = await obterValorProduto(produto.produto_id)

        let pedidoProdutoCadastro = await cadastrarPedido_ProdutoDB(
            pedidoId,
            produto.produto_id,
            produto.quantidade_produto,
            valorProdutoUnitario[0].valor)

        cadastroPedidoProduto.push(pedidoProdutoCadastro)
    }

    return cadastroPedidoProduto
}

module.exports = {
    cadastrarPedido_Produto,
    cadastrarPedido
}

const somarQuantidades = (produtos) => {

    const idQuantdades = {}

    produtos.forEach(obj => {
        const { produto_id, quantidade_produto } = obj

        if (idQuantdades[produto_id]) {
            idQuantdades[produto_id].quantidade_produto += quantidade_produto;

        } else {
            idQuantdades[produto_id] = { produto_id, quantidade_produto }
        }

    });

    const resultado = Object.values(idQuantdades)
    return resultado


}






module.exports = somarQuantidades



// const somarQuantidades = (produtos) => {

//     let somaPorProduto = [];

//     console.log(produtos);
//     for (let i of produtos) {
//         const produtoId = produtos.findIndex((item) => {
//             return item.produto_id === i.produto_id
//         })
//         if (!produtoId) {
//             somaPorProduto.push({
//                 produto_id: parseInt(produtoId.produto_id, 10),
//                 quantidade_produto: parseInt(produtoId.quantidade_produto, 10),
//             })
//         }

//         somaPorProduto[produtoId].quantidade_produto += i.quantidade_produto
//     }

//     let [, quantidadeTotal] = somaPorProduto
//     let { quantidade_produto } = quantidadeTotal
//     return quantidade_produto

// }

//     produtos.forEach((produto) => {
//         const produtoId = produto.produto_id;
//         const quantidade_produto = produto.quantidade_produto;

//         if (somaPorProduto[produtoId] === undefined) {
//             somaPorProduto[produtoId] = quantidade_produto;
//         } else {
//             somaPorProduto[produtoId] += quantidade_produto;
//         }
//     });

//     somaPorProduto = Object.keys(somaPorProduto).map((produtoId) => ({
//         produto_id: parseInt(produtoId, 10),
//         quantidade_produto: parseInt(somaPorProduto[produtoId], 10),
//     }));
//     return somaPorProduto.quantidade_produto;

// }




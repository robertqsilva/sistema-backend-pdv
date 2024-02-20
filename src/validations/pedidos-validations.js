const joi = require("joi");

const pedidos = {
    cadastrarPedido: joi.object({
        cliente_id: joi.number().required().messages({
            "any.required": "O cliente é obrigatorio",
            "string.empty": "O campo cliente_id não pode ficar vazio",
            "number.base": "O campo cliente_id tem que ser um número",
        }),
        observacao: joi.string().optional(),
        pedido_produtos: joi.array().items(
            joi.object({
                produto_id: joi.number().required().messages({
                    "number.base": "O produto_id deve ser um número",
                    "any.required": "O produto_id é obrigatório",
                }),
                quantidade_produto: joi.number().required().messages({
                    "number.base": "A quantidade_produto deve ser um número",
                    "any.required": "A quantidade_produto é obrigatória",
                }),
            })
        ).required().messages({
            "array.base": "O campo pedido_produtos deve ser um array",
            "any.required": "O campo pedido_produtos é obrigatório",
        }),
    })
}

module.exports = pedidos
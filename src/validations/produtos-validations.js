const joi = require("joi");

const produtos = {
  editarProduto: joi.object({
    descricao: joi.string().min(3).required().messages({
      "any.required": "O campo descrição é obrigatorio",
      "string.empty": "O campo descrição não pode ficar vazio",
      "string.min": "O campo descrição tem que ter no minimo 3 caracteres",
      "string.base": "O campo descrição tem que ser uma string",
    }),
    
    quantidade_estoque: joi.number().positive().required().messages({
      "any.required": "O campo quantidade é obrigatorio",
      "string.empty": "O campo quantidade não pode ficar vazio",
      "number.base": "O campo quantidade tem que ser um número",
      "number.positive": "O campo quantidade_estoque tem que ser um numero positivo",
    }),

    valor: joi.number().positive().required().messages({
      "any.required": "O valor é obrigatoria",
      "string.empty": "O campo valor não pode ficar vazio",
      "number.base": "O valor tem que ser um número",
      "number.positive": "O valor tem que ser um numero positivo",
    }),

    categoria_id: joi.number().required().messages({
      "any.required": "A categoria é obrigatoria",
      "string.empty": "O campo categoria_id não pode ficar vazio",
      "number.base": "O campo categoria_id tem que ser um número",
    }),
  }),
  cadastrarProduto: joi.object({
    descricao: joi.string().min(3).required().messages({
      "any.required": "O campo descrição é obrigatorio",
      "string.empty": "O campo descrição não pode ficar vazio",
      "string.min": "O campo descrição tem que ter no minimo 3 caracteres",
      "string.base": "O campo descrição tem que ser uma string",
    }),

    quantidade_estoque: joi.number().positive().required().messages({
      "any.required": "O campo quantidade_estoque é obrigatorio",
      "string.empty": "O campo quantidade_estoque não pode ficar vazio",
      "number.base": "O campo quantidade_estoque tem que ser um número",
      "number.positive": "O campo quantidade_estoque tem que ser um numero positivo",
    }),

    valor: joi.number().positive().required().messages({
      "any.required": "O valor é obrigatoria",
      "string.empty": "O campo valor não pode ficar vazio",
      "number.base": "O valor tem que ser um número",
      "number.positive": "O valor tem que ser um numero positivo",
    }),

    categoria_id: joi.number().required().messages({
      "any.required": "A o campo categoria_id é obrigatorio",
      "string.empty": "O campo categoria_id não pode ficar vazio",
      "number.base": "O campo categoria_id tem que ser um número",
    }),
  }),
};


module.exports = produtos
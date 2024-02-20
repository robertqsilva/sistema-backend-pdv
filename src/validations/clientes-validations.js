const joi = require("joi");

const cliente = {
  cadastroCliente: joi.object({
    nome: joi.string().min(3).required().messages({
      "any.required": "O campo nome é obrigatorio",
      "string.empty": "O campo nome não pode ficar vazio",
      "string.min": "O campo nome tem que ter no minimo 3 caracteres",
      "string.base": "O campo nome tem que ser uma string",
    }),

    email: joi.string().email().required().messages({
      "any.required": "O campo email é obrigatorio",
      "string.empty": "O campo email não pode ficar vazio",
      "string.email": "Formato de email invalido",
      "string.base": "O campo email tem que ser uma string",
    }),

    cpf: joi.string().min(11).max(11).required().messages({
      "any.required": "O CPF é obrigatorio",
      "string.empty": "O campo CPF não pode ficar vazio",
      "string.min": "Formato de CPF invalido",
      "string.base": "o CPF tem que ser uma string",
      "string.max": "Formato de CPF inválido"
    }),
    cep: joi.string().min(0).messages({
      "string.base": "o CPF tem que ser uma string",
    }),

    rua: joi.string().min(0).messages({
      "string.base": "o campo rua tem que ser uma string",
    }),

    numero: joi.string().min(0).messages({
      "string.base": "o campo número tem que ser uma string",
    }),

    bairro: joi.string().min(0).messages({
      "string.base": "o campo bairro tem que ser uma string",
    }),

    cidade: joi.string().min(0).messages({
      "string.base": "o campo cidade tem que ser uma string",
    }),

    estado: joi.string().min(0).messages({
      "string.base": "o campo estado tem que ser uma string",
    }),
  }),

  atualizarCliente: joi.object({
    nome: joi.string().min(3).required().messages({
      "any.required": "O campo nome é obrigatorio",
      "string.empty": "O campo nome não pode ficar vazio",
      "string.min": "O campo nome tem que ter no minimo 3 caracteres",
      "string.base": "O campo nome tem que ser uma string",
    }),

    email: joi.string().email().required().messages({
      "any.required": "O campo email é obrigatorio",
      "string.empty": "O campo email não pode ficar vazio",
      "string.email": "Formato de email invalido",
      "string.base": "O campo email tem que ser uma string",
    }),

    cpf: joi.string().min(11).max(11).required().messages({
      "any.required": "O CPF é obrigatorio",
      "string.empty": "O campo CPF não pode ficar vazio",
      "string.min": "Formato de CPF invalido",
      "string.base": "o CPF tem que ser uma string",
      "string.max": "Formato de CPF inválido"
    }),
    cep: joi.string().min(0).messages({
      "string.base": "o CPF tem que ser uma string",
    }),

    rua: joi.string().min(0).messages({
      "string.base": "o campo rua tem que ser uma string",
    }),

    numero: joi.string().min(0).messages({
      "string.base": "o campo número tem que ser uma string",
    }),

    bairro: joi.string().min(0).messages({
      "string.base": "o campo bairro tem que ser uma string",
    }),

    cidade: joi.string().min(0).messages({
      "string.base": "o campo cidade tem que ser uma string",
    }),

    estado: joi.string().min(0).messages({
      "string.base": "o campo estado tem que ser uma string",
    }),
  }),
  
};

module.exports = cliente;

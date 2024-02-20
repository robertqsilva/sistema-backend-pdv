module.exports = {
  obterPath: (produto_imagem) => {
    const url = produto_imagem.indexOf(".com/");
    const path = produto_imagem.slice(url + 5);

    return path;
  },
};

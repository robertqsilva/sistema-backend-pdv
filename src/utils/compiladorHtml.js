const fs = require('fs/promises')
const handlebars = require('handlebars')

const compiladorHtlm = async (arquivo, contexto) => {
    const html = await fs.readFile(arquivo)
    const compilador = handlebars.compile(html.toString())
    const htmlString = compilador(contexto)
    return htmlString
}

module.exports = compiladorHtlm
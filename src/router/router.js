const router = require("express").Router();
const user_schema = require("../validations/usuarios-validations");
const product_schema = require("../validations/produtos-validations");
const client_schema = require("../validations/clientes-validations");
const order_schema = require("../validations/pedidos-validations");

const { verificaCliente } = require("../middleware/checkCliente");
const { verificaProduto } = require("../middleware/checkProduct");
const verificaLogin = require("../middleware/auth_token");
const validaRequisicao = require("../middleware/valid-request-body");
const validarProduct = require("../middleware/valid-product");
const multer = require("../middleware/multer-middleware");

const {
  cadastroUsuario,
  editarUsuario,
  loginUsuario,
  pegarUsuario,
  listarCategoria,
} = require("../controllers/usuario-controller");

const {
  deletarProduto,
  editarProduto,
  listar_produtos,
  cadastroProduto,
  buscarDetalhesdoProduto,
} = require("../controllers/produto-controller");

const {
  cadastroCliente,
  editarCliente,
  buscarDetalhesClientes,
  listarClientesController,
} = require("../controllers/clientes-controller");

const { cadastrarNovoPedido, listarPedidosSId, listarPedido } = require("../controllers/pedido-controller");

router.post(
  "/usuario",
  validaRequisicao(user_schema.cadastroUsuario),
  cadastroUsuario
);
router.get("/categoria", listarCategoria);

router.post("/login", validaRequisicao(user_schema.loginUsuario), loginUsuario);
router.use(verificaLogin);

router.get("/usuario", pegarUsuario);
router.put(
  "/usuario",
  validaRequisicao(user_schema.editarUsuario),
  editarUsuario
);

router.get("/produto", listar_produtos);
router.delete("/produto/:id", verificaProduto, deletarProduto);
router.get("/produto/:id", verificaProduto, buscarDetalhesdoProduto);
router.put(
  "/produto/:id",
  multer.fields([{ name: "json" }, { name: "produto_imagem", maxCount: 1 }]),
  validarProduct(product_schema.editarProduto),
  editarProduto
);
router.post(
  "/produto",
  multer.fields([{ name: "json" }, { name: "produto_imagem", maxCount: 1 }]),
  validarProduct(product_schema.cadastrarProduto),
  cadastroProduto
);

router.post(
  "/cliente",
  validaRequisicao(client_schema.cadastroCliente),
  cadastroCliente
);
router.put(
  "/cliente/:id",
  validaRequisicao(client_schema.atualizarCliente),
  editarCliente
);
router.get("/cliente/:id", verificaCliente, buscarDetalhesClientes);
router.get("/cliente", listarClientesController);

//router.get("/pedido/:id", listarPedidosSId);
router.post('/pedido', validaRequisicao(order_schema.cadastrarPedido), cadastrarNovoPedido)
router.get('/pedido', listarPedido)


module.exports = router;

const validarProduct = (joyschema) => async (req, res, next) => {
  try {

    if (req.files) {
      await joyschema.validateAsync(JSON.parse(req.body.json));
      return next()
    }
   
    await joyschema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarProduct;

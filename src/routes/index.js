const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.home);

/* GET detail page */
router.get('/detail', indexController.detail);

/*POST /comprar*/
router.post('/comprar', indexController.comprar);


/*REDIRECCION PARA MERCADO PAGO*/
router.get('/callback', indexController.callback);

router.get('/notifications', indexController.notifications);

module.exports = router;

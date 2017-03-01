var express = require('express');
var autenticacao = require('../utils/autenticacao');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'e-Legal' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/clientes', function(req, res, next) {
    autenticacao.autenticar(req, res, 'pages/cliente');
});

router.get('/produto', function(req, res, next) {
    autenticacao.autenticar(req, res, 'pages/produto');
});

module.exports = router;

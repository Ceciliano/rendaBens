'use strict'

const express = require('express');
const Produto = require('../models/Produto');
const router  = express.Router();


router.get('/', function(req, res) {
  Produto.find(function (err, produtos) {
      if (err) throw err;
      var countClientes = 0;
    });
});

router.get('/cadastroProduto', function(req, res) {
    res.render('admin/pages/cadastro_produto');
});

router.get('/listarProduto', function(req, res) {
    res.render('admin/pages/listaProduto');
});

router.get('/:_id/:idCliente', function(req, res) {
    let query = {_id: req.params._id, cliente: req.params.idCliente};
    Produto.findOne(query)
      .exec(function(err, produto) {
        if (err) throw err;
      });
});

router.post('/', function(req, res) {
  Produto.create(req.body, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
});

router.put('/:_id', function(req, res) {
  Produto.findByIdAndUpdate(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:_id', function(req, res) {
  Produto.findByIdAndRemove(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

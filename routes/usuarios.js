var express = require('express');
var path = require('path');

var router = express.Router();

var autenticacao = require('../utils/autenticacao');

router.post('/', function(req, res){
  console.log('Usuario create');
  autenticacao.addNewAccount({
    login 	: req.body.login,
    email 	: req.body.email,
    pass	: req.body.pass
  }, function(e, data){
    if (e){
      console.log(e);
      res.status(400).send(data);
    }	else{
      req.session.user = data;

      if (req.body.remember == 'true'){
        res.cookie('user', data.login, { maxAge: 900000 });
        res.cookie('pass', data.pass, { maxAge: 900000 });
      }

      res.status(200).send(data);
    }
  });
});

router.post('/login', function(req, res){
  autenticacao.manualLogin(req.body.login, req.body.pass, function(e, o){
    if (!o){
      res.status(400).send(e);
    }	else{
      req.session.user = o;
      if (req.body['remember-me'] == 'true'){
        res.cookie('user', o.user, { maxAge: 900000 });
        res.cookie('pass', o.pass, { maxAge: 900000 });
      }
      res.status(200).send(o);
    }
  });
});

module.exports = router;

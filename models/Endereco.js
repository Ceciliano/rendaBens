var mongoose = require('mongoose');
path = require('path');

var EnderecoSchema = new mongoose.Schema({
  cep: String,
  logradouro: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: String,
  uf: String
});

module.exports = mongoose.model('Endereco', EnderecoSchema);

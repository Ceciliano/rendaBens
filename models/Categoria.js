var mongoose = require('mongoose');
path = require('path');

var CategoriaSchema = new mongoose.Schema({
  nome: String,
  ativo: Boolean,
  descricao: String
});

module.exports = mongoose.model('Categoria', CategoriaSchema);

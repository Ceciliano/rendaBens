var mongoose = require('mongoose');

var ProdutoSchema = new mongoose.Schema({
  nome: String,
  ativo: Boolean,
  descricao: String,
  valor: String,
  cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Cliente'},
  categorias: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}]
});

module.exports = mongoose.model('Produto', ProdutoSchema);

var mongoose = require('mongoose');
path = require('path');

var ClienteSchema = new mongoose.Schema({
  /* FISICA ou JURIDICA */
  tipoPessoa: String,
  nome: String,
  email: String,
  ativo: Boolean,
  cpf: Number,
  cnpj: Number,
  razaoSocial: String,
  inscricaoEstadual: String,
  telfoneFixo: String,
  telefoneCelular: String,
  sexo: String,
  dataNascimento: Date,
  endereco: [{type: mongoose.Schema.Types.ObjectId, ref: 'Endereco'}];
});

module.exports = mongoose.model('Cliente', ClienteSchema);

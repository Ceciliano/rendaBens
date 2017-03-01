var mongoose = require('mongoose');
var path     = require('path');

var UsuarioSchema = new mongoose.Schema({
  login	: String,
  email	: String,
  pass	: String,
  cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Cliente'}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);

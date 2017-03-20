var mongoose = require('mongoose');
var path     = require('path');

var UsuarioSchema = new mongoose.Schema({
  login	: String,
  email	: String,
  pass  : String,
  foto  : {
    lastModified: Number,
    lastModifiedDate : String,
    name : String,
    size : Number,
    type : String,
    data : String
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);

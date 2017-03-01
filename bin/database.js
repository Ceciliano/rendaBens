var mongooseLib = require('mongoose');
var mongoose = {};

mongoose.connect = function(uri) {

    mongooseLib.Promise = global.Promise;

    mongooseLib.connect(uri);

    mongooseLib.connection.on('connected', function() {
        console.log('Mongoose! Conectado em ' + uri);
    });

    mongooseLib.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de ' + uri);
    });

    mongooseLib.connection.on('error', function(erro) {
        console.log('Mongoose! Erro na conexão: ' + erro);
    });

    process.on('SIGINT', function() {
        mongooseLib.connection.close(function() {
          console.log('Mongoose! Desconectado pelo término da aplicação');
          process.exit(0);
        });
    });
};

module.exports = mongoose;

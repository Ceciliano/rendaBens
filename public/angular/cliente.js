angular.module('appClientes', ['ngRoute', 'ngResource','ngMask'])

  //---------------
  // Services
  //---------------

  .factory('Clientes', ['$resource', function($resource) {
    return $resource('/marcas/:idloja', null, {
      'update': { method:'PUT' }
    });
  }])

  //---------------
  // Controllers
  //---------------
  .controller('ListaClientesController', ['$scope', 'Clientes', '$location', '$routeParams', '$http', function ($scope, Clientes, $location, $routeParams, $http) {

    $scope.clientes = [];

  }])

  .controller('EditClienteController', ['$scope', 'Clientes', '$location', '$routeParams', '$http', function ($scope, Marcas, $location, $routeParams, $http) {

    $scope.cliente = {};
    $scope.endereco = {};
    $scope.opcoes = [{'value':true, 'label': 'Sim'}, {'value':false, 'label': 'Não'}];
    $scope.tipoPessoa = [{'value':1, 'label': 'Física'}, {'value':2, 'label': 'Jurídica'}];
    $scope.sexo = [{'value':'M', 'label': 'Masculino'}, {'value':'F', 'label': 'Feminino'}];

    $scope.buscaEndereco = function() {
      if($scope.endereco.cep.length == 9) {
          var cepBusca = $scope.endereco.cep.replace('-','');
          $http.get('http://viacep.com.br/ws/' + cepBusca + '/json/')
          .success(function(endereco){
            console.log(endereco);
            $scope.endereco.logradouro = endereco.logradouro;
            $scope.endereco.bairro = endereco.bairro;
            $scope.endereco.uf = endereco.uf;
            $scope.endereco.cidade = endereco.localidade;
          })
          .error(function(erro){
            console.log('Erro ao buscar os dados de endereco. Erro: ' + erro);
          });
      } else if($scope.endereco.cep.length == 0 ){
        $scope.endereco = {};
      }
    };

    $scope.submeter = function() {

    };

  }])

  //---------------
  // Routes
  //---------------

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/:idLoja', {
        templateUrl: '/listaCliente',
        controller: 'ListaClientesController'
     })
     .when('/novo/:idLoja', {
         templateUrl: '/formularioCliente',
         controller: 'EditClienteController'
      })
     .when('/edit/:idLoja', {
         templateUrl: '/formularioCliente',
         controller: 'EditClienteController'
      });
  }]);

angular.module('appProdutos', ['ngRoute', 'ngResource'])

  //---------------
  // Services
  //---------------

  .factory('Produtos', ['$resource', function($resource) {
    return $resource('/produtos/:id', null, {
      'update': { method:'PUT' }
    });
  }])

  //---------------
  // Controllers
  //---------------

  .controller('ListaProdutosController', ['$scope', 'Produtos', '$location', function ($scope, Produtos, $location) {

    $scope.produtos = [];

    $http.get('/produtos/' + $routeParams.idLoja)
    .success(function(produtos){
        $scope.produtos = produtos;
    })
    .error(function(erro){
        console.log('Erro ao buscar os produtos da loja.');
    });

  }])

  //---------------
  // Routes
  //---------------

  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/:idLoja', {
          templateUrl: '/listaProdutos',
          controller: 'ListaProdutosController'
       })
       .when('/novo/:idLoja', {
           templateUrl: '/formularioProduto',
           controller: 'NovoProdutoController'
        })
       .when('/edit/:idLoja', {
           templateUrl: '/formularioProduto',
           controller: 'EditProdutoController'
        });
  }]);

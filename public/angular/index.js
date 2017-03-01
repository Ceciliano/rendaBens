angular.module('app', ['ngRoute', 'ngResource'])

  //---------------
  // Services
  //---------------

  .factory('Lojas', ['$resource', function($resource) {
    return $resource('/lojas/:id', null, {
      'update': { method:'PUT' }
    });
  }])

  //---------------
  // Controllers
  //---------------

  .controller('LojaController', ['$scope', 'Lojas', '$location', function ($scope, Lojas, $location) {
    $scope.lojas = Lojas.query();

    $scope.save = function(){
      if(!$scope.newLoja || $scope.newLoja.length < 1) return;
      var loja = new Lojas({ nome: $scope.newLoja, ativo: false });

      loja.$save(function(){
        $scope.lojas.push(loja);
        $scope.newLoja = ''; // clear textbox
      });
    }

    $scope.edit = function(index){
      $location.url($scope.lojas[index]._id);
    }

    $scope.remove = function(index){
      var loja = $scope.lojas[index];
      console.log(loja);
      Lojas.remove({id: loja._id}, function(){
        $scope.lojas.splice(index, 1);
      });
    }
  }])

  .controller('LojaDetailCtrl', ['$scope', '$routeParams', 'Lojas', '$location', function ($scope, $routeParams, Lojas, $location) {
    $scope.loja = Lojas.get({id: $routeParams.id });

    $scope.remove = function(){
      Lojas.remove({id: $scope.loja._id}, function(){
        $location.url('/');
      });
    }

    $scope.update = function(){
      Lojas.update({id: $scope.loja._id}, $scope.loja, function(){
        $location.url('/');
      });
    };
  }])

  //---------------
  // Routes
  //---------------

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/lojas.html',
        controller: 'LojaController'
      })

      .when('/:id', {
        templateUrl: '/lojaDetails.html',
        controller: 'LojaDetailCtrl'
     });
  }]);

angular.module('app', ['ngRoute', 'ngResource'])

  //---------------
  // Services
  //---------------

  .factory('Usuarios', ['$resource', function($resource) {
    return $resource('/usuarios/', null, {
      'login': { url:'/usuarios/login/', method:'POST' }
    });
  }])

  //---------------
  // Controllers
  //---------------
  .controller('LoginController', ['$scope', 'Usuarios', '$location', '$window', function ($scope, Usuarios, $location, $window) {
    $scope.usuario = {};

    $scope.login = function() {
      if(!$scope.usuario || $scope.usuario.length < 1) return;
      var usuario = new Usuarios($scope.usuario);
      usuario.$login(function(){
         $location.url('/');
         $window.location.reload();
      });
    };

  }])

  .controller('CadastroController', ['$scope', 'Usuarios', '$location', '$window', function ($scope, Usuarios, $location, $window) {
      $scope.usuario = {};

      $scope.save = function() {
        if(!$scope.usuario || $scope.usuario.length < 1) return;
        var usuario = new Usuarios($scope.usuario);
        usuario.$save(function(){
           $location.url('/');
           $window.location.reload();
        });
      };
  }])

  //---------------
 // Routes
 //---------------

 .config(['$routeProvider', function ($routeProvider) {
   $routeProvider
   .when('/', {
       templateUrl: '/login'
    })
    .when('/cadastro', {
        templateUrl: '/cadastro'
     });
 }]);

angular.module('soundstorm')
.controller('LoginCtrl', function($scope, $window, $state) {

    $window.inviteCallback = function() {
         SC.get('/me')
         .then(function(data){
             console.log('inviteCallback() Auth success!');
              $state.go('menu.home');
         })
         .catch(function(data){
              console.log('inviteCallback() Auth failed!')
              // TODO: Add some error thing
         })
     }

    $scope.scLogin = function() {
    	SC.connect();
    }
})

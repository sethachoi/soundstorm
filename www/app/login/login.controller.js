angular.module('soundstorm')
.controller('LoginCtrl', function($scope, $window, $state, ENV) {
    function testConnection(){
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
    $window.inviteCallback = function() {
         SC.get('/me')
         .then(function(data){
             console.log('inviteCallback() Auth success!');
              $state.go('hostRoom');
         })
         .catch(function(data){
              console.log('inviteCallback() Auth failed!')
              // TODO: Add some error thing
         })
     }

    $scope.scLogin = function() {
    	SC.connect().then(function(){
            testConnection();
        });
    }
})

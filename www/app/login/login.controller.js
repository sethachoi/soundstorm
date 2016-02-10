angular.module('soundstorm')
.controller('LoginCtrl', function($scope) {
    console.log('LoginCtrl started...');

    $scope.scLogin = function() {
    	SC.connect().then(function() {
  			return SC.get('/me');
		}).then(function(me) {
  		alert('Hello, ' + me.username);
		});
    }
})
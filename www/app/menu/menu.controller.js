angular.module('soundstorm')

.controller('MenuCtrl', function($scope, $interval, $state) {
    $scope.logout = function(){
        $state.go('login');
        console.log('logout')
    }
});

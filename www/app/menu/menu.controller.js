angular.module('soundstorm')

.controller('MenuCtrl', function($scope, $interval, $state) {
    console.log('MenuCtrl')
    $scope.username = 'Best_Host_NA';

    $scope.logout = function(){
        $state.go('login');
        console.log('logout')
    }
});

angular.module('soundstorm')
.controller('JoinCtrl', function($scope, Room, User, $state) {
    console.log('JoinCtrl started...');

    $scope.roomJoin = function(code){
        //User.setUsername(name);
        //$state.go('channel');
    }
})

angular.module('soundstorm')
.controller('JoinCtrl', function($scope, Room, User, $state) {
    console.log('JoinCtrl started...');

    $scope.roomJoin = function(code){
        //User.setUsername(name);
        //$state.go('channel');
        Room.doesRoomExist(code)
        .then(function(roomIndex){
            if(roomIndex === -1) {
                $state.go('joinFail');
            } else {
                $state.go('menu.home', { id: code, type: 'g' });
                Room.addUserToRoom(code, User.getUser());
            };
        });
    }
})

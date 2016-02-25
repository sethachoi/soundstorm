angular.module('soundstorm')
.controller('JoinCtrl', function($scope, Room, User, $state, Player) {
    console.log('JoinCtrl started...');

    $scope.roomJoin = function(code){
        //User.setUsername(name);
        //$state.go('channel');
        Room.doesRoomExist(code)
        .then(function(roomIndex){
            if(roomIndex === -1) {
                $state.go('joinFail');
            } else {
                var favrit;
                console.log(Room.joinGetCurrentSong(code));
                Player.faveChecker(Room.joinGetCurrentSong(code))
                .then(function(data){
                    $log.info('faveChecker', data)
                    favrit = true;
                })
                .catch(function(err){
                    $log.error('faveChecker', err)
                    favrit = false;
                });
                $state.go('menu.home', { id: code, type: 'g', faved: favrit });
                Room.addUserToRoom(code, User.getUser());
            };
        });
    }
})

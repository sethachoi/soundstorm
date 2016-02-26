angular.module('soundstorm')
.controller('JoinCtrl', function($scope, Room, User, $state, Player, $firebaseObject) {
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
                var song;
                Room.getSongFromRoom(code)
                .then(function(data){
                    song = data;
                    Player.faveChecker(song.id)
                    .then(function(data){
                        favrit = true;
                        User.setFaved(favrit);
                        $state.go('menu.home', { id: code, type: 'g'});
                        Room.addUserToRoom(code, User.getUser());
                    })
                    .catch(function(err){
                        //$log.error('faveChecker', err)
                        favrit = false;
                        User.setFaved(favrit);
                        $state.go('menu.home', { id: code, type: 'g', faved: favrit });
                        Room.addUserToRoom(code, User.getUser());
                    });
                });
                
                console.log(song);
                

            };
        });
    }
})

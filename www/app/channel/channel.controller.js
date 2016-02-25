angular.module('soundstorm')
.controller('ChannelCtrl', function($log, $scope, $firebaseObject, $state, Room, NameGenerator) {
    console.log('ChannelCtrl started...');

    $scope.hostButton = function(){
        var num = Math.random().toString(36).substr(2, 6);
        var str = num.toUpperCase();

        var name = NameGenerator();
        Room.createRoom(name)
        .then(function(data){
            $state.go('menu.home',{ id: name, type: 'h', faved: false });
        })
        .catch(function(err){
            $log.error('CreateRoom Error', err);
        });
    };
    $scope.joinButton = function() {
        $state.go('joinRoom');
    }

});

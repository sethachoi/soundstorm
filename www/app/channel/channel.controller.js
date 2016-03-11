angular.module('soundstorm')
.controller('ChannelCtrl', function($log, $scope, $firebaseObject, $state, Room, NameGenerator) {
    console.log('ChannelCtrl started...');

    $scope.hostButton = function(){
        mixpanel.track('hostButton')
        var num = Math.random().toString(36).substr(2, 6);
        var str = num.toUpperCase();

        var name = NameGenerator();
        Room.createRoom(name)
        .then(function(data){
            $state.go('menu.home',{ id: name, type: 'h'});
        })
        .catch(function(err){
            $log.error('CreateRoom Error', err);
        });
    };
    $scope.joinButton = function() {
        mixpanel.track('joinRoom')
        $state.go('joinRoom');
    }
    $scope.help = function(){
        mixpanel.track('clicked help button, channel screen')
        $scope.help1=true;
    }


});

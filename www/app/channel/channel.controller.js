angular.module('soundstorm')
.controller('ChannelCtrl', function($scope, $firebaseObject, $state, Room, NameGenerator) {
    console.log('ChannelCtrl started...');

        $scope.hostButton = function(){
        	var num = Math.random().toString(36).substr(2, 6);
        	var str = num.toUpperCase();

            var name = NameGenerator();
        	Room.createRoom(name);

            $state.go('menu.home',{ id: name, type: 'h' });
        };
        $scope.joinButton = function() {
        	$state.go('joinRoom');
        }

});

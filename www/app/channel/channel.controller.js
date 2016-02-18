angular.module('soundstorm')
.controller('ChannelCtrl', function($scope, $firebaseObject, $state, Room) {
    console.log('ChannelCtrl started...');

        $scope.hostButton = function(){
        	var num = Math.random().toString(36).substr(2, 6);
        	var str = num.toUpperCase();
        	Room.createRoom(str);

            $state.go('menu.home');
        };


});

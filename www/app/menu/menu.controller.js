angular.module('soundstorm')

.controller('MenuCtrl', function($scope, $interval, $state, $ionicSideMenuDelegate,$stateParams, User, Room) {
    // console.log($stateParams)
    var vm = this;
    var user = User.getUser();
    vm.username = user.username;
    vm.roomName = Room.getName();

    Room.addNameListener(function(name){
        vm.roomName = name;
    })

    vm.logout = function(){
        $state.go('login');
        console.log('logout')
    }

    vm.help = function(){
        vm.helpHomeSearch = true;
    }

    vm.getHelpHomeCurrentUser = function(){
        $ionicSideMenuDelegate.toggleRight();
        vm.helpHomeCurrentUser = true;
    }

    vm.toggleLeftHelp = function(){
        $ionicSideMenuDelegate.toggleLeft();
        vm.helpHPlaylist = true;
    }
});

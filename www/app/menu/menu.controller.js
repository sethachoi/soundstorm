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
        $state.go('logout');
        //console.log('logout')
    }

    vm.help = function(){
        mixpanel.track('click help, sidebar')
        vm.helpHomeSearch = true;
    }

    vm.getHelpHomeCurrentUser = function(){
        $ionicSideMenuDelegate.toggleRight();
        vm.helpHomeCurrentUser = true;
    }
    vm.toggleRight = function(){
        $ionicSideMenuDelegate.toggleRight();
    }

    vm.toggleLeftHelp = function(){
        $ionicSideMenuDelegate.toggleLeft();
        vm.helpHPlaylist = true;
    }

    vm.goHome = function(){
        $state.go('menu.home', { id: vm.roomName, type: (User.isHost())? 'h':'g'})
    }
});

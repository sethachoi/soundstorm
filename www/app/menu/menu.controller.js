angular.module('soundstorm')

.controller('MenuCtrl', function($scope, $interval, $state, $ionicSideMenuDelegate, User, Room) {
    console.log('MenuCtrl')

    var user = User.getUser();

    $scope.username = user.username;
    $scope.roomID = Room.getName();

    $scope.logout = function(){
        $state.go('login');
        console.log('logout')
    }

    $scope.help = function(){
        $scope.helpHomeSearch = true;
    }

    $scope.getHelpHomeCurrentUser = function(){
        $ionicSideMenuDelegate.toggleRight();
        $scope.helpHomeCurrentUser = true;
    }

    $scope.toggleLeftHelp = function(){
        $ionicSideMenuDelegate.toggleLeft();
        $scope.helpHPlaylist = true;
    }
});

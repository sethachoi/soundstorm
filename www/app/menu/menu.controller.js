angular.module('soundstorm')

.controller('MenuCtrl', function($scope, $interval, $state, $ionicSideMenuDelegate, SSUser) {
    console.log('MenuCtrl')

    var user = SSUser.getUser();

    $scope.username = user.username;

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

angular.module('soundstorm')
.controller('ChannelCtrl', function($scope, $firebaseObject, $state) {
    console.log('ChannelCtrl started...');


        var ref = new Firebase("https://soundstorm.firebaseio.com/rooms");

        $scope.hostButton = function(){
            $state.go('menu.home');
            // ref.set({
            //     'name':'wo'
            // })
        };


})

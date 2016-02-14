angular.module('soundstorm')
.controller('ChannelCtrl', function($scope, $firebaseObject) {
    console.log('ChannelCtrl started...');


        var ref = new Firebase("https://soundstorm.firebaseio.com/channels");

        $scope.hostButton = function(){
            ref.set({
                'name':'wo'
            })
        };


})

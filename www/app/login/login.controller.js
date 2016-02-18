angular.module('soundstorm')
.controller('LoginCtrl', function($scope, $window, $state, ENV, User) {

    // function testConnection(){
    //     SC.get('/me')
    //     .then(function(data){
    //         console.log('inviteCallback() Auth success!');
    //          $state.go('channel');
    //     })
    //     .catch(function(data){
    //          console.log('inviteCallback() Auth failed!')
    //          // TODO: Add some error thing
    //     })
    // }
    // $window.inviteCallback = function() {
    //      SC.get('/me')
    //      .then(function(data){
    //         $state.go('channel');
    //      })
    //      .catch(function(data){
    //           console.log('inviteCallback() Auth failed!')
    //           // TODO: Add some error thing
    //      })
    //  }
    //
    // $scope.scLogin = function() {
    // 	SC.connect().then(function(){
    //         testConnection();
    //     });
    // }

    $scope.guestLogin = function(name){
        User.setUsername(name);
        $state.go('channel')
    }
})

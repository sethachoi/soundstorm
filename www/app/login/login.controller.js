angular.module('soundstorm')
    .controller('LoginCtrl', function($scope, $window, $state, ENV, User) {

        function testConnection(){
            SC.get('/me')
                .then(function(data){
                    console.log('inviteCallback() Auth success!');
                    return User.setUsername(data.username);
                })
                .catch(function(data){
                    console.log('inviteCallback() Auth failed!')
                    // TODO: Add some error thing
                })
                .then(function(){
                    console.log('setUsername Success!');
                    $state.go('channel');
                })
        }
        $window.inviteCallback = function() {
            testConnection();
        }

        $scope.scLogin = function() {
            SC.connect().then(function(){
                testConnection();
            });
        }
        $scope.vm = {
            nameError: false
        }
        $scope.guestLogin = function(name){
            User.setUsername(name)
                .then(function(userData) {
                    // myRef.key() === users.$id;
                    $scope.vm.nameError=false;
                    console.log(userData)
                    $state.go('channel');
                }).catch(function(error) {
                $scope.vm.nameError=true;
                console.error("User Save Error:", error);
            });;

        }
    })

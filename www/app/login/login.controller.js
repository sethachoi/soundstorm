angular.module('soundstorm')
    .controller('LoginCtrl', function($scope, $state, ENV, Auth, User, SC) {

        function testConnection(){
            SC.get('/me')
                .then(function(data){
                    console.log('inviteCallback() Auth success!');

                    User
                        .setUsername(data.username)
                        .then(function(){
                            console.log('setUsername Success!');
                            $state.go('channel');
                            User.setLoggedIn(true);
                        });
                })
                .catch(function(data){
                    console.log('inviteCallback() Auth failed!')
                    // TODO: Add some error thing
                })

        }

        Auth.initCallback(function() {
            testConnection();
        });

        $scope.scLogin = function() {
                mixpanel.track("SoundCloud Login");
            SC.connect().then(function(){
                testConnection();
            });
        }
        $scope.vm = {
            nameError: false
        }
        $scope.guestLogin = function(name){
            mixpanel.track("GuestLogin Login");
            User.setUsername(name)
                .then(function(userData) {
                    // myRef.key() === users.$id;
                    $scope.vm.nameError=false;
                    console.log(userData)
                    User.setLoggedIn(false);
                    $state.go('channel');
                }).catch(function(error) {
                $scope.vm.nameError=true;
                console.error("User Save Error:", error);
            });;

        }
    })

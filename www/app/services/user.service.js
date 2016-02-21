angular.module('soundstorm')
.factory('User', function($log, $location, $cookies, $firebaseObject, $firebaseAuth, ENV) {
    var username = "Anonymous";
    var token = "scrublord";
    var ref = new Firebase(ENV.FIREBASE_URL);
    var users = $firebaseObject(ref.child('users'));

    return {
        firebaseAuth : function() {
            return $firebaseAuth(ref);
        },
        getUser: function() {
            return {
                'username': username,
                'token' : token
            }
        },
        setUsername: function(uname){
            if(uname === undefined || uname === null) {
                throw 'Username is either undefined or null.'
            }

            var authObj = $firebaseAuth(ref);

            return authObj.$authAnonymously()
            .then(function(authData) {
                console.log("Logged in as:", authData.uid);
                token = authData.uid;
                username = uname;
                users[token] = {
                    'username' : username
                };

                return users.$save()
            })

        },
        checkToken: function() {
            return token;
        },
        checkName: function() {
            return username;
        }
    }
});

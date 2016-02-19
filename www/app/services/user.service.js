angular.module('soundstorm')
.factory('User', function($log, $location, $cookies, ENV, $firebaseObject) {
    var username = "Anonymous";
    var token = "scrublord";
    var usersRef = "https://soundstorm.firebaseio.com/users/";
    var thisUsersRef = new Firebase(usersRef);
    var users = $firebaseObject(thisUsersRef);

    return {
        getUser: function() {
            return {
                'username': username,
                'token' : token
            }
        },
        setUsername: function(uname){
            username = uname;
            token = Math.random().toString(36).substr(2, 8);
            users[token] = {
                'username' : username
            };
            users.$save().then(function(thisUsersRef) {
                thisUsersRef.key() === users.$id;
            }, function(error) {
                console.log("Error:", error);
            });
        },
        checkToken: function() {
            return token;
        },
        checkName: function() {
            return username;
        }
    }
});

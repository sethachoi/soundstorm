angular.module('soundstorm')
.factory('User', function($log, $location, $cookies, ENV, $firebaseArray) {
    var username = "Anonymous";
    var token = "scrublord";
    var usersRef = "https://soundstorm.firebaseio.com/users/";
    var thisUsersRef = new Firebase(usersRef);

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
            $firebaseArray(thisUsersRef).$add({
                'name' : username,
                'token' : token
            });
        },
        checkToken: function() {
            return token;
        }
    }
});

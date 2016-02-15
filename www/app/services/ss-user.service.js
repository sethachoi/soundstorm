angular.module('soundstorm')
.factory('SSUser', function($log, $location, $cookies, ENV) {
    var username = "Anonymous";

    return {
        getUser: function() {
            return {
                'username': username
            }
        },
        setUsername: function(uname){
            username = uname;
        }
    }
});

(function() {
    'use strict';
    angular.module('soundstorm')
    .factory('User', User);


    function User($log, $location, $cookies, $firebaseObject, $firebaseAuth, ENV) {
        var userCookie = $cookies.getObject('userData')
        $log.info('Getting userData from cookies:', userCookie);

        var username;// = userCookie.username || "Anonymous";
        var token;// =  userCookie.token || "scrublord";
        var SCLoggedIn = false;
        var faved = false;

        if(userCookie) {
            username = userCookie.username;
            token = userCookie.token;
        } else {
            username = "Anonymous";
            token = "scrublord";
        }
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


                var savePromise = authObj.$authAnonymously()
                .then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                    token = authData.uid;
                    username = uname;
                    users[token] = {
                        'username' : username
                    };
                    return users.$save()
                });


                savePromise.then(function(user){
                    $log.info('user.$save()');

                    $cookies.putObject('userData', {
                        'username': username,
                        'token': token
                    })

                }).catch(function(err){
                    console.error('user.$save()', err);
                });

                return savePromise;

            },
            checkToken: function() {
                return token;
            },
            checkName: function() {
                return username;
            },
            setLoggedIn: function(boolval) {
                SCLoggedIn = boolval;
            },
            checkLoggedIn: function() {
                return SCLoggedIn;
            },
            setFaved: function(boolval) {
                faved = boolval;
            },
            getFaved: function() {
                return faved;
            }
        }
    }


})();

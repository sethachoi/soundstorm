(function(){
    'use strict';
    angular
        .module('soundstorm')
        .factory('Auth', Auth);

    function Auth($log, $location, $window, $cookies, ENV, SC, User) {
        console.log('Auth factory starting...');

        var initCB = function(){};

        var options = {
            client_id: ENV.SOUNDCLOUD_CLIENT_ID,
            redirect_uri: ENV.SOUNDCLOUD_CALLBACK_URL
        };

        var oauth_token = $cookies.get('SC_OAUTH_TOKEN');
        if(oauth_token && oauth_token !== 'null'){
            options.oauth_token = oauth_token;
        }

        SC.initialize(options);
        SC.get('me')
            .then(function(data){
                User.setLoggedIn(true);
                $log.info('[Auth] SC.initialize:', data)
            })
            .catch(function(err){
                User.setLoggedIn(false);
                $log.error('[Auth] User not logged in.');
            });

        // Interface
        $window.initializeCallback = initializeCallback;

        return {
            'initCallback': initCallback,
            'logout': logout
        }

        // Definition
        function initializeCallback(opts) {
            options = {
                oauth_token: opts.oauth_token || null
            };
            $cookies.put('SC_OAUTH_TOKEN', opts.oauth_token);
            SC.initialize(options);
            initCB();
        }

        function initCallback(cb){
            initCB = cb;
        }

        function logout(){
            console.log('Logging out...',$cookies.get('SC_OAUTH_TOKEN'));
            $cookies.put('SC_OAUTH_TOKEN', null);
            console.log('Logged out', $cookies.get('SC_OAUTH_TOKEN'));
        }
    }




})();

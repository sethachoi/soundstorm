(function(){
    'use strict';
    angular
        .module('soundstorm')
        .factory('Auth', Auth);

    function Auth($log, $location, $window, ENV, SC) {
        console.log('Auth factory starting...');

        var initCB = function(){};

        var options = {
            client_id: ENV.SOUNDCLOUD_CLIENT_ID,
            redirect_uri: ENV.SOUNDCLOUD_CALLBACK_URL
        };

        SC.initialize(options);

        // Interface
        $window.initializeCallback = initializeCallback;

        return {
            'initCallback': initCallback,
            'initCaller': initCaller
        }

        // Definition
        function initializeCallback(opts) {
            options = {
                oauth_token: opts.oauth_token || null
            };

            SC.initialize(options);
            initCB();
        }

        function initCallback(cb){
            initCB = cb;
        }

        function initCaller(opts){
            window.opener.initializeCallback(opts);
        }

    }




})();

angular.module('soundstorm.services', [])


.factory('Auth', function($log, $location, ENV) {
    console.log('Auth factory starting...');
    var baseUrl = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    var options = {
        client_id: ENV.SOUNDCLOUD_CLIENT_ID,
        redirect_uri: baseUrl + '/callback.html'
    };

    SC.initialize(options);

  return {
    initialize: function(opts) {
        options = {
              oauth_token: opts.oauth_token || null
        };

        window.opener.SC.initialize(options);
        window.opener.inviteCallback();
    }
  }
});

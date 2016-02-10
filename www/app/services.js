angular.module('soundstorm.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})
.factory('Auth', function($log, $location) {
    console.log('Auth factory starting...');
    var baseUrl = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    var options = {
        client_id: 'cdf0a6cde22cb7171c0f2f8f1718dedd',
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

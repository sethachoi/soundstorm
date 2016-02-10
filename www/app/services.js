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
.factory('Auth', function() {
    console.log('Auth factory starting...');

    var options = {
        client_id: 'faab6ae127bf4488159edae36a9699a0',
        redirect_uri: 'http://localhost:5000/callback.html'
    };

    SC.initialize(options);

  return {
    initialize: function(opts) {
        options = {
              oauth_token: opts.oauth_token || null
        };
        
        SC.initialize(options);
    }
  }
});

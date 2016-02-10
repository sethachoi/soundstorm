angular.module('soundstorm')
.controller('CallCtrl', function($scope, $location, Auth) {
    console.log('SoundCloud Access Token:', $location.hash());
    var prehash = $location.hash();
    var re = /access_token=([\d\w-]*)/;
    var rehash = re.exec(prehash);
    console.log(rehash[1])
    Auth.initialize({oauth_token: rehash[1]});
    SC.get('/me').then(function(data) {
        console.log('me', data);
    }).catch(function(err){
        console.log(err)
    });
})

angular.module('soundstorm.controllers', [])
.controller("FireCtrl", function($scope, $firebaseObject) {
    var ref = new FireBase("https://soundstorm.firebaseio.com/");

    $scope.data = $firebaseObject(ref);
})
.controller('DashCtrl', function($scope) {
})
.controller('SearchCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('MenuCtrl', function($scope) {
})



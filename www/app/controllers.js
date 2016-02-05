angular.module('soundstorm.controllers', [])

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




.controller('ListCtrl', function($scope) {


    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = false

    $scope.editToggle = function(){
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        $scope.shouldShowReorder = !$scope.shouldShowReorder;
    }

    $scope.items = [{
        img: "http://placehold.it/512x512",
        title: "Title 1",
        description: "2:50"
    },{
        img: "http://placehold.it/512x512",
        title: "Title 2",
        description: "2:50"
    },{
        img: "http://placehold.it/512x512",
        title: "Title 3",
        description: "2:50"
    },{
        img: "http://placehold.it/512x512",
        title: "Title 4",
        description: "2:50"
    }]
})
.controller('MenuCtrl', function($scope) {
})

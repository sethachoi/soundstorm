angular.module('starter.controllers', [])

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


.controller('LoginCtrl', function($scope) {
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
.controller('HomeCtrl', function($scope, $interval) {
    $scope.progressval = 0;
    $scope.stopinterval = null;


        startprogress();



    function startprogress()
    {
        $scope.progressval = 0;

        if ($scope.stopinterval)
        {
            $interval.cancel($scope.stopinterval);
        }

        $scope.stopinterval = $interval(function() {
            $scope.progressval = $scope.progressval + 1;
            if( $scope.progressval >= 1000 ) {
                $interval.cancel($scope.stopinterval);
                $state.go('second');
                return;
            }
        }, 1000);
    }

    startprogress();
});

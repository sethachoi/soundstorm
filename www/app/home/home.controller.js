angular.module('soundstorm')

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
            if( $scope.progressval >= 300 ) {
                $interval.cancel($scope.stopinterval);
                $state.go('second');
                return;
            }
        }, 1000);
    }

    startprogress();


    $scope.MathFloor = function(num){
        return Math.floor(num)
    }
});

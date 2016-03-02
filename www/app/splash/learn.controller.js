angular.module('soundstorm')
.controller('LearnCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

    // Called to navigate to the main app
    $scope.startApp = function() {
        $state.go('splash');
        mixpanel.track("Learn More, Clicked Finished");
    };
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
        mixpanel.track("Learn More, Slide " + index);
    };
});

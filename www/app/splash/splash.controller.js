angular.module('soundstorm')
.controller('SplashCtrl', function($scope, NameGenerator) {
    console.log('SplashCtrl started: ', NameGenerator());
})

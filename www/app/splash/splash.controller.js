angular.module('soundstorm')
.controller('SplashCtrl', function($scope, User) {
    var vm = this;
    vm.learn = function(){
        console.log('learn')
        mixpanel.track("Learn More");
    }

    vm.login = function(){
        mixpanel.track("Login");
    }

    // User.setUsername('alex')
    // .then(function(data){
    //     console.log('setUsername', data)
    // });
})

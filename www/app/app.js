// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('soundstorm', ['ionic', 'soundstorm.controllers', 'soundstorm.services', 'firebase'])
.constant('ENV', window.config)
.run(function($ionicPlatform, $rootScope, $location, $state, ENV, Auth) {
    console.log(ENV)

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('splash', {
        url: '/',
        templateUrl: 'app/splash/splash.html',
        controller: 'SplashCtrl'
    })

    .state('channel', {
        url: '/channel',
        templateUrl: 'app/channel/channel.html',
        controller: 'ChannelCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
    })

        .state('callback', {
            url: '/callback',
            templateUrl: 'app/login/callback.html',
            controller: 'CallCtrl'
        })

    .state('playlist', {
        url: '/playlist',
        templateUrl: 'app/templates/playlist.html',
        controller: 'ListCtrl'
    })

    .state('hostRoom', {
        url: '/hostRoom',
        templateUrl: 'app/hostRoom/hostRoom.html',
        controller: 'HostCtrl'
    })

    .state('joinRoom', {
        url: '/joinRoom',
        templateUrl: 'app/joinRoom/joinRoom.html',
        controller: 'JoinCtrl'
    })

    .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
    })

    .state('team', {
        url: '/team',
        templateUrl: 'app/about/team.html',
        controller: 'TeamCtrl'
    })


    // Menu
    .state('menu', {
        url: '/menu',
        templateUrl: 'app/menu/menu.html',
        controller: 'MenuCtrl',
        abstract: true
    })
    .state('menu.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'app/menu/home/home.html',
                controller: 'HomeCtrl'
            }
        }
    })




    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "app/templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'app/templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })
    .state('tab.search', {
        url: '/search',
        views: {
            'tab-search': {
                templateUrl: 'app/templates/tab-search.html',
                controller: 'SearchCtrl'
            }
        }
    })
    .state('tab.friends', {
        url: '/friends',
        views: {
            'tab-friends': {
                templateUrl: 'app/templates/tab-friends.html',
                controller: 'FriendsCtrl'
            }
        }
    })
    .state('tab.friend-detail', {
        url: '/friend/:friendId',
        views: {
            'tab-friends': {
                templateUrl: 'app/templates/friend-detail.html',
                controller: 'FriendDetailCtrl'
            }
        }
    })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'app/templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

})

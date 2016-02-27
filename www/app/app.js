// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('soundstorm', [
        'alexhgian.angular-cloud',
        'ionic',
        'soundstorm.controllers',
        'soundstorm.services',
        'firebase',
        'ngCookies',
        'jett.ionic.filter.bar',
        'ng-walkthrough',
        'ngProgress',
        'underscore'
    ])
    .constant('ENV', window.config)
    .run(function($log, $ionicPlatform, $rootScope, $location, $state, $cookies, ENV, Auth, Room, SC) {
        console.log($cookies.get('SC_OAUTH_TOKEN'));

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


        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $log.info('$stateChangeStart', toState, fromState);
                if(toParams && toParams.id){
                    // Room.doesRoomExist(toParams.id)
                    // .then(function(result){
                    //     if(result < 0) {
                    //         event.preventDefault();
                    //         $log.error('Room does not exist:',toParams.id)
                    //         $state.go('errorInvalidRoom');
                    //     }
                    // })



                }
                //  $state.go('splash')
                // do something
            })
    })

    .config(function($stateProvider, $locationProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {
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
            .state('learn', {
                url: '/learn',
                templateUrl: 'app/splash/learn.html',
                controller: 'LearnCtrl'
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

            .state('joinFail' , {
                url: '/joinFail',
                templateUrl: 'app/joinRoom/joinFailed.html',
                controller: 'JoinCtrl'
            })



            // Menu
            .state('menu', {
                templateUrl: 'app/menu/menu.html',
                controller: 'MenuCtrl as vm',
                abstract: true
            })
            // substates under the menu state
            .state('menu.home', {
                resolve:{
                    checkIfTheRoomExists: function($log, $q, $timeout, $state, $stateParams, Room){
                        $log.info('Checking if room exists...');
                        var deferred = $q.defer();
                        Room.doesRoomExist($stateParams.id)
                            .then(function(result){
                                if(result < 0) {
                                    console.error('Room does not exist:',$stateParams.id)
                                    $state.go('errorInvalidRoom');
                                    deferred.reject();
                                } else {
                                    deferred.resolve('Hello!');
                                }
                            })
                        return deferred.promise
                    }
                },
                url: '/:type/:id/home',
                views: {
                    'menuContent': {
                        templateUrl: 'app/menu/home/home.html',
                        controller: 'HomeCtrl as vm'
                    }
                }
            })
            .state('menu.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'app/menu/about/about.html',
                        controller: 'AboutCtrl'
                    }
                }
            })
            .state('menu.team', {
                url: '/team',
                views: {
                    'menuContent': {
                        templateUrl: 'app/menu/about/team.html',
                        controller: 'TeamCtrl'
                    }
                }
            })
            .state('menu.playlists', {
                url: '/p',
                views: {
                    'menuContent': {
                        templateUrl: 'app/menu/playlist/playlists.html',
                        controller: 'PlaylistsCtrl as vm'
                    }
                }
            })
            .state('menu.playlist', {
                url: '/p/:playlist',
                views: {
                    'menuContent': {
                        templateUrl: 'app/menu/playlist/playlist.html',
                        controller: 'PlaylistCtrl as vm'
                    }
                }
            })

            .state('logout', {
                url: '/logout',
                controller: function($window, $state, Room, User, Auth) {
                    Room.logout();
                    User.logout();
                    Auth.logout();
                    $window.location.href="/logout.html";
                    //$state.go('login');
                }
            })

            // Error States

            .state('errorInvalidRoom', {
                url: '/error-invalid-room',
                templateUrl: 'app/error/room-does-not-exist.html'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');


    });
(function(){
    'use strict';
    angular
    .module('soundstorm')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$interval',
        '$timeout',
        '$state',
        '$ionicFilterBar',
        '$ionicModal',
        '$firebaseArray',
        'Player',
        'ngProgressFactory',
        'Room'
    ];

    function HomeCtrl(
        $rootScope,
        $scope,
        $interval,
        $timeout,
        $state,
        $ionicFilterBar,
        $ionicModal,
        $firebaseArray,
        Player,
        ngProgressFactory,
        Room
    ){

        var ngProgress = ngProgressFactory.createInstance();

        progressElem = document.getElementById('ss-progress-bar');
        ngProgress.setParent(progressElem);
        progressElem.children[0].style['position']='relative';

        ngProgress.setHeight('4px');
        ngProgress.setColor('#f50');

        $scope.searchModalHide = true;
        /**
        * Search Modal
        */
        $ionicModal.fromTemplateUrl('/app/templates/search.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.sModal = modal;
        });

        var filterBarInstance;

        $scope.homeTitle = "Host Home";

        $scope.currentSong = {
            totalFavorited: 0,
            title: "Nothing is playing.",
            author: "Please wait...."

        }

        $scope.songNumber = 0;

        $scope.votesSkipped = 0;
        $scope.favorited = 1;


        $scope.progressval = 0;
        $scope.totalTime = 0;
        $scope.stopinterval = null;

        $scope.usersTotal = 4;
        var currentPlayer;


        var streamTrack = function(track){
            $scope.currentSong = {
                preview: track.artwork_url,
                title: track.title,
                author: track.user.permalink,
                totalFavorited: 123
            }
            $scope.totalTime = track.duration;

            return Player.streamTrack(track, function(player){
                $scope.isPlaying = player.isPlaying();
                Player.on('time', function(time){

                    ngProgress.set((time/$scope.totalTime)*100);
                    $scope.progressval = time;
                    $scope.$apply()
                });
            });
        }

        $scope.isPlaying;
        $scope.play = function(){
            if(Player.getPlayer()){
                $scope.isPlaying = Player.togglePlayback();
            } else {
                Player.find('Give Life Back To Music')
                .then(function(track){
                    streamTrack(track[0]);
                });
            }
        }


        $scope.soundToggle = true;
        $scope.toggleSound = function(){
            Player.toggleSound(function(soundToggle){
                $scope.soundToggle = soundToggle;
            })
        }

        $scope.MathFloor = function MathFloor(num){
            return Math.floor(num)
        }


        $scope.voteSkip = function(){}

        $scope.addFavorite = function(){}


        /**
        * Show filter bar
        */
        $scope.showFilterBar = function () {
            $scope.sModal.show().then(function(){
                filterBarInstance = $ionicFilterBar.show({
                    items: [],
                    debounce: true,
                    delay: 500,
                    container: '.modal',
                    done: function(){
                        $scope.searchModalHide=false;
                    },
                    update: function(filteredItems, filterText) {
                        if (filterText) {
                            console.log(filterText);
                            //findAndPlay(filterText);
                            Player.find(filterText)
                            .then(function(tracks){
                                console.log(tracks)
                                $scope.scResults = tracks;
                                $scope.$apply();
                            });

                        }
                    },
                    cancel: function(){
                        $scope.selectSong;
                        $scope.scResults=null;
                        $scope.searchModalHide=true;
                        $scope.sModal.hide()
                    }
                });
            })

        }

        $scope.addSong = function(track){
            streamTrack(track);
            filterBarInstance();
        }
    }
})();

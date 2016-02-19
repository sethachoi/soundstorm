(function(){
    'use strict';
    angular
    .module('soundstorm')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
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
        var vm = this;

        // Playlist Init
        var Playlist = Room.getPlaylist();
        vm.playlist = Playlist.getTracks();


        var ngProgress = ngProgressFactory.createInstance();

        var progressElem = document.getElementById('ss-progress-bar');
        ngProgress.setParent(progressElem);
        progressElem.children[0].style['position']='relative';

        ngProgress.setHeight('4px');
        ngProgress.setColor('#f50');

        vm.searchModalHide = true;

        var sModal;

        /**
        * Search Modal
        */
        $ionicModal.fromTemplateUrl('/app/templates/search.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            sModal = modal;
        });

        var filterBarInstance;
        vm.title = "Home"
        vm.roomName = "cool-cobra-123";

        vm.currentSong = {
            totalFavorited: 0,
            title: "Nothing is playing.",
            author: "Please wait...."

        }

        vm.songNumber = 0;

        vm.votesSkipped = 0;
        vm.favorited = 1;


        vm.progressval = 0;
        vm.totalTime = 0;
        vm.stopinterval = null;

        vm.usersTotal = 4;
        var currentPlayer;


        var streamTrack = function(track){
            vm.currentSong = {
                preview: track.artwork_url,
                title: track.title,
                author: track.user.permalink,
                totalFavorited: 123
            }
            vm.totalTime = track.duration;

            return Player.streamTrack(track, function(player){
                vm.isPlaying = player.isPlaying();
                Player.on('time', function(time){

                    ngProgress.set((time/vm.totalTime)*100);
                    vm.progressval = time;
                    $scope.$apply()
                });
            });
        }

        vm.isPlaying;
        vm.play = function(){
            if(Player.getPlayer()){
                vm.isPlaying = Player.togglePlayback();
            } else {
                Player.find('Give Life Back To Music')
                .then(function(track){
                    streamTrack(track[0]);
                });
            }
        }


        vm.soundToggle = true;
        vm.toggleSound = function(){
            Player.toggleSound(function(soundToggle){
                vm.soundToggle = soundToggle;
            })
        }

        vm.MathFloor = function MathFloor(num){
            return Math.floor(num)
        }


        vm.voteSkip = function(){}

        vm.addFavorite = function(){}


        /**
        * Show filter bar
        */
        vm.showFilterBar = function () {
            sModal.show().then(function(){
                filterBarInstance = $ionicFilterBar.show({
                    items: [],
                    debounce: true,
                    delay: 500,
                    container: '.modal',
                    done: function(){
                        vm.searchModalHide=false;
                    },
                    update: function(filteredItems, filterText) {
                        if (filterText) {
                            console.log(filterText);
                            //findAndPlay(filterText);
                            Player.find(filterText)
                            .then(function(tracks){
                                console.log(tracks)
                                vm.scResults = tracks;
                                $scope.$apply();
                            });

                        }
                    },
                    cancel: function(){
                        vm.selectSong;
                        vm.scResults=null;
                        vm.searchModalHide=true;
                        sModal.hide()
                    }
                });
            })

        }

        vm.addSong = function(track){
            vm.playlist = Playlist.addTrack(track);
            console.log(vm.playlist)
            
            // streamTrack(track);
            filterBarInstance();
        }
    }
})();

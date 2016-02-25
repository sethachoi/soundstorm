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
        '$firebaseObject',
        '$stateParams',
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
        $firebaseObject,
        $stateParams,
        Player,
        ngProgressFactory,
        Room,
        SC

    ){
        /******************************************************************
        * Intialize VM variables
        *******************************************************************/
        var vm = this; // The controllr's scope

        vm.title = "Home"

        vm.songNumber = 0;

        vm.votesSkipped = 0;
        vm.favorited = 1;


        vm.progressval = 0;
        vm.totalTime = 0;
        vm.stopinterval = null;

        vm.usersTotal = 4;

        // Progrss bar hacks
        var ngProgress = ngProgressFactory.createInstance();

        var progressElem = document.getElementById('ss-progress-bar');
        ngProgress.setParent(progressElem);
        progressElem.children[0].style['position']='relative';

        ngProgress.setHeight('4px');
        ngProgress.setColor('#f50');

        vm.searchModalHide = true;

        vm.currSongFaved = $stateParams.faved;

        // Grab params from URL
        vm.isHost = ($stateParams.type==='h')? true : false;
        // vm.isHost = Room.isHost();


        // Intialize Room
        // Room.findAndSetName($stateParams.id);

        vm.roomName = Room.getName();
        vm.playlist = Room.getPlaylist();
        vm.currentSong = Room.getCurrentSong();

        var unwatch = vm.currentSong.$watch(function() {
            ngProgress.set((vm.currentSong.time/vm.currentSong.duration)*100);
            // console.log("data changed!", vm.currentSong);
        });



        /******************************************************************
        * Search Model Setup
        *******************************************************************/
        var sModal;
        var filterBarInstance;

        $ionicModal.fromTemplateUrl('/app/templates/search.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            sModal = modal;
        });


        /**
        * Get the next track
        */
        function getNextTrack(isFinished){
            var track = vm.playlist[0];
            vm.playlist.$remove(track);
            console.log('getNextTrack', track);
            if(track){
                finished = isFinished;
                streamTrack(track);
            }
        }

        var currentPlayer;
        var finished = true;

        var streamTrack = function(track){
            var currentSong = {
                preview: track.artwork_url,
                title: track.title,
                author: track.user.permalink,
                totalFavorited: track.favoritings_count,
                duration: track.duration,
                time:0,
                id: track.id
            }

            vm.currSongFaved = Player.faveChecker(track.id);
            console.log("testing stuff");
            console.log(vm.currSongFaved);
            console.log(currentSong);

            $('#ss-help-player-info').css({
                "background-image":"url("+track.artwork_url+")"
            });
            
            for( var key in currentSong ){
                vm.currentSong[key] = (typeof currentSong[key] === 'undefined') ? null : currentSong[key];
            }
            vm.currentSong.$save();

            return Player.streamTrack(track, vm, function(player){
                vm.isPlaying = player.isPlaying();
            });
        }

        function clearCurrentSong(){
            var currentSong = {
                preview: "",
                title: "Nothing is playing...",
                author: "",
                totalFavorited: 0,
                duration: 0,
                time:0,
                id: ""
            }
            for( var key in currentSong ){
                vm.currentSong[key] = currentSong[key];
            }
            return vm.currentSong.$save();
        }

        /******************************************************************
        * Player Events
        *******************************************************************/


        // Player add 'time' event listeners
        Player.on('time', function(time){
            vm.currentSong.time = time;
            vm.currentSong.$save();
        });


        // Player add 'finish' event listeners
        Player.on('finish', function(){
            vm.isPlaying = false;
            ngProgress.set(0);
            console.log('finished...')
            clearCurrentSong().then(function(){
                getNextTrack(true);// finished = true
            })
        });


        /******************************************************************
        * Player Controls
        *******************************************************************/

        vm.play = function(){
            var p = Player.getPlayer();
            if(p && !finished){
                vm.isPlaying = Player.togglePlayback();
            } else {
                getNextTrack(false);// finished = false
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

        vm.voteSkip = function(){
            getNextTrack(true);
        }

        vm.addFavorite = function(){
            if(!vm.currSongFaved) {
                SC.put('/me/favorites/' + vm.currentSong.id);
                vm.currSongFaved = true;
            } else {
                SC.delete('/me/favorites/' + vm.currentSong.id);
                vm.currSongFaved = false;
            }
            //make a popup
        }

        vm.addSong = function(track, index){
            vm.playlist.$add(track)
            .then(function(){
                if(finished){
                    getNextTrack(false);
                } 
            });
            vm.scResults.splice(index, 1);
            // filterBarInstance();
        }

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


    }// END function HomeCtrl(){}
})();

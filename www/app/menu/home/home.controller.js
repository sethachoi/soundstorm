(function(){
    'use strict';
    angular
        .module('soundstorm')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$log',
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
        'Room',
        'SC',
        'User'
    ];

    function HomeCtrl(
        $log,
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
        SC,
        User

    ){
        /******************************************************************
         * Intialize VM variables
         *******************************************************************/
        var vm = this; // The controllr's scope

        vm.title = "Home";

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

        vm.currSongFaved = User.getFaved();
        //console.log(vm.currSongFaved);

        // Grab params from URL
        vm.isHost = ($stateParams.type==='h')? true : false;
        User.setHost(vm.isHost);
        // vm.isHost = Room.isHost();
        vm.isGuest = !User.checkLoggedIn();

        // Intialize Room
        // Room.findAndSetName($stateParams.id);

        vm.roomName = Room.getName();
        vm.playlist = Room.getPlaylist();
        vm.currentSong = Room.getCurrentSong();
        Room.getSongFromRoom(vm.roomName)
            .then(function(data) {
                vm.currentSong = data;

                if(vm.isHost){
                    Player.getTrackById(data.id)
                        .then(function(track){
                            console.log('getTrackById', track)
                            streamTrack(track).then(function () {
                                Player.seek(data.time)
                            });
                        })
                }
            });


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


        function checkFavorite(song) {
            Player.faveChecker(song.id)
                .then(function(data){
                    //$log.info('faveChecker', data)
                    vm.currSongFaved = true;
                    User.setFaved(true);
                    console.log("faved is true");
                })
                .catch(function(err){
                    //$log.error('faveChecker', err)
                    vm.currSongFaved = false;
                    User.setFaved(false);
                    console.log("faved is false");
                });
        }

        /**
         * Get the next track
         */
        function getNextTrack(isFinished){
            var track = vm.playlist[0];
            vm.playlist.$remove(track);
            console.log('getNextTrack', track);
            if(track){
                finished = isFinished;
                checkFavorite(track);
                streamTrack(track);
            } else if(!isFinished){
                clearCurrentSong();
                Player.stop();
            }
        }



        var currentPlayer;
        var finished = true;

        var streamTrack = function(track){
            var currentSong = {
                preview: track.artwork_url,
                title: track.title,
                author: track.user.permalink,
                totalFavorited: track.likes_count || track.favoritings_count,
                duration: track.duration,
                id: track.id
            }

            //console.log("testing stuff");
            console.log('streamTrack currentSong', currentSong);

            $('#ss-help-player-info').css({
                "background-image":"url("+track.artwork_url+")"
            });


            for( var key in currentSong ){
                vm.currentSong[key] = (typeof currentSong[key] === 'undefined') ? null : currentSong[key];
            }
            vm.currentSong.$save();

            return Player.streamTrack(track, vm, function(player){
                vm.isPlaying = player.isPlaying();
                finished = false;
                //$scope.apply();
            });
        }

        function clearCurrentSong(){
            $('#ss-help-player-info').css({
                "background-image": "url()"
            });

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
                getNextTrack(true);
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
            getNextTrack(false);
        }


        vm.addFavorite = function(){
            $log.info('addFavorite ...')
            if(!vm.currSongFaved) {
                $log.info('addFavorite add',vm.currentSong.id)
                SC.put('/me/favorites/' + vm.currentSong.id)
                    .then(function(){
                        vm.currSongFaved = true;
                    })
                    .catch(function(){
                        vm.currSongFaved = false;
                    });

            } else {
                $log.info('addFavorite remove',vm.currentSong.id)
                SC.delete('/me/favorites/' + vm.currentSong.id)
                    .then(function(){
                        vm.currSongFaved = false;
                    })
                    .catch(function(){
                        vm.currSongFaved = false;
                    });
            }
            //make a popup
        }

        vm.addSong = function(track, index){
            vm.playlist.$add(track)
                .then(function(){
                    if(finished && vm.isHost){
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
            mixpanel.track('search bar')
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
        ///////////////////////////// listeners
        vm.clickedPlayerStats = function(){
            console.log('clickedPlayerStats')
            mixpanel.track('clickedPlayerStats')
        }

    }// END function HomeCtrl(){}
})();

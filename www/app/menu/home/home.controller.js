angular.module('soundstorm')

.controller('HomeCtrl', function($rootScope,
    $scope,
    $interval,
    $timeout,
    $state,
    $ionicFilterBar,
    $ionicModal,
    Player,
    ngProgressFactory
) {
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


    // <img src="http://placehold.it/200x200">
    // <h2>Core</h2>
    // <p>RL Grime</p>
    // <p>Lorem ipsum dolor sit amet,</p>
    // <p> consectetur adipiscing elit</p>
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
        //SC.resolve('https://soundcloud.com/kritand/epic-sax-guy-epic-sax').then(streamTrack);
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


    $scope.voteSkip = function(){
        // var votes = $scope.votesSkipped;
        // votes++;
        //
        //
        // if(votes >= $scope.usersTotal){
        //
        //     $scope.songNumber++;
        //     $scope.songNumber = $scope.songNumber % $scope.playlist.length;
        //
        //     $scope.currentSong = $scope.playlist[$scope.songNumber];
        //
        //     if($scope.songNumber == $scope.playlist.length-1){
        //         $scope.nextSong =  $scope.playlist[0];
        //     } else {
        //         $scope.nextSong =  $scope.playlist[$scope.songNumber+1];
        //     }
        //
        //
        //     $scope.votesSkipped=0;
        // } else {
        //     $scope.votesSkipped++;
        // }

    }

    $scope.addFavorite = function(){
        // if( $scope.playlist[$scope.songNumber].favorited ) {
        //     $scope.playlist[$scope.songNumber].favorited = false;
        //     $scope.playlist[$scope.songNumber].totalFavorited--;
        // } else {
        //     $scope.playlist[$scope.songNumber].favorited = true;
        //     $scope.playlist[$scope.songNumber].totalFavorited++;
        // }
        // $scope.currentSong = $scope.playlist[$scope.songNumber];
    }


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
});

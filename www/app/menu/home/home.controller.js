angular.module('soundstorm')

.controller('HomeCtrl', function($rootScope, $scope, $interval, $timeout, $state) {
    // <img src="http://placehold.it/200x200">
    // <h2>Core</h2>
    // <p>RL Grime</p>
    // <p>Lorem ipsum dolor sit amet,</p>
    // <p> consectetur adipiscing elit</p>
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
        console.log()
        $scope.currentSong = {
            preview: track.artwork_url,
            title: track.title,
            author: track.user.permalink,
            totalFavorited: 123
        }
        $scope.totalTime = parseInt(track.duration/1000);

        return SC.stream('/tracks/' + track.id).then(function(player){
            currentPlayer = player;

            console.log(player)


            player.play();
            $scope.isPlaying = currentPlayer.isPlaying();

            player.on('time', function(data){

                var time = parseInt(player.currentTime()/1000);
                console.log( $scope.progressval)

                $scope.progressval = time;
                $scope.$apply()
            })

        });
    }

    // SC.get('/tracks', {
    //     q: 'kimsinho'
    // }).then(function(tracks) {
    //     console.log(tracks[0]);
    //     streamTrack(tracks[0])
    //
    //     // SC.resolve(tracks[0].permalink_url).then(streamTrack)
    // });
    $scope.isPlaying;
    $scope.play = function(){
        if(currentPlayer){
            if(currentPlayer.isPlaying()){
                currentPlayer.pause();
            } else {
                currentPlayer.play();
            }
            $scope.isPlaying = currentPlayer.isPlaying();
        } else {
            SC.get('/tracks', {
                q: 'daft punk'
            }).then(function(tracks) {
                console.log(tracks[0]);
                streamTrack(tracks[0])
                // SC.resolve(tracks[0].permalink_url).then(streamTrack)
            });
        }


        //SC.resolve('https://soundcloud.com/kritand/epic-sax-guy-epic-sax').then(streamTrack);
    }

    $scope.play();

    var soundToggle = true;
    $scope.soundToggle = soundToggle;

    $scope.mute = function(){
        if(soundToggle){
            currentPlayer.setVolume(0);
            soundToggle = false;
        } else {
            currentPlayer.setVolume(1);
            soundToggle = true;
        }
        $scope.soundToggle = soundToggle;
    }

    // function startprogress()
    // {
    //     $scope.progressval = 0;
    //
    //     if ($scope.stopinterval)
    //     {
    //         $interval.cancel($scope.stopinterval);
    //     }
    //
    //     $scope.stopinterval = $interval(function() {
    //         $scope.progressval = $scope.progressval + 1;
    //         if( $scope.progressval >= 300 ) {
    //             $interval.cancel($scope.stopinterval);
    //             // $state.go('second');
    //             return;
    //         }
    //     }, 1000);
    // }
    //
    // startprogress();


    $scope.MathFloor = function(num){
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
});

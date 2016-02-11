angular.module('soundstorm')

.controller('HomeCtrl', function($scope, $interval, $timeout, $state) {
    // <img src="http://placehold.it/200x200">
    // <h2>Core</h2>
    // <p>RL Grime</p>
    // <p>Lorem ipsum dolor sit amet,</p>
    // <p> consectetur adipiscing elit</p>
    $scope.playlist = [{
        songId: 1234,
        preview: "http://placehold.it/200x200",
        title: "Core",
        author: "RL Grime",
        description: "Lorem Ipsum dolor.",
        soundcloudURL: "",
        totalFavorited: 999,
        favorited: false
    },{
        songId: 1235,
        preview: "http://placehold.it/200x200",
        title: "Sample Song 2",
        author: "Example Author 2",
        description: "Example Description 2",
        soundcloudURL: "",
        totalFavorited: 25,
        favorited: false
    },{
        songId: 1235,
        preview: "http://placehold.it/200x200",
        title: "Another Sample Song 3",
        author: "Another Example Author 3",
        description: "Another Example Description 3",
        soundcloudURL: "",
        totalFavorited: 100,
        favorited: false
    }]

    $scope.songNumber = 0;

    $scope.currentSong = $scope.playlist[$scope.songNumber];
    $scope.nextSong =  $scope.playlist[$scope.songNumber+1];


    $scope.votesSkipped = 2;
    $scope.favorited = 1;

    $scope.progressval = 0;
    $scope.stopinterval = null;

    $scope.usersTotal = 4;




    function startprogress()
    {
        $scope.progressval = 0;

        if ($scope.stopinterval)
        {
            $interval.cancel($scope.stopinterval);
        }

        $scope.stopinterval = $interval(function() {
            $scope.progressval = $scope.progressval + 1;
            if( $scope.progressval >= 300 ) {
                $interval.cancel($scope.stopinterval);
                $state.go('second');
                return;
            }
        }, 1000);
    }

    startprogress();


    $scope.MathFloor = function(num){
        return Math.floor(num)
    }


    $scope.voteSkip = function(){
        var votes = $scope.votesSkipped;
        votes++;


        if(votes >= $scope.usersTotal){

            $scope.songNumber++;
            $scope.songNumber = $scope.songNumber % $scope.playlist.length;

            $scope.currentSong = $scope.playlist[$scope.songNumber];

            if($scope.songNumber == $scope.playlist.length-1){
                $scope.nextSong =  $scope.playlist[0];
            } else {
                $scope.nextSong =  $scope.playlist[$scope.songNumber+1];
            }


            $scope.votesSkipped=0;
        } else {
            $scope.votesSkipped++;
        }

    }

    $scope.addFavorite = function(){
        if( $scope.playlist[$scope.songNumber].favorited ) {
            $scope.playlist[$scope.songNumber].favorited = false;
            $scope.playlist[$scope.songNumber].totalFavorited--;
        } else {
            $scope.playlist[$scope.songNumber].favorited = true;
            $scope.playlist[$scope.songNumber].totalFavorited++;
        }
        $scope.currentSong = $scope.playlist[$scope.songNumber];
    }
});

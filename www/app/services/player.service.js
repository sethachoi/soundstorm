angular.module('soundstorm')
.factory('Player', function($log, $location, $cookies, ENV, Playlist) {
    "use strict";
    var soundToggle = true;

    var currentPlayer;
    var timeListenerCallback = function(){};

    function streamTrack(track, cb){
        // console.log()
        // $scope.currentSong = {
        //     preview: track.artwork_url,
        //     title: track.title,
        //     author: track.user.permalink,
        //     totalFavorited: 123
        // }
        // $scope.totalTime = parseInt(track.duration/1000);

        return SC.stream('/tracks/' + track.id)
        .then(function(player){
            currentPlayer = player;
            player.play();
            player.setVolume(0.1);
            registerListener(player);
            cb(player);
        });
    }

    function registerListener(player){
        player.on('time', function(data){
            timeListenerCallback(currentPlayer.currentTime());
        })
    }


    function find(trackName){
        return SC.get('/tracks', {
            q: trackName
        })
    }


    function toggleSound(cb){
        if(currentPlayer){
            if(soundToggle){
                currentPlayer.setVolume(0);
                soundToggle = false;
            } else {
                currentPlayer.setVolume(0.1);
                soundToggle = true;
            }
        }
        cb(soundToggle);
    }


    function togglePlayback(){
        if(currentPlayer){
            if(currentPlayer.isPlaying()){
                currentPlayer.pause();
            } else {
                currentPlayer.play();
            }
        }
        return currentPlayer.isPlaying();
    }


    // Events
    var events = {
        'time' : function(cb){
            timeListenerCallback = cb;
        }
    };

    function on(event, cb){
        var eventListener = events[event] || function(){};
        eventListener(cb);
    };


    return {
        'getPlayer': function(){
            return currentPlayer;
        },
        'togglePlayback': togglePlayback,
        'toggleSound': toggleSound,
        'streamTrack': streamTrack,
        'find': find,
        'on': on
    }
});

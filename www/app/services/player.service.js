angular.module('soundstorm')
.factory('Player', function($log, $location, $cookies, ENV, SC) {
    "use strict";
    var soundToggle = true;
    var MAX_VOLUME = 0.5;
    var currentPlayer;
    var timeListenerCallback = function(){};
    var finishListenerCallback = function(){};
    var finished = false;
    function streamTrack(track, vm, cb){
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
            console.log('now playing...', player)
            currentPlayer = player;
            player.play();

            player.setVolume(MAX_VOLUME);
            registerListener(player);
            cb(player);
        }).catch(function(err){
            console.log('err', err);
        });
    }

    function registerListener(player){
        player.on('time', function(data){
            timeListenerCallback(currentPlayer.currentTime());
        })
        player.on('finish', function(data){
            player.seek(0);
            finishListenerCallback();
        })
    }


    function find(trackName){
        return SC.get('/tracks', {
            q: trackName
        })
    }

////////////////////////
//this is the cluster fuck
    function faveChecker(trackid) {
        // SC.get();
        //return $.when(getInfo(trackid)).then(isFaved);
        return SC.get('me/favorites/' + trackid);
    }

    function getTrackById(trackid) {
        // SC.get('/tracks/' + trackid);
        // console.log("testing fave check " + trackid);
        //var isit = SC.get('/tracks/' + trackid);
        //var isin = isit.user_favorite;
        //console.log(isit);

        return SC.get('/tracks/' + trackid);
    }

    function isFaved(dataD) {
        console.log(dataD);
        return false;
    }
//////////////////////

    function toggleSound(cb){
        if(currentPlayer){
            if(soundToggle){
                currentPlayer.setVolume(0);
                soundToggle = false;
            } else {
                currentPlayer.setVolume(MAX_VOLUME);
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
            finished = false;
        },
        'finish' : function(cb){
            finishListenerCallback = cb;
            finished = true;
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
        'on': on,
        'isFaved': isFaved,
        'faveChecker': faveChecker,
        'getTrackById': getTrackById
    }
});

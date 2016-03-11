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
            if(!currentPlayer) return null;
            timeListenerCallback(currentPlayer.currentTime());
        })
        player.on('finish', function(data){
            player.seek(0);
            finishListenerCallback();
        })
        player.on('seek', function(data){
            console.log('seek', data)
        })
        player.on('buffering_start', function(data){
            console.log('buffering_start', data)
        })
        player.on('buffering_end', function(data){
            console.log('buffering_end', data)
        })
    }


    function find(trackName){
        return SC.get('/tracks', {
            q: trackName
        })
    }

    function faveChecker(trackid) {
        return SC.get('me/favorites/' + trackid);
    }

    function getTrackById(trackid) {
        if(!trackid) return null;
        return SC.get('/tracks/' + trackid);
    }


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

    function stop(){
        if(currentPlayer && currentPlayer.options){
            currentPlayer.seek(currentPlayer.options.duration);
            currentPlayer=null;
        }
    }

    function seek(time){
        if(!currentPlayer){ return null }
        console.log('seeking:', time)
        setTimeout(function(){
            currentPlayer.seek(time)
        }, 1000);
    }

    return {
        'getPlayer': function(){
            return currentPlayer;
        },
        'togglePlayback': togglePlayback,
        'toggleSound': toggleSound,
        'streamTrack': streamTrack,
        'find': find,
        'on': on,
        'faveChecker': faveChecker,
        'getTrackById': getTrackById,
        'stop': stop,
        'seek': seek
    }
});

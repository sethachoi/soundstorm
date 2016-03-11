(function(){
    'use strict';

    angular
        .module('soundstorm')
        .controller('PlaylistsCtrl', PlaylistsCtrl);

    //TestCtrl.$inject = ['$log', '$firebaseObject', '$firebaseArray','$cookies', 'ENV', '_', 'User'];

    function PlaylistsCtrl($log, $stateParams, Auth, Playlist, Room){
        console.log($stateParams);

        var vm = this;
        Playlist.getPlaylist()
            .then(function(data){
                $log.info('playlist', data)
                vm.playlist = data;
            });


        vm.playPlaylist = function(playlist){
            $log.info('Playlist Play:', playlist);


            Room.clearPlaylist()
                .then(function(){
                    console.log('Cleared');
                    var fbPlaylist = Room.getPlaylist();
                    for(var i = 0; i < playlist.tracks.length; i++ ){
                        fbPlaylist.$add(playlist.tracks[i])
                    }

                })
        }

    }



})();
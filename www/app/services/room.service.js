(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Room', Room);

    Room.$inject = ['$log', '$firebaseArray', 'ENV', '_', 'Playlist'];


    function Room($log, $firebaseArray, ENV, _, Playlist) {
        var playlist = {};

        function room(name){
            roomName = name;
            return {
                'roomName':roomName,
                'getPlaylist': getCurrentPlaylist,
                'setPlaylist': setCurrentPlaylist
            };
        }

        return room;




        function getCurrentPlaylist(){
            return playlist
        }

        function setCurrentPlaylist(currentPlaylist){
            playlist = Playlist(currentPlaylist);
        }
    }
})();

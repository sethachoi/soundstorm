(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Room', Room);

    Room.$inject = ['$log', '$firebaseArray', 'ENV', '_', 'Playlist'];

    function Room($log, $firebaseArray, ENV, _, Playlist) {
        var playlist = Playlist([], 'Default');
        var roomName = "";

        return {
            'roomName':roomName,
            'getPlaylist': getPlaylist,
            'setPlaylist': setPlaylist
        };

        function getPlaylist(){
            return playlist
        }

        function setPlaylist(currentPlaylist){
            playlist = Playlist(currentPlaylist);
        }



    }
})();

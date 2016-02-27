(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Playlist', Playlist);

    //Playlist.$inject = ['$log', SC];

    function Playlist($log, SC) {
        //<<<<<<<<<<<<<<<<<<<<<<<<<<  Interface  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

        return {
            'getPlaylist':getPlaylist,

        };

        //<<<<<<<<<<<<<<<<<<<<<<<<<<  Definition  >>>>>>>>>>>>>>>>>>>>>>>>>>>>//

        function getPlaylist(){
           return SC.get('/me/playlists')
        }




    }
})();

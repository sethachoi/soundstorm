(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Playlist', Playlist);

    Playlist.$inject = ['$log', '$firebaseArray', 'ENV', '_'];

    // Usage:
    // var myPlaylist = Playlist([{
    //     name:'song1',
    // },{
    //     name:'song2'
    // },{
    //     name:'song3'
    // },{
    //     name:'song4'
    // }], 'Hello Playlist');
    function Playlist($log, $firebaseArray, ENV, _) {
        return function(playlist, name){
            playlist = angular.copy(playlist || []);
            var name = name || '';
            
            //<<<<<<<<<<<<<<<<<<<<<<<<<<  Interface  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

            var Playlist =  {
                'name': name,
                'getTracks': getTracks,
                'addTrack': addTrack,
                'removeTrack': removeTrack,
                'reorderTrack': reorderTrack
            };

            return Playlist;


            //<<<<<<<<<<<<<<<<<<<<<<<<<<  Definition  >>>>>>>>>>>>>>>>>>>>>>>>>>>>//

            /**
            * Get the list of tracks for this playlist
            */
            function getTracks(){
                return playlist;
            }

            /**
            * Adds song to the playlist
            * @param {Object} track A soundcloud track object
            */
            function addTrack(track){
                playlist.push(track);
                return playlist;
            }

            /**
            * Remove song to the playlist
            * @param {Number} index The index of the element where you want to remove
            */
            function removeTrack(index){
                playlist.splice(index, 1);
                return playlist;
            }

            /**
            * Reorder Playlist
            * @param {Number} fromIndex The index of the element you want to move
            * @param {Number} fromIndex The index of where you want to move the element
            */
            function reorderTrack(fromIndex, toIndex) {
                var item = playlist[fromIndex];
                playlist.splice(fromIndex, 1)
                playlist.splice(toIndex, 0, item)
                return playlist;
            }
        }
    }
})();

(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Playlist', Playlist);

    Playlist.$inject = ['$log', '$firebaseArray','$firebaseObject', 'ENV', '_'];

    function Playlist($log, $firebaseArray, $firebaseObject, ENV, _) {
        var _ref = new Firebase(ENV.FIREBASE_URL);
        var playRef = _ref.child('playlists');
        // playlist = angular.copy(name || []);

        //<<<<<<<<<<<<<<<<<<<<<<<<<<  Interface  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

        return {
            'getPlaylist':getPlaylist,
            'createPlaylist': createPlaylist
            // 'getTracks': getTracks,
            // 'addTrack': addTrack,
            // 'removeTrack': removeTrack,
            // 'reorderTrack': reorderTrack,
            // 'getNextTrack': getNextTrack
        };

        //<<<<<<<<<<<<<<<<<<<<<<<<<<  Definition  >>>>>>>>>>>>>>>>>>>>>>>>>>>>//

        function getPlaylist(pid){
            return $firebaseArray(playRef.child(pid));
        }

        function createPlaylist(name){
             return $firebaseArray(playRef)
             .$add({ name: name, tracks: [0,1,2,3,4] }).then(function(r){
                 console.log('firebaseArray playlist', r.key())
             })
        }



    }
})();

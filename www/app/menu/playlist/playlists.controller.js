(function(){
    'use strict';
    angular
    .module('soundstorm')
    .controller('PlaylistsCtrl', PlaylistsCtrl);

    PlaylistsCtrl.$inject = ['$scope', '$firebaseArray', 'ENV', 'Playlist', '_'];
    function PlaylistsCtrl($scope, $firebaseArray, ENV, Playlist, _) {

    }


})();

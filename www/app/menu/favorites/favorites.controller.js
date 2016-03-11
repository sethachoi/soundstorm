(function(){
    'use strict';
    angular
    .module('soundstorm')
    .controller('FavoritesCtrl', PlaylistCtrl);

    PlaylistCtrl.$inject = ['$scope', '$state', '$firebaseArray', 'ENV', 'Playlist', '_', 'PlaylistSampleData'];
    function PlaylistCtrl($scope, $state, $firebaseArray, ENV, Playlist, _) {
        var vm = this;
        vm.shouldShowDelete = false;
        vm.shouldShowReorder = false;
        vm.listCanSwipe = true;

        Playlist.createPlaylist('Vocaloid');

        vm.editToggle = function(){
            vm.shouldShowDelete = !vm.shouldShowDelete;
            vm.shouldShowReorder = !vm.shouldShowReorder;
        }

        // vm.playlist = Playlist.createPlaylist();
        console.log('vm.playlist',vm.playlist);


        vm.reorderItem = function(item, fromIndex, toIndex) {
            //Move the item in the array
            console.log('reorderItem')
            vm.playlist.splice(fromIndex, 1);
            vm.playlist.splice(toIndex, 0, item);
        };
    }


})();

(function(){
    'use strict';

    angular
        .module('soundstorm')
        .controller('TestCtrl', TestCtrl);

    //TestCtrl.$inject = ['$log', '$firebaseObject', '$firebaseArray','$cookies', 'ENV', '_', 'User'];

    function TestCtrl($log, $stateParams, Playlist){
        console.log($stateParams);

        var vm = this;
       Playlist.getPlaylist().then(function(data){
           $log.info('playlist', data)
           vm.playlist = data;
       });

    }



})();
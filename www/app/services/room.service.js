(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Room', Room);

    Room.$inject = ['$log', '$firebaseObject', 'ENV', '_', 'Playlist', 'User'];

    function Room($log, $firebaseObject, ENV, _, Playlist, User) {
        var playlist = Playlist([], 'Default');
        var roomName = "";
        var roomsRef = "https://soundstorm.firebaseio.com/rooms/";


        var thisRef = new Firebase(roomsRef);

        return {
            'roomName':roomName,
            'getPlaylist': getPlaylist,
            'setPlaylist': setPlaylist,
            'createRoom': createRoom,
            'getName': getName,
            'doesRoomExist' : doesRoomExist
        };

        function getName() {
            return roomName;
        }

        function getPlaylist(){
            return playlist
        }

        function setPlaylist(currentPlaylist){
            playlist = Playlist(currentPlaylist);
        }


        function createRoom(name) {
            roomName = name;

            $firebaseObject(thisRef).$add({
                'name' : roomName,
                'owner' : User.getUser(),
                'playlist' : [{'trackID' : 233895084,
                                'title' : 'Tiger Blood',
                                'artist' : 'graves',
                                'length' : '3:15'}],
                'users' : [User.getUser()]
            });
        }

        function doesRoomExist(code) {

        }
    }
})();

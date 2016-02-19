(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Room', Room);

    Room.$inject = ['$log', '$firebaseObject', '$firebaseArray', 'ENV', '_', 'Playlist', 'User'];

    function Room($log, $firebaseObject, $firebaseArray, ENV, _, Playlist, User) {
        var playlist = Playlist([], 'Default');
        var roomName = "";
        var owner = "";
        var users = [];

        var _ref = new Firebase(ENV.FIREBASE_URL).child('rooms');
        var rooms = $firebaseObject(_ref);
        var roomsArr = $firebaseArray(_ref);

        return {
            'getPlaylist': getPlaylist,
            'getCurrentSong': getCurrentSong,
            'createRoom': createRoom,
            'getName': getName,
            'setName': setName,
            'doesRoomExist' : doesRoomExist,
            'addUserToRoom' : addUserToRoom
        };

        function getName() {
            return roomName;
        }
        function setName(name) {
             roomName = name;
        }

        function getPlaylist(){
            return $firebaseArray(_ref.child(roomName).child('playlist'));
        }

        function getCurrentSong(){
            return $firebaseObject(_ref.child(roomName).child('currentSong'));

        }
        // function setPlaylist(currentPlaylist){
        //     playlist = Playlist(currentPlaylist);
        // }

        function createRoom(name) {
            roomName = name;
            owner = User.getUser();
            users = [User.getUser()];
            /* sample track struct
            playlist = [{'trackID' : 233895084,
            'title' : 'Tiger Blood',
            'artist' : 'graves',
            'length' : '3:15'}];
            */

            rooms[roomName] = {
                'name' : roomName,
                'owner' : owner,
                'playlist' : [],
                'users' : users
            };
            return rooms.$save();
        }

        function doesRoomExist(code) {
            var res = roomsArr.$indexFor(code);
            console.log('doesRoomExist', res);
            return res;
        }

        function addUserToRoom(roomCode, userObj) {
            //TODO: add more data sync stuff
            roomName = roomCode;
            return $firebaseArray(_ref.child(roomCode)).$add(userObj);
        }
    }
})();

(function(){
    'use strict';
    angular
    .module('soundstorm')
    .factory('Room', Room);

    Room.$inject = ['$log', '$firebaseObject', '$firebaseArray', 'ENV', '_', 'Playlist', 'User'];

    function Room($log, $firebaseObject, $firebaseArray, ENV, _, Playlist, User) {
        var playlist = Playlist([], 'Default');
        var roomName = "";
        var roomsRef = "https://soundstorm.firebaseio.com/rooms/";
        var owner = "";
        var users = [];

        var thisRef = new Firebase(roomsRef);
        var rooms = $firebaseObject(thisRef);

        var roomsArr = $firebaseArray(thisRef);

        return {
            'roomName':roomName,
            'getPlaylist': getPlaylist,
            'setPlaylist': setPlaylist,
            'createRoom': createRoom,
            'getName': getName,
            'doesRoomExist' : doesRoomExist,
            'addUserToRoom' : addUserToRoom
        };

        function getName() {
            return roomName;
        }

        function getPlaylist(){
            return playlist;
        }

        function setPlaylist(currentPlaylist){
            playlist = Playlist(currentPlaylist);
        }


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
                'playlist' : [{'trackID' : 233895084,
                                'title' : 'Tiger Blood',
                                'artist' : 'graves',
                                'length' : '3:15'}],
                'users' : users
            };
            rooms.$save().then(function(thisRef) {
                thisRef.key() === rooms.$id;
            }, function (error) {
                console.log("Error:", error);
            });
        }

        function doesRoomExist(code) {
            return roomsArr.$indexFor(code);
        }

        function addUserToRoom(roomCode, userObj) {
            var roomsArr2 = new $firebaseArray(new Firebase(roomsRef + roomCode + "/users/"));
            roomsArr2.$add(userObj);
            roomName = roomCode;
            //TODO: add more data sync stuff
        }
    }
})();

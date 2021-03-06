(function(){
    'use strict';
    angular
        .module('soundstorm')
        .factory('Room', Room);

    Room.$inject = ['$log', '$firebaseObject', '$firebaseArray','$cookies', 'ENV', '_', 'User'];

    function Room($log, $firebaseObject, $firebaseArray, $cookies, ENV, _, User) {

        var nameCallback = [];
        var roomName = $cookies.get('roomName') || "";
        var owner = "";
        var users = [];

        $log.info('Current roomName:', roomName);

        var _ref = new Firebase(ENV.FIREBASE_URL).child('rooms');
        var rooms = $firebaseObject(_ref);
        var roomsArr = $firebaseArray(_ref);
        var currSong;

        return {
            'addNameListener': addNameListener,
            'clearPlaylist':clearPlaylist,
            'getPlaylist': getPlaylist,
            'getCurrentSong': getCurrentSong,
            'createRoom': createRoom,
            'getName': getName,
            'findAndSetName': findAndSetName,
            'setName': setName,
            'doesRoomExist' : doesRoomExist,
            'addUserToRoom' : addUserToRoom,
            'getSongFromRoom' : getSongFromRoom,
            'logout': logout,
            'userCount': userCount
        };

        function addNameListener(cb){
            nameCallback.push(cb);
        }

        //Call Helper
        function broadcastNameEvent(name){
            for(var i = 0; i < nameCallback.length; i++){
                var cb = nameCallback[i];
                cb(name);
            }
        }

        function getName() {
            return roomName;
        }

        function findAndSetName(name) {
            var p = doesRoomExist(name)
            // $log.debug('findAndSetName', p)
            //setName(name)
        }

        function setName(name) {
            $log.debug('setName', name)
            $cookies.put('roomName', name);
            broadcastNameEvent(name);
            roomName = name;
        }


        function clearPlaylist(){
            var objTmp = $firebaseObject(_ref.child(roomName).child('playlist'));
            objTmp.playlist = {};
            return objTmp.$save();
        }

        function getPlaylist(){
            return $firebaseArray(_ref.child(roomName).child('playlist'));
        }

        function getCurrentSong(){
            return $firebaseObject(_ref.child(roomName).child('currentSong'));

        }

        //used when you can't have the song be async
        function getSongFromRoom(roomCode){

            var song = $firebaseObject(_ref.child(roomCode).child('currentSong'));
            return song.$loaded()
                .then(function(data) {
                    return data;
                })
                .catch(function(error) {
                    console.error("Error:", error);
                });
        }

        function createRoom(name) {
            User.setHost(true);
            setName(name);
            owner = User.getUser();
            users = [User.getUser()];
            /* sample track struct
             playlist = [{'trackID' : 233895084,
             'title' : 'Tiger Blood',
             'artist' : 'graves',
             'length' : '3:15'}];
             */

            rooms[name] = {
                'name' : name,
                'owner' : owner,
                'playlist' : [],
                'users' : users
            };
            return rooms.$save();
        }

        function doesRoomExist(code) {
            return roomsArr.$loaded()
                .then(function(data){
                    // $log.info('loaded', data)
                    return roomsArr.$indexFor(code);
                });
        }

        function addUserToRoom(roomCode, userObj) {
            //TODO: add more data sync stuff
            roomName = roomCode;
            return $firebaseArray(_ref.child(roomCode).child('users')).$add(userObj);
        }

        function logout(){
            $cookies.put('roomName', null);
        }

        function userCount() {
            var users = $firebaseArray(_ref.child(roomName).child('users'));
            return users.$loaded()
                .then(function(data){
                    console.log(data);
                    console.log(data.length);
                    return data.length;
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    }
})();

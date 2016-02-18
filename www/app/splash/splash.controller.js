angular.module('soundstorm')
.controller('SplashCtrl', function($scope, Playlist) {
    var fakePlaylist = [{
        name: 'song1'
    },{
        name: 'song2'
    },{
        name: 'song3'
    },{
        name: 'song4'
    }];

    console.log('var playlist = Playlist(fakePlaylist);')
    var playlist = Playlist(fakePlaylist);
    console.log('playlist.getTracks():', JSON.stringify(playlist.getTracks()));

    console.log('playlist.addTrack()...');
    playlist.addTrack({ name: 'song5' });
    console.log('playlist.getTracks():', JSON.stringify(playlist.getTracks()));


    console.log('playlist.reorderTrack()...');
    playlist.reorderTrack(3,0);
    console.log('playlist.getTracks():', JSON.stringify(playlist.getTracks()));



    console.log('var playlist2 = Playlist(fakePlaylist);')
    var playlist2 = Playlist(fakePlaylist);

    console.log('playlist2.removeTrack():', JSON.stringify(playlist2.removeTrack(1)))
    console.log('playlist2.getTracks():', JSON.stringify(playlist2.getTracks()));
})

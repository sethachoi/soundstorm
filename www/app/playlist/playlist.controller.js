angular.module('soundstorm')

.controller('PlaylistCtrl', function($rootScope, $scope, $interval, $timeout, $state, PlaylistSampleData) 
{
    console.log('test D: @____@...');  

    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = false

    $scope.editToggle = function(){
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        $scope.shouldShowReorder = !$scope.shouldShowReorder;
    }

    var playlist = PlaylistSampleData.playlist;
    
    var i = 0;

    $scope.items = [
    //current song
    {
        img: playlist[i].artwork_url,
        title: playlist[i].title,
        description: playlist[i].duration//parseInt(player.currentTime()/1000);
    },
    {
        img: playlist[i+1].artwork_url,
        title: playlist[i+1].title,
        description: playlist[i+1].duration
    },
    {
        img: playlist[i+2].artwork_url,
        title: playlist[i+2].title,
        description: playlist[i+2].duration
    },
    {
        img: playlist[i+3].artwork_url,
        title: playlist[i+3].title,
        description: playlist[i+3].duration
    },
    {
        img: playlist[i+4].artwork_url,
        title: playlist[i+4].title,
        description: playlist[i+4].duration
    },
    {
        img: playlist[i+5].artwork_url,
        title: playlist[i+5].title,
        description: playlist[i+5].duration
    },
    {
        img: playlist[i+6].artwork_url,
        title: playlist[i+6].title,
        description: playlist[i+6].duration
    },
    {
        img: playlist[i+7].artwork_url,
        title: playlist[i+7].title,
        description: playlist[i+7].duration
    },
    {
        img: playlist[i+8].artwork_url,
        title: playlist[i+8].title,
        description: playlist[i+8].duration
    },
    {
        img: playlist[i+9].artwork_url,
        title: playlist[i+9].title,
        description: playlist[i+9].duration
    }]  

    //$scope.items = playlist;
/*
    $scope.items = [{
        img: playlist[1].artwork_url,
        title: playlist[1].title,
        description: playlist[1].duration
    }]*/

    /*
    var current = 0;
    for(var i = current; i < (current + 10); i++)
    {
        $scope.items = [
        {
            img: playlist[i].artwork_url,
            title: playlist[i].title,
            description: playlist[i].duration
        }]  
    }
    */
})
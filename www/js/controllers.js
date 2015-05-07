angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('FeaturedCtrl', function($scope, $rootScope, $stateParams, $timeout, $log, Posts) {
    $log.debug('Featured Ctrl', $stateParams);

    $scope.posts = Posts.getPosts();
    $scope.hasNextPage = true;

    $scope.doRefresh = function() {
        $log.debug('do refresh');
        Posts.refresh().$promise.then(function(result){
            $log.debug('do refresh complete');

            $scope.posts = result.posts;
            $scope.hasNextPage = true;
            $scope.loadError = false;
        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.loadMore = function() {
        $log.debug('load more');
        
        if ($scope.hasNextPage === false) return;

        Posts.pagination().$promise.then(function(result){
            $log.debug('load more complete');
            $scope.hasNextPage = false;
            $scope.loadError = false;
            $timeout(function(){
                $scope.hasNextPage = result.hasMore;
                $log.debug('has next page ?', $scope.hasNextPage);
            }, 500);

            $scope.posts = $scope.posts.concat(result.posts);
        }).finally(function(){
            $scope.$broadcast('scroll.infinieScrollComplet');
        });
    }
})

.controller('PostCtrl', function($scope, $rootScope, $stateParams, $timeout, $log, Posts){
    $log.debug('Post Ctrl', $stateParams);
    $scope.post = Posts.getPost($stateParams.id);

     $log.debug('enter post:', $scope.post);
});

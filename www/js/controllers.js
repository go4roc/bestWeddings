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

    $scope.doRefresh = function() {
        $log.debug('do refresh');
        Posts.refresh().$promise.then(function(result){
            $log.debug('do refresh complete');

            $scope.posts = result.data;
            $scope.hasNextPage = true;
            $scope.loadError = false;
        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.loadMore = function() {
        $log.debug('load more');
        Posts.pagination().$promise.then(function(result){
            $log.debug('load more complete');
            $scope.hasNextPage = false;
            $scope.loadError = false;
            $timeout(function(){
                $scope.hasNextPage = Posts.hasNextPage();
                $log.debug('has next page ?', $scope.hasNextPage);
            }, 100);

            $scope.posts = $scope.posts.concat(result.posts);
        }).finally(function(){
            $scope.$broadcast('scroll.infinieScrollComplet');
        });
    }

    // $scope.posts = [
    //     {
    //         id: 314124,
    //         title: '爱你，宠你是我这辈子的责任',
    //         description: '新郎说：爱你，宠你是我这辈子的责任。紫色的现场十分梦幻加上绚丽的灯光，让新人的婚礼浪漫而难忘----菲林创意婚礼定制',
    //         cover_url: 'http://pics.yeziwed.com/m/2015/04/554179bc8ea74.jpg',
    //         user:  {
    //             name: '菲林创意婚礼定制',
    //             logo_url: 'http://tp4.sinaimg.cn/2464818255/180/22890534948/1',
    //             location: '河南 郑州'
    //         }
    //     },
    //     {
    //         id: 314146,
    //         title: '温柔的夜',
    //         description: '静谧的夜，闪烁的星空下，有情深似海的温柔。一个小天使的降临，180多天来的相伴，让一颗妈妈的心变得更加宽厚而柔软。“我爱极了做母亲，只要把孩子的头放在我胸口，就能使我觉得幸福。”',
    //         cover_url: 'http://pics.htwed.com/m/2015/04/5541efdd9ebcb.jpg',
    //         user:  {
    //             name: '成都美薇亭婚礼顾问',
    //             logo_url: 'http://tp2.sinaimg.cn/5146813893/180/5695531230/1',
    //             location: '四川 成都'
    //         }
    //     },
    //     {
    //         id: 314144,
    //         title: '仲夏夜之梦的幸福国度主题婚礼',
    //         description: '在这个现代都市的钢筋编织的水泥丛林中，我们想为新人打造出一场美到令人窒息的仲夏夜之梦。勾勒出一种原始森林般的梦幻，田园的般爱恋。纯洁神圣只属于彼此的幸福国度。',
    //         cover_url: 'http://pics.htwed.com/m/2015/04/5541ec4d675e9.jpg',
    //         user:  {
    //             name: '瑞琳婚舍',
    //             logo_url: 'http://img.htwed.com/logos/2015/01/213821_logo.jpg',
    //             location: '上海 长宁区'
    //         }
    //     },
    //     {
    //         id: 314112,
    //         title: 'Winter Forest & Spring Garden',
    //         description: '皑皑白雪，攀岩而上的古老树藤，高挑的松柏，通往幸福的仙境森林。森林深处，有待放的花朵，新生命的诞生，寄予春天的期许。暖阳下，鲜花绽放，你也笑开了花儿。',
    //         cover_url: 'http://pics.htwed.com/m/2015/04/5540acfdd0893.jpg',
    //         user:  {
    //             name: 'WeddingIsm婚礼主义',
    //             logo_url: 'http://pics.yeziwed.com/logos/102341_logo.jpg',
    //             location: '上海'
    //         }
    //     },
    //     {
    //         id: 314080,
    //         title: 'One Day',
    //         description: '迎着海风起航，渔网打捞时光，海浪激起贝壳的欢笑，路灯在老码头闪耀，缓缓驶向花园，喷泉吐出花瓣，摇曳飘向云端，幸福惬意的“一天”。——电影《One day》的灵感作品。新郎在英国留学，与新娘相识，你我原本像两条没有交集的平行线，短暂邂逅，却深深印入彼此心中最柔软的部分，相爱让我们成为最完整的彼此。',
    //         cover_url: 'http://pics.htwed.com/m/2015/04/55402278b5467.gif',
    //         user:  {
    //             name: 'WeddingShine炫薇廷',
    //             logo_url: 'http://img.htwed.com/logos/2015/01/103481_logo.jpg',
    //             location: '上海 长宁区'
    //         }
    //     },
    //     {
    //         id: 314068,
    //         title: '暮光',
    //         description: '从正午到傍晚，照片按序记录了被阳光和暮色浸透的教堂后院。当光影穿透树林散落周围，当教堂弥音开始蔓延，当你们从第一支舞跳到宾主尽欢：我们站在神的注视中感谢今日缘分，愿珍惜良辰美景一场，愿内容永远大过于形式，愿所爱之时竭尽全力，愿有生之年不负时光。God bless。',
    //         cover_url: 'http://pics.htwed.com/m/2015/04/553f3ce43bf41.jpg',
    //         user:  {
    //             name: '喜阅绘婚礼创意',
    //             logo_url: 'http://img.htwed.com/logos/2015/01/211417_logo.png',
    //             location: '四川 成都'
    //         }
    //     }
    // ];
});

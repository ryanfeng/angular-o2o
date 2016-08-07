(function () {


    var sessionRoute = [
        'login',
        'register',
        'forget'
    ];

    var loginRoute = [
        'userContract',
        'userOrder',
        'messageCenter',
        'myTutor',
        'orderDetail',
        'likeList',
        'comment',
        'modifyInformation',
        'account',
        'bct1',
        'bct2',
        'myStudent',
        'tutorPage',
        'tutorComment',
        'myMoney',
        'passageList',
        'preview',
        'editPassage',
        'teacherPreview'
    ];

    var teacherRoute = [
        'myStudent',
        'tutorPage',
        'tutorComment',
        'myMoney',
        'passageList',
        'preview',
        'editPassage',
        'teacherPreview'
    ];

    app.run(['$rootScope', '$location', 'SessionService', '$localStorage', 'ShareService', historyService]);

    function historyService($rootScope, $location, SessionService, $localStorage, ShareService) {
        $rootScope.$storage = $localStorage.$default({history: []});
        $rootScope.$on('$routeChangeSuccess', onRouteChanged);

        $rootScope.back = function () {
            if ($rootScope.$storage.history.length < 2) {
                $location.path('/');
            } else {
                $rootScope.$storage.history.pop();
                var state = $rootScope.$storage.history.pop();
                if (!SessionService.isLogin()) {
                    while ($rootScope.$storage.history.length > 0 && state.isLogin == 1) {
                        state = $rootScope.$storage.history.pop();
                    }
                    if ($rootScope.$storage.history.length == 0 && state.isLogin == 1) {
                        state.url = '/';
                    }
                }
                if (SessionService.isLogin() && !SessionService.user.teacherId) {
                    while ($rootScope.$storage.history.length > 0 && state.isTeacher == 1) {
                        state = $rootScope.$storage.history.pop();
                    }
                    if ($rootScope.$storage.history.length == 0 && state.isTeacher == 1) {
                        state.url = '/';
                    }
                }
                if (SessionService.isLogin()) {
                    while ($rootScope.$storage.history.length > 0 && state.isSession == 1) {
                        state = $rootScope.$storage.history.pop();
                    }
                    if ($rootScope.$storage.history.length == 0 && state.isSession == 1) {
                        state.url = '/';
                    }
                }
                $location.url(state.url).replace();
            }
        };

        function isLogin() {
            if ($.inArray($location.path().split('/')[1], loginRoute) >= 0) {
                return 1;
            } else {
                return 0;
            }
        }

        function isTeacher() {
            if ($.inArray($location.path().split('/')[1], teacherRoute) >= 0) {
                return 1;
            } else {
                return 0;
            }
        }

        function isSession() {
            if ($.inArray($location.path().split('/')[1], sessionRoute) >= 0) {
                return 1;
            } else {
                return 0;
            }
        }


        var noShareHome = [
            'passage',
            'teacher',
            'service',
            'theme',
            'search'
        ];

        function onRouteChanged() {
            if ($rootScope.$storage.history.length == 0 || $location.url() != $rootScope.$storage.history[$rootScope.$storage.history.length - 1].url) {
                var data = {
                    url: $location.url(),
                    isLogin: isLogin(),
                    isTeacher: isTeacher(),
                    isSession: isSession()
                };
                $rootScope.$storage.history.push(data);
                if ($rootScope.$storage.history.length > 25) {
                    $rootScope.$storage.history = $rootScope.$storage.history.slice($rootScope.$storage.history.length - 20);
                }
            }
            var page = $location.path().split('/')[1];
            if ($.inArray(page, noShareHome) < 0) {
                ShareService.shareHome();
            }
            if ($('#livechat-compact-container')) {
                $('#livechat-compact-container').html('');
            }
        }
    }
})();
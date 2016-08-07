(function () {
    app.controller('TeacherCenterController', ['$scope', 'SessionService', '$location', 'TeacherCenterService',
        '$routeParams', '$rootScope', 'AlertService', centerLeft]);
    function centerLeft($scope, SessionService, $location, TeacherCenterService, $routeParams, $rootScope,
                        AlertService) {
        if (!SessionService.isLogin()) {
            $location.path('login');
        } else {
            if (!SessionService.user.teacherId) {
                $location.path('/');
            }
        }
        $rootScope.$on('clearUser', onClearUser);

        function onClearUser() {
            AlertService.setCallBack(function () {
                $location.path('/login');
            })
        }

        $scope.sessionService = SessionService;
        $scope.teacherCenterService = TeacherCenterService;
        $scope.loadMobilePage = loadMobilePage;
        $scope.type = $location.path().replace("/", "").replace(/[0-9]/g, "");
        if ($location.path().replace("/", "") == "preview") {
            $scope.type = "passageList/";
        }
        if ($location.path().split('/')[1] == "addServer") {
            $scope.type = "addServer";
        }
        $scope.isPassagePage = false;

        function loadMobilePage(page) {
            $location.path("/" + page);
        }
    }
})();
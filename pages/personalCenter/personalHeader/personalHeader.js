(function () {
    app.controller('PersonalController', ['$scope', 'SessionService', '$location', 'AlertService', '$rootScope', personal]);

    function personal($scope, SessionService, $location, AlertService, $rootScope) {

        $scope.sessionService = SessionService;
        if (!SessionService.isLogin()) {
            $location.replace();
            $location.path('/login');
        }
        $rootScope.$on('clearUser', onClearUser);

        function onClearUser() {
            AlertService.setCallBack(function () {
                $location.path('/login');
            })
        }

        $scope.logoutLogin = logoutLogin;
        function logoutLogin() {
            AlertService.showAlertWithCancel("确定退出?", alertCallBack);
            function alertCallBack() {
                SessionService.logout();
            }
        }

        $scope.loadPage = loadPage;
        $scope.type = $location.path().replace("/", "").replace(/[0-9]/g, "");

        function loadPage(page) {
            $location.path("/" + page);
        }
    }
})();
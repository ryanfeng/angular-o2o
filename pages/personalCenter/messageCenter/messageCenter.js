(function () {
    app.controller('MessageCenterController', ['$scope', 'PersonalService', 'SessionService',
        '$rootScope', messageCenter]);

    function messageCenter($scope, PersonalService, SessionService, $rootScope) {
        $scope.personalService = PersonalService;
        $scope.currentPage = 1;
        $scope.changePage = changePage;

        $scope.$on("getNotice", getNotice);

        function getNotice() {
            $scope.data = PersonalService.notices;
            $rootScope.$broadcast('loadNotiCount', {})
        }

        if (SessionService.isLogin()) {
            PersonalService.getNotice($scope.currentPage);
        }

        function changePage(page) {
            if (page != $scope.currentPage) {
                $('body').scrollTop(0);
                $scope.currentPage = page;
                PersonalService.getNotice($scope.currentPage);
            }
        }

    }
})();


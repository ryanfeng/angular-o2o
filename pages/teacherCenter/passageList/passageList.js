(function () {
    app.controller('TeacherPassageList', ['$scope', '$routeParams', 'PassageService', 'TeacherCenterService',
        'HttpService', 'AlertService', '$location', passageList]);

    function passageList($scope, $routeParams, PassageService, TeacherCenterService, HttpService, AlertService, $location) {
        $scope.passageService = PassageService;
        $scope.state = $routeParams.state;
        $scope.remove = remove;
        $scope.currentPage = 1;
        PassageService.getPassages($scope.state, $scope.currentPage);

        $scope.$on('getPassageList', onGetPassageList);
        TeacherCenterService.changeMenuIndex(parseInt($routeParams.state) + 1);
        if ($routeParams.state == 0) {
            $scope.stateStr = "正在审核";
        } else if ($routeParams.state == 1) {
            $scope.stateStr = "未通过审核";
        } else {
            $scope.stateStr = "已审核";
        }

        function changePage(page) {
            if (page != $scope.currentPage) {
                $('body').scrollTop(0);
            }
            $scope.currentPage = page;
            PassageService.getPassages($scope.state, $scope.currentPage);
        }

        function remove(passageId) {
            AlertService.showAlertWithCancel('确认删除该文章吗？', alertCallBack);
            function alertCallBack() {
                HttpService.apiGet('teacher', 'removePassage', {passageId: passageId}, apiGetCallBack);

                function apiGetCallBack(data) {
                    changePage($scope.currentPage);
                }
            }
        }

        function onGetPassageList(event, data) {
            $scope.data = data;
        }
    }
})();
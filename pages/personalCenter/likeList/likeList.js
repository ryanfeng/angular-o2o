(function () {
    app.controller('LikeListController', ['$scope', 'PersonalService', 'ServiceService', 'TeacherService', 'SessionService', 'HttpService', 'AlertService', LikeListController]);

    function LikeListController($scope, PersonalService, ServiceService, TeacherService, SessionService, HttpService, AlertService) {
        $scope.likeListService = PersonalService;
        $scope.service = ServiceService;
        $scope.currentPage = 1;
        $scope.kind = 1;

        $scope.talk = {'0': '线上', '1': '线下'};


        $scope.changeKind = changeKind;
        $scope.changePage = changePage;
        $scope.disLikeTeacher = disLikeTeacher;
        $scope.del = del;

        $scope.$on('getLikeList', onGetLikeList);

        function onGetLikeList() {
            $scope.data = PersonalService.likeList;
        }

        $scope.$on('getLikeServer', onGetLikeServer);

        function onGetLikeServer() {
            $scope.data = PersonalService.likeServer;
        }

        if (SessionService.isLogin()) {
            changePage($scope.currentPage);
        }

        function changeKind(kind) {
            if ($scope.kind != kind) {
                $scope.kind = kind;
                changePage(1);
            }
        }


        function changePage(page) {
            if (page != $scope.currentPage) {
                $('body').scrollTop(0);
                $scope.currentPage = page;
            }
            if ($scope.kind == 1) {
                PersonalService.getLikeList($scope.currentPage);
            } else {
                PersonalService.getLikeServer($scope.currentPage);
            }
        }


        function disLikeTeacher(teacherId) {

            AlertService.showAlertWithCancel("确定要删除导师?", callback);
            function callback() {
                HttpService.apiGet('user', 'dislikeTeacher', {teacherId: teacherId}, apiGetCallBack);
                function apiGetCallBack(data) {
                    changePage($scope.currentPage);
                    AlertService.showAlert('删除成功', undefined);
                }
            }
        }

        function del(serviceProId) {
            console.log(serviceProId);
            AlertService.showAlertWithCancel("确定要删除服务?", callback);
            function callback() {
                ServiceService.disLikeServicePro(serviceProId, apiGetCallBack);
                function apiGetCallBack(data) {
                    changePage($scope.currentPage);
                    AlertService.showAlert('删除成功', undefined);
                }
            }
        }
    }
})();
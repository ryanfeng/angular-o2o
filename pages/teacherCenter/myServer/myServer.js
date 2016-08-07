(function () {
    app.controller('MyServerController', ['$scope', 'PersonalService', 'HttpService', 'ServiceService',
        'AlertService', 'SessionService', 'TeacherCenterService', '$location', myServerController]);

    function myServerController($scope, PersonalService, HttpService, ServiceService, AlertService,
                                SessionService, TeacherCenterService, $location) {
        $scope.dataService = PersonalService;
        $scope.serviceService = ServiceService;

        $scope.currentPage = 1;
        $scope.remove = remove;
        $scope.goServer = goServer;
        $scope.goAdd = goAdd;

        $scope.changePage = changePage;


        if (SessionService.user && SessionService.user.teacherId) {
            $scope.changePage(1);
        }

        $scope.$on('getMyServer', onGetMyServer);
        function onGetMyServer(event, data) {
            $scope.data = data;
        }

        TeacherCenterService.changeMenuIndex(-1);

        function changePage(page) {
            $scope.currentPage = page;
            PersonalService.getMyServer($scope.currentPage);
        }

        function goServer(serviceProId) {
            $location.path('/previewServer/' + serviceProId);
        }

        function goAdd(serviceProId) {
            $location.path('/addServer/' + serviceProId);
        }

        function remove(serviceProId) {
            AlertService.showAlertWithCancel('确认删除该服务吗？', alertCallBack);
            function alertCallBack() {
                HttpService.apiGet('teacher', 'removeServicePro', {serviceProId: serviceProId}, apiGetCallBack);

                function apiGetCallBack(data) {
                    changePage($scope.currentPage);
                }
            }
        }

    }
})();
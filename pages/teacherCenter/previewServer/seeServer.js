(function () {
    app.controller('SeeServerController', ['$scope', '$routeParams', 'PersonalService', 'ServiceService', '$rootScope', '$location',
        seeServerController]);

    function seeServerController($scope, $routeParams, PersonalService, ServiceService, $rootScope, $location) {
        $scope.service = ServiceService;

        $scope.talk = {'0': '线上', '1': '线下'}
        $scope.show = true;

        $scope.goConfirm = goConfirm;
        $scope.goBack = goBack;

        $scope.$on('getPreviewServer', onGetPreviewServer);
        function onGetPreviewServer(event, data) {
            $scope.data = data;
            $scope.img = $scope.data.imageUrls.split(',');
            $scope.arry = $scope.data.tip.split(',');
        }

        $scope.isContain = function (index) {
            for (i in $scope.arry) {
                if ($scope.arry[i] == index) {
                    return true;
                }
            }
            return false;
        }

        serviceProId($scope.id)
        function serviceProId(serviceProId) {
            $scope.id = $routeParams.id;
            PersonalService.getPreviewServer($scope.id);
        }

        function goConfirm(serviceProId) {
            $location.path('/addServer/' + serviceProId);
        }

        function goBack() {
            $location.path('/myServer');
        }

    }
})();
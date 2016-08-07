(function () {
    app.controller('AlertController', ['$scope','AlertService', qx_alert]);

    function qx_alert($scope,AlertService) {
        $scope.service = AlertService;
        $scope.cancel = cancel;

        function cancel() {
            $scope.service.show = false;
        }
    }
})();
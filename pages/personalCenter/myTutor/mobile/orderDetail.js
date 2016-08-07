(function () {
    app.controller('OrderDetailController', ['$scope', 'PersonalService', '$location', '$rootScope', orderDetail]);

    function orderDetail($scope, PersonalService, $location, $rootScope) {
        $scope.data = PersonalService.mobileDetail;
        $scope.back = back;
        if ($scope.data == undefined) {
            $location.path('/myTutor');
        }
        $('body').scrollTop(0);

        function back() {
            $rootScope.back();
        }
    }
})();
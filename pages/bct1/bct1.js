(function () {
    app.controller("Bct1Controller", ['$scope', '$routeParams', 'BecomeTeacherService', 'AlertService', '$location', 'SessionService', 'ValidateService', bct1Controller]);
    function bct1Controller($scope, $routeParams, BecomeTeacherService, AlertService, $location, SessionService, ValidateService) {
        $scope.isShowCountry = false;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.country = BecomeTeacherService.countrys[0];
        $scope.isNameShow = false;
        $scope.isPhoneShow = false;
        $scope.isWeixiShow = false;
        $scope.isEmailShow = false;
        $scope.isAddressShow = false;
        $scope.selectCountry = selectCountry;
        $scope.nextStep = nextStep;
        $scope.formatInteger = formatInteger;
        $scope.formatInteger1 = formatInteger1;


        if (!SessionService.isLogin()) {
            $location.path('login');
        } else if (SessionService.user.teacherId) {
            $location.path('/');
        }

        function nextStep() {
            !$scope.name?$scope.isNameShow = true:'';
            !ValidateService.phoneVa($scope.phone)?$scope.isPhoneShow = true:'';
            !$scope.weixin?$scope.isWeixiShow = true:'';
            !ValidateService.emailVa($scope.email)?$scope.isEmailShow = true:'';
            !$scope.address?$scope.isAddressShow = true:'';

            if (!$scope.isNameShow && !$scope.isPhoneShow && !$scope.isWeixiShow && !$scope.isEmailShow && !$scope.isAddressShow) {
                BecomeTeacherService.teacher.name = $scope.name;
                BecomeTeacherService.teacher.phone = $("#phoneCode").text().replace(/\+/, '') + "-" + ValidateService.phoneProcess($scope.phone);
                BecomeTeacherService.teacher.weixin = $scope.weixin;
                BecomeTeacherService.teacher.email = $scope.email;
                BecomeTeacherService.teacher.address = $scope.address;
                $location.path("/bct2");
            }
        }

        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }

        function formatInteger(number) {
            if (isNaN(number)) {
                $scope.price = 0;
            }
        }

        function formatInteger1(number) {
            if (isNaN(number)) {
                $scope.time = 0;
            }
        }
    }
})();

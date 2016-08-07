(function () {
    app.controller('ForgetController', ['$scope', 'SessionService', 'AlertService', '$location', 'ValidateService',
        'BecomeTeacherService', '$rootScope', forget]);
    function forget($scope, SessionService, AlertService, $location, ValidateService, BecomeTeacherService, $rootScope) {
        $scope.isShowCountry = false;
        $scope.selectCountry = selectCountry;
        $scope.isSelectPhone = false;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.country = BecomeTeacherService.countrys[0];
        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }

        if (SessionService.isLogin()) {
            $location.path('/');
        }

        $scope.getValidateCode = getValidateCode;
        $scope.submitPassModify = submitPassModify;
        $scope.codeString = "获取验证码";

        $scope.closeForm = closeForm;
        function closeForm() {
            $rootScope.back();
        }

        //密码修改提交
        $scope.isNameVa = true;
        $scope.isPassVa = true;
        $scope.isRePassVa = true;
        $scope.isCodeVa = true;
        function submitPassModify() {
            if (!ValidateService.phoneVa($scope.username) && !ValidateService.emailVa($scope.username)) {
                $scope.isNameVa = false;
            }
            $scope.isPassVa = ValidateService.passwordVa($scope.password);
            $scope.isRePassVa = ValidateService.passwordVa($scope.repassword);
            if (!$scope.validateCode) {
                $scope.isCodeVa = false;
            }
            if ($scope.isNameVa && $scope.isPassVa && $scope.isRePassVa && $scope.isCodeVa) {
                if ($scope.password != $scope.repassword) {
                    AlertService.showAlert("两次密码必须一样!", undefined);
                    return;
                }
                if (!$scope.isSelectPhone) {
                    if (ValidateService.phoneVa($scope.username)) {
                        SessionService.forgetPassword($("#phoneCode").text().replace(/\+/, '') + "-" + ValidateService.phoneProcess($scope.username), $scope.password, $scope.validateCode, stateCallBack);
                    } else {
                        AlertService.showAlert("请输入正确的手机号!", undefined);
                        return;
                    }
                } else {
                    if (ValidateService.emailVa($scope.username)) {
                        SessionService.forgetPassword($scope.username, $scope.password, $scope.validateCode, stateCallBack);
                    } else {
                        AlertService.showAlert("请输入正确的邮箱!", undefined);
                        return;
                    }
                }
                function stateCallBack(state) {
                    if (state) {
                        AlertService.showAlert("密码修改成功！", succssCallback);
                        function succssCallback() {
                            $location.replace();
                            $location.path('/login');
                        }
                    }
                }
            }
        }

        //获取验证码
        function getValidateCode() {
            if (!ValidateService.phoneVa($scope.username) && !ValidateService.emailVa($scope.username)) {
                $scope.isNameVa = false;
                return;
            }
            //获取服务方法执行
            if (!$scope.isSelectPhone) {
                if (ValidateService.phoneVa($scope.username)) {
                    SessionService.getCheckNumber($("#phoneCode").text().replace(/\+/, '') + "-" + ValidateService.phoneProcess($scope.username), gCNCallBack);
                } else {
                    AlertService.showAlert("请输入正确的手机号!", undefined);
                    return;
                }
            } else {
                if (ValidateService.emailVa($scope.username)) {
                    SessionService.getCheckNumber($scope.username, gCNCallBack);
                } else {
                    AlertService.showAlert("请输入正确的邮箱!", undefined);
                    return;
                }
            }
            //获取验证码是否成功
            function gCNCallBack(state) {
                if (!state) {
                    clearTimer();
                }
            }

            //禁止用户点击
            $scope.getValidateCode = null;
            //时间限制
            var countdown = 180;
            var myTime = setInterval(function () {
                $scope.codeString = countdown + "秒后重新获取";
                countdown--;
                $scope.$digest();
            }, 1000);
            setTimeout(clearTimer, 180000);
            //再次可以获取验证码
            function clearTimer() {
                clearInterval(myTime);
                $scope.codeString = "获取验证码";
                $scope.getValidateCode = getValidateCode;
                $scope.$digest();
            }
        }
    }
})();

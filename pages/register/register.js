(function () {
    app.controller('RegisterController', ['$scope', 'SessionService', 'AlertService', '$location', 'ValidateService',
        'BecomeTeacherService', '$rootScope', '$cookies', '$routeParams', register]);

    function register($scope, SessionService, AlertService, $location, ValidateService, BecomeTeacherService,
                      $rootScope, $cookies, $routeParams) {
        $scope.isShowCountry = false;
        $scope.isSelectPhone = false;
        $scope.selectCountry = selectCountry;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.distributorNO = undefined;
        $scope.country = BecomeTeacherService.countrys[0];
        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }

        $scope.register = register;
        $scope.getCheckNumber = getCheckNumber;
        $scope.codeString = "获取验证码";

        $scope.closeForm = closeForm;

        if (SessionService.isLogin()) {
            $location.path('/');
        }
        if ($routeParams.distributorNO != '') {
            $scope.distributorNO = $routeParams.distributorNO;
        }

        function closeForm() {
            $rootScope.back();
        }

        $scope.refreshValidate = refreshValidate;
        function refreshValidate() {
            $("#validateImage").attr("src", "http://service.1yingli.cn/yiyingliService/" + parseInt(Math.random() * 1000000) + ".images");
        }

        //注册新用户
        $scope.nameVa = true;
        $scope.usernameVa = true;
        $scope.codeVa = true;
        $scope.passVa = true;
        $scope.rePassVa = true;
        $scope.numCodeVa = true;
        $scope.codeVaStr = '请输入验证码!';
        function register() {
            if ($scope.isAgreee) {
                AlertService.showAlert("请阅读并勾选同意《服务条款》选项!", undefined);
                return;
            }
            if (!$scope.nickname) {
                $scope.nameVa = false;
            }
            if (!ValidateService.phoneVa($scope.username) && !ValidateService.emailVa($scope.username)) {
                $scope.usernameVa = false;
            }
            if (!$scope.validate) {
                $scope.codeVa = false;
                $scope.codeVaStr = '请输入验证码!';
            }
            $scope.passVa = ValidateService.passwordVa($scope.password);
            $scope.rePassVa = ValidateService.passwordVa($scope.copassword);
            if (!$scope.phovalidate) {
                $scope.numCodeVa = false;
            }

            if ($scope.nameVa && $scope.usernameVa && $scope.codeVa && $scope.passVa && $scope.rePassVa && $scope.numCodeVa) {
                if ($cookies.get('validate').toLowerCase() != $scope.validate.toLowerCase()) {
                    $scope.codeVaStr = '验证码输入错误!';
                    $scope.codeVa = false;
                    return;
                }
                if ($scope.password != $scope.copassword) {
                    AlertService.showAlert("两次输入的密码不相同!", undefined);
                    return;
                }
                if (!$scope.isSelectPhone) {
                    if (ValidateService.phoneVa($scope.username)) {
                        SessionService.register($scope.nickname, $("#phoneCode").text().replace(/\+/, '') + "-" + ValidateService.phoneProcess($scope.username), $scope.password, $scope.phovalidate, $scope.distributorNO, registerCallBack);
                    } else {
                        AlertService.showAlert("请输入正确的手机号!", undefined);
                        return;
                    }
                } else {
                    if (ValidateService.emailVa($scope.username)) {
                        SessionService.register($scope.nickname, $scope.username, $scope.password, $scope.phovalidate, $scope.distributorNO, registerCallBack);
                    } else {
                        AlertService.showAlert("请输入正确的邮箱!", undefined);
                        return;
                    }
                }
                function registerCallBack(state) {
                    if (state) {
                        AlertService.showAlert("新用户注册成功!", succssCallback);
                        function succssCallback() {
                            $location.path('/login');
                        }
                    }
                }
            }
        }

        //验证码获取
        function getCheckNumber() {
            if (!$scope.validate) {
                $scope.codeVa = false;
                $scope.codeVaStr = '请输入4位验证码!';
                return;
            }
            if ($cookies.get('validate') && $cookies.get('validate').toLowerCase() != $scope.validate.toLowerCase()) {
                $scope.codeVaStr = '4位验证码输入错误!';
                $scope.codeVa = false;

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
            $scope.getCheckNumber = null;
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
                $scope.getCheckNumber = getCheckNumber;
                $scope.$digest();
            }
        }
    }
})();

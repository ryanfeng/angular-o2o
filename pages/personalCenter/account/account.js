(function () {
    app.controller("AccountController", ['$scope', 'PersonalService', 'AlertService', 'SessionService',
        'ValidateService', 'BecomeTeacherService', accountController]);

    function accountController($scope, PersonalService, AlertService, SessionService, ValidateService,
                               BecomeTeacherService) {
        $scope.isShowCountry = false;
        $scope.selectCountry = selectCountry;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.country = BecomeTeacherService.countrys[0];
        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }



        PersonalService.getPersonPhone(getPhoneCallBack);
        function getPhoneCallBack(phone) {
            for(country in BecomeTeacherService.countrys){
                if(BecomeTeacherService.countrys[country].code.replace("+","") == phone.split("-")[0]){
                     $scope.country = BecomeTeacherService.countrys[country];
                }
            }
            $scope.phone = phone.split("-")[1];
            if(phone.split("-").length==1){
                 $scope.phone = phone;
            }
        }

        PersonalService.getPersonEmail(getEmailCallBack);
        function getEmailCallBack(email) {
            $scope.email = email;
        }

        //修改手机或者邮箱
        $scope.phoneSub = phoneSub;
        $scope.emailSub = emailSub;
        function phoneSub() {
            if (!$scope.pCheckNo || !$scope.phone) {
                AlertService.showAlert("手机号码和验证码必须填写！", undefined);
                return;
            }
            PersonalService.modifyPhone($scope.pCheckNo, $("#phoneCode").text().replace(/\+/,'') + "-" + $scope.phone);
            $scope.pCheckNo = "";
            AlertService.showAlert("手机修改成功！", undefined);
        }

        function emailSub() {
            if (!$scope.eCheckNo || !$scope.email) {
                AlertService.showAlert("邮箱和验证码必须填写！", undefined);
                return;
            }
            PersonalService.modifyEmail($scope.eCheckNo, $scope.email);
            $scope.eCheckNo = "";
            AlertService.showAlert("邮箱修改成功！", undefined);
        }

        //获取手机验证码
        $scope.getPhoneValidateCode = getPhoneValidateCode;
        $scope.getEmailValidateCode = getEmailValidateCode;
        $scope.codeString = "发送验证码";
        $scope.codeStringEmail = "发送验证码";
        function getPhoneValidateCode() {
            if (!ValidateService.phoneVa($scope.phone)) {
                AlertService.showAlert("手机号码必须填写，格式必须正确！", undefined);
                return;
            }
            //获取服务方法执行
            SessionService.getCheckNumber($("#phoneCode").text().replace(/\+/,'') + "-" + ValidateService.phoneProcess($scope.phone), gCNCallBack);
            //获取验证码是否成功
            function gCNCallBack(state) {
                if (!state) {
                    clearTimer();
                }
            }

            //禁止用户点击
            $scope.getPhoneValidateCode = null;
            //时间限制
            var countdown = 180;
            var myTime = setInterval(function () {
                $scope.codeString = countdown + "秒后获取";
                countdown--;
                $scope.$digest();
            }, 1000);
            setTimeout(clearTimer, 180000);
            //再次可以获取验证码
            function clearTimer() {
                clearInterval(myTime);
                $scope.codeString = "发送验证码";
                $scope.getPhoneValidateCode = getPhoneValidateCode;
                $scope.$digest();
            }
        }

        //获取邮箱验证码
        function getEmailValidateCode() {
            if (!ValidateService.emailVa($scope.email)) {
                AlertService.showAlert("邮箱必须填写，格式必须正确！", undefined);
                return;
            }
            //获取服务方法执行
            SessionService.getCheckNumber($scope.email, gCNCallBack);
            //获取验证码是否成功
            function gCNCallBack(state) {
                if (!state) {
                    clearTimer();
                }
            }

            //禁止用户点击
            $scope.getEmailValidateCode = null;
            //时间限制
            var countdown = 180;
            var myTime = setInterval(function () {
                $scope.codeStringEmail = countdown + "秒后获取";
                countdown--;
                $scope.$digest();
            }, 1000);
            setTimeout(clearTimer, 180000);
            //再次可以获取验证码
            function clearTimer() {
                clearInterval(myTime);
                $scope.codeStringEmail = "发送验证码";
                $scope.getEmailValidateCode = getEmailValidateCode;
                $scope.$digest();
            }
        }

        //修改密码
        $scope.modifyPass = modifyPass;
        $scope.isVaOldPass = true;
        $scope.isVaPass = true;
        $scope.isVaRePass = true;
        function modifyPass() {
            if (!$scope.oldPass) {
                $scope.isVaOldPass = false;
            }
            $scope.isVaPass = ValidateService.passwordVa($scope.newPass);
            $scope.isVaRePass = ValidateService.passwordVa($scope.reNewPass);
            if ($scope.isVaOldPass && $scope.isVaPass && $scope.isVaRePass) {
                if ($scope.newPass != $scope.reNewPass) {
                    AlertService.showAlert("两次输入的密码不相同!", undefined);
                    return;
                }
                SessionService.modifyPassword($scope.oldPass, $scope.newPass);
                $scope.oldPass = "";
                $scope.newPass = "";
                $scope.reNewPass = "";
            }
        }
    }
})();
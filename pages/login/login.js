(function () {

    app.controller('LoginController', ['$scope', 'SessionService', '$location', 'CommonService',
        'BecomeTeacherService', '$rootScope', 'HttpService', 'ValidateService', login]);

    function login($scope, SessionService, $location, CommonService, BecomeTeacherService, $rootScope, HttpService,
                   ValidateService) {
        $scope.httpService = HttpService;
        $scope.isShowCountry = false;
        $scope.isSelectPhone = false;
        $scope.showPass = false;
        $scope.selectCountry = selectCountry;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.country = BecomeTeacherService.countrys[0];


        $scope.login = login;
        $scope.closeLogin = closeLogin;
        $scope.forget = forget;

        if (SessionService.isLogin()) {
            $location.path('/');
        }
        $('.body').scrollTop(0);

        $('body').scrollTop(0);
        var img1 = new Image();
        img1.src = "http://image.1yingli.cn/img/new/pass-yes.png";


        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }

        function closeLogin() {
            $rootScope.back();
        }

        function forget() {
            $location.path('/forget');
        }

        //登录提交
        $scope.isNameVa = true;
        $scope.isPassVa = true;
        function login(username, password) {
            if (!ValidateService.phoneVa(username) && !ValidateService.emailVa(username)) {
                $scope.isNameVa = false;
            }
            $scope.isPassVa = ValidateService.passwordVa(password);
            if ($scope.isNameVa && $scope.isPassVa) {
                if (!$scope.isSelectPhone) {
                    SessionService.login(CommonService.trim($("#phoneCode").text().replace(/\+/, '') + "-" + ValidateService.phoneProcess(username)), CommonService.trim(password), loginCallBack);
                } else {
                    SessionService.login(CommonService.trim(username), CommonService.trim(password), loginCallBack);
                }
            }
        }

        function loginCallBack(data) {
            if (data) {
                $rootScope.back();
            } else {
                $scope.password = "";
            }
        }
    }
})();

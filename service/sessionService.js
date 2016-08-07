(function () {
    app.service('SessionService', ['HttpService', '$cookies', 'AlertService', '$location', '$rootScope', '$rootElement', sessionService]);

    var publicKey = "8959d2ced61bee338accd16794538ec0a49da0655ddca8fa2461d4cf419dafaf4d7c47813f6ac8c6e5646a2beb08cccf4184a831e683a631e3c528b908deecc57235d03935d0650fbe53d44f717da7f5d1622e7405a3b4f06377eb506880dae21e5065c878c03d85113e068ac82af6b29037d57163d9a311807bee654927d349";

    /**
     * @ngdoc service
     * @memberOf app
     * @name SessionService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {object} $cookies [$cookies]
     * @param {Service} AlertService [AlertService](app.AlertService.html)
     * @param {object} $location [$location]
     * @param {object} $rootScope [$rootScope]
     * @param {object} $rootElement [$rootElement]
     * @desc
     *  登录，注册，注销等会话服务。
     */
    function sessionService(HttpService, $cookies, AlertService, $location, $rootScope, $rootElement) {
        var service = this;
        service.login = login;
        service.register = register;
        service.getCheckNumber = getCheckNumber;
        service.forgetPassword = forgetPassword;
        service.modifyPassword = modifyPassword;
        service.logout = logout;
        service.isLogin = isLogin;
        service.user = $cookies.getObject('user');
        $rootScope.$on('clearUser', clearUser);

        /**
         * @memberOf SessionService
         * @function modifyPassword
         * @param {string} oldpassword API请求中的oldpassword参数
         * @param {string} newpassword API请求中的oldpassword参数
         * @desc
         *  修改密码
         */
        function modifyPassword(oldpassword, newpassword) {
            var toSend = {};
            toSend.oldpassword = encryptedStr(oldpassword, publicKey);
            toSend.password = encryptedStr(newpassword, publicKey);
            HttpService.apiGet('user', 'changePassword', toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                console.log(data);
                AlertService.showAlert("密码修改成功！", undefined);
            }

            function errCallBack(data) {
                console.log(data);
            }
        }

        /**
         * @memberOf SessionService
         * @function forgetPassword
         * @param {string} username API请求中的username参数
         * @param {string} passowrd API请求中的passowrd参数
         * @param {string} validateCode API请求中的validateCode参数
         * @param {object} data API请求中的其他参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  忘记密码
         */
        function forgetPassword(username, passowrd, validateCode, callBack) {
            var params = {};
            params.no = username;
            params.password = encryptedStr(passowrd, publicKey);
            params.checkNo = validateCode;

            HttpService.apiGet('user', 'forgetPassword', params, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                console.log(data);
                callBack(true);
            }

            function errCallBack(data) {
                console.log(data);
                callBack(false);
            }
        }

        /**
         * @memberOf SessionService
         * @function login
         * @param {string} username API请求中的username参数
         * @param {string} password API请求中的password参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  用户登录
         */
        function login(username, password, callBack) {
            var params = {};
            params.username = username;
            params.password = encryptedStr(password, publicKey);

            HttpService.apiGet('user', 'login', params, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                console.log(data);
                $cookies.putObject('user', data, {path: '/'});
                service.user = data;
                callBack(true);
            }

            function errCallBack(data) {
                console.log(data);
                callBack(false);
            }
        }

        /**
         * @memberOf SessionService
         * @function register
         * @param {string} nickName API请求中的nickName参数
         * @param {string} username API请求中的username参数
         * @param {string} password API请求中的password参数
         * @param {string} checkNo API请求中的checkNo参数
         * @param {string} distributorNO API请求中的distributorNO参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  注册新用户
         */
        function register(nickName, username, password, checkNo, distributorNO, callBack) {
            var params = {};
            params.username = username;
            params.password = encryptedStr(password, publicKey);
            params.checkNo = checkNo;
            params.nickName = nickName;
            if (distributorNO) {
                params.distributorNO = distributorNO;
            }

            HttpService.apiGet('user', 'register', params, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                console.log(data);
                callBack(true);
            }

            function errCallBack(data) {
                console.log(data);
                callBack(false);
            }
        }

        /**
         * @memberOf SessionService
         * @function getCheckNumber
         * @param {string} userName API请求中的userName参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  获取手机或者邮箱验证码
         */
        function getCheckNumber(userName, callBack) {
            if (userName == undefined || userName.trim() == "") {
                AlertService.showAlert("手机号或邮箱不能为空！", undefined);
                callBack(false);
                return;
            }
            HttpService.apiGet('function', 'getCheckNo', {username: userName}, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                console.log(data);
                callBack(true);
            }

            function errCallBack(data) {
                console.log(data);
                callBack(false);
            }
        }

        /**
         * @memberOf SessionService
         * @function logout
         * @desc
         *  注销
         */
        function logout() {
            $cookies.remove('user');
            service.user = undefined;
            $location.path('/');
            setTimeout(function () {
                $rootElement.removeClass('sidebar-right-in');
            }, 200);
        }

        function clearUser() {
            service.user = undefined;
        }

        function isLogin(){
            if($cookies.getObject('user') == undefined){
                service.user = undefined;
                return false;
            } else {
                service.user = $cookies.getObject('user');
                return true;
            }
        }
    }
})();
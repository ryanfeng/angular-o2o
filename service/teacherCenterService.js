(function () {
    app.service('TeacherCenterService', ['HttpService', '$rootScope', 'TeacherService', 'SessionService', teacherCenterService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name TeacherCenterService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {Service} TeacherService [TeacherService](app.TeacherService.html)
     * @param {Service} SessionService [SessionService](app.SessionService.html)
     * @param {object} $rootScope [$rootScope]
     * @desc
     *  导师中心的服务。
     */
    function teacherCenterService(HttpService, $rootScope, TeacherService, SessionService) {
        var service = this;
        service.getTeacherInfo = getTeacherInfo;
        service.getAlipayAcount = getAlipayAcount;
        service.getReward = getReward;
        service.editAlipayAcount = editAlipayAcount;
        service.getPayPalAcount = getPayPalAcount;
        service.editPayPalAcount = editPayPalAcount;
        service.getMile = getMile;
        service.changeMenuIndex = changeMenuIndex;
        service.showPassageSub = false;
        service.menuIndex = -1;
        service.getBackground = getBackground;

        service.teacherInfo = undefined;
        service.serverInfo = {};

        function isTeacher() {
            return SessionService.isLogin() && SessionService.user.teacherId;
        }

        /**
         * @memberOf TeacherCenterService
         * @function getTeacherInfo
         * @desc
         *  获取导师信息
         */
        function getTeacherInfo() {
            if (!isTeacher()) {
                return;
            }
            HttpService.apiGet('teacher', 'getAllInfo', {}, apiGetCallBack);

            function apiGetCallBack(data) {
                data.timeperweek = parseInt(data.timeperweek);
                data.resources = TeacherService.resources;
                for (var i = 0; i < data.tips.length; i++) {
                    data.resources[data.tips[i].id].flag = true;
                }
                service.teacherInfo = data;
                $rootScope.$broadcast('getTeacherInfo', data);
            }
        }

        /**
         * @memberOf TeacherCenterService
         * @function getAlipayAcount
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  获取导师支付宝账号
         */
        function getAlipayAcount(callback) {
            if (!isTeacher()) {
                return;
            }
            var toSend = {};
            HttpService.apiGet("teacher", "getAlipayNo", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callback(data.alipayNo);
            }

            function errCallBack(data) {
                //console.log(data);
            }
        }

        /**
         * @memberOf TeacherCenterService
         * @function getReward
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  获取导师支付宝账号
         */
        function getReward(callback) {
            if (!isTeacher()) {
                return;
            }
            HttpService.apiGet("teacher", "getReward", {}, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callback(data);
            }

            function errCallBack(data) {
                //console.log(data);
            }

        }

        /**
         * @memberOf TeacherCenterService
         * @function editAlipayAcount
         * @param {string} alipayNo API请求中的alipayNo参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  绑定支付宝账号
         */
        function editAlipayAcount(alipayNo, callback) {
            if (!isTeacher()) {
                return;
            }
            var toSend = {};
            toSend.alipayNo = alipayNo;
            HttpService.apiGet("teacher", "editAlipayNo", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                console.log(data);
                callback(true);
            }

            function errCallBack(data) {
                console.log(data);
                callback(false);
            }
        }


        /**
         * @memberOf TeacherCenterService
         * @function getPayPalAcount
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  获取导师PayPal账号
         */
        function getPayPalAcount(callback) {
            if (!isTeacher()) {
                return;
            }
            var toSend = {};
            HttpService.apiGet("teacher", "getPaypalNo", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callback(data.paypal);
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherCenterService
         * @function editPayPalAcount
         * @param {string} paypalNo API请求中的paypalNo参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  绑定导师PayPal账号
         */
        function editPayPalAcount(paypalNo, callback) {
            if (!isTeacher()) {
                return;
            }
            var toSend = {};
            toSend.paypalNo = paypalNo;
            HttpService.apiGet("teacher", "editPayPal", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callback(true);
            }

            function errCallBack(data) {
                callback(false);
            }
        }

        /**
         * @memberOf TeacherCenterService
         * @function getBackground
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  获取背景图片
         */
        function getBackground(callBack) {
            if (!isTeacher()) {
                return;
            }
            HttpService.apiGet('teacher', 'getBackgrounds', {}, apiGetCallBack);
            function apiGetCallBack(data) {
                callBack(data.urls);
            }
        }

        /**
         * @memberOf TeacherCenterService
         * @function getMile
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  获取英里数
         */
        function getMile(callBack) {
            if (!isTeacher()) {
                return;
            }
            HttpService.apiGet('teacher', 'getMile', {}, callBack);
        }

        function changeMenuIndex(index) {
            service.menuIndex = index;
            if (index > -1) {
                service.showPassageSub = true;
            } else {
                service.showPassageSub = false;
            }
        }
    }
})();
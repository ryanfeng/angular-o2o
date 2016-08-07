(function () {
    //分页数量控制
    var noticesPerPage = 9;
    var tutorAccountPerPage = 5;
    var likeListPerPage = 9;
    var likeServerPerPage = 12;
    var myServerPerPage = 8;
    var myTutorPerPage = 12;
    var commentPerPage = 9;
    var myStudentPerPage = 12;

    app.service('PersonalService', ['HttpService', '$rootScope', 'AlertService', '$location', 'SessionService',
        'Upload', "$cookies", personalService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name PersonalService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {Object} $rootScope [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)
     * @param {Service} AlertService [AlertService](app.AlertService.html)
     * @param {Object} $location [$location](https://docs.angularjs.org/api/ng/service/$location)
     * @param {Service} SessionService [SessionService](app.SessionService.html)
     * @param {Object} Upload [Upload](https://github.com/danialfarid/ng-file-upload)
     * @param {Object} $cookies [$cookies](https://docs.angularjs.org/api/ng/service/$cookies)
     * @desc
     * 个人中心的业务服务类
     */
    function personalService(HttpService, $rootScope, AlertService, $location, SessionService, Upload, $cookies) {
        var service = this;
        service.getNotice = getNotice;
        service.notices = {};
        service.getMyTutor = getMyTutor;
        service.myTutor = {};
        service.getMyStudent = getMyStudent;
        service.myStudent = {};
        service.getMyServer = getMyServer;
        service.getTutorAccount = getTutorAccount;
        service.tutorAccount = {};
        service.getLikeList = getLikeList;
        service.likeList = {};
        service.getLikeServer = getLikeServer;
        service.likeServer = {};
        service.comment = [];
        service.getPersonInfo = getPersonInfo;
        service.getComment = getComment;
        service.modifyPersonInfo = modifyPersonInfo;
        service.uploadPictrue = uploadPictrue;
        service.getPersonPhone = getPersonPhone;
        service.getPersonEmail = getPersonEmail;
        service.modifyPhone = modifyPhone;
        service.modifyEmail = modifyEmail;
        service.showDetail = showDetail;
        service.getPreviewServer = getPreviewServer;
        service.getNotiCount = getNotiCount;


        /**
         * @memberOf PersonalService
         * @function isLogin
         * @desc
         *  判断用户是否登录。
         * @return {bool} true:登录
         */
        function isLogin() {
            return SessionService.isLogin();
        }

        /**
         * @memberOf PersonalService
         * @function getNotice
         * @param {Number} page 列表页码
         * @desc
         *  获取用户通知信息。
         *  获取的数据放在PersonalService的notices，notices.data, notices.totalPage，notices.totalPageArray。
         */
        function getNotice(page) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('notification', 'getNoti', {page: page + ''}, apiGetCallBack);
            function apiGetCallBack(data) {
                service.notices = data;
                service.notices.data = JsonParse(data.data);
                service.notices.totalPage = parseInt((parseInt(data.count) - 1 ) / noticesPerPage) + 1;
                if (data.count == 0) {
                    service.notices.totalPage = 0;
                }
                service.notices.totalPageArray = new Array(service.notices.totalPage);
                $rootScope.$broadcast('getNotice');
            }
        }

        /**
         * @memberOf PersonalService
         * @function getMyTutor
         * @param {Number} page 列表页码
         * @desc
         *  学员获取预约导师列表。
         *  获取的数据放在PersonalService的myTutor，myTutor.totalPage，myTutor.totalPageArray。
         */
        function getMyTutor(page) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('order', 'getListByUser', {page: page + ''}, apiGetCallBack);
            function apiGetCallBack(data) {
                service.myTutor = data;
                service.myTutor.totalPage = parseInt((parseInt(data.count) - 1 ) / myTutorPerPage) + 1;
                if (data.count == 0) {
                    service.myTutor.totalPage = 0;
                }
                service.myTutor.totalPageArray = new Array(service.myTutor.totalPage);
                $rootScope.$broadcast('getMyTutor');
            }
        }

        /**
         * @memberOf PersonalService
         * @function getMyStudent
         * @param {Number} page 列表页码
         * @desc
         *  导师获取用户预约列表。
         *  获取的数据放在$broadcast的getMyStudent方法参数中。
         */
        function getMyStudent(page) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('order', 'getListByTeacher', {page: page + ''}, apiGetCallBack);
            function apiGetCallBack(data) {
                data.totalPage = parseInt((parseInt(data.count) - 1 ) / myStudentPerPage) + 1;
                if (data.count == 0) {
                    data.totalPage = 0;
                }
                data.totalPageArray = new Array(data.totalPage);
                $rootScope.$broadcast('getMyStudent', data);
            }
        }

        /**
         * @memberOf PersonalService
         * @function getMyStudent
         * @param {Number} page 列表页码
         * @desc
         *  获取学员对导师评价。
         *  获取的数据放在$broadcast的getTutorAccount方法参数中。
         *  获取的数据放在PersonalService的tutorAccount，tutorAccount.data，tutorAccount.totalPage，tutorAccount.totalPageArray。
         */
        function getTutorAccount(page) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('teacher', 'getCommentList', {page: page + ''}, apiGetCallBack);
            function apiGetCallBack(data) {
                service.tutorAccount = data;
                service.tutorAccount.data = JsonParse(data.data);
                service.tutorAccount.totalPage = parseInt((parseInt(data.count) - 1 ) / tutorAccountPerPage) + 1;
                if (data.count == 0) {
                    service.tutorAccount.totalPage = 0;
                }
                service.tutorAccount.totalPageArray = new Array(service.tutorAccount.totalPage);
                $rootScope.$broadcast('getTutorAccount', data);
            }
        }

        /**
         * @memberOf PersonalService
         * @function getLikeList
         * @param {Number} page 列表页码
         * @desc
         *  获取心愿名单。
         *  获取的数据放在PersonalService的likeList，likeList.data，likeList.totalPage，likeList.totalPageArray。
         */
        function getLikeList(page) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('user', 'getLikeTeachers', {page: page + ''}, apiGetCallBack);
            function apiGetCallBack(data) {
                service.likeList = data;
                service.likeList.data = JsonParse(data.data);
                service.likeList.totalPage = parseInt((parseInt(data.count) - 1 ) / likeListPerPage) + 1;
                if (data.count == 0) {
                    service.likeList.totalPage = 0;
                }
                service.likeList.totalPageArray = new Array(service.likeList.totalPage);
                $rootScope.$broadcast('getLikeList');
            }
        }

        /**
         * @memberOf PersonalService
         * @function getLikeServer
         * @param {Number} page 列表页码
         * @desc
         *  获取心愿名单。
         *  获取的数据放在PersonalService的likeServer，likeServer.data，likeServer.totalPage，likeServer.totalPageArray。
         */
        function getLikeServer(page) {
            if(!isLogin()) {
                return;
            }
            HttpService.apiGet('user', 'getLikeServicePro', {page: page + ''}, apiGetCallBack);
            function apiGetCallBack(data) {
                service.likeServer = data;
                service.likeServer.data = JsonParse(data.data);
                service.likeServer.totalPage = parseInt((parseInt(data.count) - 1 ) / likeServerPerPage) + 1;
                if (data.count == 0) {
                    service.likeServer.totalPage = 0;
                }
                service.likeServer.totalPageArray = new Array(service.likeServer.totalPage);
                $rootScope.$broadcast('getLikeServer');
            }
        }

        /**
         * @memberOf PersonalService
         * @function getLikeList
         * @param {function} callback 获取的参数回调方法
         * @desc
         *  获取用户基本信息
         *  获取的数据放在callback方法的参数里。
         */
        function getPersonInfo(callback) {
            if (!isLogin()) {
                return;
            }
            var toSend = {};
            HttpService.apiGet("user", "getInfo", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                //console.log(data);
                callback(data);
            }

            function errCallBack(data) {
                console.log(data);
                loginExpire();
            }
        }

        /**
         * @memberOf PersonalService
         * @function getComment
         * @param {Number} page 列表页码
         * @param {Number} kind 评价类型（我给导师的评价：1, 导师给我的评价：2）
         * @desc
         *  用户获取评价信息
         *  获取的数据放在$broadcast的getComment方法参数中。
         */
        function getComment(page, kind) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('user', 'getCommentList', {page: page + '', kind: kind + ''}, apiGetCallBack);

            function apiGetCallBack(data) {
                var params = data;
                params.data = JsonParse(data.data);
                params.totalPage = parseInt((parseInt(data.count) - 1 ) / commentPerPage) + 1;
                if (data.count == 0) {
                    params.totalPage = 0;
                }
                params.totalPageArray = new Array(params.totalPage);
                $rootScope.$broadcast('getComment', params);
            }
        }

        /**
         * @memberOf PersonalService
         * @function modifyPersonInfo
         * @param {object} toSend 个人信息对象
         * @desc
         *  修改个人信息
         */
        function modifyPersonInfo(toSend) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet("user", "changeInfo", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                //console.log(data);
                AlertService.showAlert("信息修改成功！", undefined);
            }

            function errCallBack(data) {
                //console.log(data);
                loginExpire();
            }
        }

        /**
         * @memberOf PersonalService
         * @function uploadPictrue
         * @param {object} file [$file](http://jsfiddle.net/danialfarid/huhjo9jm/5/)
         * @param {object} errFile [$invalidFiles](http://jsfiddle.net/danialfarid/huhjo9jm/5/)
         * @desc
         *  修改个人头像，头像上传
         */
        function uploadPictrue(file, errFile) {
            if (!isLogin()) {
                return;
            }
            if (file) {
                file.upload = Upload.upload({
                    url: HttpService.changeIconUrl,
                    data: {Filedata: file, uid: SessionService.user.uid}
                });
                HttpService.openLayer();
                file.upload.then(function (response) {
                    HttpService.closeLayer();
                    //console.log(response.data);
                    var data = response.data;
                    if (data.state = "success") {
                        SessionService.user.iconUrl = data.iconUrl;
                        $cookies.putObject('user', SessionService.user, {path: '/'});
                        AlertService.showAlert("修改成功", undefined);
                    } else {
                        loginExpire();
                    }
                });
            }
        }

        /**
         * @memberOf PersonalService
         * @function getPersonPhone
         * @param {function} callback 回调函数。
         * @desc
         *  获取用户的电话
         *  获取的数据放在callback方法的参数里。
         */
        function getPersonPhone(callback) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('user', 'getPhone', {}, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                //console.log(data);
                callback(data.phone);
            }

            function errCallBack() {
                console.log(data);
            }
        }

        /**
         * @memberOf PersonalService
         * @function getPersonEmail
         * @param {function} callback 回调函数。
         * @desc
         *  获取用户的邮箱。
         *  获取的数据放在callback方法的参数里。
         */
        function getPersonEmail(callback) {
            if (!isLogin()) {
                return;
            }
            HttpService.apiGet('user', 'getEmail', {}, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callback(data.email);
            }

            function errCallBack() {
                console.log(data);
            }
        }

        /**
         * @memberOf PersonalService
         * @function modifyPhone
         * @param {Number} checkNo 手机号验证码。
         * @param {Number} phone 修改的手机号码。
         * @desc
         *  修改手机号码。
         */
        function modifyPhone(checkNo, phone) {
            if (!isLogin()) {
                return;
            }
            var toSend = {};
            toSend.checkNo = checkNo;
            toSend.phone = phone;
            HttpService.apiGet('user', 'changePhone', toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                //console.log(data);
            }

            function errCallBack() {
                console.log(data);
            }
        }

        /**
         * @memberOf PersonalService
         * @function modifyEmail
         * @param {Number} checkNo 邮箱号验证码。
         * @param {String} email 修改的邮箱号码。
         * @desc
         * 修改邮箱号码。
         */
        function modifyEmail(checkNo, email) {
            if (!isLogin()) {
                return;
            }
            var toSend = {};
            toSend.checkNo = checkNo;
            toSend.email = email;
            HttpService.apiGet('user', 'changeEmail', toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                //console.log(data);
            }

            function errCallBack() {
                console.log(data);
            }
        }

        /**
         * @memberOf PersonalService
         * @function loginExpire
         * @desc
         * 账号失效。
         * 用户登录过期或者账号在别处登录。
         */
        function loginExpire() {
            if (!isLogin()) {
                return;
            }
            if (data.errCode == "14001") {
                AlertService.showAlert("登录失效，请先登录！", loginCallback, errCallBack);
                function loginCallback() {
                    $location.path('/login');
                }
            }
        }

        /**
         * @memberOf PersonalService
         * @function showDetail
         * @param {object} order 当前订单对象
         * @desc
         * 获取我的导师订单详情（手机端）。
         * 获取的数据放在PersonalService的mobileDetail中。
         */
        function showDetail(order) {
            service.mobileDetail = order;
        }

        /**
         * @memberOf PersonalService
         * @function getMySserver
         * @param {Number} page 列表页码
         * @desc
         *  导师获取用户预约列表。
         *  获取的数据放在$broadcast的getMySserver方法参数中。
         */
        function getMyServer(page) {
            if(!isLogin()) {
                return;
            }
            HttpService.apiGet('teacher', 'getServiceProList', {page: page + ''}, apiGetCallBack);
            function apiGetCallBack(data) {
                data.totalPage = parseInt((parseInt(data.count) - 1 ) / myServerPerPage) + 1;
                if (data.count == 0) {
                    data.totalPage = 0;
                }
                data.totalPageArray = new Array(data.totalPage);
                $rootScope.$broadcast('getMyServer', data);
            }
        }

        /**
         * @memberOf PersonalService
         * @function getPreviewServer
         * @param {Number} page 列表页码
         * @desc
         *  导师获取用户预约列表。
         *  获取的数据放在$broadcast的getMySserver方法参数中。
         */
        function getPreviewServer(id) {
            if(!isLogin()) {
                return;
            }
            HttpService.apiGet('teacher', 'getServicePro', {serviceProId: id}, apiGetCallBack);
            function apiGetCallBack(data) {
                $rootScope.$broadcast('getPreviewServer', data);
            }
        }

        function getNotiCount(callback){
            HttpService.apiGet('notification', 'getNotiCount', {},apiGetCallBack);
            function apiGetCallBack(data) {
                callback(data.noti_count);
            }
        }
    }
})();
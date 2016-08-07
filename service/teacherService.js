(function () {
    app.service('TeacherService', ['HttpService', 'SessionService', 'AlertService', '$location', teacherService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name TeacherService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {Service} SessionService [SessionService](app.SessionService.html)
     * @param {Service} AlertService [AlertService](app.AlertService.html)
     * @param {Object} $location [$rootScope](https://docs.angularjs.org/api/ng/service/$location)
     * @attr {Object} resources
     * @desc
     *  导师主页服务。
     */
    function teacherService(HttpService, SessionService, AlertService, $location) {
        var service = this;
        var resources = {
            '1': {
                "id": "1",
                "name": '海外游学',
                "srcPC": 'http://image.1yingli.cn/img/new/theme/theme-lx2.png',
                "srcPCNo": 'http://image.1yingli.cn/img/new/theme/theme-lx3.png'
            },
            '2': {
                "id": "2",
                "name": '求职就业',
                "srcPC": 'http://image.1yingli.cn/img/new/theme/theme-qz2.png',
                "srcPCNo": 'http://image.1yingli.cn/img/new/theme/theme-qz3.png'
            },
            '4': {
                "id": "4",
                "name": '创业助力',
                "srcPC": 'http://image.1yingli.cn/img/new/theme/theme-cy2.png',
                "srcPCNo": 'http://image.1yingli.cn/img/new/theme/theme-cy3.png'
            },
            '8': {
                "id": "8",
                "name": '校园生活',
                "srcPC": 'http://image.1yingli.cn/img/new/theme/theme-xy2.png',
                "srcPCNo": 'http://image.1yingli.cn/img/new/theme/theme-xy3.png'
            },
            '16': {
                "id": "16",
                "name": '猎奇分享',
                "srcPC": 'http://image.1yingli.cn/img/new/theme/theme-lq2.png',
                "srcPCNo": 'http://image.1yingli.cn/img/new/theme/theme-lq3.png'
            }
        };
        var authentics = {
            'checkIDCard': {
                "isAuthentic": false,
                "name": '实名认证',
                "nameSimple": '实名',
                "url": 'http://image.1yingli.cn/img/new/teacher/identity.png',
                "urlPC": 'http://image.1yingli.cn/img/new/teacher/identity1.png'
            },
            'checkDegree': {
                "isAuthentic": false,
                "name": '学位认证',
                "nameSimple": '学位',
                "url": 'http://image.1yingli.cn/img/new/teacher/education.png',
                "urlPC": 'http://image.1yingli.cn/img/new/teacher/education1.png'
            },
            'checkWork': {
                "isAuthentic": false,
                "name": '工作认证',
                "nameSimple": '工作',
                "url": 'http://image.1yingli.cn/img/new/teacher/job.png',
                "urlPC": 'http://image.1yingli.cn/img/new/teacher/job1.png'
            },
            'checkPhone': {
                "isAuthentic": false,
                "name": '手机认证',
                "nameSimple": '手机',
                "url": 'http://image.1yingli.cn/img/new/teacher/phone.png',
                "urlPC": 'http://image.1yingli.cn/img/new/teacher/phone1.png'
            },
            'checkEmail': {
                "isAuthentic": false,
                "name": '邮箱认证',
                "nameSimple": '邮箱',
                "url": 'http://image.1yingli.cn/img/new/teacher/email.png',
                "urlPC": 'http://image.1yingli.cn/img/new/teacher/email1.png'
            }
        };

        service.person_bg = "http://image.1yingli.cn/14502513601552d142f97-4475-4776-9e82-6691b9188e29.jpg";
        service.person_img = "http://image.1yingli.cn/img/img.png";
        service.teacher = {};
        service.getTeacher = getTeacher;
        service.getAboutTopic = getAboutTopic;
        service.teachers = {};
        service.getComment = getComment;
        service.comments = {};
        service.teachersCache = [];
        service.doOrder = doOrder;
        service.likeTeacher = likeTeacher;
        service.isLikeTeacher = isLikeTeacher;
        service.disLikeTeacher = disLikeTeacher;
        service.disLikeTeacher = disLikeTeacher;
        service.saveLookTeacher = saveLookTeacher;
        service.getTeacherPassage = getTeacherPassage;
        service.getTeacherService = getTeacherService;
        service.getOldOrderInfo = getOldOrderInfo;
        service.oldOrderInfo = {};
        service.resources = resources;
        service.authentics = authentics;

        /**
         * @memberOf TeacherService
         * @function saveLookTeacher
         * @param {string} nowTid API请求中的nowTid参数
         * @param {string} toTid API请求中的toTid参数
         * @param {string} tids API请求中的tids参数
         * @desc
         *  保存用户浏览记录
         */
        function saveLookTeacher(nowTid, toTid, tids) {
            var toSend = {};
            toSend.now_tid = nowTid;
            toSend.to_tid = toTid + "";
            toSend.recommend_list = tids;
            HttpService.apiGet("function", "recordRecommend", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherService
         * @function getOldOrderInfo
         * @param {function} callBack API请求完成后的回调函数
         * @desc
         *  获取当前用户以前订单信息
         */
        function getOldOrderInfo(callBack) {
            if(!SessionService.isLogin()){ return; }
            var toSend = {};
            HttpService.apiGet("user", "getIntroduce", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callBack(data);
            }

            function errCallBack(data) {
                console.log(data);
            }
        }

        /**
         * @memberOf TeacherService
         * @function isLikeTeacher
         * @param {string} tid API请求中的tid参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  判断当前用户是否喜欢这个导师
         */
        function isLikeTeacher(tid, callBack) {
            if (!SessionService.isLogin()) { return; }

            var toSend = {};
            toSend.teacherId = tid;
            HttpService.apiGet("user", "isLikeTeacher", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callBack(data.likeTeacher);
            }

            function errCallBack(data) {
                if (data.errCode == '14001') {
                    AlertService.show = false;
                }
                function alertCallBack() {
                    $location.path('/login');
                }
            }
        }

        /**
         * @memberOf TeacherService
         * @function likeTeacher
         * @param {string} tid API请求中的tid参数
         * @param {function} likeCallBack API请求完成后的回调函数
         * @desc
         *  添加喜欢的老师
         */
        function likeTeacher(tid, likeCallBack) {
            var toSend = {};
            toSend.teacherId = tid;
            HttpService.apiGet("user", "likeTeacher", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                likeCallBack();
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherService
         * @function disLikeTeacher
         * @param {string} tid API请求中的tid参数
         * @param {function} disLikeCallBack API请求完成后的回调函数
         * @desc
         *  取消喜欢这个导师
         */
        function disLikeTeacher(tid, disLikeCallBack) {
            var toSend = {};
            toSend.teacherId = tid;
            HttpService.apiGet("user", "dislikeTeacher", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                disLikeCallBack();
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherService
         * @function doOrder
         * @param {string} user API请求中的user参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  业务预约
         */
        function doOrder(user, callBack) {
            HttpService.apiGet("order", "createOrder", user, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callBack();
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherService
         * @function getTeacher
         * @param {string} id API请求中的id参数
         * @param {bool} refresh API请求中的其他参数
         * @param {function} callBack API请求完成后的回调函数
         * @desc
         *  业务个人信息
         */
        function getTeacher(id, callBack, refresh) {
            if (service.teachersCache[id] != undefined && refresh !== true) {
                service.teacher = service.teachersCache[id];
                callBack(service.teacher);
                return;
            }
            HttpService.apiGet("user", "getTeacherInfo", {teacherId: id}, getTeacherCallBack, errorCallback);
            function getTeacherCallBack(data) {
                service.teacher = data;
                service.teacher.authentics = authentics;
                service.teacher.resources = resources;
                //导师服务主题
                var tips = JsonParse(data.tips);
                for (var i = 0; i < tips.length; i++) {
                    if (service.teacher.resources[tips[i].id] != undefined) {
                        service.teacher.resources[tips[i].id].flag = tips[i].id;
                    }
                }
                //导师个人履历
                service.teacher.studyExperience = JsonParse(data.studyExperience);
                service.teacher.workExperience = JsonParse(data.workExperience);
                //导师认证
                service.teacher.authentics.checkIDCard.isAuthentic = data.checkIDCard;
                service.teacher.authentics.checkDegree.isAuthentic = data.checkDegree;
                service.teacher.authentics.checkWork.isAuthentic = data.checkWork;
                service.teacher.authentics.checkEmail.isAuthentic = data.checkEmail;
                service.teacher.authentics.checkPhone.isAuthentic = data.checkPhone;
                service.teachersCache[id] = service.teacher;
                callBack(service.teacher);
            }

            function errorCallback(data) {
                if (data.errCode = '22001') {
                    setTimeout(function () {
                        AlertService.setCallBack(alertCallBack)
                    });
                }
                function alertCallBack() {
                    $location.path('/');
                }
            }
        }

        /**
         * @memberOf TeacherService
         * @function getAboutTopic
         * @param {string} id API请求中的id参数
         * @param {function} callBack API请求完成后的回调函数
         * @desc
         *  业务相关话题
         */
        function getAboutTopic(id, callBack) {
            HttpService.apiGet("function", "getRecommendTeacherList", {teacherId: id}, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                service.teachers = JsonParse(data.data);
                callBack();
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherService
         * @function getComment
         * @param {string} id API请求中的id参数
         * @param {string} page API请求中的page参数
         * @param {function} callBack API请求完成后的回调函数
         * @desc
         *  业务导师评论
         */
        function getComment(id, page, callBack) {
            HttpService.apiGet("function", "getCommentList", {teacherId: id, page: page + ""}, getCommentCallBack);
            function getCommentCallBack(data) {
                service.comments = JsonParse(data.data);
                for (var i = 0; i < service.comments.length; i++) {
                    service.comments[i].score = new Array(parseInt(service.comments[i].score));
                }
                callBack(data);
            }
        }

        /**
         * @memberOf TeacherService
         * @function getTeacherPassage
         * @param {string} tid API请求中的tid参数
         * @param {string} page API请求中的page参数
         * @param {function} callBack API请求完成后的回调函数
         * @desc
         *  获取导师文章
         */
        function getTeacherPassage(tid, page, callBack) {
            HttpService.apiGet("function", "getPassageList", {
                teacherId: tid,
                page: page + ""
            }, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callBack(data);
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherService
         * @function getTeacherService
         * @param {string} tid API请求中的tid参数
         * @param {string} page API请求中的page参数
         * @param {function} callBack API请求完成后的回调函数
         * @desc
         *  获取导师服务
         */
        function getTeacherService(tid, page, callBack) {
            HttpService.apiGet("function", "getServiceProList", {
                teacherId: tid,
                page: page + ""
            }, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callBack(data);
            }

            function errCallBack(data) {
            }
        }
    }
})();
(function () {
    var pageSize = 5;
    var passagePerPage = 3;
    var servicePerPage = 3;
    var makeQrCodeFlag = false;

    app.controller("TeacherController", ['$scope', '$routeParams', 'ThemeService', 'TeacherService',
        'AlertService', '$location', 'SessionService', 'ValidateService', 'MetaTags', 'BecomeTeacherService',
        'ShareService', 'changeServiceContentFilter', 'ServiceService', 'CreateOrderService', '$cookies', 'HttpService',
        '$rootScope', teacherController]);
    function teacherController($scope, $routeParams, ThemeService, TeacherService, AlertService, $location,
                               SessionService, ValidateService, MetaTags, BecomeTeacherService, ShareService,
                               changeServiceContentFilter, ServiceService, CreateOrderService, $cookies, HttpService,
                               $rootScope) {
        $location.url($location.path());
        $scope.createOrderService = CreateOrderService;
        CreateOrderService.refreshData();
        $scope.sessionService = SessionService;
        $scope.makeAppoint = makeAppoint;
        $scope.userOrder = userOrder;

        $scope.payUrl = HttpService.payUrl;
        $scope.urlCallback = $location.absUrl();
        $scope.showQRCode = false;
        $scope.makeQrCode = makeQrCode;
        $scope.submitForm = submitForm;
        $scope.nameEncode = nameEncode;
        $scope.hide = hide;
        $scope.wxPay = wxPay;
        $scope.refresh = refresh;
        $scope.mouseShow = mouseShow;
        $scope.mouseHide = mouseHide;

        $scope.serviceConfig = ThemeService.serviceConfig;
        $scope.person_bg = TeacherService.person_bg;
        $scope.person_img = TeacherService.person_img;
        TeacherService.getTeacher($routeParams.id, getTeacherCallBack);

        //判断是否喜欢当前导师
        TeacherService.isLikeTeacher($routeParams.id, isLikeTeacherCallBack);
        $scope.likeOrDisTeacher = likeOrDisTeacher;

        if (isWeixinBrowser() && !SessionService.isLogin() && $rootScope.$storage.lwx == undefined) {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx526dfd5c9193f98c&redirect_uri=" + HttpService.loginRedirectUrl[3] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }
        //获取当前导师信息
        function getTeacherCallBack() {
            $scope.teacher = TeacherService.teacher;
            $scope.resources = TeacherService.teacher.resources;
            $scope.authentics = TeacherService.teacher.authentics;

            //判断个人简介长度再做处理
            if (isMobile()) {
                if ($scope.teacher.introduce.length <= 100) {
                    $scope.showArrow = true;
                }
            } else {
                if ($scope.teacher.introduce.length <= 600) {
                    $scope.showAll = true;
                    $scope.showArrow = true;
                }
            }

            MetaTags.setMeta(getMeta());
            $scope.shareTitle = "【一英里】 " + $scope.teacher.name + " - " + $scope.teacher.simpleinfo + " | 等待你的预约";
            $scope.shareUrl = window.location.href;
            $scope.shareImg = $scope.teacher.iconUrl;
            $scope.shareDescription = (changeServiceContentFilter($scope.teacher.introduce)).substring(0, 50);
            ShareService.configShare($scope.shareTitle, $scope.shareUrl, $scope.shareImg, $scope.shareDescription);
            makeQrCodeFlag = false;
            weiboShare();
            setTimeout(function () {
                $('body').scrollTop(0)
            }, 500);
        }

        function getMeta() {
            var info = {};
            info.title = $scope.teacher.name + ' - ' + $scope.teacher.simpleinfo + ' - 「一英里」';
            var descriptionArray = [$scope.teacher.name, $scope.teacher.simpleinfo, $scope.teacher.serviceTitle];
            for (var value in $scope.teacher.studyExperience) {
                descriptionArray.push($scope.teacher.studyExperience[value].schoolName);
            }
            for (value in $scope.teacher.workExperience) {
                descriptionArray.push($scope.teacher.workExperience[value].companyName);
            }

            info.description = descriptionArray.join(',');
            return info;
        }

        function makeQrCode() {
            if (makeQrCodeFlag) {
                return;
            }
            makeQrCodeFlag = true;
            if (document.getElementById("qrcode")) {
                document.getElementById("qrcode").innerHTML = "";
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width: 160,
                    height: 160,
                    text: window.location.href
                });
            }
        }

        function weiboShare() {
            var wb_shareBtn = document.getElementById("wbshare");
            if (wb_shareBtn) {
                var wb_url = $scope.shareUrl;
                var wb_title = $scope.shareTitle + "（分享自 @一英里平台 ：你离梦想，只差「一英里」）";
                var wb_pic = $scope.shareImg;
                wb_shareBtn.setAttribute("href", "javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina" +
                    ".com.cn/share/share.php?appkey=3399536820',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title)," +
                    "'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a()" +
                    "{if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s." +
                    "width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))" +
                    "setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','" + wb_pic + "','" + wb_title + "','" + wb_url + "','utf-8'));");
            }
        }

        function isLikeTeacherCallBack(isLike) {
            if (isLike == 'false') {
                $scope.isLikeTeacher = false;
            } else {
                $scope.isLikeTeacher = true;
            }
        }

        function likeOrDisTeacher() {
            if (isLogin()) {
                if ($scope.isLikeTeacher) {
                    TeacherService.disLikeTeacher($routeParams.id, disLikeTeacher);
                    function disLikeTeacher() {
                        $scope.isLikeTeacher = false;
                        $scope.teacher.likeNo--;
                    }
                } else {
                    TeacherService.likeTeacher($routeParams.id, likeCallBack);
                    function likeCallBack() {
                        $scope.isLikeTeacher = true;
                        $scope.teacher.likeNo++;
                    }
                }
            }
        }

        //立即预约
        function makeAppoint() {
            CreateOrderService.user.teacherId = $routeParams.id;
            CreateOrderService.orderIsNext = true;
            isLogin() ? CreateOrderService.isOrderShow = true : "";
        }

        //手机端预约跳转
        function userOrder() {
            if (isLogin()) {
                var teacher = {};
                teacher.isService = false;
                teacher.iconUrl = $scope.teacher.iconUrl;
                teacher.teacherId = $scope.teacher.teacherId;
                teacher.name = $scope.teacher.name;
                teacher.simpleinfo = $scope.teacher.simpleinfo;
                teacher.topic = $scope.teacher.topic;
                teacher.price = $scope.teacher.price;
                teacher.serviceCount = '1';
                $cookies.remove('teacher');
                $cookies.putObject('teacher', teacher, {'path': '/'});
                $location.path("/serverOrder");
            }
        }

        //判断是否登录
        function isLogin() {
            //判断是否登录
            if (!SessionService.isLogin()) {
                function loginCallback() {
                    $location.path('/login');
                }

                AlertService.showAlertWithCancel("请先登录！", loginCallback);
                return false;
            }
            return true;
        }

        function submitForm() {
            if ($scope.money && !isNaN($scope.money)) {
                $scope.showPayStyle = true;
                $scope.isRaward = false;
            } else {
                $scope.isValidate = true;
            }
        }

        function hide() {
            $scope.showPayStyle = false;
            $scope.showWxPay = false;
        }

        function wxPay() {
            var params = {
                teacherName: $scope.teacher.name,
                teacherId: $scope.teacher.teacherId,
                money: $scope.money
            };
            HttpService.apiGet('function', 'getWXRewardUrl', params, apiGetCallBack);
            function apiGetCallBack(data) {
                hide();
                $scope.showWxPay = true;
                if (document.getElementById("wxcode")) {
                    document.getElementById("wxcode").innerHTML = "";
                    var qrcode = new QRCode(document.getElementById("wxcode"), {
                        width: 160,
                        height: 160,
                        text: data.url,
                        title: " "
                    });
                }
                console.log(data);
            }
        }

        function refresh() {
            hide();
            TeacherService.getTeacher($routeParams.id, getTeacherCallBack, true);
        }

        function nameEncode(input) {
            return encodeURIComponent(input);
        }

        function mouseShow(){
            $('.xl-img').css("transform","translate(0,14px)");
            $('.xl-img').css("opacity","1");
        }

        function mouseHide(){
            $('.xl-img').css("transform","translate(0,30px)");
            $('.xl-img').css("opacity","1");
        }

    }

    app.controller('AboutTeacherController', ['TeacherService', '$routeParams', '$scope', 'SessionService', '$location', aboutTeacherController]);
    function aboutTeacherController(TeacherService, $routeParams, $scope, SessionService, $location) {
        TeacherService.getAboutTopic($routeParams.id, getTeachersCallBack);
        function getTeachersCallBack() {
            $scope.teachers = TeacherService.teachers;
        }

        //导师页面跳转
        $scope.lookTeacher = lookTeacher;
        function lookTeacher(tid) {
            if (SessionService.isLogin()) {
                TeacherService.saveLookTeacher($routeParams.id, tid, $scope.teachers);
            }
            $location.path("teacher/"+ tid);
        }
    }

    app.controller('TeacherCommitController', ['$scope', '$routeParams', 'TeacherService', teacherCommitController]);
    function teacherCommitController($scope, $routeParams, TeacherService) {
        $scope.currentPage = 1;
        $scope.data = {};

        //获取导师评价
        TeacherService.getComment($routeParams.id, $scope.currentPage, getCommentCallBack);
        function getCommentCallBack(data) {
            $scope.comments = TeacherService.comments;
            $scope.data.totalPage = parseInt((parseInt(data.count) - 1 ) / pageSize) + 1;
            $scope.data.count = data.count;
            (data.count == 0) ? $scope.data.totalPage = 0 : '';
            $scope.data.totalPageArray = new Array($scope.data.totalPage);
        }

        //加载评论分页数据
        $scope.changePage = function (page) {
            if (page < 1 || page > $scope.data.totalPage) {
                return;
            }
            $scope.currentPage = page;
            TeacherService.getComment($routeParams.id, $scope.currentPage, getCommentCallBack);
        };
    }

    app.controller("TeacherArticleController", ['$scope', '$routeParams', 'TeacherService', '$location', teacherArticle]);
    function teacherArticle($scope, $routeParams, TeacherService, $location) {
        $scope.currentPage = 1;
        $scope.data = {};
        $scope.lookPassage = lookPassage;
        $scope.changePage = changePage;
        TeacherService.getTeacherPassage($routeParams.id, $scope.currentPage, PassCallBack);

        function PassCallBack(data) {
            $scope.articles = JsonParse(data.data);
            $scope.data.totalPage = parseInt((parseInt(data.count) - 1 ) / passagePerPage) + 1;
            if (data.count == 0) {
                $scope.data.totalPage = 0;
            }
            $scope.data.totalPageArray = new Array($scope.data.totalPage);
        }

        function changePage(page) {
            if (page < 1 || page > $scope.data.totalPage) {
                return;
            }
            $scope.currentPage = page;
            TeacherService.getTeacherPassage($routeParams.id, $scope.currentPage, PassCallBack);
        }

        function lookPassage(passageId) {
            $location.path("/passage/" + passageId);
        }
    }

    app.controller('TeacherServiceController', ['$scope', '$routeParams', 'TeacherService', 'ServiceService', teacherServiceController]);
    function teacherServiceController($scope, $routeParams, TeacherService, ServiceService) {
        $scope.serviceService = ServiceService;

        $scope.currentPage = 1;
        $scope.data = {};
        $scope.changePage = changePage;
        TeacherService.getTeacherService($routeParams.id, $scope.currentPage, getServiceCallBack);

        function getServiceCallBack(data) {
            $scope.data = data;
            $scope.data.totalPage = parseInt((parseInt(data.count) - 1 ) / servicePerPage) + 1;
            if (data.count == 0) {
                $scope.data.totalPage = 0;
            }
            $scope.data.totalPageArray = new Array($scope.data.totalPage);
        }

        function changePage(page) {
            if (page < 1 || page > $scope.data.totalPage) {
                return;
            }
            $scope.currentPage = page;
            TeacherService.getTeacherService($routeParams.id, $scope.currentPage, getServiceCallBack);
        }

    }
})();
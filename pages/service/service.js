(function () {
    var flag = true;

    function checkBottom() {
        var scrollTop = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        if ((height - scrollTop) < 180) {
            $('.m-bottom').addClass('m-bottom-active');
            if (flag) {
                flag = false;
                $('.m-bottom').fadeOut(0);
                $('.m-bottom').fadeIn(500);
            }
        } else {
            $('.m-bottom').removeClass('m-bottom-active')
             if(!flag){
                $('.m-bottom').fadeIn(500);
                flag = true;
            }
        }
    }

    var commentPerPage = 5;
    app.controller("ServiceController", ['$scope', '$localStorage', '$rootScope', '$routeParams', 'ServiceService',
        'TeacherService', 'SessionService', 'CreateOrderService', 'AlertService', '$location', '$cookies', 'changeServiceContentFilter', 'MetaTags', 'ShareService',
        'HttpService',service]);
    function service($scope, $localStorage, $rootScope, $routeParams, ServiceService, TeacherService, SessionService,
                     CreateOrderService, AlertService, $location, $cookies, changeServiceContentFilter, MetaTags, ShareService,HttpService) {
        $(window).scroll(checkBottom);

        $scope.person_bg = TeacherService.person_bg;
        $scope.serviceService = ServiceService;
        $scope.changePage = changePage;
        $scope.changeImageUrl = changeImageUrl;
        $scope.contentType = 0;
        $scope.currentPage = 1;

        $scope.isLogin = isLogin;

        CreateOrderService.refreshData();
        CreateOrderService.service.serviceProId = $routeParams.id;
        var shopping = $localStorage.shopping;
        $scope.createOrderService = CreateOrderService;
        //pc端处理
        $scope.makeAppoint = makeAppoint;
        $scope.addShopping = addShopping;
        //手机端加入购物车
        $scope.addMobileShopping = addMobileShopping;
        $scope.makeMobileAppoint= makeMobileAppoint;
        $scope.serviceCount = 1;
        $scope.service = {};
        $scope.subMobileOrder = subMobileOrder;
        $scope.closeOrder = closeOrder;

        $scope.formatIntegerMobile = formatIntegerMobile;
        $scope.formatInteger = formatInteger;

        $scope.showQRCode = false;
        var makeQrCodeFlag = false;
        $scope.makeQrCode = makeQrCode;

        $scope.likeOrDisTeacher = likeOrDisTeacher;
        $scope.likeServer = likeServer;
        $scope.showOther = false;
        $scope.showTopPre = showTopPre;
        $scope.showTopNext = showTopNext;

        $scope.showCountBlock = showCountBlock;

        if (isWeixinBrowser() && !SessionService.isLogin()) {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx526dfd5c9193f98c&redirect_uri=" + HttpService.loginRedirectUrl[3] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }
        $rootScope.$on('loadServiceData', function(){
            ServiceService.getServiceById($routeParams.id, getServiceByIdCallBack);
        });
        ServiceService.getServiceById($routeParams.id, getServiceByIdCallBack);

        ServiceService.getCommentList($routeParams.id, $scope.currentPage, getCommentListCallBack);

        $scope.windowHeight = $(window).height();
        $scope.showBigImg = showBigImg;
        $scope.leftBigImg = leftBigImg;
        $scope.rightBigImg = rightBigImg;
        $scope.bigImgIndex = 0;

        function showBigImg(url,index){
            $scope.bigImg = url;
            $scope.imgIsShow=true;
            $scope.bigImgIndex = index;
        }

        function leftBigImg(){
            $scope.bigImgIndex = $scope.bigImgIndex -1;
            if($scope.bigImgIndex  < 0){
                $scope.bigImgIndex = $scope.service.imgs.length -1;
            }
            $scope.bigImg = $scope.service.imgs[$scope.bigImgIndex];
        }

        function rightBigImg(){
            $scope.bigImgIndex = $scope.bigImgIndex +1;
             if($scope.bigImgIndex  >= $scope.service.imgs.length){
                $scope.bigImgIndex = 0;
            }
            $scope.bigImg = $scope.service.imgs[$scope.bigImgIndex];
        }

        //微博和微信分享
        function getMeta() {
            var info = {};
            info.title = $scope.service.title + ' - ' + $scope.teacher.name + ' - 「一英里」';
            var descriptionArray = [$scope.teacher.name, $scope.teacher.simpleinfo, $scope.teacher.serviceTitle];
            for (value in $scope.teacher.studyExperience) {
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

        function getServiceByIdCallBack(data) {
            $scope.service = data;
            if (data.count == 0) {
                $scope.createOrderService.service.count = 0;
            }
            $scope.service.imgs = $scope.service.imageUrls.split(',');
            $scope.bigImg = $scope.service.imgs[0];
            $scope.service.tips = $scope.service.tip.split(',');
            ServiceService.getMoreServicePro($scope.service.serviceProId, $scope.service.teacherId, getMoreServiceCallback);
            TeacherService.getTeacher(data.teacherId, getTeacherCallBack);
            setTimeout(function () {
                $scope.showOther = true;
                $('#slide').slide({
                    autoPlay: true,
                    mainCell: "#slideul",
                    effect: 'fade',
                    delayTime: 1000,
                    interTime: 5000,
                    defaultIndex: 0,
                    titCell: '.titCell .li',
                    trigger: 'click',
                    scroll: 1,
                    vis: 1,
                    titOnClassName: 'on',
                    autoPage: false,
                    prevCell: '.prev',
                    nextCell: '.next'
                });
            }, 200);
        }

        function getMoreServiceCallback(data) {
            $scope.moreService = data;
        }

        function getTeacherCallBack(data) {
            $scope.teacher = data;
            $scope.resources = TeacherService.teacher.resources;
            $scope.authentics = TeacherService.teacher.authentics;

            $scope.teacher.servicePrice = $scope.service.price;
            $scope.teacher.serviceQuantifier = $scope.service.quantifier;
            $scope.teacher.serviceNumeral = $scope.service.numeral;
            $scope.teacher.serviceOnsale = $scope.service.onsale;
            $scope.teacher.serverTopic = $scope.service.title;
            if ($cookies.getObject('teacher')) {
                $scope.isService = $cookies.getObject('teacher').isService;
                $scope.teacher.serviceCount = $cookies.getObject('teacher').serviceCount;
            }

            getShoppingDetatilData();

            //微博微信分享
            MetaTags.setMeta(getMeta());
            $scope.shareTitle = "【一英里】 " + $scope.teacher.name + " - " + $scope.service.title + " | 等待你的预约";
            $scope.shareUrl = window.location.href;
            $scope.shareImg = $scope.teacher.iconUrl;
            $scope.shareDescription = (changeServiceContentFilter($scope.teacher.introduce)).substring(0, 50);
            ShareService.configShare($scope.shareTitle, $scope.shareUrl, $scope.shareImg, $scope.shareDescription);
            makeQrCodeFlag = false;
            weiboShare();



            //喜爱导师
            if (SessionService.isLogin()) {
                ServiceService.isLikeServicePro($routeParams.id, isLikeServiceCallBack);
                TeacherService.isLikeTeacher($scope.teacher.teacherId, isLikeTeacherCallBack);
            } else {
                isLikeServiceCallBack('false');
            }
        }

        function changeImageUrl($event, url, index) {
            $($event.currentTarget).prevAll().removeClass('u-small-on');
            $($event.currentTarget).nextAll().removeClass('u-small-on');
            $($event.currentTarget).addClass('u-small-on');
            $scope.bigImg = url;
            $scope.bigImgIndex = index;
        }

        function changePage(page) {
            if (page < 1 || page > $scope.data.totalPage) {
                return;
            }
            $scope.currentPage = page;
            ServiceService.getCommentList($routeParams.id, $scope.currentPage, getCommentListCallBack)
        }

        function getCommentListCallBack(data) {
            $scope.data = data;
            service.comments = JsonParse(data.data);
            for (var i = 0; i < service.comments.length; i++) {
                service.comments[i].score = new Array(parseInt(service.comments[i].score));
            }
            $scope.data.totalPage = parseInt((parseInt(data.count) - 1 ) / commentPerPage) + 1;
            if (data.count == 0) {
                $scope.data.totalPage = 0;
            }
            $scope.data.totalPageArray = new Array($scope.data.totalPage);
        }

        function isLogin() {
            if (!SessionService.isLogin()) {
                function loginCallback() {
                    $location.path('/login');
                }

                AlertService.showAlertWithCancel("请先登录！", loginCallback);
                return false;
            }
            return true;
        }

        function makeAppoint() {
            if ($scope.createOrderService.service.count <= 0) {
                AlertService.showAlert('暂无库存', undefined);
                return;
            }

            CreateOrderService.orderIsNext = true;
            isLogin() ? CreateOrderService.isOrderShow = true : "";
        }

        function addShopping() {
            if ($scope.createOrderService.service.count <= 0) {
                AlertService.showAlert('暂无库存', undefined);
                return;
            }
            if(shopping != undefined){
                for (var i in shopping) {
                    for (var j in shopping[i].services) {
                        if(shopping[i].services[j].serviceProId == $routeParams.id){
                            AlertService.showAlert('已添加到购物车!', undefined);
                            return;
                        }
                    }
                }
            }

            CreateOrderService.orderIsNext = false;
            CreateOrderService.isOrderShow = true;
        }

        function getShoppingDetatilData(){
            CreateOrderService.user.teacherId = $scope.teacher.teacherId;
            CreateOrderService.user.tname = $scope.teacher.name;
            CreateOrderService.user.tsimpleinfo = $scope.teacher.simpleinfo;
            CreateOrderService.user.iconUrl = $scope.teacher.iconUrl;
        }

        function makeMobileAppoint() {
            if (isLogin()) {
                var teacher = {};
                teacher.isService = true;
                teacher.servicePrice = $scope.service.price;
                teacher.serviceQuantifier = $scope.service.quantifier;
                teacher.serviceNumeral = $scope.service.numeral;
                teacher.serviceOnsale = $scope.service.onsale;
                teacher.serviceProId = $scope.service.serviceProId;
                teacher.serverTopic = $scope.service.title;
                teacher.servicePriceTemp = $scope.service.priceTemp;
                teacher.serviceCount = $scope.serviceCount;
                teacher.iconUrl = $scope.teacher.iconUrl;
                teacher.teacherId = $scope.teacher.teacherId;
                teacher.name = $scope.teacher.name;
                teacher.simpleinfo = $scope.teacher.simpleinfo;
                teacher.topic = $scope.teacher.topic;
                teacher.price = $scope.teacher.price;
                $cookies.remove('teacher');
                $cookies.putObject('teacher', teacher, {'path': '/'});
                $location.path("/serverOrder");
            }
        }

        function addMobileShopping() {
            if(shopping != undefined){
                for (var i in shopping) {
                    for (var j in shopping[i].services) {
                        if(shopping[i].services[j].serviceProId == $routeParams.id){
                            AlertService.showAlert('已添加到购物车!', undefined);
                            return;
                        }
                    }
                }
            }
            var teacher = {};
            teacher.isService = true;
            teacher.serviceCount = $scope.serviceCount;
            $cookies.remove('teacher');
            $cookies.putObject('teacher', teacher, {'path': '/'});
            $location.path("/shoppingOrder/" + $routeParams.id);
        };

        function subMobileOrder() {
            var service = $scope.service;
            if (!service.question || !service.resume || !service.selectTime) {
                AlertService.showAlert("所有信息必须填写!", undefined);
                return;
            }
            if ($localStorage.shopping == undefined || $localStorage.shopping.length == 0) {
                var shoppingObj = [];
                var oneShopping = {};
                newTeacher(oneShopping);
                oneShopping.services = [];
                newService(oneShopping.services);
                shoppingObj.push(oneShopping);
                $localStorage.shopping = shoppingObj;
                AlertService.showAlert("添加成功!", undefined);
                $rootScope.back();
            } else {
                var shopping = $localStorage.shopping;
                if (isNewShoping()) {
                    oneShopping = {};
                    newTeacher(oneShopping);
                    oneShopping.services = [];
                    newService(oneShopping.services);
                    shopping.push(oneShopping);
                    AlertService.showAlert("添加成功!", undefined);
                    $rootScope.back();
                }
                //已添加导师服务管理
                function isNewShoping() {
                    for (var i in shopping) {
                        if (shopping[i].teacherId == $scope.service.teacherId) {
                            newService(shopping[i].services);
                            AlertService.showAlert("添加成功!", function () {
                                $rootScope.back();
                            });
                            return false;
                        }
                    }
                    return true;
                }
            }
            //添加新的服务
            function newService(array) {
                var oneService = {};
                oneService.serviceProId = $routeParams.id;
                oneService.question = $scope.service.question;
                oneService.resume = $scope.service.resume;
                oneService.selectTime = $scope.service.selectTime;
                oneService.count = $cookies.getObject('teacher').serviceCount;
                oneService.serviceKind = "servicePro";
                array.push(oneService);
            }

            //新的导师信息
            function newTeacher(obj) {
                obj.teacherId = $scope.teacher.teacherId;
                obj.name = $scope.teacher.name;
                obj.simpleinfo = $scope.teacher.simpleinfo;
                obj.iconUrl = $scope.teacher.iconUrl;
            }
        }

        function closeOrder() {
            $rootScope.back();
        }

        //格式数据
        function formatInteger(service) {
            var reg = /^[1-9]+[0-9]*]*$/;
            if (isNaN(service.count) || !reg.test(service.count)) {
                service.count = 0;
            } else {
                if (Number(service.count) > $scope.service.count) {
                    service.count = $scope.service.count;
                }
            }
        }

        function showTopPre(id) {
            $(id + ' .prev').click()
        }

        function showTopNext(id) {
            $(id + ' .next').click()
        }

        function formatIntegerMobile(count) {
            var reg = /^[1-9]+[0-9]*]*$/;
            if (isNaN(count) || !reg.test(count)) {
                $scope.serviceCount = 1;
            } else {
                if (Number($scope.serviceCount) > $scope.service.count) {
                    $scope.serviceCount = $scope.service.count;
                }
            }
        }

        //喜爱服务
        function isLikeServiceCallBack(isLikeSerice) {
            isLikeSerice == 'false' ? $scope.isLikeServicePro = false : $scope.isLikeServicePro = true;
        }

        function likeServer() {
            if (isLogin()) {
                if ($scope.isLikeServicePro) {
                    ServiceService.disLikeServicePro($routeParams.id, disLikeServicePro);
                    function disLikeServicePro() {
                        $scope.isLikeServicePro = false;
                        $scope.service.likeNo --;
                    }
                } else {
                    ServiceService.likeServicePro($routeParams.id, likeCallBack);
                    function likeCallBack() {
                        $scope.isLikeServicePro = true;
                        $scope.service.likeNo ++;
                    }
                }
            }
        }

        //喜爱导师
        function isLikeTeacherCallBack(isLike) {
            isLike == 'false' ? $scope.isLikeTeacher = false : $scope.isLikeTeacher = true;
        }

        function likeOrDisTeacher() {
            if (isLogin()) {
                if ($scope.isLikeTeacher) {
                    TeacherService.disLikeTeacher($scope.teacher.teacherId, disLikeTeacher);
                    function disLikeTeacher() {
                        $scope.isLikeTeacher = false;
                        $scope.teacher.likeNo --;
                    }
                } else {
                    TeacherService.likeTeacher($scope.teacher.teacherId, likeCallBack);
                    function likeCallBack() {
                        $scope.isLikeTeacher = true;
                        $scope.teacher.likeNo ++;
                    }
                }
            }
        }

        function showCountBlock() {
            if ($scope.createOrderService.service.count <= 0) {
                AlertService.showAlert('暂无库存', undefined);
                return;
            }
            $scope.isShowCount = !$scope.isShowCount
        }
    }
})();
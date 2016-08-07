(function () {
    app.controller('PassageController', ['$scope', '$routeParams', 'PassageService', 'SessionService', 'HttpService',
        'AlertService', '$location', 'ShareService', 'MetaTags', '$rootScope', passage]);

    function passage($scope, $routeParams, PassageService, SessionService, HttpService, AlertService, $location,
                     ShareService, MetaTags, $rootScope) {
        $location.url($location.path());

        var makeQrCodeFlag = false;
        $scope.weiboUrl = 'http://image.1yingli.cn/img/new/weibo-share.png';
        $scope.weixinUrl = 'http://image.1yingli.cn/img/new/weixin-share.png';
        $scope.payUrl = HttpService.payUrl;
        $scope.urlCallback = $location.absUrl();
        $scope.showPayStyle = false;
        $scope.showWxPay = false;
        $scope.sessionService = SessionService;
        $scope.passage = {};

        $scope.nameEncode = nameEncode;
        $scope.likePassage = likePassage;
        $scope.nextAboutPassage = nextAboutPassage;
        $scope.makeQrCode = makeQrCode;
        $scope.submitForm = submitForm;
        $scope.hide = hide;
        $scope.wxPay = wxPay;
        $scope.refresh = refresh;


        if (isWeixinBrowser() && !SessionService.isLogin()) {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx526dfd5c9193f98c&redirect_uri=" + HttpService.loginRedirectUrl[3] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }
        PassageService.getPassageById($routeParams.id);
        $scope.$on('getPassageById', onGetPassageById);
        function onGetPassageById(event, data) {
            $scope.passage = data;
            $scope.shareTitle = "《" + $scope.passage.title + "》 " + $scope.passage.teacherName + "（" + $scope.passage.simpleinfo + "） " + $scope.passage.summary.substring(0, 50) + ($scope.passage.summary.length > 50 ? '……' : '   ') + "「一英里」";
            $scope.shareUrl = window.location.href;
            $scope.shareImg = $scope.passage.imageUrl;
            $scope.shareDescription = getPassageInfo($scope.passage.summary);
            MetaTags.setMeta(getMeta());
            ShareService.configShare($scope.passage.title, $scope.shareUrl, $scope.shareImg, $scope.shareDescription);
            makeQrCodeFlag = false;
            weiboShare();
            //音频播放器 实例
            //$scope.passage.content += '<audio src="http://video.1yingli.cn/video/banma.mp3"  width="100%"></audio>'
            setTimeout(function () {
                $('audio,video').mediaelementplayer({
                    success: function (mediaElement, originalNode) {
                    }
                });
            }, 1000);
        }

        PassageService.getAboutPassage($routeParams.id);
        $scope.$on('getAboutPassage', onGetAboutPassage);
        function onGetAboutPassage(event, data) {
            $scope.passages = data.data;
        }

        function getMeta() {
            var info = {};
            info.title = $scope.passage.title + ' - ' + $scope.passage.editorName + "「一英里」";
            info.keyword = $scope.passage.tag;
            info.description = $scope.passage.summary;
            return info;
        }

        function nextAboutPassage(toId) {
            if (SessionService.isLogin()) {
                PassageService.putPassageFeedback($routeParams.id, toId, $scope.passages);
            }
        }

        function weiboShare() {
            var wb_shareBtn = document.getElementById("wbshare");
            if (wb_shareBtn) {
                var wb_url = $scope.shareUrl;
                var wb_title = $scope.shareTitle + "（分享自 @一英里平台 ：你离梦想，只差「一英里」）";
                var wb_pic = $scope.shareImg;
                wb_shareBtn.setAttribute("href", "javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=3399536820',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','" + wb_pic + "','" + wb_title + "','" + wb_url + "','utf-8'));");
            }
        }

        function makeQrCode() {
            $scope.showQRCode = true;
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

        function likePassage() {
            if (!SessionService.isLogin()) {
                AlertService.showAlertWithCancel("请先登录！", showAlertCallBack);
                function showAlertCallBack() {
                    $location.path('/login');
                }

                return;
            }
            HttpService.apiGet('user', 'likePassage', {pid: $routeParams.id}, apiGetCallBack);

            function apiGetCallBack(data) {
                PassageService.getPassageById($routeParams.id);
                AlertService.showAlert("成功");
            }
        }


        function getPassageInfo(input) {
            var patt = new RegExp("<.*?>", "g");
            while ((result = patt.exec(input)) != null) {
                input = input.substring(0, patt.lastIndex - result[0].length) + input.substring(patt.lastIndex);
                patt.lastIndex = 0;
            }
            return input.substring(0, 50);
        }


        function nameEncode(input) {
            return encodeURIComponent(input);
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
                teacherName: $scope.passage.teacherName,
                teacherId: $scope.passage.teacherId,
                money: $scope.money,
                passageId: $scope.passage.passageId
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
            PassageService.getAboutPassage($routeParams.id);
        }
    }
})();
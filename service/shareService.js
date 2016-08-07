(function () {
    app.service("ShareService", ["$rootScope", "HttpService", shareService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name ShareService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {object} $rootScope [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)
     * @desc
     *  分享服务
     */
    function shareService($rootScope, HttpService) {
        var service = this;
        service.configShare = configShare;
        service.sharePresent = sharePresent;
        service.shareHome = shareHome;
        /**
         * @memberOf ShareService
         * @function configShare
         * @param {string} shareTitle API请求中的shareTitle参数
         * @param {string} shareUrl API请求中的shareUrl参数
         * @param {string} shareImg API请求中的shareImg参数
         * @param {string} shareDescription API请求中的shareDescription参数
         * @desc
         *  分享配置
         */
        function configShare(shareTitle, shareUrl, shareImg, shareDescription) {
            HttpService.getWXToken(getWXTokenCallBack);
            function getWXTokenCallBack() {
                wx.ready(function () {
                    //微信分享设置
                    wx.onMenuShareTimeline({
                        title: shareTitle,  // 分享标题
                        link: shareUrl, // 分享链接
                        imgUrl: shareImg, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            //alert("success1");
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            //alert("cancel1");
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: shareTitle, // 分享标题
                        desc: shareDescription, // 分享描述  //TODO
                        link: shareUrl, // 分享链接
                        imgUrl: shareImg, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            //alert("success2");
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            //alert("cancel2");
                        }
                    });
                });
                wx.error(function (res) {
                    //alert(res);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

                });
            }
        }


        function sharePresent() {
            configShare($rootScope.metatags.title, window.location.href, "http://image.1yingli.cn/img/logo-share.jpg",
                $rootScope.metatags.description);
        }

        function shareHome() {
            configShare("一英里 - 一对一经验交易平台", window.location.host, "http://image.1yingli.cn/img/logo-share.jpg",
                "「一英里」专注于一对一咨询，致力于打造最便捷畅通的大学生线上交流平台，打破信息不对称的壁垒，轻松连接高校名企精英与万千追梦学子。");
        }

    }
})();
(function () {
    app.service('HttpService', ['$http', '$cookies', 'AlertService', '$rootScope', httpService]);

    var errorType = {
        //<!-- system 0 -->
        "00000": "内部错误",
        "00001": "参数不完整",
        "00002": "该功能尚未上线，请耐心等待",
        "00003": "style不存在",
        "00004": "未指明必要的style或method",
        //<!-- user 1-->
        "10001": "解密失败",
        "12001": "验证码不正确",
        "12002": "验证码过期",
        "12003": "电子邮件格式不正确",
        "12004": "旧密码或新密码不能为空",
        "12005": "密码至少8位，不能全数字",
        "12006": "原密码错误",
        "12007": "电话号码格式不正确",
        "12008": "电话号码或邮箱格式有误",
        "12009": "所请求的评论种类不正确",
        "12010": "所请求的页码解析错误",
        "12011": "notiId解析错误",
        "12012": "所请求的通知不存在",
        "12013": "用户名不正确，应为邮箱或者手机号码",
        "12014": "用户名和密码不能为空",
        "12015": "用户名不存在",
        "12016": "密码不正确",
        "12017": "用户名或密码不正确",
        "12018": "你的微博代码是错误的",
        "12019": "你的微信代码是错误的",
        "12020": "文章不存在",
        "12021": "您已经赞过了",
        "14001": "您的登陆已失效",
        "15001": "已申请",
        "15002": "已成为导师",
        "15003": "用户已注册",
        "15004": "用户还未注册",
        //<!-- teacher 2-->
        "21001": "输入数据错误",
        "22001": "导师不存在",
        "22002": "导师当前无法提供服务",
        "22003": "电话号码有误",
        "22004": "电话号码格式不正确",
        "22005": "所请求的页码解析错误",
        "22006": "文章不存在",
        "22007": "文章不属于你",
        "22008": "服务不存在",
        "24001": "你尚未成为导师",
        "24002": "tid和uid不匹配",
        "24003": "服务不存在或服务不属于你",
        //<!-- manager 3-->
        "30001": "解密失败",
        "31001": "数据不正确",
        "32001": "密码不符合规范",
        "32002": "用户名不存在",
        "32003": "申请不存在",
        "32004": "申请状态不正确",
        "32005": "checkForm是不存在",
        "32006": "checkForm状态不正确",
        "32007": "checkForm认证类型不正确",
        "32008": "checkForm认证类型不正确",
        "32009": "所请求的页码解析错误",
        "32010": "用户名或密码不能为空",
        "32011": "用户名不存在",
        "32012": "密码错误",
        "32013": "background id不存在",
        "32014": "该用户不存在",
        "32015": "该导师不存在",
        "34001": "管理员不存在",
        //<!-- order 4-->
        "40001": "服务器错误",
        "41001": "输入数据错误",
        "42001": "订单不存在",
        "43001": "支付宝错误",
        "43002": "连接到Paypal失败，请再试一次",
        "43003": "链接到微信钱包失败，请再试一次",
        "44001": "这个订单不属于你",
        "44002": "订单状态异常",
        "44003": "deal字段有误",
        "44004": "订单支付导师状态不准确",
        "44005": "订单状态已经无法改变",
        "44006": "不要预约自己，你本可以对着镜子自言自语的~",
        "44007": "该服务不属于此订单",
        "44008": "服务不存在或不属于该导师",
        "44009": "该服务库存为空",
        "45001": "该优惠券不存在",
        "45002": "该优惠券已过期",
        "45003": "该优惠券已使用",
        "45004": "Paypal付款与订单不匹配",
        "45005": "支付宝已退款，状态已变化",
        //<!-- function 5-->
        //<!-- <error name="53001" value="recommendation engine error" /> -->
        "50001": "服务器错误",
        "51001": "请求页码解析出错",
        "52001": "用户名格式不正确",
        "52002": "这个电话或电子邮件没有验证码",
        "53002": "无法连接到搜索引擎",
        "53003": "搜索时出现错误",
        "53004": "向推荐引擎提交数据失败",
        "53005": "搜索引擎错误",
        "55001": "暂时无法再次获取，请稍后再试",
        //<!-- distributor 6-->
        "60001": "解密失败",
        "62001": "分销码不存在",
        "62002": "用户名或密码不能为空",
        "62003": "用户名不存在",
        "62004": "密码不正确",
        "64001": "分销ID不存在"
    };


    function _getRandomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    var httpLayer = undefined;


    function toJson(data) {
        for (var value in data) {
            var temp = data[value];
            if (typeof temp == 'object') {
                temp.toString = undefined;
                data[value] = toJson(temp);
            }
        }
        return data;
    }


    /**
     * @ngdoc service
     * @memberOf app
     * @name HttpService
     * @param {object} $http [$http](https://docs.angularjs.org/api/ng/service/$http)
     * @param {object} $cookies [$cookies](https://docs.angularjs.org/api/ngCookies/service/$cookies)
     * @param {Service} AlertService [AlertService](app.AlertService.html)
     * @param {object} $rootScope [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)
     * @desc
     *  HTTP请求代理，整个项目的HTTP请求，除第三方登陆和搜索自动补全外，其余皆从此Service中发出。
     *  与API有关的地址配置也在该Service中。
     */
    function httpService($http, $cookies, AlertService, $rootScope) {
        var serviceType = $config.serviceType;
        var service = this;
        service.apiUrl = 'http://' + serviceType + '.1yingli.cn/yiyingliService/manage';
        service.changeIconUrl = 'http://' + serviceType + '.1yingli.cn/yiyingliService/changeIcon';
        service.payUrl = {
            '1': 'http://' + serviceType + '.1yingli.cn/yiyingliService/Alipay',
            '2': 'http://' + serviceType + '.1yingli.cn/yiyingliService/Checkout',
            '3': 'http://' + serviceType + '.1yingli.cn/yiyingliService/Reward'
        };
        service.uploadPassageImageUrl = 'http://' + serviceType + '.1yingli.cn/yiyingliService/uppassageimage';
        service.getATUrl = 'http://' + serviceType + '.1yingli.cn/GetACCESSTOKEN/getAT';
        service.loginRedirectUrl = [
            'http://' + window.location.host + '/redirect.html?kind=1',
            'http://' + window.location.host + '/redirect.html?kind=2',
            'http://' + window.location.host + '/redirect.html?kind=3',
            'http://' + window.location.host + '/redirect.html?kind=5'
        ];

        service.apiGet = apiGet;
        service.openLayer = openLayer;
        service.closeLayer = closeLayer;
        service.getWXToken = getWXToken;
        service.WXTokednUsed = false;

        function changeParamsToString(params) {
            var data = {};
            for (var value in params) {
                if (typeof params[value] != 'object') {
                    data[value] = params[value] + '';
                } else {
                    data[value] = params[value];
                }
            }
            return data;
        }

        /**
         * @memberOf HttpService
         * @function apiGet
         * @param {string} style API请求中的style参数
         * @param {string} method API请求中的method参数
         * @param {object} data API请求中的其他参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  发起API请求并将请求结果传入回调函数中
         */
        function apiGet(style, method, data, callback) {
            data.style = style;
            data.method = method;
            var user = $cookies.getObject('user');
            if (user && user.uid) {
                data.uid = user.uid;
            }
            if (data.teacherId == undefined && user && user.teacherId) {
                data.teacherId = user.teacherId;
            }
            var errCallBack = arguments[4] ? arguments[4] : undefined;


            data = changeParamsToString(data);
            openLayer();
            $http({
                method: 'POST',
                url: service.apiUrl,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function successCallback(response) {
                closeLayer();
                if (response.data.state == 'success' && response.data.errCode == undefined) {
                    callback(response.data);
                } else {
                    AlertService.showAlert(errorType[response.data.errCode], undefined);
                    if (response.data.errCode == '14001') {
                        $cookies.remove('user');
                        $rootScope.$broadcast('clearUser');
                    }
                    if (errCallBack) errCallBack(response.data);
                }
            }, function errorCallback(response) {
                closeLayer()
            });
        }

        /**
         * @memberOf HttpService
         * @function getWXToken
         * @param {function} callBack 获取到微信ticket并完成注册后的回调函数
         * @desc
         *  获取微信ticket，并完成wx.config 的注册。
         *  完成注册后，调用回调函数
         *  若已经注册，则直接调用回调函数
         */

        function getWXToken(callBack) {
            if (service.WXTokednUsed) {
                callBack();
                return;
            }
            $.ajax({
                cache: true,
                type: "GET",
                url: service.getATUrl,
                data: "",
                async: true,
                error: function (request) {
                    //alert("Connection error");
                },
                success: function (data, textStatu) {
                    var json = eval("(" + data + ")");
                    // var json = $.parseJSON(data);
                    var ticket1 = json.ticket;
                    var timestamp1 = parseInt((new Date()).valueOf() / 1000);
                    var noncestr1 = _getRandomString(16);

                    var str = "jsapi_ticket=" + ticket1 + "&noncestr=" + noncestr1 + "&timestamp=" + timestamp1 + "&url=" + location.href.split('#')[0];
                    var signature1 = $.sha1(str);
                    wx.config({
                        debug: false,
                        appId: 'wxd042cdef58e2e669',
                        timestamp: timestamp1,
                        nonceStr: noncestr1,
                        signature: signature1,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    });
                    service.WXTokednUsed = true;
                    callBack();
                }
            });
        }

        /**
         * @memberOf HttpService
         * @function openLayer
         * @desc
         *  打开loading层
         */
        function openLayer() {
            if (isSpider()) {
                return;
            }
            httpLayer = layer.open({
                type: 2,
                content: '加载中'
            });
        }

        /**
         * @memberOf HttpService
         * @function closeLayer
         * @desc
         *  关闭loading层
         */
        function closeLayer() {
            if (isSpider()) {
                return;
            }
            setTimeout(function () {
                layer.close(httpLayer);
            }, 500);
        }
    }
})();
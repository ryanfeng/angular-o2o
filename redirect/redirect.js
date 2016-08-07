(function () {
    $('#shclDefault').shCircleLoader();
    $('#shclCcw').shCircleLoader({clockwise: false});
    $('#shclColor').shCircleLoader({color: "#f00"});
    $('#shclDuration').shCircleLoader({duration: 2});
    $('#shclDots').shCircleLoader({dots: 24, dotsRadius: 10});
    $('#shclKeyframes').shCircleLoader({keyframes: "0%{background:#fff}40%{background:transparent}60%{background:transparent}100%{background:black}"});
    $('#shclNs').shCircleLoader({namespace: "myns", color: "transparent", dotsRadius: 15});
    $('#shclFireballs').shCircleLoader({
        color: "red",
        dots: 24,
        dotsRadius: 13,
        keyframes: "0%   {background: red;    {prefix}transform: scale(1)}\
         20%  {background: orange; {prefix}transform: scale(.4)}\
         40%  {background: red;    {prefix}transform: scale(0)}\
         50%  {background: red;    {prefix}transform: scale(1)}\
         70%  {background: orange; {prefix}transform: scale(.4)}\
         90%  {background: red;    {prefix}transform: scale(0)}\
         100% {background: red;    {prefix}transform: scale(1)}"
    });

    $('#shclProgress').shCircleLoader();
    var i = 0;
    setInterval(function () {
        $('#shclProgress').shCircleLoader('progress', i + '%');
        if (++i > 100) i = 0;
    }, 100);
})();

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

var config = {
    paramString: {
        '1': {
            method: "loginByWeibo",
            params: "weibo_code"
        },
        '2': {
            method: "loginByWeixin",
            params: "weixin_code"
        },
        '3': {
            method: "loginByWeixinPlatform",
            params: "weixin_code"
        },
        '4': {
            method: "loginByWeixinPlatform",
            params: "weixin_code"
        },
        '5': {
            method: "loginByWeixinPlatform",
            params: "weixin_code"
        }
    },
    url: "http://service.1yingli.cn/yiyingliService/manage"
};

var app = angular.module("redirect", ["ngCookies", "ngStorage"]);

(function () {
    app.config(['$cookiesProvider', function ($cookiesProvider) {
        $cookiesProvider.defaults.path = '/';
    }]);
    app.run(['$rootScope', '$localStorage', appRun]);
    app.controller('RedirectController', ['$cookies', '$http', '$rootScope', '$location', redirect]);


    function appRun($rootScope, $localStorage) {
        $rootScope.$storage = $localStorage.$default({history: []});
    }


    function redirect($cookies, $http, $rootScope, $location) {
        function error() {
            window.location.href = '/login';
        }

        function success() {
            //$rootScope.$storage.history.pop();
            var state = $rootScope.$storage.history.pop();
            //if (state.url == '/login') {
            //    state = $rootScope.$storage.history.pop();
            //}
            if (!$rootScope.user.teacherId) {
                while ($rootScope.$storage.history.length > 0 && state.isTeacher == 1) {
                    state = $rootScope.$storage.history.pop();
                }
                if ($rootScope.$storage.history.length == 0 && state.isTeacher == 1) {
                    state.url = '/';
                }
            }
            while ($rootScope.$storage.history.length > 0 && state.isSession == 1) {
                state = $rootScope.$storage.history.pop();
            }
            if ($rootScope.$storage.history.length == 0 && state.isSession == 1) {
                state.url = '/';
            }
            //if (kind == '5' || kind == '3') {
            //    $rootScope.$storage.lwx = 1;
            //    history.go(-3);
            //}
            history.go(-3);
            window.location.replace(state.url);
        }

        //$location.replace();
        if ($cookies.getObject('user') != undefined) {
            $rootScope.user = $cookies.getObject('user');
            success();
        }
        var kind = getUrlParam('kind');
        var code = getUrlParam('code');
        if (!kind || !(kind.trim()) || !code || !(code.trim())) {
            error();
        }

        var data = {
            style: 'user',
            method: config.paramString[kind].method
        };
        data[config.paramString[kind].params] = code;

        $http({
            method: 'POST',
            url: config.url,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function successCallback(response) {
            if (response.data.state == 'success' && response.data.errCode == undefined) {
                console.log(response.data);
                $cookies.putObject('user', response.data);
                $rootScope.user = response.data;
                success();
            } else {
                console.log(response.data);
                error();
            }
        }, function errorCallback(response) {
            error();
        });

        //setTimeout(error, 15000);
    }

})();

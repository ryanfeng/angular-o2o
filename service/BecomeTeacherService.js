(function () {
    var yearSt = [];
    var yearEd = [];
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var resources = {
        '0': {
            "country": '中国大陆',
            "flag": 'http://image.1yingli.cn/country/china.png',
            "code": '+86'
        },
        '1': {
            "country": '加拿大',
            "flag": 'http://image.1yingli.cn/country/canada.png',
            "code": '+1'
        },
        '2': {
            "country": '法国',
            "flag": 'http://image.1yingli.cn/country/france.png',
            "code": '+33'
        },
        '3': {
            "country": '德国',
            "flag": 'http://image.1yingli.cn/country/germany.png',
            "code": '+49'
        },
        '4': {
            "country": '香港',
            "flag": 'http://image.1yingli.cn/country/hk.png',
            "code": '+852'
        },
        '5': {
            "country": '意大利',
            "flag": 'http://image.1yingli.cn/country/italy.png',
            "code": '+39'
        },
        '6': {
            "country": '日本',
            "flag": 'http://image.1yingli.cn/country/japan.png',
            "code": '+81'
        },
        '7': {
            "country": '韩国',
            "flag": 'http://image.1yingli.cn/country/korea.png',
            "code": '+82'
        },
        '8': {
            "country": '英国',
            "flag": 'http://image.1yingli.cn/country/england.png',
            "code": '+44'
        },
        '9': {
            "country": '美国',
            "flag": 'http://image.1yingli.cn/country/america.png',
            "code": '+1'
        },
        '10': {
            "country": '西班牙',
            "flag": 'http://image.1yingli.cn/country/spain.png',
            "code": '+34'
        },
        '11': {
            "country": '台湾',
            "flag": 'http://image.1yingli.cn/country/taiwan.png',
            "code": '+886'
        },
        '12': {
            "country": '台湾',
            "flag": 'http://image.1yingli.cn/country/aomen.png',
            "code": '+853'
        },
        '13': {
            "country": '澳洲',
            "flag": 'http://image.1yingli.cn/country/aozhou.png',
            "code": '+61'
        }
    };
    var myDate = new Date();
    for (var i = myDate.getFullYear(); i > 1989; i--) {
        yearSt.push(i);
    }
    yearEd.push('至今');
    for (i = myDate.getFullYear(); i > 1989; i--) {
        yearEd.push(i);
    }

    app.service('BecomeTeacherService', ['HttpService', 'AlertService', '$location',
        '$rootScope', 'SessionService', becomeTeacherService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name BecomeTeacherService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {Service} AlertService [AlertService](app.AlertService.html)
     * @param {Object} $location [$location](https://docs.angularjs.org/api/ng/service/$location)
     * @param {Object} $rootScope [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)
     * @desc
     * 成为导师业务服务类。
     * @attr {Array} yearSt 成为导师开始结束的静态数据（根据最新年份，获取最近10年的年份）
     * @attr {Array} yearEd 成为导师年份结束的静态数据（根据最新年份，获取最近10年的年份并且添加‘至今’）
     * @attr {Array} months 月份的静态数据
     * @attr {Object} countrys 国旗（图片）的静态资源
     */
    function becomeTeacherService(HttpService, AlertService, $location, $rootScope, SessionService) {
        this.yearSt = yearSt;
        this.yearEd = yearEd;
        this.months = months;
        this.countrys = resources;
        this.teacher = {};
        this.becomeTeacher = becomeTeacher;


        var images = new Array(resources.length);
        for (i = 0; i < resources.length; i++) {
            images[i] = new Image();
            images[i].src = resources[i].flag;
        }

        /**
         * @memberOf BecomeTeacherService
         * @function becomeTeacher
         * @param {object} teacher 成为导师的导师个人申请信息。
         * @desc
         *  成为导师的提交的。
         */
        function becomeTeacher(teacher) {
            var data = new Object(teacher);
            var obj = {};
            obj.title = "";
            obj.content = "";
            data.service = obj;
            var toSend = {};
            toSend.application = data;
            HttpService.apiGet('function', 'createApplication', toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                console.log(data);
                AlertService.showAlert("申请提交成功，工作人员会尽快与您取得联系，请耐心等待。", callback);
                function callback() {
                    $location.path('/');
                }
            }

            function errCallBack() {
                $rootScope.back();
            }
        }

    }
})();
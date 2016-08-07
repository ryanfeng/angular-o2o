(function () {
    app.service('ThemeService', ['HttpService', themeService]);
    var resources = {
        '1': {
            "name": '约谈咨询',
            "text1": "给自己一个机会",
            "text2": "站在巨人的肩膀上眺望远方",
            "url": 'http://image.1yingli.cn/img/new/theme-bg02.jpg',
            "textUrl": '',
            "id": 1,
            "tid": 1,
            "smallUrl": 'http://image.1yingli.cn/img/new/qz_d.png',
            "smallUrl1": 'http://image.1yingli.cn/img/new/qz_w.png',
            "headerImg": 'http://image.1yingli.cn/img/new/service/zx2.png',
            "headerImg1": 'http://image.1yingli.cn/img/new/service/zx.png'
        },
        '2': {
            "name": '特色体验',
            "text1": "亲身体验",
            "text2": "远比道听途说可感迷人",
            "url": 'http://image.1yingli.cn/img/new/theme-bg04.jpg',
            "textUrl": '',
            "id": 2,
            "tid": 2,
            "smallUrl": 'http://image.1yingli.cn/img/new/xy_d.png',
            "smallUrl1": 'http://image.1yingli.cn/img/new/xy_w.png',
            "headerImg": 'http://image.1yingli.cn/img/new/service/ty2.png',
            "headerImg1": 'http://image.1yingli.cn/img/new/service/ty.png'
        },
        '3': {
            "name": '文书批改',
            "text1": "专业的圈画点评",
            "text2": "胜过一人读十年书",
            "url": 'http://image.1yingli.cn/img/new/theme-bg05.jpg',
            "textUrl": '',
            "id": 3,
            "tid": 3,
            "smallUrl": 'http://image.1yingli.cn/img/new/lq_d.png',
            "smallUrl1": 'http://image.1yingli.cn/img/new/lq_w.png',
            "headerImg": 'http://image.1yingli.cn/img/new/service/pg2.png',
            "headerImg1": 'http://image.1yingli.cn/img/new/service/pg.png'
        },
        '4': {
            "name": '技艺教授',
            "text1": "分享你的一技之长",
            "text2": "收获满口袋的成就",
            "url": 'http://image.1yingli.cn/img/new/theme-bg03.jpg',
            "textUrl": '',
            "id":4,
            "tid": 4,
            "smallUrl": 'http://image.1yingli.cn/img/new/cy_d.png',
            "smallUrl1": 'http://image.1yingli.cn/img/new/cy_w.png',
            "headerImg": 'http://image.1yingli.cn/img/new/service/jy2.png',
            "headerImg1": 'http://image.1yingli.cn/img/new/service/jy.png'
        },
        '5': {
            "name": '定制服务',
            "text1": "汲取更高养分",
            "text2": "成就更好的自己",
            "url": 'http://image.1yingli.cn/img/new/theme-bg01.jpg',
            "textUrl": '',
            "id": 5,
            "tid": 5,
            "smallUrl": 'http://image.1yingli.cn/img/new/lx_d.png',
            "smallUrl1": 'http://image.1yingli.cn/img/new/lx_w.png',
            "headerImg": 'http://image.1yingli.cn/img/new/service/dz2.png',
            "headerImg1": 'http://image.1yingli.cn/img/new/service/dz.png'
        }
    };

    /**
     * @ngdoc service
     * @memberOf app
     * @name ThemeService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @attr {Object} themeTeachers 主题对应导师列表，themeTeachers[id]为id对应的导师列表（未获取时为空，调用getTheme获取后存于该对象内）
     * @attr {Object} serviceConfig 主题配置，包含主题编号，主题名称，首页主题模块文案，主题页头图，主题页头图文字，搜索页对应图标
     * @desc
     *  主题服务，用于获取并储存主题对应的导师列表
     */
    function themeService(HttpService) {
        var service = this;
        service.serviceConfig = resources;
        service.getTheme = getTheme;
        service.themeTeachers = {};

        /**
         * @memberOf ThemeService
         * @function getTheme
         * @param {string} id 主题的编号
         * @param {function} callback 请求完成后的回调函数
         * @desc
         *  按编号获取主题对应的导师列表，并将导师列表存在service内，请求完成后调用传入的回调函数。
         */
        function getTheme(id, callback) {
            if (service.themeTeachers[id] != undefined) {
                callback();
                return;
            }
            HttpService.apiGet("function", "getServiceProListByKind", {kind: id}, getThemeCallBack);
            function getThemeCallBack(data) {
                service.themeTeachers[id] = JsonParse(data.data);
                callback();
            }
        }
    }
})();


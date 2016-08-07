(function () {
    app.service('SearchService', ['HttpService', '$location', '$rootScope', searchService]);

    var tipWords = [
        '留学领航',
        '求职就业',
        '创业助力',
        '校园生活',
        '猎奇分享'
    ];

    var serviceTipsWord = [
        '约谈咨询',
        '特色体验',
        '文书批改',
        '技艺教授',
        '定制服务'
    ]

    var tipTeacherImages = [
        ['http://image.1yingli.cn/img/new/search/all_grey.png', 'http://image.1yingli.cn/img/new/search/all_blue.png'],
        ['http://image.1yingli.cn/img/new/theme/theme-lx1.png', 'http://image.1yingli.cn/img/new/theme/theme-lx2.png'],
        ['http://image.1yingli.cn/img/new/theme/theme-qz1.png', 'http://image.1yingli.cn/img/new/theme/theme-qz2.png'],
        ['http://image.1yingli.cn/img/new/theme/theme-cy1.png', 'http://image.1yingli.cn/img/new/theme/theme-cy2.png'],
        ['http://image.1yingli.cn/img/new/theme/theme-xy1.png', 'http://image.1yingli.cn/img/new/theme/theme-xy2.png'],
        ['http://image.1yingli.cn/img/new/theme/theme-lq1.png', 'http://image.1yingli.cn/img/new/theme/theme-lq2.png']
    ];

    var tipServiceImages = [
        ['http://image.1yingli.cn/img/new/search/all_grey.png', 'http://image.1yingli.cn/img/new/search/all_blue.png'],
        ['http://image.1yingli.cn/img/new/service/zx.png', 'http://image.1yingli.cn/img/new/service/zx1.png'],
        ['http://image.1yingli.cn/img/new/service/ty.png', 'http://image.1yingli.cn/img/new/service/ty1.png'],
        ['http://image.1yingli.cn/img/new/service/pg.png', 'http://image.1yingli.cn/img/new/service/pg1.png'],
        ['http://image.1yingli.cn/img/new/service/jy.png', 'http://image.1yingli.cn/img/new/service/jy1.png'],
        ['http://image.1yingli.cn/img/new/service/dz.png', 'http://image.1yingli.cn/img/new/service/dz1.png']
    ];

    var filterWords = [
        'finishno-',
        'likeno-',
        'likeno+',
        'price+',
        'price-'
    ];

    var resultPerPage = 12;

    var selectWords = {
        0: {
            number: 4,
            data: [
                {
                    name: '国家',
                    data: [
                        '加拿大',
                        '新加坡',
                        '美国',
                        '英国',
                        '法国',
                        '中国'
                    ]
                },
                {
                    name: '学位',
                    data: [
                        '本科',
                        '研究生',
                        '博士'
                    ]
                },
                {
                    name: '相关专业',
                    data: [
                        '土木工程',
                        '机械工程',
                        '工程管理',
                        '食品科学',
                        '电子工程',
                        '金融工程',
                        '金融数学',
                        '材料工程',
                        '计算机',
                        '建筑学',
                        '社会学',
                        '心理学',
                        '物理',
                        '金融',
                        '生物',
                        '化工',
                        '会计',
                        '经济',
                        '市场'
                    ]
                },
                {
                    name: '地点',
                    data: [
                        '匹兹堡',
                        '新泽西',
                        '波士顿',
                        '厄巴纳',
                        '圣地亚哥',
                        '华盛顿',
                        '墨尔本',
                        '费城',
                        '纽约',
                        '多伦多',
                        '伊萨卡',
                        '芝加哥',
                        '杭州',
                        '上海',
                        '西雅图',
                        '斯坦福',
                        '香港',
                        '伦敦',
                        '密歇根',
                        '巴黎',
                        '旧金山',
                        '东京'
                    ]
                }
            ]
        },
        1: {
            number: 4,
            data: [
                {
                    name: '国家',
                    data: [
                        '加拿大',
                        '新加坡',
                        '美国',
                        '英国',
                        '法国',
                        '中国'
                    ]
                },
                {
                    name: '学位',
                    data: [
                        '本科',
                        '研究生',
                        '博士'
                    ]
                },
                {
                    name: '相关专业',
                    data: [
                        '土木工程',
                        '机械工程',
                        '工程管理',
                        '食品科学',
                        '电子工程',
                        '金融工程',
                        '金融数学',
                        '材料工程',
                        '计算机',
                        '建筑学',
                        '社会学',
                        '心理学',
                        '物理',
                        '金融',
                        '生物',
                        '化工',
                        '会计',
                        '经济',
                        '市场'
                    ]
                },
                {
                    name: '地点',
                    data: [
                        '匹兹堡',
                        '新泽西',
                        '波士顿',
                        '厄巴纳',
                        '圣地亚哥',
                        '华盛顿',
                        '墨尔本',
                        '费城',
                        '纽约',
                        '多伦多',
                        '伊萨卡',
                        '芝加哥',
                        '杭州',
                        '上海',
                        '西雅图',
                        '斯坦福',
                        '香港',
                        '伦敦',
                        '密歇根',
                        '巴黎',
                        '旧金山',
                        '东京'
                    ]
                }
            ]
        },
        2: {
            number: 4,
            data: [
                {
                    name: '国家',
                    data: [
                        '加拿大',
                        '新加坡',
                        '美国',
                        '英国',
                        '法国',
                        '中国'
                    ]
                },
                {
                    name: '学位',
                    data: [
                        '本科',
                        '研究生',
                        '博士'
                    ]
                },
                {
                    name: '相关专业',
                    data: [
                        '土木工程',
                        '机械工程',
                        '工程管理',
                        '食品科学',
                        '电子工程',
                        '金融工程',
                        '金融数学',
                        '材料工程',
                        '计算机',
                        '建筑学',
                        '社会学',
                        '心理学',
                        '物理',
                        '金融',
                        '生物',
                        '化工',
                        '会计',
                        '经济',
                        '市场'
                    ]
                },
                {
                    name: '地点',
                    data: [
                        '匹兹堡',
                        '新泽西',
                        '波士顿',
                        '厄巴纳',
                        '圣地亚哥',
                        '华盛顿',
                        '墨尔本',
                        '费城',
                        '纽约',
                        '多伦多',
                        '伊萨卡',
                        '芝加哥',
                        '杭州',
                        '上海',
                        '西雅图',
                        '斯坦福',
                        '香港',
                        '伦敦',
                        '密歇根',
                        '巴黎',
                        '旧金山',
                        '东京'
                    ]
                }
            ]
        },
        3: {
            number: 4,
            data: [
                {
                    name: '国家',
                    data: [
                        '加拿大',
                        '新加坡',
                        '美国',
                        '英国',
                        '法国',
                        '中国'
                    ]
                },
                {
                    name: '学位',
                    data: [
                        '本科',
                        '研究生',
                        '博士'
                    ]
                },
                {
                    name: '相关专业',
                    data: [
                        '土木工程',
                        '机械工程',
                        '工程管理',
                        '食品科学',
                        '电子工程',
                        '金融工程',
                        '金融数学',
                        '材料工程',
                        '计算机',
                        '建筑学',
                        '社会学',
                        '心理学',
                        '物理',
                        '金融',
                        '生物',
                        '化工',
                        '会计',
                        '经济',
                        '市场'
                    ]
                },
                {
                    name: '地点',
                    data: [
                        '匹兹堡',
                        '新泽西',
                        '波士顿',
                        '厄巴纳',
                        '圣地亚哥',
                        '华盛顿',
                        '墨尔本',
                        '费城',
                        '纽约',
                        '多伦多',
                        '伊萨卡',
                        '芝加哥',
                        '杭州',
                        '上海',
                        '西雅图',
                        '斯坦福',
                        '香港',
                        '伦敦',
                        '密歇根',
                        '巴黎',
                        '旧金山',
                        '东京'
                    ]
                }
            ]
        },
        4: {
            number: 4,
            data: [
                {
                    name: '国家',
                    data: [
                        '加拿大',
                        '新加坡',
                        '美国',
                        '英国',
                        '法国',
                        '中国'
                    ]
                },
                {
                    name: '学位',
                    data: [
                        '本科',
                        '研究生',
                        '博士'
                    ]
                },
                {
                    name: '相关专业',
                    data: [
                        '土木工程',
                        '机械工程',
                        '工程管理',
                        '食品科学',
                        '电子工程',
                        '金融工程',
                        '金融数学',
                        '材料工程',
                        '计算机',
                        '建筑学',
                        '社会学',
                        '心理学',
                        '物理',
                        '金融',
                        '生物',
                        '化工',
                        '会计',
                        '经济',
                        '市场'
                    ]
                },
                {
                    name: '兴趣',
                    data: [
                        '骑马',
                        '赛车',
                        '旅游',
                        '摄影',
                        '健身'
                    ]
                }
            ]
        },
        5: {
            number: 4,
            data: [
                {
                    name: '国家',
                    data: [
                        '加拿大',
                        '新加坡',
                        '美国',
                        '英国',
                        '法国',
                        '中国'
                    ]
                },
                {
                    name: '学位',
                    data: [
                        '本科',
                        '研究生',
                        '博士'
                    ]
                },
                {
                    name: '相关专业',
                    data: [
                        '土木工程',
                        '机械工程',
                        '工程管理',
                        '食品科学',
                        '电子工程',
                        '金融工程',
                        '金融数学',
                        '材料工程',
                        '计算机',
                        '建筑学',
                        '社会学',
                        '心理学',
                        '物理',
                        '金融',
                        '生物',
                        '化工',
                        '会计',
                        '经济',
                        '市场'
                    ]
                },
                {
                    name: '兴趣',
                    data: [
                        '匹兹堡',
                        '新泽西',
                        '波士顿',
                        '厄巴纳',
                        '圣地亚哥',
                        '华盛顿',
                        '墨尔本',
                        '费城',
                        '纽约',
                        '多伦多',
                        '伊萨卡',
                        '芝加哥',
                        '杭州',
                        '上海',
                        '西雅图',
                        '斯坦福',
                        '香港',
                        '伦敦',
                        '密歇根',
                        '巴黎',
                        '旧金山',
                        '东京'
                    ]
                }
            ]
        }
    };

    /**
     * @ngdoc service
     * @memberOf app
     * @name SearchService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {object} $location [$location]
     * @param {object} $rootScope [$rootScope]
     * @desc
     *  搜索服务。
     */
    function searchService(HttpService, $location, $rootScope) {
        var service = this;

        service.searchType = 0;
        service.search = search;
        service.result = [];
        service.pages = {};
        service.selectWords = selectWords;
        service.tipWords = tipWords;
        service.selectString = [];
        service.tipImages = tipTeacherImages;
        service.changeParams = changeParams;
        service.isList = true;
        /**
         * @memberOf SearchService
         * @function search
         * @param {string} word API请求中的word参数
         * @param {string} tips API请求中的tips参数
         * @param {string} filter API请求中的filter参数
         * @param {string} page API请求中的page参数
         * @param {string} selects API请求中的selects参数
         * @desc
         *   搜索功能
         *   word: string 关键词
         *   tips: -1~4 -1为所有，0~4分别对应五个板块
         *   filter: 0~4 分别对应五种排序方式
         *   page: int 页码
         */
        function search(word, tips, filter, page, selects, searchType, showType) {
            setParams(word, tips, filter, page, selects, searchType, showType);
            if (service.params.searchType == 0) {
                service.tipWords = serviceTipsWord;
                service.tipImages = tipServiceImages;
            } else {
                service.tipWords = tipWords;
                service.tipImages = tipTeacherImages;
            }
            var params = {};
            var words = [];

            //word字段
            if (service.params.word.trim().length > 0) {
                words.push(word);
            }
            for (var i = 0; i < service.params.select.length; i++) {
                if (i >= selectWords[service.params.tips].number) break;
                if (service.params.select[i] > 0) {
                    var index = parseInt(service.params.select[i]) - 1;
                    var array = [];
                    if (selectWords[service.params.tips].data[i].data.length > index) {
                        array = selectWords[service.params.tips].data[i];
                        words.push(array.data[index]);
                    }
                }
            }
            params.word = words.join(',');

            //tips字段
            if (service.params.searchType == 0) {
                params.tips = service.params.tips == 0 ? '' : service.params.tips;
            } else {
                if (service.params.tips == 0) {
                    params.tips = service.tipWords.join(',');
                } else {
                    params.tips = service.tipWords[service.params.tips - 1];
                }
            }

            //filter字段
            params.sort = filterWords[service.params.filter];

            //page字段
            params.page = service.params.page + "";

            if (service.params.searchType == 1) {
                method = "search";
            } else {
                method = "searchServicePro";
            }
            //isDS字段
            //params.searchType = service.params.searchType;

            HttpService.apiGet('function', method, params, apiGetCallBack);
            function apiGetCallBack(data) {
                service.result = JsonParse(data.result);
                service.pages.data = service.result;
                service.pages.totalPage = Math.floor((parseInt(data.viewtotal) - 1) / resultPerPage) + 1;
                if (data.viewtotal == 0) {
                    service.pages.totalPage = 0;
                }
                service.pages.totalPageArray = new Array(service.pages.totalPage);
                $rootScope.$broadcast('getSearchResult');
            }
        }

        /**
         * @memberOf SearchService
         * @function setParams
         * @param {string} word API请求中的word参数
         * @param {string} tips API请求中的tips参数
         * @param {string} filter API请求中的filter参数
         * @param {string} page API请求中的page参数
         * @param {string} selects API请求中的selects参数
         * @param {string} serachType 搜索的type
         * @desc
         *   word: string 关键词
         *   tips: -1~4 -1为所有，0~4分别对应五个板块
         *   filter: 0~4 分别对应五种排序方式
         *   page: int 页码
         */
        function setParams(word, tips, filter, page, selects, searchType, showType) {
            var params = {};

            params.word = word != undefined ? word : "";

            params.tips = tips != undefined ? tips : 0;
            if (params.tips > 5) {
                params.tips = 0;
            }

            params.filter = filter != undefined ? filter : 0;
            if (params.filter > 4) {
                params.filter = 0;
            }

            params.page = page != undefined ? page : 1;

            if (selects != undefined && typeof (JsonParse(selects)) == 'object' && JsonParse(selects).length > 0) {
                params.select = JsonParse(selects);
            } else {
                params.select = [];
            }
            while (params.select.length < selectWords[params.tips].number) {
                params.select.push('0');
            }
            for (var i = 0; i < params.select.length; i++) {
                params.select[i] = String(params.select[i]);
            }
            params.searchType = searchType == '1' ? 1 : 0;
            params.showType = showType == '0' ? 0 : 1;
            service.params = params;
        }

        /**
         * @memberOf SearchService
         * @function changeParams
         * @desc
         *  改变参数
         */
        function changeParams() {
            var params = {};
            params.word = service.params.word;
            params.tips = service.params.tips;
            params.filter = service.params.filter;
            params.page = service.params.page;
            params.searchType = service.params.searchType;
            params.showType = service.params.showType;
            params.select = JSON.stringify(service.params.select);
            $location.path('search').search(params);
        }
    }
})();
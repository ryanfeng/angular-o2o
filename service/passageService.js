(function () {
    var passageStatus = {
        '0': {
            status: '0',
            text: '正在审核的文章'
        },
        '1': {
            status: '1',
            text: '审核未通过的文章'
        },
        '2': {
            status: '2',
            text: '审核通过的文章'
        }
    };
    var passagePerPage = 10;

    app.service('PassageService', ['AlertService', '$location', 'HttpService', '$rootScope', passageService]);
    /**
      * @ngdoc service
      * @memberOf app
      * @name PassageService
      * @param {Service} AlertService [AlertService](app.AlertService.html)
      * @param {Object} $location [$location](https://docs.angularjs.org/api/ng/service/$location)
      * @param {Service} HttpService [HttpService](app.HttpService.html)
      * @param {Object} $rootScope [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)
      * @desc
      * 导师文章的业务服务类
      * @attr {Object} passageStatus 文章类型（正在审核、未通过审核、通过审核）。
      * @attr {number} passagePerPage 一个文章列表显示的文章数。
      */
    function passageService(AlertService, $location, HttpService, $rootScope) {
        var service = this;
        service.passage = '';
        service.coverUrl = '';
        service.title = '';
        service.summary = '';
        service.tags = [];
        service.previewPassage = {};
        service.previewStyle = 1;
        service.passageStatus = passageStatus;
        service.getPassages = getPassages;
        service.createToPreview = createToPreview;
        service.createPassage = createPassage;
        service.listToPreview = listToPreview;
        service.getPassageById = getPassageById;
        service.getAboutPassage = getAboutPassage;
        service.putPassageFeedback = putPassageFeedback;

        /**
         * @memberOf PassageService
         * @function putPassageFeedback
         * @param {string} nid 当前文章的id。
         * @param {string} tid 跳转的文章的id。
         * @param {Object} recommend_list 上一次相关文章信息列表
         * @desc
         *  用户点击相关文章，统计浏览数据。
         */
        function putPassageFeedback(nid, tid, aboutlist){
            HttpService.apiGet('function', 'recordRecommandPassage', {now_pid: nid, to_pid: tid, recommend_list: aboutlist}, apiGetCallBack)
            function apiGetCallBack(data) {
            }
        }

        /**
         * @memberOf PassageService
         * @function checks
         * @desc
         *  文章表单数据验证。
         * @return {bool} true:验证通过
         */
        function check() {
            if (service.title.trim() == '') {
                AlertService.showAlert("请输入标题", undefined);
                return false;
            }
            if (service.coverUrl.trim() == '') {
                AlertService.showAlert("请上传封面图片", undefined);
                return false
            }
            if (service.passage.trim() == '') {
                AlertService.showAlert("请编辑文章正文", undefined);
                return false;
            }
            return true;
        }

         /**
          * @memberOf PassageService
          * @function getTag
          * @desc
          *  内部函数，数组数据转化为String,添加‘,’分割。
          *  文章标签参数，把PassageService.tags数组转化为字符串。
          * @return String
          */
        function getTag() {
            var st = [];
            service.tags.forEach(function (value) {
                st.push(value.text)
            });
            return st.join(',');
        }

        /**
         * @memberOf PassageService
         * @function createToPreview
         * @desc
         *  预览导师文章。
         *  获取的数据放在PassageService的previewStyle，previewPassage数据中。
         *  页面会跳转到preview页面。
         */
        function createToPreview() {
            if (check()) {
                service.previewStyle = 1;
                service.previewPassage = {
                    createTime: new Date(),
                    imageUrl: service.coverUrl,
                    likeno: "0",
                    lookno: "0",
                    content: service.passage,
                    tag: getTag(),
                    title: service.title
                };
                $location.path('/preview');
            }
        }

        /**
        * @memberOf PassageService
        * @function createPassage
        * @param {String} title 文章标题
        * @param {String} tag 文章标签
        * @param {String} passage 文章内容
        * @param {String} coverUrl 封面图片
        * @param {String} summary 文章概要
        * @desc
        *  创建导师文章，参数处理是通过service传进来的。
        */
        function createPassage() {
            if (check()) {
                HttpService.apiGet('teacher', 'createPassage', {
                    title: service.title,
                    tag: getTag(),
                    content: service.passage,
                    imageUrl: service.coverUrl,
                    summary: service.summary
                }, apiGetCallBack);
            }

            function apiGetCallBack() {
                AlertService.showAlert("发布成功，等待审核", alertCallBack);
            }

            function alertCallBack(data) {
                $location.path("/passageList/0");
            }
        }

        /**
         * @memberOf PassageService
         * @function getPassages
         * @param {Number} state 文章类型（通过（2）、未通过（1）、正在审核（0））
         * @param {Number} page 列表页码
         * @desc
         *  获取导师文章列表。
         *  获取的信息放在$broadcast的getPassageList方法的参数中。
         */
        function getPassages(state, page) {
            HttpService.apiGet('teacher', 'getPassageList', {
                page: page + '',
                state: state + ''
            }, apiGetCallBack);

            function apiGetCallBack(data) {
                var params = data;
                params.data = JsonParse(data.data);
                params.totalPage = parseInt((parseInt(data.count) - 1 ) / passagePerPage) + 1;
                if(data.count == 0) {
                    params.totalPage = 0;
                }
                params.totalPageArray = new Array(params.totalPage);
                $rootScope.$broadcast('getPassageList', params);
            }
        }

        /**
         * @memberOf PassageService
         * @function listToPreview
         * @param {Number} passageId 文章ID
         * @desc
         *  导师获取导师文章详情
         *  获取的信息放在PassageService的previewPassage，previewStyle中。
         *  并且页面跳转到preview中显示。
         */
        function listToPreview(passageId) {
            HttpService.apiGet('teacher', 'getPassage', {passageId: passageId}, apiGetCallBack);
            function apiGetCallBack(data) {
                service.previewPassage = data;
                service.previewStyle = 2;
                $location.path("/preview");
            }
        }

        /**
         * @memberOf PassageService
         * @function getPassageById
         * @param {Number} id 文章ID
         * @desc
         *  会员获取导师文章详情
         *  获取的信息放在$broadcast的getPassageById方法的参数中。
         */
        function getPassageById(id) {
            HttpService.apiGet('function', 'getPassage', {pid: id}, apiGetCallBack)
            function apiGetCallBack(data) {
                $rootScope.$broadcast('getPassageById', data);
            }

        }

        /**
         * @memberOf PassageService
         * @function getAboutPassage
         * @param {Number} id 文章ID
         * @desc
         *  获取相关文章列表信息。
         *  获取的信息放在$broadcast的getAboutPassage方法的参数中。
         */
        function getAboutPassage(id){
            HttpService.apiGet('function', 'getRecommendPassageList', {passageId: id}, apiGetCallBack)
            function apiGetCallBack(data) {
                $rootScope.$broadcast('getAboutPassage', data);
            }
        }

    }
})();
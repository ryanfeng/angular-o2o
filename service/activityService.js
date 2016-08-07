(function () {
    var resources = {
        bgMobile: "http://image.1yingli.cn/img/new/activity.jpg",
        bgPC:"http://image.1yingli.cn/img/new/activity-zd-bg.jpg",
        textUrl:"http://image.1yingli.cn/img/new/activity-zd-text.png",
        shadeUrl:"http://image.1yingli.cn/img/new/activity-zd-shade.png",
        name: "活动名称"
    };

    app.service('ActivityService', ['HttpService', activity]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name ActivityService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @desc
     * 根据业务需求添加的活动模块类。
     * @attr {Object} resources 活动模块的一些静态资源（图片为主）
     */
    function activity(HttpService) {
        var service = this;
        service.getActivity = getActivity;
        service.resources = resources;

        /**
         * @memberOf ActivityService
         * @function getActivity
         * @param {string} page API请求中的页码参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  获取浙大活动导师列表请求。
         *  获取的信息将结果传入回调函数中
         */
        function getActivity(page, callback) {
            HttpService.apiGet('function', 'getSaleTeacherList', {page: page}, apiGetCallBack);
            function apiGetCallBack(data) {
                callback(data);
            }
        }
    }
})();

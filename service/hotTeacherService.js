(function () {
    app.service('HotTeacherService', ['HttpService', hotTeacherService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name HotTeacherService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @desc
     *   首页热门导师服务类。
     * @attr {Array} hotTeachers 获取热门导师信息列表
     */
    function hotTeacherService(HttpService) {
        var service = this;
        HttpService.apiGet('function', 'getHomeTeacherList', {}, teacherApiGetCallBack);

        function teacherApiGetCallBack(data) {
            service.hotTeachers = JsonParse(data.data);
        }


        HttpService.apiGet('function', 'getHomeServiceProList', {}, serviceApiGetCallBack);

        function serviceApiGetCallBack(data) {
            service.hotService = JsonParse(data.data);
        }
    }
})();
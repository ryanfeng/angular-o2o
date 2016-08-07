(function () {
    app.service('SearchAutoCompleteService', ['HttpService', '$http', searchAutoCompleteService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name SearchAutoCompleteService
     * @param {Service} HttpService [HttpService](app.HttpService.html)
     * @param {object} $http [$http](https://docs.angularjs.org/api/ng/service/$http)
     * @desc
     * 自动搜索补全服务类
     */
    function searchAutoCompleteService(HttpService, $http) {
        /**
         * @memberOf SearchAutoCompleteService
         * @function searchAPI
         * @param {string} userInputString 搜索的关键字和字母。
         * @param {number} timeoutPromise 略
         * @desc
         *  获取数据
         * @return {Array}
         */
        var service = this;
        service.searchType = 0;
        service.searchAPI = function (userInputString, timeoutPromise) {
            var data = {
                style: "function",
                method: service.searchType == 0?"getSearchServiceProHint":"getSearchHint",
                word: userInputString
            };
            return $http({
                method: 'POST',
                url: HttpService.apiUrl,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        };
    }
})();

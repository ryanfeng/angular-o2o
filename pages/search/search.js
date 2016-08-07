(function () {
    var loadImage = [
        'http://image.1yingli.cn/img/triangle_white_up.png',
        'http://image.1yingli.cn/img/triangle_white_down.png'
    ];

    app.controller('SearchController', ['$scope', 'SearchService', 'AlertService', 'HttpService',
        '$routeParams', 'SearchAutoCompleteService', 'ShareService', 'ServiceService', search]);

    function search($scope, SearchService, AlertService, HttpService, $routeParams, SearchAutoCompleteService,
                    ShareService, ServiceService) {
        //$scope.searchAutoCompleteService = SearchAutoCompleteService;
        $scope.searchService = SearchService;
        $scope.serviceService = ServiceService;
        $scope.searchAPI = SearchAutoCompleteService.searchAPI;

        $scope.showSelect = [];

        $scope.changePage = changePage;
        $scope.changeTips = changeTips;
        $scope.changeFilter = changeFilter;
        $scope.changeSelect = changeSelect;

        $scope.changeWord = changeWord;
        $scope.inputChanged = inputChanged;
        $scope.onKeyDown = onKeyDown;
        $scope.feedBack = feedBack;
        $scope.islike = islike;
        $scope.changeType = changeType;

        $scope.country = false;
        $scope.education = false;
        $scope.major = false;
        $scope.like = false;
        $scope.demand = "";
        $scope.email = "";
        //$scope.isDS = $routeParams.isDS;

        ShareService.sharePresent();

        SearchService.search($routeParams.word, $routeParams.tips, $routeParams.filter, $routeParams.page, $routeParams.select, $routeParams.searchType, $routeParams.showType);
        $scope.$on('getSearchResult', getSearchResult);
        function getSearchResult() {
            $scope.data = SearchService.pages;
            $scope.currentPage = parseInt(SearchService.params.page);
            $('body').scrollTop(0);
            if (parseInt($routeParams.tips) > 3) {
                $('#tips').scrollLeft(200);
            }
            $scope.showSelect = [];
            for (var i = 0; i < SearchService.selectWords[SearchService.params.tips].data.length; i++) {
                $scope.showSelect.push(false);
            }
        }

        var images = new Array(loadImage.length);
        for (var i = 0; i < loadImage.length; i++) {
            images[i] = new Image();
            images[i].src = loadImage[i];
        }

        function changePage(page) {
            SearchService.params.page = page;
            SearchService.changeParams();
        }

        function changeTips(tips) {
            if (tips == undefined || tips > 5) {
                return;
            }
            SearchService.params.tips = tips;
            changePage(1);
        }

        function changeFilter(filter) {
            if (filter == undefined || filter > 4) {
                return;
            }
            SearchService.params.filter = filter;
            changePage(1);
        }

        function changeSelect(index1, index2) {
            if (index2 == 0 && SearchService.params.select[index1] == 0 && !$scope.showSelect[index1]) {
                for (var i = 0; i < SearchService.selectWords[SearchService.params.tips].data.length; i++) {
                    $scope.showSelect[i] = false;
                }
                $scope.showSelect[index1] = true;
                return;
            }
            for (var i = 0; i < SearchService.selectWords[SearchService.params.tips].data.length; i++) {
                $scope.showSelect[i] = false;
            }
            SearchService.params.select[index1] = index2 + '';
            changePage(1);
        }


        function changeType(type) {
            if (SearchService.params.searchType != type) {
                SearchService.params.filter = 0;
                SearchService.params.page = 1;
                SearchService.params.select = [];
                SearchService.params.tips = 0;
            }
            SearchService.params.searchType = type;
            SearchAutoCompleteService.searchType = type;
            SearchService.changeParams();
        }

        //搜索框回调函数
        function changeWord(item) {
            if (SearchService.params.word != item.title) {
                SearchService.params.page = 1;
            }
            SearchService.params.word = item.title;
            SearchService.changeParams();
        }

        function inputChanged(input) {
            SearchService.params.word = input;
        }

        function onKeyDown(event) {
            if (event.keyCode == 13) {
                SearchService.params.page = 1;
                SearchService.changeParams();
            }
        }

        function feedBack() {
            var emailReg = new RegExp("^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$");
            if (!$scope.email || !emailReg.test($scope.email)) {
                AlertService.showAlert('请输入正确的邮箱！', undefined);
                return;
            }
            if (!$scope.demand) {
                AlertService.showAlert('请描述你的梦想导师！', undefined);
                return;
            }
            HttpService.apiGet('function', 'teacherDemand', {
                email: $scope.email,
                demand: $scope.demand
            }, apiGetCallBack);
            function apiGetCallBack(data) {
                AlertService.showAlert('提交成功！', undefined);
            }
        }

        function islike() {
            if ($routeParams.filter == '1' || $routeParams.filter == '2') {
                return true;
            } else {
                return false;
            }
        }
    }
})();
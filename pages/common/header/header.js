(function () {
    app.controller('HeaderController', ['$scope', 'ThemeService', 'SearchAutoCompleteService',
        'SessionService', '$location', 'AlertService', '$routeParams', '$localStorage',
        'PersonalService', 'SearchService', '$rootScope', '$cookies',header]);

    function header($scope, ThemeService, SearchAutoCompleteService, SessionService, $location, AlertService, $routeParams,
                    $localStorage, PersonalService, SearchService, $rootScope, $cookies) {
        $scope.themeService = ThemeService;
        $scope.sessionService = SessionService;
        $scope.searchAutoCompleteService = SearchAutoCompleteService;
        $scope.isShowThemeClass = false;
        $scope.searchAPI = SearchAutoCompleteService.searchAPI;
        $scope.changeWord = changeWord;
        $scope.inputChanged = inputChanged;
        $scope.onKeyDown = onKeyDown;
        $scope.toSearch = toSearch;
        $scope.becomeTeacher = becomeTeacher;
        $scope.headTypeBlck = true;

        $scope.searchType = $routeParams.searchType ? $routeParams.searchType : 0;
        $scope.searchWord = $routeParams.word ? $routeParams.word : "";

        getShoppingNumber();
        $rootScope.$on('loadShoppCount', function(){
            getShoppingNumber();
        });
        function getShoppingNumber (){
            $scope.shoppingNum = 0;
             for (var i in $localStorage.shopping) {
                $scope.shoppingNum = $scope.shoppingNum + $localStorage.shopping[i].services.length;
            }
        }

        $scope.messageNum = 0;
        if (SessionService.isLogin()) {
            PersonalService.getNotiCount(callbackNum);
        }
        $rootScope.$on('loadNotiCount', function() {
            if (SessionService.isLogin()) {
                PersonalService.getNotiCount(callbackNum);
            }
        });
        function callbackNum(data) {
            $scope.messageNum = data;
        }

        //搜索框回调函数
        function changeWord(item) {
            $scope.searchWord = item.title;
            toSearch();
        }

        function inputChanged(input) {
            $scope.searchWord = input;
        }

        function onKeyDown(event) {
            if (event.keyCode == 13) {
                toSearch();
            }
        }

        function toSearch() {
            var params = {
                'word': $routeParams.word,
                'tips': $routeParams.tips,
                'filter': $routeParams.filter,
                'page': $routeParams.page,
                'select': $routeParams.select,
                'searchType': $routeParams.searchType
            };
            params.word = $scope.searchWord;
            if (!SearchService.params || !SearchService.params.searchType || SearchService.params.searchType != SearchAutoCompleteService.searchType) {
                params.filter = 0;
                params.page = 1;
                params.select = [];
                params.tips = 0;
            }
            params.searchType = SearchAutoCompleteService.searchType;
            $location.path('/search').search(params);
        }

        function becomeTeacher() {
            if (!SessionService.isLogin()) {
                AlertService.showAlertWithCancel('请先登录', alertCallBack);
                return;
            }
            function alertCallBack() {
                $location.path('/login');
            }

            if (SessionService.user.teacherId) {
                AlertService.showAlert('您已经是导师了', undefined);
            } else {
                $location.path('/bct1');
            }
        }

        /*if($location.path().indexOf("teacher")>0 || $location.path() == "/"){
         $scope.headTypeBlck = false;
         }*/
    }
})();

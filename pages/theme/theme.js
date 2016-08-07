(function () {

    var teacherPerPage = 12;

    app.controller('ThemeController', ['$scope', 'ThemeService', '$routeParams', '$location', 'ActivityService',
        '$rootScope', 'ShareService', 'ServiceService', theme]);

    function theme($scope, ThemeService, $routeParams, $location, ActivityService, $rootScope, ShareService, ServiceService) {
        $scope.themeService = ThemeService;
        $scope.themeId = $routeParams.id;
        $scope.getArray = getArray;
        $scope.goToTeacher = goToTeacher;
        $scope.currentPage = 1;
        $scope.changePage = changePage;
        $scope.serviceService = ServiceService;

        ShareService.sharePresent();

        if ($routeParams.id != '0') {
            ThemeService.getTheme($routeParams.id, getThemeCallBack);
        } else {
            ActivityService.getActivity($scope.currentPage, getActivityCallBack);
        }

        function getThemeCallBack() {
            $scope.teachers = ThemeService.themeTeachers[$routeParams.id];
            $scope.bg = ThemeService.serviceConfig[$scope.themeId].url;
            $scope.name = ThemeService.serviceConfig[$scope.themeId].name;
            $scope.textUrl = ThemeService.serviceConfig[$scope.themeId].textUrl;
            $scope.text = ThemeService.serviceConfig[$scope.themeId].text1 + '，' +
                ThemeService.serviceConfig[$scope.themeId].text2;
            $scope.flag = true;
            setTimeout(function () {
                $('body').scrollTop(0);
            });
        }

        function getActivityCallBack(data) {
            $scope.teachers = data.data;
            if (isMobile()) {
                $scope.bg = ActivityService.resources.bgMobile;
            } else {
                $scope.bg = ActivityService.resources.bgPC;
            }
            $scope.name = ActivityService.resources.name;
            $scope.textUrl = ActivityService.resources.textUrl;
            $scope.shadeUrl = ActivityService.resources.shadeUrl;
            $scope.flag = false;
            $scope.data = {
                totalPage: parseInt((parseInt(data.count) - 1 ) / teacherPerPage) + 1,
            };
            $scope.data.totalPageArray = new Array($scope.data.totalPage);
            setTimeout(function () {
                $('body').scrollTop(0);
            });
        }

        function getArray(number) {
            return new Array(parseInt(number));
        }

        function goToTeacher(teacherId) {
            $location.path('/teacher/' + teacherId);
        }

        function changePage(page) {
            if (page != $scope.currentPage) {
                $('body').scrollTop('0');
                $scope.currentPage = page;
            }
            ActivityService.getActivity($scope.currentPage, getActivityCallBack);
        }

    }
})();
(function () {
    app.controller('PassagePreviewController', ['$scope', 'PassageService', 'SessionService', '$rootScope', preview]);

    function preview($scope, PassageService, SessionService, $rootScope) {
        $scope.passageService = PassageService;
        $scope.sessionService = SessionService;
        $scope.goBack = goBack;
        if (!$scope.passageService.previewPassage.title) {
            $rootScope.back();
        }
        function goBack() {
            $rootScope.back();
        }
    }
})();
(function () {
    app.controller('CommentController', ['$scope', 'PersonalService', commentController]);

    function commentController($scope, PersonalService) {
        $scope.currentPage = 1;
        $scope.kind = 2;

        $scope.changeKind = changeKind;
        $scope.getArray = getArray;
        $scope.changePage = changePage;

        $scope.showAllTopic=true;

        PersonalService.getComment($scope.currentPage, $scope.kind);
        $scope.$on('getComment', onGetComment);

        function onGetComment(event, data) {
            $scope.data = data;
        }


        function changeKind(kind) {
            if (kind == $scope.kind) {
                return;
            }
            $scope.kind = kind;
            $scope.currentPage = 1;
            PersonalService.getComment($scope.currentPage, $scope.kind);
        }

        function getArray(num) {
            return new Array(parseInt(num));
        }

        function changePage(page) {
            if($scope.currentPage == page) {
                return;
            }
            $scope.currentPage = page;
            PersonalService.getComment($scope.currentPage, $scope.kind);
        }
    }
})();

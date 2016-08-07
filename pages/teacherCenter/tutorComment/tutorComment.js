(function () {
    app.controller('TutorCommentController', ['$scope', 'PersonalService', 'SessionService',
        'TeacherCenterService', tutorComment]);

    function tutorComment($scope, PersonalService, SessionService, TeacherCenterService) {
        $scope.tutorAccountService = PersonalService;
        $scope.currentPage = 1;
        $scope.changePage = changePage;
        $scope.getArray = getArray;


        $scope.$on("getTutorAccount", getTutorAccount);
        TeacherCenterService.changeMenuIndex(-1);

        function getTutorAccount() {
            $scope.data = PersonalService.tutorAccount;
        }

        if (SessionService.user != undefined) {
            PersonalService.getTutorAccount($scope.currentPage);
        }

        function changePage(page) {
            if (page != $scope.currentPage) {
                $('body').scrollTop(0);
                $scope.currentPage = page;
                PersonalService.getTutorAccount($scope.currentPage);
            }
        }

        function getArray(num) {
            return new Array(parseInt(num));
        }
    }
})();
(function () {
    app.controller('TeacherPreviewController', ['$scope', 'TeacherCenterService', 'TeacherService', '$rootScope',
        teacherPreview]);

    function teacherPreview($scope, TeacherCenterService, TeacherService, $rootScope) {
        $scope.teacher = TeacherCenterService.teacherInfo;
        $scope.authentics = TeacherService.authentics;
        $scope.person_bg = TeacherService.person_bg;
        $scope.back = back;
        if (!$scope.teacher) {
            back();
        }

        function back() {
            $rootScope.back();
        }

        $('body').scrollTop(0);
    }
})();
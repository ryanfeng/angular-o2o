(function () {
    app.controller('PreviewServerController', ['$scope', 'TeacherCenterService', 'ServiceService', 'TeacherService', '$rootScope',
        previewServerController]);

    function previewServerController($scope, TeacherCenterService, ServiceService, TeacherService, $rootScope) {
        $scope.service = ServiceService;
        $scope.data = TeacherCenterService.serverInfo;
        $scope.img = $scope.data.imageUrls;
        $scope.show = false;
        $scope.goBack = goBack;
        $scope.talk = {'0': '线上', '1': '线下'};

        $scope.isContain = function (index) {
            for (i in $scope.data.tip) {
                if(index == i){
                    if($scope.data.tip[i]){
                        return true;
                    }
                }
            }
            return false;
        }

        function goBack(){
            history.back();
        }

        $('body').scrollTop(0);
    }
})();
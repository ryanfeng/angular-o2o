(function () {
    app.controller('ModifyInformationController', ['$scope', 'PersonalService', 'SessionService',modifyInformationController]);
        function modifyInformationController($scope, PersonalService, SessionService) {
        $scope.sessionService = SessionService;

        //获取个人信息
        PersonalService.getPersonInfo(getInfoCallbBack);
        function getInfoCallbBack(data){
            $scope.person = data;
        }

        //修改个人信息
        $scope.nameVa = true;
        $scope.nickNameVa = true;
        $scope.addressVa = true;
        $scope.resumeVa = true;
        $scope.changePersonInfo = changePersonInfo;


        //修改个人头像
        $scope.modifyPersonPortrait = modifyPersonPortrait;
        function modifyPersonPortrait(file, errFiles) {
            PersonalService.uploadPictrue(file, errFiles);
        }
        function changePersonInfo() {
            if(!$scope.person.name) {
                $scope.nameVa = false;
            }
            if(!$scope.person.nickName) {
                $scope.nickNameVa = false;
            }
            if(!$scope.person.address) {
                $scope.addressVa = false;
            }
            if(!$scope.person.resume) {
                $scope.resumeVa = false;
            }
            if($scope.nameVa && $scope.nickNameVa && $scope.addressVa && $scope.resumeVa){
                PersonalService.modifyPersonInfo($scope.person);
            }
        }

    }
})();

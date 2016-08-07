(function () {
    app.controller('EditPassageController', ['$scope', 'Upload', 'HttpService', 'PassageService', 'TeacherCenterService', editPassage]);

    function editPassage($scope, Upload, HttpService, PassageService, TeacherCenterService) {
        $scope.passageService = PassageService;
        $scope.upLoadCover = upLoadCover;
        TeacherCenterService.changeMenuIndex(0);

        function upLoadCover(file, errFiles) {
            if (file) {
                file.upload = Upload.upload({
                    url: HttpService.uploadPassageImageUrl,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $scope.passageService.coverUrl = response.data.url + '@!cover';
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }
    }
})();
(function () {
    if (!isMobile()) {
        app.controller('UploadImageModalController', ['$scope', 'close', 'Upload', 'HttpService', uploadImageModal]);
        app.config(['$provide', configFunc]);
    }
    function uploadImageModal($scope, close, Upload, HttpService) {
        $scope.upLoadFile = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: HttpService.uploadPassageImageUrl,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    close(response.data.url, 100);
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };
        $scope.close = function () {
            close('', 100);
        }
    }

    function configFunc($provide) {
        $provide.decorator('taOptions', ['taRegisterTool', 'taToolFunctions', '$delegate', 'ModalService', '$q',
            function (taRegisterTool, taToolFunctions, taOptions, ModalService, $q) {
                // $delegate is the taOptions we are decorating
                // here we override the default toolbars specified in taOptions.
                taOptions.toolbar = [
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                    ['bold', 'italics', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
                    ['html', 'insertLink']
                ];

                // Create our own insertImage button
                taRegisterTool('uploadImage', {
                    iconclass: 'fa fa-picture-o',
                    tooltiptext: 'Insert Images',
                    action: function (deferred, restoreSelection) {
                        ModalService.showModal({
                            templateUrl: "/pages/modal/uploadImageModal.html",
                            controller: 'UploadImageModalController'
                        }).then(function (modal) {
                            modal.close.then(function (result) {
                                if (result && result !== '' && result !== 'http://') {
                                    restoreSelection();
                                    var temp_html = "<img src='" + result + '@!passage' + "' style='width:100%'>";
                                    document.execCommand('insertHTML', false, temp_html);
                                    deferred.resolve();
                                } else {
                                    deferred.resolve();
                                }
                            })
                        });
                        return false;
                    },
                    onElementSelect: {
                        element: 'img',
                        action: taToolFunctions.imgOnSelectAction
                    }
                });

                taRegisterTool('changeColor', {
                    iconclass: 'fa fa-font',
                    tooltiptext: 'Change Color',
                    action: function() {
                        var color = window.prompt('请输入颜色值 或 颜色名称:', "");
                        return this.$editor().wrapSelection("foreColor", color);
                    }
                });

                // Now add the button to the default toolbar definition
                // Note: It'll be the last button
                taOptions.toolbar[3].push('uploadImage');
                taOptions.toolbar[3].push('changeColor');
                return taOptions;
            }
        ]);
    }
})();
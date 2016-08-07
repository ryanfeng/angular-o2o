(function () {
    app.controller('MyMoneyController', ['$scope', 'TeacherCenterService', 'AlertService', myMoneyController]);
    function myMoneyController($scope, TeacherCenterService, AlertService) {
        $scope.isShowPliEdit = false;
        $scope.isShowPliForm = true;
        $scope.isShowApyEdit = false;
        $scope.isShowApyForm = true;
        $scope.isMobilePliEdit = false;
        $scope.isMobileApyEdit = false;

        $scope.alipayNo = "";
        $scope.payPayNo = "";

        $scope.editAlipayAcount = editAlipayAcount;
        $scope.editPayPalAcount = editPayPalAcount;

        TeacherCenterService.getAlipayAcount(getAliCallBack);
        TeacherCenterService.getPayPalAcount(getPalCallBack);
        TeacherCenterService.getReward(getRewardCallBack);
        TeacherCenterService.getMile(getMileCallBack);
        TeacherCenterService.changeMenuIndex(-1);


        function getAliCallBack(data) {
            if (data) {
                $scope.alipayNo = data;
                $scope.isShowPliEdit = true;
                $scope.isShowPliForm = false;
            }
        }

        function getRewardCallBack(data) {
            $scope.rewardNo = data;
        }

        function editAlipayAcount() {
            if (!$scope.alipayNo) {
                AlertService.showAlert('支付宝账号不能为空!', undefined);
                return;
            }
            TeacherCenterService.editAlipayAcount($scope.alipayNo, editAliAcountSuccess);
            function editAliAcountSuccess(data) {
                if (data) {
                    AlertService.showAlert('支付宝账号绑定成功!', undefined);
                    $scope.isShowPliForm = false;
                    $scope.isShowPliEdit = true;
                    $scope.isMobilePliEdit = false;
                }
            }
        }


        function getPalCallBack(data) {
            if (data) {
                $scope.payPayNo = data;
                $scope.isShowApyEdit = true;
                $scope.isShowApyForm = false;
            }
        }

        function editPayPalAcount() {
            if (!$scope.payPayNo) {
                AlertService.showAlert('PayPal账号不能为空!', undefined);
                return;
            }
            TeacherCenterService.editPayPalAcount($scope.payPayNo, editPayAcountSuccess);
            function editPayAcountSuccess(data) {
                if (data) {
                    AlertService.showAlert('PayPal账号绑定成功!', undefined);
                    $scope.isShowApyForm = false;
                    $scope.isShowApyEdit = true;
                    $scope.isMobileApyEdit = false;
                }
            }
        }

        function getMileCallBack(data) {
            $scope.mile = parseInt(data.mile);
            var i = 1;
            while (i <= $scope.mile) {
                i = i * 10;
            }
            $scope.total = i;
            $scope.percent = 90 * ($scope.mile / i) ;
            $scope.planeLeft = $scope.percent / 100 * $('.grad').width();
        }
    }
})();
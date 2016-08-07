(function(){
    app.controller('GetOrderInfoController', ['$scope', '$location', 'SessionService', 'CreateOrderService', 'BecomeTeacherService', '$routeParams', 'TeacherService', getOrderInfoController]);
    function getOrderInfoController($scope, $location, SessionService, CreateOrderService, BecomeTeacherService, $routeParams, TeacherService){
        $scope.createOrderService = CreateOrderService;

        //选择国家下拉框
        $scope.isShowCountry = false;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.country = BecomeTeacherService.countrys[0];
        $scope.selectCountry = selectCountry;
        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }

        function oldOrderCallBack(oldOrderInfo){
             CreateOrderService.user.name = oldOrderInfo.name;
             if(oldOrderInfo.phone){
                for(var index in BecomeTeacherService.countrys){
                    if(BecomeTeacherService.countrys[index].code.replace("+","") == oldOrderInfo.phone.split("-")[0]){
                         $scope.country = BecomeTeacherService.countrys[index];
                    }
                }
                CreateOrderService.user.phoneNew = oldOrderInfo.phone.split("-")[1];
             }
             CreateOrderService.user.email = oldOrderInfo.email;
             CreateOrderService.user.contact = oldOrderInfo.contact;
        }

        TeacherService.getOldOrderInfo(oldOrderCallBack);
    }
})();

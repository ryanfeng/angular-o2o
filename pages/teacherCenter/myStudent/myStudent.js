(function () {
    app.controller('MyStudentController', ['$scope', 'PersonalService', 'HttpService', 'OrderListService',
        'AlertService', 'SessionService', 'TeacherCenterService', '$location', myStudentController]);

    function myStudentController($scope, PersonalService, HttpService, OrderListService, AlertService,
                                 SessionService, TeacherCenterService, $location) {
        $scope.dataService = PersonalService;
        $scope.orderListService = OrderListService;

        $scope.currentPage = 1;
        $scope.showDetail = false;
        $scope.detail = undefined;
        $scope.showState = false;
        $scope.showRefuse = false;
        $scope.refuseReason = "";
        $scope.showComment = false;
        $scope.starNum = 0;
        $scope.comment = '';


        $scope.hide = hide;
        $scope.changeDetail = changeDetail;
        $scope.changeDetailToShowState = changeDetailToShowState;
        $scope.changePage = changePage;
        $scope.refuseOrder = refuseOrder;
        $scope.changeShowRefuse = changeShowRefuse;
        $scope.confirmTime = confirmTime;
        $scope.changeComment = changeComment;
        $scope.makeComment = makeComment;
        $scope.showMobileDetail = showMobileDetail;
        $scope.showMask = showMask;
        $scope.hideMask = hideMask;

        $scope.acceptOrder = acceptOrder;
        $scope.scrollTo = scrollTo;

        if (SessionService.user && SessionService.user.teacherId) {
            $scope.changePage(1);
        }

        $scope.$on('getMyStudent', onGetMyStudent);
        function onGetMyStudent(event, data) {
            $scope.data = data;
            hideMask();
        }

        TeacherCenterService.changeMenuIndex(-1);

        function changeDetail(order) {
            hide();
            $scope.detail = order;
            $scope.showDetail = true;
        }


        function showMask() {
            if ($scope.data) {
                for (var i = 0; i < $scope.data.data.length; i++) {
                    for (var j = 0; j < $scope.data.data[i].orders.length; j++) {
                        if ($scope.data.data[i].orders[j].showOperation || $scope.data.data[i].orders[j].showComment)
                            return true;
                    }
                }
            }
            return false;
        }

        function hideMask() {
            if ($scope.data) {
                for (var i = 0; i < $scope.data.data.length; i++) {
                    for (var j = 0; j < $scope.data.data[i].orders.length; j++) {
                        $scope.data.data[i].orders[j].showOperation = false;
                        $scope.data.data[i].orders[j].showComment = false;
                    }
                }
            }
        }

        function hide() {
            $scope.showDetail = false;
            $scope.showState = false;
            $scope.showRefuse = false;
            $scope.showComment = false;
            hideMask();
        }

        function changeDetailToShowState(order) {
            hide();
            $scope.detail = order;
            $scope.showState = true;
            order.showOperation = true;
        }


        function acceptOrder() {
            hide();
            HttpService.apiGet("order", "acceptOrder", {orderId: $scope.detail.orderId}, apiGetCallBack);

            function apiGetCallBack(data) {
                AlertService.showAlert("接受订单成功，请尽快与学员联系", undefined);
                changePage($scope.currentPage);
            }
        }


        function changeShowRefuse(flag) {
            $scope.showRefuse = flag;
        }

        function refuseOrder(reason) {
            if (reason.trim() == '') {
                AlertService.showAlert("请填写拒绝理由", undefined);
                return;
            }
            hide();
            AlertService.showAlertWithCancel('确认拒绝订单？', alertCallBack);

            function alertCallBack() {
                HttpService.apiGet("order", "refuseOrder", {
                    orderId: $scope.detail.orderId,
                    refuseReason: reason
                }, apiGetCallBack);

                function apiGetCallBack(data) {
                    AlertService.showAlert("拒绝订单成功", undefined);
                    changePage($scope.currentPage);
                }
            }
        }

        function confirmTime(time) {
            hide();
            if (time == undefined) {
                return;
            }
            var timeString = time.getFullYear() + '-' + (parseInt(time.getMonth()) + 1) + '-' + time.getDate() + ' ' +
                time.getHours() + ':' + time.getMinutes();
            AlertService.showAlertWithCancel("确定时间为：" + timeString, alertCallBack);
            function alertCallBack() {
                HttpService.apiGet("order", "ensureTime", {
                    orderId: $scope.detail.orderId,
                    okTime: timeString
                }, apiGetCallBack);

                function apiGetCallBack(data) {
                    AlertService.showAlert("确定时间成功", undefined);
                    changePage($scope.currentPage);
                }
            }
        }

        function changeComment(index) {
            hide();
            if (index) {

            } else {
                $scope.showComment = true;
            }
        }

        function makeComment(comment, starNum) {
            if (!SessionService.user || !SessionService.user.teacherId) {
                return;
            }
            hide();
            var params = {
                content: comment,
                orderId: $scope.detail.orderId,
                score: starNum + ''
            };
            $scope.detail.serviceProId?params.serviceProId=$scope.detail.serviceProId:'';
            HttpService.apiGet('teacher', 'commentUser', params, apiGetCallBack);

            function apiGetCallBack(data) {
                AlertService.showAlert("评价成功", undefined);
                changePage($scope.currentPage);
            }
        }

        function changePage(page) {
            if (page != $scope.currentPage) {
                $('body').scrollTop(0);
            }
            $scope.currentPage = page;
            PersonalService.getMyStudent($scope.currentPage);
        }

        function showMobileDetail(pIndex, index) {
            PersonalService.showDetail($scope.data.data[pIndex].orders[index]);
            $location.path('orderDetail');
        }


        function scrollTo(e) {
            $('body').animate({
                scrollTop: ($(e.currentTarget).offset().top - $(window).height() / 2)
            }, 800);
        }
    }
})();
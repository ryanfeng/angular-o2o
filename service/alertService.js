(function () {
    app.service('AlertService', [alertService]);

    /**
     * @ngdoc service
     * @memberOf app
     * @name AlertService
     * @desc
     *  网站默认弹出框
     */
    function alertService() {
        var service = this;
        service.show = false;
        service.callBack = undefined;
        service.showAlert = showAlert;
        service.confirm = confirm;
        service.setCallBack = setCallBack;
        service.showAlertWithCancel = showAlertWithCancel;
        service.setAlertType = setAlertType;

        /**
         * @memberOf AlertService
         * @function confirm
         * @desc
         *  弹出框确定按钮被点击时触发，若弹出框回调存在，则执行回调函数
         */
        function confirm() {
            service.show = false;
            if (service.callBack != undefined) {
                service.callBack();
            }
        }

        /**
         * @memberOf AlertService
         * @function showAlertWithCancel
         * @param {string} msg 显示的消息
         * @param {function} callBack 弹出框确认回调
         * @desc
         *  显示有确认和取消按钮的弹出框，并设置确认回调
         */
        function showAlertWithCancel(msg, callBack) {
            service.msg = msg;
            service.type = 2;
            service.show = true;
            service.callBack = callBack;
        }

        /**
         * @memberOf AlertService
         * @function showAlert
         * @param {string} msg 显示的消息
         * @param {function} callBack 弹出框确认回调
         * @desc
         *  显示只有确认按钮的弹出框，并设置确认回调
         */
        function showAlert(msg, callBack) {
            service.msg = msg;
            service.type = 1;
            service.show = true;
            service.callBack = callBack;
        }

        /**
         * @memberOf AlertService
         * @function setCallBack
         * @param {function} callBack 弹出框确认回调
         * @desc
         *  更改弹出框的确认回调（并不影响弹出框的显示状态）
         */
        function setCallBack(callBack) {
            service.callBack = callBack;
        }


        /**
         * @memberOf AlertService
         * @function setAlertType
         * @param {int} type 弹出框类型（1：无取消按钮，2：有取消按钮）
         * @desc
         *  更改弹出框的样式（并不影响弹出框是否显示）
         */
        function setAlertType(type) {
            service.type = type;
        }
    }
})();
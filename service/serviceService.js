(function () {

    var kindTips = {
            '1': {
                text: "约谈咨询",
                data: [
                    "超时服务",
                    "可视频",
                    "可语音",
                    "时间灵活",
                    "支持多人"
                ]
            },
            '2': {
                text: "特色体验",
                data: [
                    "时间灵活",
                    "支持多人",
                    "轻装上阵",
                    "超时服务",
                    "接送服务"
                ]
            }
            ,
            '3': {
                text: "文书批改",
                data: [
                    "支持加急",
                    "量大优惠",
                    "5天内完成"
                ]
            }
            ,
            '4': {
                text: "技艺教授",
                data: [
                    "时间灵活",
                    "支持多人",
                    "可长期服务",
                    "专业领域"
                ]
            }
            ,
            '5': {
                text: "定制服务",
                data: [
                    "超时服务",
                    "时间灵活",
                    "上门服务"
                ]
            }
        }
        ;
    var proState ={'0':'审核中', '1':'审核通过', '2':'审核未通过'};



    app.service('ServiceService', ['HttpService', serviceService]);

    function serviceService(HttpService) {

        var service = this;
        var services = {};
        service.kindTips = kindTips;
        service.proState = proState;
        service.getServiceById = getServiceById;
        service.getCommentList = getCommentList;
        service.getMoreServicePro = getMoreServicePro;
        service.disLikeServicePro = disLikeServicePro;
        service.likeServicePro = likeServicePro;
        service.isLikeServicePro = isLikeServicePro;

        function getServiceById(id, callBack) {
            if (services[id] != undefined) {
                callBack(services[id]);
            }
            HttpService.apiGet("function", "getServicePro", {serviceProId: id}, apiGetCallBack);
            function apiGetCallBack(data) {
                services[id] = data;
                callBack(data);
            }
        }


        function getCommentList(sid, page, callBack) {
            HttpService.apiGet("function", "getCommentListByServicePro", {
                serviceProId: sid,
                page: page + ""
            }, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callBack(data);
            }

            function errCallBack(data) {
                console.log(data);
            }
        }

        function getMoreServicePro(proId, teacherId, callback){
            HttpService.apiGet("function", "getMoreServicePro" ,{serviceProId: proId, teacherId: teacherId}, apiGetCallBack);
            function apiGetCallBack(data) {
                callback(data);
            }
        }

        /**
         * @memberOf TeacherService
         * @function isLikeServicePro
         * @param {string} sid API请求中的tid参数
         * @param {function} callback API请求完成后的回调函数
         * @desc
         *  判断当前用户是否喜欢这个服务
         */
        function isLikeServicePro(proId, callBack) {

            HttpService.apiGet("user", "isLikeServicePro", {serviceProId:proId}, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                callBack(data.likeServicePro);
            }

            function errCallBack(data) {
                if (data.errCode == '14001') {
                    AlertService.show = false;
                }
                function alertCallBack() {
                    $location.path('/login');
                }
            }
        }

        /**
         * @memberOf TeacherService
         * @function likeServicePro
         * @param {string} sid API请求中的tid参数
         * @param {function} likeCallBack API请求完成后的回调函数
         * @desc
         *  添加喜欢的老师
         */
        function likeServicePro(sid, likeCallBack) {
            var toSend = {};
            toSend.serviceProId = sid;
            HttpService.apiGet("user", "likeServicePro", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                likeCallBack();
            }

            function errCallBack(data) {
            }
        }

        /**
         * @memberOf TeacherService
         * @function disLikeServicePro
         * @param {string} sid API请求中的tid参数
         * @param {function} disLikeCallBack API请求完成后的回调函数
         * @desc
         *  取消喜欢这个导师
         */
        function disLikeServicePro(sid, disLikeCallBack) {
            var toSend = {};
            toSend.serviceProId = sid;
            HttpService.apiGet("user", "disLikeServicePro", toSend, apiGetCallBack, errCallBack);
            function apiGetCallBack(data) {
                disLikeCallBack();
            }

            function errCallBack(data) {
            }
        }
    }
})();
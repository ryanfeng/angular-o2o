(function () {
    var state = {
        '0100': {
            student: "成功生成订单",
            s_operating: "订单已生成，请确认付款"
        },
        '0200': {
            student: "已放弃支付"
        },
        '0300': {
            student: "等待导师确认",
            s_operating: "导师已收到提醒，等待导师确认",
            teacher: "请导师接受订单",
            t_operating: "学员已付款，请尽快确认订单"
        },
        '0400': {
            student: "等待确认时间",
            s_operating: "导师已确认，等待导师与您协商时间",
            teacher: "请与学员联系，确认时间",
            t_operating: "请尽快与学员联系，确认咨询时间"
        },
        '0500': {
            student: "等待导师咨询",
            s_operating: "导师已确认时间，等待导师服务",
            teacher: "请按时完成咨询",
            t_operating: "已确认时间，请按时完成咨询"
        },
        '0620': {
            student: "等待导师确认退款",
            teacher: "学员反馈不满，申请退款"
        },
        '0700': {
            student: "等待后台退款",
            teacher: "订单已取消"
        },
        '0800': {
            student: "退款成功",
            teacher: "订单已取消"
        },
        '1000': {
            student: "已完成咨询，请评价导师",
            s_operating: "已完成咨询，请评价导师",
            teacher: "已完成咨询,等待学员评价",
            t_operating: "已完成咨询,等待学员评价"
        },
        '1010': {
            student: "等待导师评价",
            teacher: "学员已完成评价，请评价学员",
            t_operating: "学员已完成评价，请评价学员"
        },
        '1100': {
            student: "订单成功完成",
            teacher: "订单成功完成"
        },
        '1200': {
            student: "订单已经取消",
            teacher: "订单已取消"
        },
        '1300': {
            student: "客服介入中",
            teacher: "客服介入中"
        },
        '1400': {
            student: "订单异常",
            teacher: "订单异常"
        },
        '1500': {
            student: "等待导师确认取消",
            teacher: "学员申请取消订单"
        }
    };

    app.service('OrderListService', [orderListService]);
    /**
     * @ngdoc service
     * @memberOf app
     * @name OrderListService
     * @desc
     *   学员与导师预约流程状态数据。
     * @attr {Object} state 流程静态数据。各个状态下的文案及操作文字<br/>
     *  student：学员状态描述，<br/>
     *  teacher：导师状态描述，<br/>
     *  s_operating：学员操作描述，<br/>
     *  t_operating：导师操作描述，
     */
    function orderListService() {
        var service = this;
        service.state = state;
    }
})();
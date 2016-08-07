(function () {
    app.service('ValidateService', [validateService]);

    /**
     * @ngdoc service
     * @memberOf app
     * @name ValidateService
     * @desc
     *  密码验证，手机号码验证以及邮箱验证。
     */
    function validateService() {
        this.passwordVa = passwordVa;
        /**
         * @memberOf ValidateService
         * @function passwordVa
         * @param {string} str 等待校验的字符串
         * @desc
         *  密码验证，校验标准：6-20位,不能全为全数字
         * @returns { bool} true:密码验证成功。false:密码验证失败。
         */
        function passwordVa(str) {
            if (str == undefined) {
                return false;
            }
            var re = /^[0-9]+$/;
            if (re.test(str)) {
                return false;
            } else {
                var reLength = /^[^\s]{6,20}$/;
                return reLength.test(str);
            }
        }

        this.phoneVa = phoneVa;
        /**
         * @memberOf ValidateService
         * @function phoneVa
         * @param {string} str 等待校验的字符串
         * @desc
         *  手机号码验证，校验标准：至少一位且全为数字
         * @returns { bool} true:手机号码验证成功。false:手机号码验证失败。
         */
        function phoneVa(str) {
            if (str == undefined) {
                return false;
            }
            var reg = /^\d+$/;
            return reg.test(str);
        }

        this.phoneProcess = phoneProcess;

        /**
         * @memberOf ValidateService
         * @function phoneProcess
         * @param {string} str 等待修改的手机号
         * @desc
         *  修改手机号，去除前置0
         * @returns {string} 去除前置0后的字符串
         */

        function phoneProcess(str) {
            while (str[0] == '0') {
                str = str.substring(1);
            }
            return str;
        }

        this.emailVa = emailVa;
        /**
         * @memberOf ValidateService
         * @function emailVa
         * @param {string} str 等待校验的字符串
         * @desc
         *  邮箱验证，校验标准：符合a@b.c格式
         * @returns { bool} true:邮箱验证成功。false:邮箱验证失败。
         */
        function emailVa(str) {
            if (str == undefined) {
                return false;
            }
            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            return reg.test(str);
        }
    }
})();
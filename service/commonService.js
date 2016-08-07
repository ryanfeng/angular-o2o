(function () {
    app.service('CommonService', [commonService]);
    function commonService() {
      //去除空格
      this.trim = trim;
      function trim(str){
          str = str.replace(/^\s+/, '');
          for (var i = str.length - 1; i >= 0; i--) {
              if (/\S/.test(str.charAt(i))) {
                  str = str.substring(0, i + 1);
                  break;
              }
          }
          return str;
      }
    }
})();
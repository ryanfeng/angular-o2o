(function() {
    app.filter('changeImageUrl', [changeImageUrl]);

    function changeImageUrl() {
        return function (input, uppercase) {
            if (input.substring(input.length - 6) != '@!icon') {
                return input;
            } else {
                return input.substring(0, input.length - 4) + 'mainstyle';
            }
        }
    }


    app.filter('changeImageToServiceStyle', [changeImageToServiceStyle]);

    function changeImageToServiceStyle() {
        return function (input, uppercase) {
            if(input == undefined) {
                return "";
            }
            if (input.substring(input.length - 6) != '@!icon') {
                return input;
            } else {
                return input.substring(0, input.length - 4) + 'servicestyle';
            }
        }
    }

    app.filter('changeServiceContent', [changeServiceContent]);

    function changeServiceContent() {
        return function (input, uppercase) {
            var patt = new RegExp("<.*?>", "g");
            while((result = patt.exec(input)) != null) {
                input = input.substring(0,patt.lastIndex - result[0].length) + input.substring(patt.lastIndex);
                patt.lastIndex = 0;
            }
            return input.substring(0,80) + "……";
        }
    }

    app.filter('trustUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    //html的过滤器
    app.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);


    app.filter('passage', ['$sce',passage]);

    function passage($sce) {
        return function (input) {
            var patt = new RegExp('style=".+?"', "g");
            while((result = patt.exec(input)) != null) {
                input = input.substring(0,patt.lastIndex - result[0].length) + ' '+ input.substring(patt.lastIndex);
                patt.lastIndex = 0;
            }
            return $sce.trustAsHtml(input);
        }
    }

    app.filter("dateFormat",function(){
        return function(input,uppercase){
            var out = input.replace(/\//g, '-').split(" ")[0];
            return out;
        }
    });
    app.filter("dateFormatTime",function(){
        return function(input,uppercase){
            var out;
            if(input!="至今"){
                return input.split(',')[0] + "年" + input.split(',')[1] + "月";
            } else{
                return input;
            }
        }
    });
})();
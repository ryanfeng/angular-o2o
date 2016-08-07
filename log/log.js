var yiyingli = {
    baseUrl: "http://mark.1yingli.cn/mark"
    //baseUrl: "http://localhost:8080"
};
yiyingli.guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

yiyingli.logUid = Cookies.get('log-uid');
if (yiyingli.logUid == undefined) {
    yiyingli.logUid = localStorage.getItem('logUid');
}
if (yiyingli.logUid == null) {
    yiyingli.logUid = sessionStorage.log_uid;
}

if (yiyingli.logUid != undefined && yiyingli.logUid != null) {
    Cookies.set('log-uid', yiyingli.logUid, {expires: 365, path: '/', domain: '.1yingli.cn'});
    localStorage.setItem('logUid', yiyingli.logUid);
    sessionStorage.log_uid = yiyingli.logUid;
} else {
    yiyingli.logUid = yiyingli.guid();
}


try {
    yiyingli.sessionId = sessionStorage.sessionId;
} catch (err) {
    yiyingli.sessionId = yiyingli.guid();
}

if (yiyingli.sessionId == undefined) {
    yiyingli.sessionId = yiyingli.guid();
}
sessionStorage.sessionId = yiyingli.sessionId;

yiyingli.clicks = [];
try {
    yiyingli.clicks = JSON.parse(localStorage.getItem('click'));
} catch (err) {
    yiyingli.clicks = [];
}
if (yiyingli.clicks == null) {
    yiyingli.clicks = [];
}

yiyingli.setClicks = function (myClick) {
    yiyingli.clicks = myClick;
    localStorage.setItem("click", JSON.stringify(yiyingli.clicks));
};


yiyingli.log = function (src) {
    window.log = [];
    window.log['log'] = new Image();
    try {
        window.log['log'].src = src;
    } catch (err) {

    }
};


$('body').click(function (e) {
    yiyingli.clicks.push({
        x: e.pageX,
        y: e.pageY
    });
    if (yiyingli.clicks.length > 22) {
        yiyingli.clicks = yiyingli.clicks.slice(yiyingli.clicks.length - 20);
    }
    localStorage.setItem("click", JSON.stringify(yiyingli.clicks));
});

//(function () {
//    var windowUrl = $.trim(window.name);
//    if (windowUrl && windowUrl.indexOf("|%") !== -1) {
//        var urlArray = windowUrl.split("|%"), orginName = urlArray[0];
//        windowUrl = urlArray[1];
//        //把window.name归还给应用程序
//        window.name = orginName;
//        //发送打点请求
//        yiyingli.log(windowUrl);
//    }
//})();

window.addEventListener('unload', function (event) {
    var params = {};
    params.siteId = 1;
    params.version = 1;
    params.url = window.location.href;
    params.click = JSON.stringify(yiyingli.clicks);
    params.height = window.screen.availHeight;
    params.width = window.screen.availWidth;
    params.logUid = yiyingli.logUid;
    params.other = JSON.stringify({referrer: document.referrer, sessionId: yiyingli.sessionId, close: 1});
    var logUrl = yiyingli.baseUrl + "/mark?" + jQuery.param(params);
    yiyingli.log(logUrl);
    while (new Date - now >= 200) {
    }
});




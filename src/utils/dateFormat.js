Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Date.prototype.SevenFormat = function () { //author: meizz 
    var myDate = new Date() // 获取今天日期
    myDate.setDate(myDate.getDate() - 3)
    var dateArray = []
    var weekArray = []
    var monthArray = []
    var dates = []
    var flag = 1
    var wk = new Array("Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat");  
    let m = ''
    for (var i = 0; i < 7; i++) {
        m = (myDate.getMonth() + 1)
        monthArray.push(m)
        dateArray.push(myDate.getDate())
        weekArray.push(wk[myDate.getDay()])
        myDate.setDate(myDate.getDate() + flag)
        dates.push(myDate.getFullYear() + '-' + m + '-' + (myDate.getDate() - flag))
    }
    return {
        dateArray,
        weekArray,
        monthArray,
        dates
    }
}


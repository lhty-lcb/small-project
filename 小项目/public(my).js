// 范围随机数
function randomNum(min, max) {
    var x = parseInt(Math.random() * ((max - min) + (max - min) / Math.abs(max - min))) + min;
    return x;
}

// 获取id
function $id(ele) {
    return document.getElementById(ele);
}

// 补零(补字符的零)
function createZero(n) {
    if (typeof n === "string") {
        if (n.length < 2) {
            return "0" + n
        }
        return n;
    } else {
        if (n < 10) {
            return "0" + n;
        }
        return n;
    }
}

// 随机十六进制的颜色值
function randomColor() {
    var r = random(0, 255).toString(16);
    var g = random(0, 255).toString(16);
    var b = random(0, 255).toString(16);
    return "#" + createZero(r) + createZero(g) + createZero(b);
}

// 日期的格式化
function createDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var myDate = d.getDate();
    var day = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var millS = d.getMilliseconds();
    switch (day) {
        case 0: day = "日"; break;
        case 1: day = "一"; break;
        case 2: day = "二"; break;
        case 3: day = "三"; break;
        case 4: day = "四"; break;
        case 5: day = "五"; break;
        case 6: day = "六"; break;
    }
    return {
        year: year,
        month: createZero(month),
        date: createZero(myDate),
        day: day,
        hours: createZero(hours),
        minutes: createZero(minutes),
        seconds: createZero(seconds),
        millS: millS
    };
}

// 计算两个日期之间的差值
function dateDiff(d1, d2) {
    var date1 = new Date(d1);

    var date2 = d2 ? new Date(d2) : new Date();

    var t = Math.abs(date1.getTime() - date2.getTime());

    var day = parseInt(t / 1000 / 60 / 60 / 24);
    var h = parseInt((t - day * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
    var m = parseInt((t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / 1000 / 60);
    var s = parseInt((t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000)
    var ms = t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000 - s * 1000;

    return {
        day: day,
        h: h,
        m: m,
        s: s,
        ms: ms
    }
}

// 获取样式的兼容处理
function getStyle(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } else {
        return getComputedStyle(ele, false)[attr];
    }
}


// 取消事件冒泡，注意别忘记传参
function stopBubble(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}
// 阻止默认事件
function stopDefault(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false
    }
}


// 监听式事件绑定的封装
function addEvent(ele, type, cb) {
    if (ele.addEventListener) {
        ele.addEventListener(type, cb)
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, cb)
    } else {
        ele["on" + type] = cb;
    }
}
// 监听式事件删除的封装
function removeEvent(ele, type, cb) {
    // 作业...
}
//移动事件的封装
function move(ele, data, cb) {
    clearInterval(ele.t);
    ele.t = setInterval(() => {
        var tr = true;
        for (var i in data) {
            if (i === "opacity") {
                var iNow = getStyle(ele, i) * 100;
            } else if (i == "zIndex") {
                ele.style[i] = data[i];
                continue;
            } else {
                var iNow = parseInt(getStyle(ele, i));
            }
            var speed = (data[i] - iNow) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (i === "opacity") {
                ele.style[i] = (iNow + speed) / 100;
            } else {
                ele.style[i] = iNow + speed + "px";
            }

            if (data[i] != iNow) {
                tr = false;
            }
        }
        if (tr) {
            clearInterval(ele.t);
            console.log(1)
            cb && cb();
        }
    }, 16)
}
// setInterval(function(){},time)//定时器
// clearInterval(开启定时器的返回值)//关闭定时器
// setTimeout(function(){},time)//延时器
// clearTimeout(开启延时器的返回值)//关闭延时器
// str.charCodeAt();    //ASCII码转成数字
// String.fromCharCode(n);  //数字转成ASCII码

// 关于页面宽度
// document.body.clientWidth ==> BODY对象宽度
// document.body.clientHeight ==> BODY对象高度
// document.documentElement.clientWidth ==> 可见区域宽度
// document.documentElement.clientHeight ==> 可见区域高度

// document.body.clientWidth ==> 网页可见区域宽
// document.body.clientHeight ==> 网页可见区域高
// document.body.offsetWidth ==> 网页可见区域宽(包括边线的宽)
// document.body.offsetHeight ==> 网页可见区域高(包括边线的高)
// document.body.scrollWidth ==> 网页正文全文宽document.body.scrollHeight ==> 网页正文全文高
// document.body.scrollTop ==> 网页被卷去的高
// document.body.scrollLeft ==> 网页被卷去的左
// window.screenTop ==> 网页正文部分上
// window.screenLeft ==> 网页正文部分左
// window.screen.height ==> 屏幕分辨率的高
// window.screen.width ==> 屏幕可用工作区高度
// window.screen.availHeight ==> 屏幕可用工作区高度
// window.screen.availWidth ==> 屏幕可用工作区宽度

// //三点确定抛物线的a,b,c系数
// var startPoint = {
//     x:addToCart.offsetLeft+addToCart.offsetWidth/2,
//     y:addToCart.offsetTop - product.offsetHeight
// }
// var endPoint = {
//     x:shopCart.offsetLeft+shopCart.offsetWidth/2,
//     y:shopCart.offsetTop
// }
// var topPoint = {
//     x:endPoint.x-80,
//     y:endPoint.y-50
// }	
// //三点求a,b,c系数:y = a*x*x+b*x+c;
// var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x) - (startPoint.y - topPoint.y) * (startPoint.x - endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x)-(startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));  
// var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x - startPoint.x);  
// var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;
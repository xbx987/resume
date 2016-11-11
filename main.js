var addEvent = function(elem, eventName, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, handler, false);
    } else if (elem.attachEvent) {
        //兼容ie
        elem.attachEvent("on" + eventName, handler);
    }
};
var extend=function () {
    var i=1,
        len=arguments.length,
        target=arguments[0];
    for(i;i<len;i++){
        for (var j in arguments[i]){
            target[j]=arguments[j];
        }
    }
    return target;
};
var throttle = function () {
    var isClear = arguments[0], fn;
    if (typeof  isClear === "boolean") {
        fn = arguments[1];
        fn._throttleID && clearTimeout(fn._throttleID);
    } else {
        fn = isClear;
        param = arguments[1];
        var p = extend({context: null, args: [], time: 300}, param);
        arguments.callee(true, fn);
        fn._throttleID = setTimeout(function () {
            fn.apply(p.context, p.args)
        }, p.time)
    }
};
var mainPage=document.getElementById("ma-bd");
function paperInit(cas, width, height) {
    //设置画布的宽高
    cas.width = width;
    cas.height = height;
    //指定上下文
    var cxt = canvas.getContext('2d');
    //说明填充的样式
    cxt.fillStyle = 'rgba(255,255,255,0.3)';
    return cxt;
}
function num(max, _min) {
    var min = arguments[1] || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var WIDTH = mainPage.clientWidth, HEIGHT = mainPage.clientHeight, POINT = 36;
var canvas = document.getElementById('Mycanvas');
var context = paperInit(canvas, WIDTH, HEIGHT);
var circleArr = [];

function Circle(x, y, r, moveX, moveY) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.moveX = moveX;
    this.moveY = moveY;
}

Circle.prototype = {
    constructor: Circle,
    init: function (context, canvas) {
        var x = this.x,
            y = this.y;
        x += this.moveX;
        y += this.moveY;
        if (x > canvas.width) {
            x = 0;
        } else if (x < 0) {
            x = canvas.width;
        }
        if (y > canvas.height) {
            y = 0;
        } else if (y < 0) {
            y = canvas.height;
        }
        this.x = x;
        this.y = y;
        this.draw(context);
    },
    draw: function (cxt) {
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
    }
};
for (var i = 0; i < POINT; i++) {
    circleArr[i] = new Circle(num(WIDTH), num(HEIGHT), num(40, 10), num(10, -10) / 10, num(10, -10) / 10);
}
var timer = setInterval(function () {
    //清空画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = circleArr.length - 1; i >= 0; i--) {
        circleArr[i].init(context, canvas);
    }
}, 40);
function rePage() {
    var width = mainPage.clientWidth,
        height = mainPage.clientHeight;
    context = paperInit(canvas, width, height);
}
addEvent(window,"resize",function () {
    throttle(rePage);
});

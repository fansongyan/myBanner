(function () {
    var ary = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg"];
    var autoTimer = null, step = 0, count = ary.length;
    var inner = document.getElementById("inner"), imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip"), tipList = tip.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft"), btnRight = document.getElementById("btnRight");

    bindData();
    function bindData() {
        var str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<div><img src='' trueImg='" + ary[i] + "' /></div>";
        }
        str += "<div><img src='' trueImg='" + ary[0] + "' /></div>";
        inner.innerHTML = str;
        inner.style.width = (count + 1) * 1000 + "px";

        str = "";
        for (i = 0; i < ary.length; i++) {
            str += "<li></li>";
        }
        tip.innerHTML = str;
        selectTip();
    }

    window.setTimeout(lazyImg, 800);
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    animate(curImg, {opacity: 1}, 500);
                }
            }(i)
        }
    }

    function selectTip() {
        var temp = step;
        temp >= tipList.length ? temp = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = temp === i ? "bg" : null;
        }
    }


    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onclick = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(inner, {left: -step * 1000}, 500);
                selectTip();
                autoTimer = window.setInterval(autoMove, 2000);
            }
        }
    }

    tipMove();


    btnLeft.onclick = function () {
        window.clearInterval(autoTimer);
        step--;
        if (step < 0) {
            inner.style.left = -count * 1000 + "px";
            step=count-1;
        }
        animate(inner,{left:-step*1000},500);
        selectTip();
        autoTimer=window.setInterval(autoMove,2000)
    }

    btnRight.onclick = function () {
        window.clearInterval(autoTimer);
        autoMove();
        autoTimer = window.setInterval(autoMove, 2000);
    }

    function autoMove() {
        step++;
        if (step > count) {
            inner.style.left = 0;
            step = 1;
        }
        animate(inner, {left: -step * 1000}, 500);
        selectTip();
    }

    autoTimer = window.setInterval(autoMove, 2000);

})()
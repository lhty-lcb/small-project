window.onload = function () {
    function Main() {
        this.msg = document.getElementById("msg");
        this.time = document.getElementById("time");
        this.score = document.getElementById("score");
        this.box = document.getElementById("box");
        this.smallBox = this.box.children;
        this.btn = document.getElementById("btn");
        this.first = true;
        this.timer = null;
        this.canLeft = true;
        this.canRight = true;
        this.canTop = true;
        this.canBottom = true;
        this.newNum = null;
        this.arr = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        this.init = function () {
            var that = this;

            // 绑定用户控制事件
            this.control();
            // 生成第一个小方块
            this.step();
            this.step();
            this.refresh()
            // 绑定重置游戏方法
            this.btn.onclick = function () {
                that.reset();
            }
        }
        // 得分方法
        this.addScore = function () {

        }
        // 计时方法开启
        this.openTimer = function (t) {
            var that = this;
            this.timer = setInterval(function () {
                var date = new Date();
                var time = date.getTime() - t;
                time = Math.round(time / 1000);
                that.time.innerHTML = time + "秒";
            }, 1000);
        }

        // 重置游戏的方法
        this.reset = function () {
            for (var i = 0; i < this.arr.length; i++) {
                for (var j = 0; j < this.arr[0].length; j++) {
                    this.arr[i][j] = 0;
                }
            }
            clearInterval(this.timer);
            this.first = true;
            this.time.innerHTML = 0;
            this.step();
            this.step();
        }

        // 将数字加进格子的方法
        this.addRandomNum = function () {
            this.arr[this.newNum[0]][this.newNum[1]] = this.newNum[2];
        }

        // 生成数字的方法
        this.produceNum = function () {
            var posNum = 0;
            for (var i = 0; i < this.arr.length; i++) {
                for (var j = 0; j < this.arr[0].length; j++) {
                    if (this.arr[i][j] == 0) {
                        posNum++;
                    }
                }
            }
            if (posNum != 0) {
                var pos = randomNum(1, posNum);
                for (var i = 0; i < this.arr.length; i++) {
                    for (var j = 0; j < this.arr[0].length; j++) {
                        if (this.arr[i][j] == 0) {
                            pos--;
                            if (pos == 0) {
                                this.newNum = [i, j, randomNum(0, 1) ? 2 : 4];
                            }
                        }
                    }
                }
            } else {
                return false;
            }
        }
        // 判断是否能够继续移动方法
        this.canMove = function () {
            var count = false;
            for (var i = 0; i < this.arr.length; i++) {
                for (var j = 0; j < this.arr[0].length; j++) {
                    if (this.arr[i][j] == 0) {
                        count = true;
                    }
                }
            }
            for (var i = 0; i < this.arr.length - 1; i++) {
                for (var j = 0; j < this.arr[0].length; j++) {
                    // 判断左
                    if (this.arr[j][2 - i] == this.arr[j][3 - i]) {
                        canLeft = true;
                        count = true;
                    } else {
                        canLeft = false;
                    }
                    // 判断上
                    if (this.arr[2 - i][j] == this.arr[3 - i][j]) {
                        canTop = true;
                        count = true;
                    } else {
                        canTop = false;
                    }
                    // 判断右
                    if (this.arr[j][i + 1] == this.arr[j][i]) {
                        canRight = true;
                        count = true;
                    } else {
                        canRight = false;
                    }
                    // 判断下
                    if (this.arr[i + 1][j] == this.arr[i][j]) {
                        canBottom = true;
                        count = true;
                    } else {
                        canBottom = false;
                    }
                }
            }
            return count;
        }
        // 刷新数据方法
        this.refresh = function () {
            for (var i = 0; i < this.smallBox.length - 2; i++) {
                this.smallBox[i].innerHTML = "";
            }
            for (var i = 0; i < this.arr.length; i++) {
                for (var j = 0; j < this.arr[0].length; j++) {
                    if (this.arr[i][j] != 0) {
                        var num = document.createElement("div");
                        num.className = this.setClassName(this.arr[i][j])
                        // num.className = "num";
                        num.innerHTML = this.arr[i][j];
                        this.smallBox[i * 4 + j].appendChild(num);
                    }
                }
            }
            var n = this.newNum[0] * 4 + this.newNum[1];
            var dom = this.smallBox[n].children[0]
            dom.innerHTML = "";
            dom.className = "num hidden";
            var that = this;
            move(dom, { width: 67, height: 67 }, function () {
                that.smallBox[n].children[0].innerHTML = that.newNum[2];
                // 如果加入数字后无法移动了
                setTimeout(function () {
                    if (!that.canMove()) {
                        setTimeout(function () {
                            that.gameOver();
                        })
                    }
                })
            });

        }
        // 根据数字设置不同的类名;
        this.setClassName = function (num) {
            switch (num) {
                case 4:
                    return "num num4";
                case 8:
                    return "num num8";
                case 16:
                    return "num num16";
                case 32:
                    return "num num32";
                case 64:
                    return "num num64";
                case 128:
                    return "num num128";
                case 256:
                    return "num num256";
                case 512:
                    return "num num512";
                case 1024:
                    return "num num1024";
                case 2048:
                    return "num num2048";
                default:
                    return "num";
            }
        }
        // 游戏结束方法
        this.gameOver = function () {
            clearInterval(this.timer);
            alert("游戏结束了~");
        }
        this.step = function () {
            this.produceNum();
            this.addRandomNum();
            this.refresh();
        }
        // 方块左移的方法
        this.moveLeft = function () {
            var temArr = [[], [], [], []];
            if (this.canLeft) {
                for (var i = 0; i < this.arr.length; i++) {
                    for (var j = 0; j < this.arr[0].length; j++) {
                        temArr[i][j] = this.arr[i][j];
                    }
                }
                // console.log(temArr)
                for (var t = 0; t < this.arr.length - 1; t++) {
                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[j][i] == this.arr[j][i + 1]) {
                                this.arr[j][i] *= 2;
                                this.arr[j][i + 1] = 0;
                            }
                        }
                    }
                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[j][2 - i] == 0) {
                                this.arr[j][2 - i] = this.arr[j][3 - i];
                                this.arr[j][3 - i] = 0;
                            }
                        }
                    }
                }
                if (temArr.toString() != this.arr.toString()) {
                    this.step();
                }
            }
        }
        // 方块滑块上移方法
        this.moveUp = function () {
            var temArr = [[], [], [], []];
            if (this.canLeft) {
                for (var i = 0; i < this.arr.length; i++) {
                    for (var j = 0; j < this.arr[0].length; j++) {
                        temArr[i][j] = this.arr[i][j];
                    }
                }

                for (var t = 0; t < this.arr.length - 1; t++) {
                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[i][j] == this.arr[i + 1][j]) {
                                this.arr[i][j] *= 2;
                                this.arr[i + 1][j] = 0;
                            }
                        }
                    }
                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[2 - i][j] == 0) {
                                this.arr[2 - i][j] = this.arr[3 - i][j];
                                this.arr[3 - i][j] = 0;
                            }
                        }
                    }
                }

                if (temArr.toString() != this.arr.toString()) {
                    this.step();
                }
            }
        }
        // 方块右移方法
        this.moveRight = function () {
            var temArr = [[], [], [], []];
            if (this.canLeft) {
                for (var i = 0; i < this.arr.length; i++) {
                    for (var j = 0; j < this.arr[0].length; j++) {
                        temArr[i][j] = this.arr[i][j];
                    }
                }

                for (var t = 0; t < this.arr.length - 1; t++) {

                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[j][3 - i] == this.arr[j][2 - i]) {
                                this.arr[j][3 - i] *= 2;
                                this.arr[j][2 - i] = 0;
                            }
                        }
                    }
                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[j][i + 1] == 0) {
                                this.arr[j][i + 1] = this.arr[j][i];
                                this.arr[j][i] = 0;
                            }
                        }
                    }
                }

                if (temArr.toString() != this.arr.toString()) {
                    this.step();
                }
            }

        }
        // 方块下移方法
        this.moveBottom = function () {
            var temArr = [[], [], [], []];
            if (this.canLeft) {
                for (var i = 0; i < this.arr.length; i++) {
                    for (var j = 0; j < this.arr[0].length; j++) {
                        temArr[i][j] = this.arr[i][j];
                    }
                }

                for (var t = 0; t < this.arr.length - 1; t++) {
                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[3 - i][j] == this.arr[2 - i][j]) {
                                this.arr[3 - i][j] *= 2;
                                this.arr[2 - i][j] = 0
                            }
                        }
                    }
                    for (var i = 0; i < this.arr.length - 1; i++) {
                        for (var j = 0; j < this.arr[0].length; j++) {
                            if (this.arr[i + 1][j] == 0) {
                                this.arr[i + 1][j] = this.arr[i][j];
                                this.arr[i][j] = 0
                            }
                        }
                    }
                }

                if (temArr.toString() != this.arr.toString()) {
                    this.step();
                }
            }
        }
        // 用户控制的方法
        this.control = function () {
            var that = this;
            document.onkeydown = function (eve) {
                var e = eve || window.event;
                if (that.first && (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)) {
                    // 获取当前时间
                    var date = new Date();
                    that.openTimer(date.getTime());
                    that.first = false;
                }

                if (e.keyCode == 37) {//左
                    that.moveLeft();
                } else if (e.keyCode == 38) {//上
                    that.moveUp();
                } else if (e.keyCode == 39) {//右
                    that.moveRight();
                } else if (e.keyCode == 40) {//下
                    that.moveBottom();
                }
            }
        }
    }
    var main = new Main();
    main.init();
}
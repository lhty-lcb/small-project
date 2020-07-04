var Game = function () {
    // 获取dom元素
    var gameDiv;
    var nextDiv;
    // 游戏矩阵
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // 当前方块
    var cur;
    // 下一个方块
    var next;
    // divs
    var nextDivs = [];
    var gameDivs = [];
    // 初始化Div
    var initDiv = function (container, data, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement("div");
                newNode.className = "none";
                newNode.style.top = i * 20 + "px";
                newNode.style.left = j * 20 + "px";
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }
    // 获取指定范围随机数
    var randomNum = function (min, max) {
        return parseInt(Math.random() * ((max - min) + (max - min) / Math.abs(max - min))) + min
    }
    // 刷新Div
    var colorNum = 0;
    var col1;
    var col2;
    var changeColor = function () {
        if (colorNum == 0) {
            col1 = "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
            col2 = "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
            colorNum = 2;
        } else if (colorNum == 1) {
            col1 = col2;
            col2 = "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
            colorNum = 2;
        }
    }
    var refreshDiv = function (data, divs, col) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = "none";
                    divs[i][j].style.backgroundColor = "#f2faff";
                } else if (data[i][j] == 1) {
                    divs[i][j].className = "done";
                    divs[i][j].style.backgroundColor = "gray";
                } else if (data[i][j] == 2) {
                    divs[i][j].className = "current";
                    divs[i][j].style.backgroundColor = col;
                }
            }
        }
    }
    // 检测点是否合法
    // divs[i][j].style.backgroundColor=`rgb(${col1},${col2},${col3})`;
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false;//超出上边界
        } else if (pos.x + x >= gameData.length) {
            return false;// 超出上边界
        } else if (pos.y + y < 0) {
            return false;//超出左边界
        } else if (pos.y + y >= gameData[0].length) {
            return false;//超出右边界
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false;//位置上已经有落下来了的方块
        } else {
            return true;
        }
    }
    // 检测数据是否合法
    var isValid = function (pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    // 清除数据
    var clearData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    }
    // 设置数据
    var setData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    }
    // 下移
    var down = function () {
        if (count == 1) {
            if (cur.canDown(isValid)) {
                clearData();
                cur.down();
                setData();
                refreshDiv(gameData, gameDivs, col1);
                return true;
            } else {
                return false;
            }
        }
    }
    // 左移
    var left = function () {
        if (count == 1) {
            if (cur.canLeft(isValid)) {
                clearData();
                cur.left();
                setData();
                refreshDiv(gameData, gameDivs, col1);
            }
        }
    }
    // 右移
    var right = function () {
        if (count == 1) {
            if (cur.canRight(isValid)) {
                clearData();
                cur.right();
                setData();
                refreshDiv(gameData, gameDivs, col1);
            }
        }
    }
    // 旋转
    var rotate = function () {
        oXz.load();
        if (count == 1) {
            if (cur.canRotate(isValid)) {
                clearData();
                cur.rotate();
                setData();
                refreshDiv(gameData, gameDivs, col1);
                oXz.play();
            }
        }
    }
    // 方块自动下落
    var oStartGame = document.getElementById("startGame");//按钮
    var oTime = document.getElementById("time");//已用时
    var oScore = document.getElementById("score");//已得分
    var oGameOver = document.getElementById("gameover");//游戏结束提示
    var oLevel = document.getElementById("level");//难度等级
    var oBgm = document.getElementById("bgm");//背景音乐
    var oXz = document.getElementById("xz");//旋转音效
    var oLx = document.getElementById("lx");//落下后音效
    var oFail = document.getElementById("fail")//游戏结束音效
    var oClear = document.getElementById("clear")//消除音效
    var oHrtg = document.getElementById("hrtgVideo")//黑人抬棺
    var oMsg = document.getElementById("msg")//黑人一笑
    var count = 0;
    var time = 0;
    var level;
    var speed = 550;
    var autoDown = function () {
        oStartGame.onclick = function () {
            if (count == 0) {
                oStartGame.st = setInterval(() => {
                    if (!down()) {
                        fixed();
                        checkClear();
                        if (checkNine()) {
                            bofang();
                        } else {
                            oHrtg.load();
                            oHrtg.style.display = "none";
                            oMsg.style.display = "none";
                        }
                        var gameOver = checkGameOver();
                        if (gameOver) {
                            stop();
                        } else {
                            performNext(randomNum(0, 6), randomNum(0, 3))
                        }
                    }
                }, speed);
                oStartGame.ti = setInterval(() => {
                    time++;
                    oTime.innerHTML = time;
                }, 1000);
                count = 1;
                oBgm.volume = 0.3;
                if (checkNine()) {
                    oHrtg.volume = 0.3;
                    oHrtg.play();
                } else {
                    oBgm.play();
                }
                oStartGame.innerHTML = "暂停游戏";
                oGameOver.innerHTML = ""
                oGameOver.style.color = "red";
                oGameOver.style.display = "none";
            } else if (count == 1) {
                clearInterval(oStartGame.st);
                clearInterval(oStartGame.ti);
                count = 0;
                oBgm.pause();
                oHrtg.pause();
                oStartGame.innerHTML = "继续游戏";
                oGameOver.innerHTML = "游戏被暂停了~"
                oGameOver.style.color = "blue";
                oGameOver.style.display = "block";
            } else if (count == 2) {
                oStartGame.innerHTML = "开始游戏";
                var local = new Local();
                oFail.load();
                oHrtg.load();
                oHrtg.style.display = "none";
                oMsg.style.display = "none";
                local.start();
                oTime.innerHTML = 0;
                oScore.innerHTML = 0;
                oGameOver.innerHTML = "";
                oGameOver.style.display = "none";
                count = 0;
            }
        }
    }

    // 播放黑人抬棺
    var bofang = function () {
        oHrtg.play();
        oHrtg.volume = 0.3;
        oHrtg.style.display = "block";
        oMsg.style.display = "block";
    }

    // 游戏结束方法
    var stop = function () {
        if (oStartGame.st && oStartGame.ti) {
            clearInterval(oStartGame.st);
            clearInterval(oStartGame.ti);
            oBgm.load();
            oHrtg.pause();
            oFail.play();
            oFail.volume = 0.3;
            oStartGame.innerHTML = "重新开始";
            oGameOver.innerHTML = "游戏结束了！"
            oGameOver.style.display = "block";
            count = 2;
        }
    }
    // 方块移动到底部给它固定
    var fixed = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        colorNum = 1;
        oLx.play();
        setTimeout(() => {
            oLx.load();
        }, 500);
        refreshDiv(gameData, gameDivs, col1);
    }
    // 使用下一个方块
    var performNext = function (type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        changeColor();
        refreshDiv(gameData, gameDivs, col1);
        refreshDiv(next.data, nextDivs, col2);
    }
    var sto1;
    // 判断是否能清除
    var checkClear = function () {
        var line = 0;
        for (var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line++;
                for (var m = i; m > 0; m--) {
                    for (var n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m - 1][n];
                    }
                }
                for (var n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0;
                }
                i++;
                oClear.play();
            }
        }
        var temScore = 0;
        switch (line) {
            case 1:
                temScore = 10; break;
            case 2:
                temScore = 30; break;
            case 3:
                temScore = 60; break;
            case 4:
                temScore = 100; break;
            default: break;
        }
        oScore.innerHTML = parseInt(oScore.innerHTML) + temScore;
        level = parseInt(oScore.innerHTML / 100) + 1;
        oLevel.innerHTML = level;
        speed = (550 - (level * 50));
        sto1 = setTimeout(() => {
            oStartGame.click();
            oStartGame.click();
        }, 0);
    }
    // 判断是否到了第九个位置
    var checkNine = function () {
        var isNine = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[9][i] == 1) {
                isNine = true;
                break;
            }
        }
        return isNine;
    }
    // 判断游戏是否结束
    var checkGameOver = function () {
        var gameOver = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[1][i] == 1) {
                gameOver = true;
                clearTimeout(sto1);
                break;
            }
        }
        return gameOver;
    }
    // 初始化的方法
    var init = function (doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = SquareFactory.prototype.make(randomNum(0, 6), randomNum(0, 3));
        next = SquareFactory.prototype.make(randomNum(0, 6), randomNum(0, 3));
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        setData();
        autoDown();
        changeColor();
        refreshDiv(gameData, gameDivs, col1);
        refreshDiv(next.data, nextDivs, col2);
    }
    // 导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.autoDown = autoDown;
    this.fall = function () {
        if (count == 1) {
            while (true) {
                if (down()) { } else {
                    fixed();
                    // performNext(randomNum(0, 6), randomNum(0, 3))
                    break;
                }
            };
        }
    }
}
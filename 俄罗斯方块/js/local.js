var Local = function () {
    // 游戏对象
    var game;
    // 绑定键盘事件
    var oStartGame = document.getElementById("startGame");//按钮
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 38) {//上
                game.rotate();
            } else if (e.keyCode == 39) {//右
                game.right();
            } else if (e.keyCode == 40) {//下
                game.down();
            } else if (e.keyCode == 37) {//左
                game.left();
            } else if (e.keyCode == 32) {//空格
                game.fall();
            } else if (e.keyCode == 13) {//回车
                oStartGame.blur();
                oStartGame.click();
            }
        }
    }
    // 开始方法
    var start = function () {
        var doms = {
            gameDiv: document.getElementById("game"),
            nextDiv: document.getElementById("next")
        }
        game = new Game();
        game.init(doms);
        bindKeyEvent();
    }
    // 导出API
    this.start = start;
}
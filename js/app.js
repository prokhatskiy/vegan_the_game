'use strict';

(function() {
    var app = this;

    //Private properties
    var config = {
        canvasId: 'gameCanvas',
        playerColor: 'rgb(0, 0, 0)',
        meatColor: 'rgb(255, 0, 0)',
        vegetablesColor: 'rgb(0, 255, 0)'
    };

    var Canvas = function Canvas() {
        this.canvas = document.getElementById(config.canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvasWidthPx = this.canvas.width;
        this.canvasHeightPx = this.canvas.height;
        this.canvasWidth = 15;
        this.canvasHeight = 15;

        this.widthK = this.canvasWidthPx / this.canvasWidth;
        this.heightK = this.canvasHeightPx / this.canvasHeight;

        this.initialize();
    };

    Canvas.prototype.initialize = function _initialize() {
        this.game = new app.Game({
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight
        });

        this.animation(this.render, this);
    };

    Canvas.prototype.render = function _render() {
        var _this = this;
        _this.ctx.clearRect(0, 0, this.canvasWidthPx, this.canvasHeightPx);

        var playerPos = this.game.player.getPosition();
        _this.ctx.fillStyle = config.playerColor;
        _this.ctx.fillRect(playerPos.x * _this.widthK, playerPos.y * _this.heightK, _this.widthK, _this.heightK);


        this.game.food.forEach(function(meal) {
            if(!meal.alive) {
                return;
            }

            if(meal.getType() === 'vegetable') {
                _this.ctx.fillStyle = config.vegetablesColor;
            }
            else {
                _this.ctx.fillStyle = config.meatColor;
            }

            var pos = meal.getPosition();
            _this.ctx.fillRect(pos.x * _this.widthK, pos.y * _this.heightK, _this.widthK, _this.heightK);
        });
    };

    Canvas.prototype.animation = function _animation(callback, context) {
        var context = context || this;

        return requestAnimationFrame(function measure() {
            if(typeof callback === 'function') callback.call(context);
            requestAnimationFrame(measure);
        });
    };

    app.Canvas = Canvas;

    return Canvas.Canvas;
}).call(window.VGN = window.VGN || {});
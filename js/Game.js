'use strict';

(function() {
    var app = this;
    var instance;

    var config = {
        canvasWidth: 100,
        canvasHeight: 100,
        stepDelay: 1000,
        appearDelay: 1000
    };

    var Game = function _Game() {
        if(instance !== undefined) {
            return instance;
        }

        instance = this;

        this.initialize();
    };

    Game.prototype.initialize = function _initialize() {
        this.food = [];
        this.time = 0;

        this.player = new app.Player({
            canvasWidth: config.canvasWidth,
            canvasHeight: config.canvasHeight
        });

        this.startCreatingOfFood();

        this.startTimer();
        this.bindKeyboard();
        return this;
    };

    Game.prototype.getCanvasSize = function _getCanvasSize() {
      return {width: config.canvasWidth, height: config.canvasHeight};
    };

    Game.prototype.bindKeyboard = function _bindKeyboard() {

    };

    Game.prototype.startTimer = function _startTimer() {
        var _this = this;
        this.timer = setInterval(function() {
            _this.time++;
        }, 1000);
    };

    Game.prototype.startCreatingOfFood = function _startCreatingOfFood() {
        var _this = this;
        setInterval(function() {
            _this.food.push(new app.Meal({
                canvasWidth: config.canvasWidth,
                canvasHeight: config.canvasHeight,
                delay: config.stepDelay
            }));
        }, config.appearDelay);
    };

    app.Game = Game;

    return app.Game;

}).call(window.VGN = window.VGN || {});
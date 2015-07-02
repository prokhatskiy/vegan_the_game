'use strict';

(function() {
    var app = this;
    var instance;

    var Game = function _Game(config) {
        var config = config || {};

        this.config = {
            canvasWidth: config.canvasWidth,
            canvasHeight: config.canvasHeight,
            stepDelay: 100,
            appearDelay: 500
        };

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
            canvasWidth: this.config.canvasWidth,
            canvasHeight: this.config.canvasHeight
        });

        this.startCreatingOfFood();

        this.startTimer();
        this.bindKeyboard();
        return this;
    };

    Game.prototype.getCanvasSize = function _getCanvasSize() {
      return {width: this.config.canvasWidth, height: this.config.canvasHeight};
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
                canvasWidth: _this.config.canvasWidth,
                canvasHeight: _this.config.canvasHeight,
                step: _this.config.stepDelay
            }));
        }, _this.config.appearDelay);
    };

    app.Game = Game;

    return app.Game;

}).call(window.VGN = window.VGN || {});
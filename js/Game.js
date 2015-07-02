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
            appearDelay: 500,
            checkDelay: 500,
            scoreId: 'score',
            gameOverClass: 'gameOver'
        };

        if(instance !== undefined) {
            return instance;
        }

        instance = this;

        this.gameOver = false;

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
        this.bindEvents();
        this.scoreEl = document.getElementById(this.config.scoreId);
        return this;
    };

    Game.prototype.getCanvasSize = function _getCanvasSize() {
      return {width: this.config.canvasWidth, height: this.config.canvasHeight};
    };

    Game.prototype.bindEvents = function _bindEvents() {
        var _this = this;
        app.subscribe('gameOver', function() {
            _this.stopGame();
        });
    };

    Game.prototype.bindKeyboard = function _bindKeyboard() {
        var _this = this;

        document.body.addEventListener('keydown', function(event) {
            if(_this.gameOver) {
                return;
            }

            switch (event.keyCode) {
                case 37:
                    app.trigger('go:left'); event.preventDefault(); break;
                case 38:
                    app.trigger('go:up'); event.preventDefault(); break;
                case 39:
                    app.trigger('go:right'); event.preventDefault(); break;
                case 40:
                    app.trigger('go:down'); event.preventDefault(); break;
            }
        });
    };

    Game.prototype.startTimer = function _startTimer() {
        var _this = this;

        _this.timer = setInterval(function() {
            var playerPos = _this.player.getPosition();

            _this.food.forEach(function(meal) {
                if(!meal.alive) {
                    return false;
                }

                var mealPos = meal.getPosition();

                if(mealPos.x === playerPos.x && mealPos.y === playerPos.y) {
                    meal.alive = false;

                    if(meal.getType() === 'vegetable') {
                        app.trigger('eat');
                    } else {
                        app.trigger('gameOver');
                    }
                }

                _this.scoreEl.innerHTML = _this.player.score;
            });
        }, _this.checkDelay);
    };

    Game.prototype.startCreatingOfFood = function _startCreatingOfFood() {
        var _this = this;
        _this.foodCreation = setInterval(function() {
            _this.food.push(new app.Meal({
                canvasWidth: _this.config.canvasWidth,
                canvasHeight: _this.config.canvasHeight,
                step: _this.config.stepDelay
            }));
        }, _this.config.appearDelay);
    };

    Game.prototype.stopGame = function _stopGame() {
        this.gameOver = true;

        document.body.classList.add(this.config.gameOverClass);

        clearInterval(this.foodCreation);

        this.food.forEach(function(meal) {
           meal.alive = false;
        });
    };

    app.Game = Game;

    return app.Game;

}).call(window.VGN = window.VGN || {});
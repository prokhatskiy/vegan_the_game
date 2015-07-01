'use strict';

(function() {
    var app = this;

    var Meal = function _Meal(options) {
        var _this = this;

        //Private properties
        var options = options || {};
        var props = {
            canvasWidth: options.canvasWidth || 100,
            canvasHeight: options.canvasHeight || 100,
            step: options.step || 1000,
            type: options.type || 'meat',
            x: options.x || 50,
            y: options.y || 100
        };

        this.getType = function _getType() {
            return props.type;
        };

        this.getPosition = function _getPosition() {
            return {x: props.x, y: props.y};
        };

        this.setPosition = function _setPosition(x, y) {
            props.x = x;
            props.y = y;

            return this.getPosition();
        };

        this.getCanvasSize = function _getCanvasSize() {
            return {height: props.canvasHeight, width: props.canvasWidth};
        };

        this.directon = ((props.x === props.canvasWidth || props.y === props.canvasHeight) ? '-' : '+') +  (((props.x === props.canvasWidth || props.x === props.canvasHeight)) ? 'x' : 'y');

        this.counter = setInterval(function() {
            _this.go();
        }, props.step);
    };

    Meal.prototype.checkPosition = function() {
        var position = this.getPosition();
        var canvas = this.getCanvasSize();

        return ((position.x < canvas.width && position.x > 0) || (position.y < canvas.height && position.y > 0));
    };

    Meal.prototype.go = function _go() {
        if(!this.checkPosition()) {
            this.destroy();
        }

        var position = this.getPosition();

        switch(this.directon) {
            case '-x':
                this.setPosition(position.x - 1, position.y); break;
            case '+x':
                this.setPosition(position.x + 1, position.y); break;
            case '-y':
                this.setPosition(position.x, position.y - 1); break;
            case '+y':
                this.setPosition(position.x, position.y + 1); break;
        }

        return this;
    };

    Meal.prototype.destroy = function _destroy() {
        clearInterval(this.counter);
        console.log(''this.getPosition());
    };

    app.Meal = Meal;

    return app.Meal;
}).call(window.VGN = window.VGN || {});
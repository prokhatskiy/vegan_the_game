'use strict';

(function() {
    var app = this;

    //Private method
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var Meal = function _Meal(options) {
        var _this = this;

        this.alive = true;

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

        //Private properties
        var options = options || {};
        var props = {
            canvasWidth: options.canvasWidth,
            canvasHeight: options.canvasHeight,
            step: options.step,
            type: this.pickType()
        };

        var startPos = this.setStartPosition();

        this.setPosition(startPos.x, startPos.y);

        this.directon = ((props.x === props.canvasWidth || props.y === props.canvasHeight) ? '-' : '+') +  (((props.x === props.canvasWidth || props.x === props.canvasHeight)) ? 'x' : 'y');

        this.counter = setInterval(function() {
            _this.go();
        }, props.step);
    };

    Meal.prototype.checkPosition = function() {
        var position = this.getPosition();
        var canvas = this.getCanvasSize();

        return ((position.x < canvas.width && position.x > 0) && (position.y < canvas.height && position.y > 0));
    };

    Meal.prototype.go = function _go() {
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

        if(!this.checkPosition()) {
            this.destroy();
        }

        return this;
    };

    Meal.prototype.destroy = function _destroy() {
        clearInterval(this.counter);

        this.alive = false;
    };

    Meal.prototype.setStartPosition = function _setStartPosition() {
        var x,
            y,
            canvas = this.getCanvasSize(),
            side = getRandomInt(1,4);

        switch (side) {
            case 1:
                y = canvas.height; x = getRandomInt(1, canvas.width - 1); break;
            case 2:
                x = canvas.width; y = getRandomInt(1, canvas.height - 1); break;
            case 3:
                y = 0; x = getRandomInt(1, canvas.width - 1); break;
            case 4:
                x = 0; y = getRandomInt(1, canvas.height - 1); break;
        }

        return {x: x, y: y};
    };

    Meal.prototype.pickType = function _pickType() {
        if(getRandomInt(0, 1)) {
            return 'meat';
        }

        return 'vegetable';
    };


    app.Meal = Meal;

    return app.Meal;
}).call(window.VGN = window.VGN || {});
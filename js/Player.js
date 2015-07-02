'use strict';

(function() {
    var app = this;
    var instance;

    var Player = function _Player(options) {
        if(instance !== undefined) {
            return instance;
        }

        instance = this;

        //Private properties
        var props = {
            x: 0,
            y: 0,
            canvasHeight: options.canvasHeight,
            canvasWidth: options.canvasWidth,
            playerName: options.playerName || 'Player'
        };

        //Set starting position
        props.x = Math.round(props.canvasWidth / 2);
        props.y = Math.round(props.canvasHeight / 2);

        //Methods which depends on private properties
        this.getPosition = function _getPosition() {
            return {x: props.x, y: props.y};
        };

        this.getCanvasSize = function _getCnvasSize() {
            return {width: props.canvasWidth, height: props.canvasHeight};
        };

        this.setPosition = function _setPosition(x, y) {
            if(!this.checkPosition(x, y)) {
                return false;
            }

            props.x = x;
            props.y = y;

            return this.getPosition();
        };

        this.score = 0;

        this.listenEvents();
    };

    Player.prototype.checkPosition = function _checkPosition(x, y) {
        var canvasSize = this.getCanvasSize();

        if ((x < 0) || (x > canvasSize.width) || (y < 0) || (y > canvasSize.height)) {
            return false;
        }
        return true;
    };

    Player.prototype.go = function _go(direction) {
        var position = this.getPosition();

        switch(direction) {
            case 'up':
                return this.setPosition(position.x, position.y - 1); break;
            case 'right':
                return this.setPosition(position.x + 1, position.y); break;
            case 'down':
                return this.setPosition(position.x, position.y + 1); break;
            case 'left':
                return this.setPosition(position.x - 1, position.y); break;
            default:
                return false;
        }
    };

    Player.prototype.listenEvents = function _listenEvents() {
        var _this = this;
        var currentPos = _this.getPosition();

        app.subscribe('go:up', function() {
            _this.go('up');
        });

        app.subscribe('go:right', function() {
            _this.go('right');
        });

        app.subscribe('go:down', function() {
            _this.go('down');
        });

        app.subscribe('go:left', function() {
            _this.go('left');
        });

        app.subscribe('eat', function() {
           _this.score += 100;
        });
    };

    app.Player = Player;

    return app.Player;
}).call(window.VGN = window.VGN || {});
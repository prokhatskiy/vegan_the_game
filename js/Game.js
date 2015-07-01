'use strict';

(function() {
    var app = this;
    var instance;

    var Game = function _Game() {
        if(instance !== undefined) {
            return instance;
        }

        instance = this;

        this.initialize();
    };

    Game.prototype.initialize = function _initialize() {

        return this;
    };

    app.Game = Game;

    return app.Game;

}).call(window.VGN = window.VGN || {});
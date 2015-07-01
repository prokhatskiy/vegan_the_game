'use strict';

(function() {
    var app = this;
    var instance;

    var Player = function _Player() {
        if(instance !== undefined) {
            return instance;
        }

        instance = this;

        this.initialize();
    };

    Player.prototype.initialize = function _initialize() {

        return this;
    };

    app.Player = Player;

    return app.Player;

}).call(window.VGN = window.VGN || {});
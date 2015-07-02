;(function() {
    var app = this;

    app.observers = {};

    app.noop = function() {
        return '';
    };

    app.triggeredEvents = [];

    app.trigger = function _trigger(eventType, eventOptions, context) {
        setTimeout(function() {
            var observers = app.observers[eventType];
            var i;

            if (observers) {
                i = observers.length;

                while (i--) {
                    if (typeof observers[i] === 'function') {
                        observers[i].call(context, eventOptions);
                    }
                }
            }
        }, 0);

        return app;
    };

    app.subscribe = function _subscribe(eventType, callback) {
        var observers = app.observers;

        if (!(eventType in observers)) {
            observers[eventType] = [];
        }

        observers[eventType].push(callback);

        return app;
    };

    app.unsubscribe = function _unsubscribe(eventType, handler) {
        var observers = app.observers[eventType];
        var i;

        if (observers && observers.length) {
            i = observers.length;

            while (i--) {
                if (!handler || observers[i] === handler) {
                    observers.splice(i, 1);
                }
            }
        }

        return app;
    };

}).call(window.VGN = window.VGN || {});

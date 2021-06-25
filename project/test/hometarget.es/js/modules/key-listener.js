/*globals $*/
var modules = window.modules || {};
(function () {
    'use strict';

    /**
	 * @class modules.keyListener
	 * A simple keyboard event listener abstraction.
	 * Use the onKeyPress, onKeyUp, onKeyDown to attach handles to an specific
	 * input and the activate, deactivate methods to enable/disable the listening.
	 * Use isActive method to test for keyListener activation status.
	 * New keyListener intances are deactivated by default.
	 * Use alwaysOnKeyDown, alwaysOnKeyUp, alwaysOnKeyPress to react to input
	 * regardless the activation state of the keyListener.
	 * Use offKeyPress, offKeyUp, offKeyDown to remove handlers.
	 * @param {Object} context The context to be used to call the handlers.
	 * @param {HTMLElement} node The node used to listeng to events (defaults to document).
	 */
    modules.keyListener = function (context, node) {
        this._node = node ? node : document;
        this._context = context;
        this._active = false;
        this._map = {};
        this._initializeMap();
        this._startListening();
    };

    modules.keyListener.prototype = {

        _initializeMap: function () {
            var keyEvents = modules.keyListener.keyEvents;

            for (var keyEvent in keyEvents) {
                this._map[keyEvents[keyEvent]] = {
                    activateds: [],
                    always: []
                };
            }
        },

        _evaluateHandler: function (handler, ev) {
            var keyCode = ev.which;

            if (!handler.matcher(keyCode)) return;

            handler.callback.call(this._context, ev);
        },

        _triggerActivateds: function (keyEvent, ev) {
            var self = this;

            if (!self.isActive()) return;

            var handlers = self._map[keyEvent].activateds;

            handlers.forEach(function (handler) {
                self._evaluateHandler(handler, ev);
            });
        },

        _triggerAlways: function (keyEvent, ev) {
            var self = this;
            var handlers = self._map[keyEvent].always;

            handlers.forEach(function (handler) {
                self._evaluateHandler(handler, ev);
            });
        },

        _bindSpecificKeyEvent: function (keyEvent) {
            var self = this;

            $(self._node).on(keyEvent, function (ev) {
                self._triggerActivateds(keyEvent, ev);
                self._triggerAlways(keyEvent, ev);
            });
        },

        _startListening: function () {
            for (var keyEvent in this._map) {
                this._bindSpecificKeyEvent(keyEvent);
            }
        },

        _mapKeyEventToAction: function (keyEvent, keyMatcher, action, surpassActivation) {
            var eventCollection = surpassActivation ?
				this._map[keyEvent].always :
				this._map[keyEvent].activateds;

            eventCollection.push({
                matcher: keyMatcher,
                callback: action
            });
        },

        _getHandlerPositionInCollection: function (handlers, keyMatcher, action) {
            var handler;

            for (var index = 0; index < handlers.length; index++) {
                handler = handlers[index];
                if (handler.matcher === keyMatcher && handler.callback === action) {
                    return index;
                }
            }
        },

        _removeHandlerFromCollectionAt: function (position, handlers) {
            if (position === undefined) return;

            handlers.splice(position, 1);
        },

        _removeMappedActionInCollection: function (handlers, keyMatcher, action) {
            var position = this._getHandlerPositionInCollection(handlers, keyMatcher, action);

            this._removeHandlerFromCollectionAt(position, handlers);
        },

        _removeMappedAction: function (keyEvent, keyMatcher, action) {
            var handlers = this._map[keyEvent];

            this._removeMappedActionInCollection(handlers.activateds, keyMatcher, action);
            this._removeMappedActionInCollection(handlers.always, keyMatcher, action);
        },

        onKeyPress: function (keyMatcher, action) {
            this._mapKeyEventToAction(modules.keyListener.keyEvents.KEY_PRESS, keyMatcher, action);
        },

        onKeyUp: function (keyMatcher, action) {
            this._mapKeyEventToAction(modules.keyListener.keyEvents.KEY_UP, keyMatcher, action);
        },

        onKeyDown: function (keyMatcher, action) {
            this._mapKeyEventToAction(modules.keyListener.keyEvents.KEY_DOWN, keyMatcher, action);
        },

        alwaysOnKeyDown: function (keyMatcher, action) {
            this._mapKeyEventToAction(modules.keyListener.keyEvents.KEY_DOWN, keyMatcher, action, true);
        },

        alwaysOnKeyUp: function (keyMatcher, action) {
            this._mapKeyEventToAction(modules.keyListener.keyEvents.KEY_UP, keyMatcher, action, true);
        },

        alwaysOnKeyPress: function (keyMatcher, action) {
            this._mapKeyEventToAction(modules.keyListener.keyEvents.KEY_PRESS, keyMatcher, action, true);
        },

        offKeyPress: function (keyMatcher, action) {
            this._removeMappedAction(modules.keyListener.keyEvents.KEY_PRESS, keyMatcher, action);
        },

        offKeyUp: function (keyMatcher, action) {
            this._removeMappedAction(modules.keyListener.keyEvents.KEY_UP, keyMatcher, action);
        },

        offKeyDown: function (keyMatcher, action) {
            this._removeMappedAction(modules.keyListener.keyEvents.KEY_DOWN, keyMatcher, action);
        },

        activate: function () {
            this._active = true;
        },

        deactivate: function () {
            this._active = false;
        },

        isActive: function () {
            return this._active;
        }
    };

    modules.keyListener.keyEvents = {
        KEY_DOWN: 'keydown',
        KEY_PRESS: 'keypress',
        KEY_UP: 'keyup'
    };

    modules.keyListener.keyMatchers = {
        ALPHANUMERIC: function (key) {
            return modules.keyListener.keyMatchers.LETTER(key) ||
			modules.keyListener.keyMatchers.DIGIT(key);
        },
        LETTER: function (key) {
            return modules.keyListener.keyMatchers.UPPERCASE(key) ||
			modules.keyListener.keyMatchers.LOWERCASE(key);
        },
        UPPERCASE: function (key) { return key >= 65 && key <= 90; },
        LOWERCASE: function (key) { return key >= 97 && key <= 122; },
        DIGIT: function (key) { return key >= 48 && key <= 57; },
        ENTER: function (key) { return key === 13; },
        SCAPE: function (key) { return key === 27; },
        SPACE: function (key) { return key === 32; },
        UP: function (key) { return key === 38; },
        DOWN: function (key) { return key === 40; }
    };
})();
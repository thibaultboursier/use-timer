"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var initialConfig = {
    initialTime: 0,
    interval: 1000
};
exports.useTimer = function (config) {
    var _a = __assign({}, initialConfig, config), initialTime = _a.initialTime, interval = _a.interval;
    var intervalRef = react_1.useRef(null);
    var _b = react_1.useState(initialTime), time = _b[0], setTime = _b[1];
    var cancelTimer = function () {
        if (!intervalRef.current) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };
    var createTimer = function () {
        intervalRef.current = setInterval(function () {
            setTime(++time);
        }, interval);
    };
    var pause = function () {
        cancelTimer();
    };
    var reset = function () {
        cancelTimer();
        setTime(0);
    };
    var start = function () {
        if (intervalRef.current) {
            return;
        }
        createTimer();
    };
    return { time: time, start: start, reset: reset, pause: pause };
};

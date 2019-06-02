/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/xterm-addon-attach-socketio.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/xterm-addon-attach-socketio.ts":
/*!*********************************************!*\
  !*** ../src/xterm-addon-attach-socketio.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function attach(term, socket, bidirectional, buffered) {
    var addonTerminal = term;
    bidirectional = (typeof bidirectional === "undefined") ? true : bidirectional;
    addonTerminal.__socketio = socket;
    addonTerminal.__flushBuffer = function () {
        addonTerminal.write(addonTerminal.__attachSocketBuffer || "");
    };
    addonTerminal.__pushToBuffer = function (data) {
        if (addonTerminal.__attachSocketBuffer) {
            addonTerminal.__attachSocketBuffer += data;
        }
        else {
            addonTerminal.__attachSocketBuffer = data;
            addonTerminal.__flushBuffer && setTimeout(addonTerminal.__flushBuffer, 10);
        }
    };
    addonTerminal.__getMessageSocketIo = function (data) {
        displayData((data || "").toString());
    };
    function displayData(str, data) {
        if (buffered) {
            addonTerminal.__pushToBuffer && addonTerminal.__pushToBuffer(str || data || "");
        }
        else {
            addonTerminal.write(str || data || "");
        }
    }
    addonTerminal.__sendData = function (data) {
        socket.send(data);
    };
    addonTerminal._core.register(addSocketListener(socket, "message", addonTerminal.__getMessageSocketIo));
    if (bidirectional) {
        addonTerminal.__dataListener = addonTerminal.onData(addonTerminal.__sendData);
        addonTerminal._core.register(addonTerminal.__dataListener);
    }
    addonTerminal._core.register(addSocketListener(socket, "close", function () { return detach(addonTerminal, socket); }));
    addonTerminal._core.register(addSocketListener(socket, "error", function () { return detach(addonTerminal, socket); }));
}
exports.attach = attach;
function addSocketListener(socket, type, handler) {
    socket.addEventListener(type, handler);
    return {
        dispose: function () {
            if (!handler) {
                return;
            }
            socket.removeEventListener(type, handler);
        }
    };
}
function detach(term, socket) {
    var addonTerminal = term;
    addonTerminal.__dataListener && addonTerminal.__dataListener.dispose();
    addonTerminal.__dataListener = undefined;
    socket = (typeof socket === "undefined") ? addonTerminal.__socketio : socket;
    if (socket) {
        addonTerminal.__getMessage && socket.removeEventListener("message", addonTerminal.__getMessage);
    }
    delete addonTerminal.__socket;
}
exports.detach = detach;
function apply(terminalConstructor) {
    terminalConstructor.prototype.attach = function (socket, bidirectional, buffered) {
        attach(this, socket, bidirectional, buffered);
    };
    terminalConstructor.prototype.detach = function (socket) {
        detach(this, socket);
    };
}
exports.apply = apply;
window.app = apply;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3NyYy94dGVybS1hZGRvbi1hdHRhY2gtc29ja2V0aW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQSxTQUFnQixNQUFNLENBQUMsSUFBYyxFQUFFLE1BQTZCLEVBQUUsYUFBc0IsRUFBRSxRQUFpQjtJQUM3RyxJQUFNLGFBQWEsR0FBZ0MsSUFBSSxDQUFDO0lBQ3hELGFBQWEsR0FBRyxDQUFDLE9BQU8sYUFBYSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUM5RSxhQUFhLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUVsQyxhQUFhLENBQUMsYUFBYSxHQUFHO1FBQzVCLGFBQWEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBR2hFLENBQUMsQ0FBQztJQUVGLGFBQWEsQ0FBQyxjQUFjLEdBQUcsVUFBQyxJQUFZO1FBQzFDLElBQUksYUFBYSxDQUFDLG9CQUFvQixFQUFFO1lBQ3RDLGFBQWEsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUM7U0FDNUM7YUFBTTtZQUNMLGFBQWEsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDMUMsYUFBYSxDQUFDLGFBQWEsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM1RTtJQUNILENBQUMsQ0FBQztJQUVGLGFBQWEsQ0FBQyxvQkFBb0IsR0FBRyxVQUFTLElBQVM7UUFDckQsV0FBVyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBU0YsU0FBUyxXQUFXLENBQUMsR0FBWSxFQUFFLElBQWE7UUFDOUMsSUFBSSxRQUFRLEVBQUU7WUFDWixhQUFhLENBQUMsY0FBYyxJQUFJLGFBQWEsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNqRjthQUFNO1lBQ0wsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFVLEdBQUcsVUFBQyxJQUFZO1FBSXRDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0lBRUYsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0lBRXZHLElBQUksYUFBYSxFQUFFO1FBQ2pCLGFBQWEsQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzVEO0lBRUQsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFNLGFBQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBTSxhQUFNLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUMsQ0FBQztBQUN4RyxDQUFDO0FBdkRELHdCQXVEQztBQUVELFNBQVMsaUJBQWlCLENBQUMsTUFBNkIsRUFBRSxJQUFZLEVBQUUsT0FBMkQ7SUFDakksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2QyxPQUFPO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFFWixPQUFPO2FBQ1I7WUFDRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQVFELFNBQWdCLE1BQU0sQ0FBQyxJQUFjLEVBQUUsTUFBOEI7SUFDbkUsSUFBTSxhQUFhLEdBQWdDLElBQUksQ0FBQztJQUN4RCxhQUFhLENBQUMsY0FBYyxJQUFJLGFBQWEsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkUsYUFBYSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7SUFFekMsTUFBTSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUU3RSxJQUFJLE1BQU0sRUFBRTtRQUNWLGFBQWEsQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDakc7SUFFRCxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUM7QUFDaEMsQ0FBQztBQVpELHdCQVlDO0FBR0QsU0FBZ0IsS0FBSyxDQUFDLG1CQUFvQztJQVNsRCxtQkFBbUIsQ0FBQyxTQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsTUFBNkIsRUFBRSxhQUFzQixFQUFFLFFBQWlCO1FBQzlILE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUM7SUFPSSxtQkFBbUIsQ0FBQyxTQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsTUFBNkI7UUFDbkYsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7QUFDSixDQUFDO0FBckJELHNCQXFCQztBQUVLLE1BQU8sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImF0dGFjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9zcmMveHRlcm0tYWRkb24tYXR0YWNoLXNvY2tldGlvLnRzXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTkgVGhlIHh0ZXJtLWFkZG9uLWF0dGFjaC1zb2NrZXRpby5qcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlIE1JVFxuICpcbiAqIEltcGxlbWVudHMgdGhlIGF0dGFjaCBtZXRob2QsIHRoYXQgYXR0YWNoZXMgdGhlIHRlcm1pbmFsIHRvIGEgU29ja2V0SW8uU29ja2V0IHN0cmVhbS5cbiAqL1xuXG4gLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9AdHlwZXMvc29ja2V0LmlvLWNsaWVudC9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IHsgVGVybWluYWwsIElEaXNwb3NhYmxlIH0gZnJvbSBcInh0ZXJtXCI7XG5pbXBvcnQgeyBJQXR0YWNoQWRkb25UZXJtaW5hbCB9IGZyb20gXCJ4dGVybS9saWIvYWRkb25zL2F0dGFjaC9JbnRlcmZhY2VzXCI7XG5cbmludGVyZmFjZSBJQXR0YWNoU29rZXRJb0FkZG9uVGVybWluYWwgZXh0ZW5kcyBJQXR0YWNoQWRkb25UZXJtaW5hbCB7XG4gIF9fc29ja2V0aW86IFNvY2tldElPQ2xpZW50LlNvY2tldDtcbiAgX19nZXRNZXNzYWdlU29ja2V0SW86IChkYXRhOiBhbnkpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQXR0YWNoZXMgdGhlIGdpdmVuIHRlcm1pbmFsIHRvIHRoZSBnaXZlbiBzb2NrZXQuXG4gKlxuICogQHBhcmFtIHRlcm0gVGhlIHRlcm1pbmFsIHRvIGJlIGF0dGFjaGVkIHRvIHRoZSBnaXZlbiBzb2NrZXQuXG4gKiBAcGFyYW0gc29ja2V0IFRoZSBzb2NrZXQgdG8gYXR0YWNoIHRoZSBjdXJyZW50IHRlcm1pbmFsLlxuICogQHBhcmFtIGJpZGlyZWN0aW9uYWwgV2hldGhlciB0aGUgdGVybWluYWwgc2hvdWxkIHNlbmQgZGF0YSB0byB0aGUgc29ja2V0IGFzIHdlbGwuXG4gKiBAcGFyYW0gYnVmZmVyZWQgV2hldGhlciB0aGUgcmVuZGVyaW5nIG9mIGluY29taW5nIGRhdGEgc2hvdWxkIGhhcHBlbiBpbnN0YW50bHkgb3IgYXQgYSBtYXhpbXVtXG4gKiBmcmVxdWVuY3kgb2YgMSByZW5kZXJpbmcgcGVyIDEwbXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2godGVybTogVGVybWluYWwsIHNvY2tldDogU29ja2V0SU9DbGllbnQuU29ja2V0LCBiaWRpcmVjdGlvbmFsOiBib29sZWFuLCBidWZmZXJlZDogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBhZGRvblRlcm1pbmFsID0gPElBdHRhY2hTb2tldElvQWRkb25UZXJtaW5hbD50ZXJtO1xuICBiaWRpcmVjdGlvbmFsID0gKHR5cGVvZiBiaWRpcmVjdGlvbmFsID09PSBcInVuZGVmaW5lZFwiKSA/IHRydWUgOiBiaWRpcmVjdGlvbmFsO1xuICBhZGRvblRlcm1pbmFsLl9fc29ja2V0aW8gPSBzb2NrZXQ7XG5cbiAgYWRkb25UZXJtaW5hbC5fX2ZsdXNoQnVmZmVyID0gKCkgPT4ge1xuICAgIGFkZG9uVGVybWluYWwud3JpdGUoYWRkb25UZXJtaW5hbC5fX2F0dGFjaFNvY2tldEJ1ZmZlciB8fCBcIlwiKTtcbiAgICAvLyBhZGRvblRlcm1pbmFsLl9fYXR0YWNoU29ja2V0QnVmZmVyID0gbnVsbDtcbiAgICAvLyBhZGRvblRlcm1pbmFsLl9fYXR0YWNoU29ja2V0QnVmZmVyID0gdW5kZWZpbmVkO1xuICB9O1xuXG4gIGFkZG9uVGVybWluYWwuX19wdXNoVG9CdWZmZXIgPSAoZGF0YTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKGFkZG9uVGVybWluYWwuX19hdHRhY2hTb2NrZXRCdWZmZXIpIHtcbiAgICAgIGFkZG9uVGVybWluYWwuX19hdHRhY2hTb2NrZXRCdWZmZXIgKz0gZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkb25UZXJtaW5hbC5fX2F0dGFjaFNvY2tldEJ1ZmZlciA9IGRhdGE7XG4gICAgICBhZGRvblRlcm1pbmFsLl9fZmx1c2hCdWZmZXIgJiYgc2V0VGltZW91dChhZGRvblRlcm1pbmFsLl9fZmx1c2hCdWZmZXIsIDEwKTtcbiAgICB9XG4gIH07XG5cbiAgYWRkb25UZXJtaW5hbC5fX2dldE1lc3NhZ2VTb2NrZXRJbyA9IGZ1bmN0aW9uKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGRpc3BsYXlEYXRhKChkYXRhIHx8IFwiXCIpLnRvU3RyaW5nKCkpO1xuICB9O1xuXG4gIC8qKlxuICAqIFB1c2ggZGF0YSB0byBidWZmZXIgb3Igd3JpdGUgaXQgaW4gdGhlIHRlcm1pbmFsLlxuICAqIFRoaXMgaXMgdXNlZCBhcyBhIGNhbGxiYWNrIGZvciBGaWxlUmVhZGVyLm9ubG9hZC5cbiAgKlxuICAqIEBwYXJhbSBzdHIgU3RyaW5nIGRlY29kZWQgYnkgRmlsZVJlYWRlci5cbiAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBvZiB0aGUgRXZlbnRNZXNzYWdlLlxuICAqL1xuICBmdW5jdGlvbiBkaXNwbGF5RGF0YShzdHI/OiBzdHJpbmcsIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoYnVmZmVyZWQpIHtcbiAgICAgIGFkZG9uVGVybWluYWwuX19wdXNoVG9CdWZmZXIgJiYgYWRkb25UZXJtaW5hbC5fX3B1c2hUb0J1ZmZlcihzdHIgfHwgZGF0YSB8fCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkb25UZXJtaW5hbC53cml0ZShzdHIgfHwgZGF0YSB8fCBcIlwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRvblRlcm1pbmFsLl9fc2VuZERhdGEgPSAoZGF0YTogc3RyaW5nKSA9PiB7XG4gICAgLy8gcmVtb3ZlOiBpZiAoc29ja2V0LnJlYWR5U3RhdGUgIT09IDEpIHtcbiAgICAvLyByZW1vdmU6ICAgcmV0dXJuO1xuICAgIC8vIHJlbW92ZTogfVxuICAgIHNvY2tldC5zZW5kKGRhdGEpO1xuICB9O1xuXG4gIGFkZG9uVGVybWluYWwuX2NvcmUucmVnaXN0ZXIoYWRkU29ja2V0TGlzdGVuZXIoc29ja2V0LCBcIm1lc3NhZ2VcIiwgYWRkb25UZXJtaW5hbC5fX2dldE1lc3NhZ2VTb2NrZXRJbykpO1xuXG4gIGlmIChiaWRpcmVjdGlvbmFsKSB7XG4gICAgYWRkb25UZXJtaW5hbC5fX2RhdGFMaXN0ZW5lciA9IGFkZG9uVGVybWluYWwub25EYXRhKGFkZG9uVGVybWluYWwuX19zZW5kRGF0YSk7XG4gICAgYWRkb25UZXJtaW5hbC5fY29yZS5yZWdpc3RlcihhZGRvblRlcm1pbmFsLl9fZGF0YUxpc3RlbmVyKTtcbiAgfVxuXG4gIGFkZG9uVGVybWluYWwuX2NvcmUucmVnaXN0ZXIoYWRkU29ja2V0TGlzdGVuZXIoc29ja2V0LCBcImNsb3NlXCIsICgpID0+IGRldGFjaChhZGRvblRlcm1pbmFsLCBzb2NrZXQpKSk7XG4gIGFkZG9uVGVybWluYWwuX2NvcmUucmVnaXN0ZXIoYWRkU29ja2V0TGlzdGVuZXIoc29ja2V0LCBcImVycm9yXCIsICgpID0+IGRldGFjaChhZGRvblRlcm1pbmFsLCBzb2NrZXQpKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFNvY2tldExpc3RlbmVyKHNvY2tldDogU29ja2V0SU9DbGllbnQuU29ja2V0LCB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6ICh0aGlzOiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQsIGRhdGE6IHN0cmluZykgPT4gYW55KTogSURpc3Bvc2FibGUge1xuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbiAgcmV0dXJuIHtcbiAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgLy8gQWxyZWFkeSBkaXNwb3NlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbiAgICAgIC8vIHJlbW92ZTogaGFuZGxlciA9IG51bGw7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIERldGFjaGVzIHRoZSBnaXZlbiB0ZXJtaW5hbCBmcm9tIHRoZSBnaXZlbiBzb2NrZXRcbiAqXG4gKiBAcGFyYW0gdGVybSBUaGUgdGVybWluYWwgdG8gYmUgZGV0YWNoZWQgZnJvbSB0aGUgZ2l2ZW4gc29ja2V0LlxuICogQHBhcmFtIHNvY2tldCBUaGUgc29ja2V0IGZyb20gd2hpY2ggdG8gZGV0YWNoIHRoZSBjdXJyZW50IHRlcm1pbmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0YWNoKHRlcm06IFRlcm1pbmFsLCBzb2NrZXQ/OiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQpOiB2b2lkIHtcbiAgY29uc3QgYWRkb25UZXJtaW5hbCA9IDxJQXR0YWNoU29rZXRJb0FkZG9uVGVybWluYWw+dGVybTtcbiAgYWRkb25UZXJtaW5hbC5fX2RhdGFMaXN0ZW5lciAmJiBhZGRvblRlcm1pbmFsLl9fZGF0YUxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgYWRkb25UZXJtaW5hbC5fX2RhdGFMaXN0ZW5lciA9IHVuZGVmaW5lZDtcblxuICBzb2NrZXQgPSAodHlwZW9mIHNvY2tldCA9PT0gXCJ1bmRlZmluZWRcIikgPyBhZGRvblRlcm1pbmFsLl9fc29ja2V0aW8gOiBzb2NrZXQ7XG5cbiAgaWYgKHNvY2tldCkge1xuICAgIGFkZG9uVGVybWluYWwuX19nZXRNZXNzYWdlICYmIHNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhZGRvblRlcm1pbmFsLl9fZ2V0TWVzc2FnZSk7XG4gIH1cblxuICBkZWxldGUgYWRkb25UZXJtaW5hbC5fX3NvY2tldDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkodGVybWluYWxDb25zdHJ1Y3RvcjogdHlwZW9mIFRlcm1pbmFsKTogdm9pZCB7XG4gIC8qKlxuICAgKiBBdHRhY2hlcyB0aGUgY3VycmVudCB0ZXJtaW5hbCB0byB0aGUgZ2l2ZW4gc29ja2V0XG4gICAqXG4gICAqIEBwYXJhbSBzb2NrZXQgVGhlIHNvY2tldCB0byBhdHRhY2ggdGhlIGN1cnJlbnQgdGVybWluYWwuXG4gICAqIEBwYXJhbSBiaWRpcmVjdGlvbmFsIFdoZXRoZXIgdGhlIHRlcm1pbmFsIHNob3VsZCBzZW5kIGRhdGEgdG8gdGhlIHNvY2tldCBhcyB3ZWxsLlxuICAgKiBAcGFyYW0gYnVmZmVyZWQgV2hldGhlciB0aGUgcmVuZGVyaW5nIG9mIGluY29taW5nIGRhdGEgc2hvdWxkIGhhcHBlbiBpbnN0YW50bHkgb3IgYXQgYSBtYXhpbXVtXG4gICAqIGZyZXF1ZW5jeSBvZiAxIHJlbmRlcmluZyBwZXIgMTBtcy5cbiAgICovXG4gICg8YW55PnRlcm1pbmFsQ29uc3RydWN0b3IucHJvdG90eXBlKS5hdHRhY2ggPSBmdW5jdGlvbiAoc29ja2V0OiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQsIGJpZGlyZWN0aW9uYWw6IGJvb2xlYW4sIGJ1ZmZlcmVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgYXR0YWNoKHRoaXMsIHNvY2tldCwgYmlkaXJlY3Rpb25hbCwgYnVmZmVyZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXRhY2hlcyB0aGUgY3VycmVudCB0ZXJtaW5hbCBmcm9tIHRoZSBnaXZlbiBzb2NrZXQuXG4gICAqXG4gICAqIEBwYXJhbSBzb2NrZXQgVGhlIHNvY2tldCBmcm9tIHdoaWNoIHRvIGRldGFjaCB0aGUgY3VycmVudCB0ZXJtaW5hbC5cbiAgICovXG4gICg8YW55PnRlcm1pbmFsQ29uc3RydWN0b3IucHJvdG90eXBlKS5kZXRhY2ggPSBmdW5jdGlvbiAoc29ja2V0OiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQpOiB2b2lkIHtcbiAgICBkZXRhY2godGhpcywgc29ja2V0KTtcbiAgfTtcbn1cblxuKDxhbnk+d2luZG93KS5hcHAgPSBhcHBseTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
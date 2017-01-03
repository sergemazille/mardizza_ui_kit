(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = exports.Form = function Form() {
  _classCallCheck(this, Form);
};

},{}],2:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

window.onload = function () {
    testInputsStates();
};

function testInputsStates() {
    var testButtons = document.querySelectorAll('.states-input-buttons button');
    testButtons.forEach(function (button) {

        button.addEventListener('click', function (e) {
            e.preventDefault();

            var feedbackText = this.dataset.text;
            var action = this.dataset.action;
            if (action != "disabled") {

                // add new class to input-group
                var inputGroup = this.parentElement.parentElement;
                inputGroup.className = "input-group " + action;

                // add a new element with feedback text
                var newSpan = document.createElement('span');
                newSpan.className = "feedback";
                newSpan.textContent = feedbackText;

                inputGroup.appendChild(newSpan);

                return true;
            }

            // disable
        });
    });
}

},{"./Form":1}]},{},[2])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0L0Zvcm0uanMiLCJzcmMvc2NyaXB0L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztJQ0FhLEksV0FBQSxJOzs7Ozs7O0FDQWI7O0FBRUEsT0FBTyxNQUFQLEdBQWdCLFlBQVc7QUFDdkI7QUFFSCxDQUhEOztBQUtBLFNBQVMsZ0JBQVQsR0FBNEI7QUFDeEIsUUFBSSxjQUFjLFNBQVMsZ0JBQVQsQ0FBMEIsOEJBQTFCLENBQWxCO0FBQ0EsZ0JBQVksT0FBWixDQUFvQixVQUFTLE1BQVQsRUFBaUI7O0FBRWpDLGVBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBUyxDQUFULEVBQVk7QUFDekMsY0FBRSxjQUFGOztBQUVBLGdCQUFJLGVBQWUsS0FBSyxPQUFMLENBQWEsSUFBaEM7QUFDQSxnQkFBSSxTQUFTLEtBQUssT0FBTCxDQUFhLE1BQTFCO0FBQ0EsZ0JBQUksVUFBVSxVQUFkLEVBQTBCOztBQUV0QjtBQUNBLG9CQUFJLGFBQWEsS0FBSyxhQUFMLENBQW1CLGFBQXBDO0FBQ0EsMkJBQVcsU0FBWCxHQUF1QixpQkFBaUIsTUFBeEM7O0FBRUE7QUFDQSxvQkFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFkO0FBQ0Esd0JBQVEsU0FBUixHQUFvQixVQUFwQjtBQUNBLHdCQUFRLFdBQVIsR0FBc0IsWUFBdEI7O0FBRUEsMkJBQVcsV0FBWCxDQUF1QixPQUF2Qjs7QUFFQSx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFFSCxTQXZCRDtBQXdCSCxLQTFCRDtBQTJCSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgRm9ybSB7XG5cblxufVxuIiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vRm9ybSc7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICB0ZXN0SW5wdXRzU3RhdGVzKCk7XG5cbn07XG5cbmZ1bmN0aW9uIHRlc3RJbnB1dHNTdGF0ZXMoKSB7XG4gICAgbGV0IHRlc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXRlcy1pbnB1dC1idXR0b25zIGJ1dHRvbicpO1xuICAgIHRlc3RCdXR0b25zLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XG5cbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBsZXQgZmVlZGJhY2tUZXh0ID0gdGhpcy5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gdGhpcy5kYXRhc2V0LmFjdGlvbjtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gIT0gXCJkaXNhYmxlZFwiKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGNsYXNzIHRvIGlucHV0LWdyb3VwXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0R3JvdXAgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXAgXCIgKyBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgYSBuZXcgZWxlbWVudCB3aXRoIGZlZWRiYWNrIHRleHRcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnRleHRDb250ZW50ID0gZmVlZGJhY2tUZXh0O1xuXG4gICAgICAgICAgICAgICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChuZXdTcGFuKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkaXNhYmxlXG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iXX0=
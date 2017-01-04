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
            var inputGroup = this.parentElement.parentElement;

            if (action != "disabled") {
                // clean up in case the input has been disabled
                inputGroup.querySelector('input').disabled = false;

                // add new class to input-group
                inputGroup.className = "input-group " + action;

                // replace the feedback span or create one
                var feedbackSpan = inputGroup.querySelector('.feedback');
                if (!feedbackSpan) {
                    feedbackSpan = document.createElement('span');
                    feedbackSpan.className = "feedback";
                }

                feedbackSpan.textContent = feedbackText;
                inputGroup.insertBefore(feedbackSpan, inputGroup.querySelector('.states-input-buttons'));

                return true;
            }

            // disable
            inputGroup.querySelector('input').disabled = !inputGroup.querySelector('input').disabled;
            this.innerHTML = "yolo";
        });
    });
}

},{"./Form":1}]},{},[2])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRm9ybS5qcyIsInNyY1xcc2NyaXB0XFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7SUNBYSxJLFdBQUEsSTs7Ozs7OztBQ0FiOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFXO0FBQ3ZCO0FBRUgsQ0FIRDs7QUFLQSxTQUFTLGdCQUFULEdBQTRCO0FBQ3hCLFFBQUksY0FBYyxTQUFTLGdCQUFULENBQTBCLDhCQUExQixDQUFsQjtBQUNBLGdCQUFZLE9BQVosQ0FBb0IsVUFBUyxNQUFULEVBQWlCOztBQUVqQyxlQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsQ0FBVCxFQUFZO0FBQ3pDLGNBQUUsY0FBRjs7QUFFQSxnQkFBSSxlQUFlLEtBQUssT0FBTCxDQUFhLElBQWhDO0FBQ0EsZ0JBQUksU0FBUyxLQUFLLE9BQUwsQ0FBYSxNQUExQjtBQUNBLGdCQUFJLGFBQWEsS0FBSyxhQUFMLENBQW1CLGFBQXBDOztBQUVBLGdCQUFJLFVBQVUsVUFBZCxFQUEwQjtBQUN0QjtBQUNBLDJCQUFXLGFBQVgsQ0FBeUIsT0FBekIsRUFBa0MsUUFBbEMsR0FBNkMsS0FBN0M7O0FBRUE7QUFDQSwyQkFBVyxTQUFYLEdBQXVCLGlCQUFpQixNQUF4Qzs7QUFFQTtBQUNBLG9CQUFJLGVBQWUsV0FBVyxhQUFYLENBQXlCLFdBQXpCLENBQW5CO0FBQ0Esb0JBQUcsQ0FBRSxZQUFMLEVBQW1CO0FBQ2YsbUNBQWUsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWY7QUFDQSxpQ0FBYSxTQUFiLEdBQXlCLFVBQXpCO0FBQ0g7O0FBRUQsNkJBQWEsV0FBYixHQUEyQixZQUEzQjtBQUNBLDJCQUFXLFlBQVgsQ0FBd0IsWUFBeEIsRUFBc0MsV0FBVyxhQUFYLENBQXlCLHVCQUF6QixDQUF0Qzs7QUFFQSx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDQSx1QkFBVyxhQUFYLENBQXlCLE9BQXpCLEVBQWtDLFFBQWxDLEdBQTZDLENBQUMsV0FBVyxhQUFYLENBQXlCLE9BQXpCLEVBQWtDLFFBQWhGO0FBQ0EsaUJBQUssU0FBTCxHQUFpQixNQUFqQjtBQUNILFNBOUJEO0FBK0JILEtBakNEO0FBa0NIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBGb3JtIHtcblxuXG59XG4iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRlc3RJbnB1dHNTdGF0ZXMoKTtcblxufTtcblxuZnVuY3Rpb24gdGVzdElucHV0c1N0YXRlcygpIHtcbiAgICBsZXQgdGVzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMgYnV0dG9uJyk7XG4gICAgdGVzdEJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcblxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCBmZWVkYmFja1RleHQgPSB0aGlzLmRhdGFzZXQudGV4dDtcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSB0aGlzLmRhdGFzZXQuYWN0aW9uO1xuICAgICAgICAgICAgbGV0IGlucHV0R3JvdXAgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKGFjdGlvbiAhPSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBjbGVhbiB1cCBpbiBjYXNlIHRoZSBpbnB1dCBoYXMgYmVlbiBkaXNhYmxlZFxuICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxuICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cCBcIiArIGFjdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGZlZWRiYWNrIHNwYW4gb3IgY3JlYXRlIG9uZVxuICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1NwYW4gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpO1xuICAgICAgICAgICAgICAgIGlmKCEgZmVlZGJhY2tTcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4udGV4dENvbnRlbnQgPSBmZWVkYmFja1RleHQ7XG4gICAgICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUoZmVlZGJhY2tTcGFuLCBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkaXNhYmxlXG4gICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSAhaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkO1xuICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgPSBcInlvbG9cIjtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iXX0=
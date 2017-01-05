(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = exports.Form = function () {
    function Form() {
        _classCallCheck(this, Form);
    }

    _createClass(Form, null, [{
        key: 'init',


        // launch class methods
        value: function init() {
            this.dropdown();
        }
    }, {
        key: 'dropdown',
        value: function dropdown() {
            var dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
            dropdownTriggers.forEach(function (button) {

                // trigger event
                var $dropdownList = button.parentElement.querySelector('.dropdown-list');
                var dropdownActive = false;

                button.addEventListener("click", function (e) {
                    e.preventDefault();
                    $dropdownList.style.display = $dropdownList.style.display == "" ? "block" : "";
                    dropdownActive = $dropdownList.style.display == "block";

                    // create a clickable `div` to close the dropdown when user clicks outside of the dropdown element
                    if (dropdownActive) {
                        (function () {
                            var $clickable = document.createElement('div');
                            $clickable.className = "backdrop";

                            var $body = document.querySelector('body');
                            $body.appendChild($clickable);

                            $clickable.addEventListener("click", function () {
                                $dropdownList.style.display = "";
                                dropdownActive = false;
                                $clickable.removeEventListener("click", this);
                                this.remove();
                            });
                        })();
                    }
                });

                // choice event
                $dropdownList.querySelectorAll('a').forEach(function (anchor) {
                    anchor.addEventListener("click", function (e) {
                        e.preventDefault();
                        var selectionOption = anchor.text;

                        // cleanup previously selected list item (remove active class)
                        var $currentActiveListItem = $dropdownList.querySelector('li.active');
                        $currentActiveListItem.classList.remove('active');

                        // select clicked list item by giving it `active` class and changing button label text
                        anchor.parentElement.classList.add('active');
                        button.innerHTML = selectionOption;

                        // close the dropdown-list
                        $dropdownList.style.display = "";

                        // cleanup : remove opened backdrop
                        var $backdrop = document.querySelector('.backdrop');
                        $backdrop.remove();
                    });
                });
            });
        }
    }]);

    return Form;
}();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Styleguide = exports.Styleguide = function () {
    function Styleguide() {
        _classCallCheck(this, Styleguide);
    }

    _createClass(Styleguide, null, [{
        key: 'init',
        value: function init() {
            var testButtons = document.querySelectorAll('.states-input-buttons button');
            testButtons.forEach(function (button) {

                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    var feedbackText = this.dataset.text;
                    var action = this.dataset.action;
                    var inputGroup = this.parentElement.parentElement;

                    switch (action) {
                        case "disabled":
                            disable(this);
                            break;
                        case "reset":
                            reset();
                            break;
                        default:
                            state();
                            break;
                    }

                    // disable button
                    function disable(button) {
                        var input = inputGroup.querySelector('input');

                        input.disabled = !input.disabled;
                        if (input.disabled) {
                            button.innerHTML = "Enable me";
                        } else {
                            button.innerHTML = "Disable me";
                        }
                    }

                    // reset state
                    function reset() {
                        var disableButton = inputGroup.querySelector('.btn-grey');

                        // cleanup potentially disabled state
                        inputGroup.querySelector('input').disabled = false;
                        disableButton.innerHTML = "Disable me";

                        // remove states classes
                        inputGroup.className = "input-group";

                        // remove feedback state if exists
                        inputGroup.querySelector('.feedback') ? inputGroup.querySelector('.feedback').remove() : null;
                    }

                    // change input state feedback
                    function state() {
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
                    }
                });
            });
        }
    }]);

    return Styleguide;
}();

},{}],3:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

var _Styleguide = require('./Styleguide');

window.onload = function () {

    _Form.Form.init();

    // styleguide custom examples
    _Styleguide.Styleguide.init();
};

// styleguide custom examples

},{"./Form":1,"./Styleguide":2}]},{},[3])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0L0Zvcm0uanMiLCJzcmMvc2NyaXB0L1N0eWxlZ3VpZGUuanMiLCJzcmMvc2NyaXB0L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQWEsSSxXQUFBLEk7Ozs7Ozs7OztBQUVUOytCQUNjO0FBQ1YsaUJBQUssUUFBTDtBQUNIOzs7bUNBRWlCO0FBQ2QsZ0JBQUksbUJBQW1CLFNBQVMsZ0JBQVQsQ0FBMEIsbUJBQTFCLENBQXZCO0FBQ0EsNkJBQWlCLE9BQWpCLENBQXlCLFVBQVMsTUFBVCxFQUFpQjs7QUFFdEM7QUFDQSxvQkFBSSxnQkFBZ0IsT0FBTyxhQUFQLENBQXFCLGFBQXJCLENBQW1DLGdCQUFuQyxDQUFwQjtBQUNBLG9CQUFJLGlCQUFpQixLQUFyQjs7QUFFQSx1QkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLENBQVQsRUFBWTtBQUN6QyxzQkFBRSxjQUFGO0FBQ0Esa0NBQWMsS0FBZCxDQUFvQixPQUFwQixHQUErQixjQUFjLEtBQWQsQ0FBb0IsT0FBcEIsSUFBK0IsRUFBaEMsR0FBc0MsT0FBdEMsR0FBZ0QsRUFBOUU7QUFDQSxxQ0FBaUIsY0FBYyxLQUFkLENBQW9CLE9BQXBCLElBQStCLE9BQWhEOztBQUVBO0FBQ0Esd0JBQUcsY0FBSCxFQUFtQjtBQUFBO0FBQ2YsZ0NBQUksYUFBYSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQSx1Q0FBVyxTQUFYLEdBQXVCLFVBQXZCOztBQUVBLGdDQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxrQ0FBTSxXQUFOLENBQWtCLFVBQWxCOztBQUVBLHVDQUFXLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQVc7QUFDNUMsOENBQWMsS0FBZCxDQUFvQixPQUFwQixHQUE4QixFQUE5QjtBQUNBLGlEQUFpQixLQUFqQjtBQUNB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LHFDQUFhLFdBQWIsR0FBMkIsWUFBM0I7QUFDQSxtQ0FBVyxZQUFYLENBQXdCLFlBQXhCLEVBQXNDLFdBQVcsYUFBWCxDQUF5Qix1QkFBekIsQ0FBdEM7QUFDSDtBQUNKLGlCQWhFRDtBQWlFSCxhQW5FRDtBQW9FSDs7Ozs7Ozs7O0FDdkVMOztBQUdBOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFXOztBQUV2QixlQUFLLElBQUw7O0FBR0E7QUFDQSwyQkFBVyxJQUFYO0FBQ0gsQ0FQRDs7QUFIQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgRm9ybSB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyb3Bkb3duKCkge1xuICAgICAgICBsZXQgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi10cmlnZ2VyJyk7XG4gICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSBidXR0b24ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbGlzdCcpO1xuICAgICAgICAgICAgbGV0IGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiXCIpID8gXCJibG9ja1wiIDogXCJcIjtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9ICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCI7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBjbGlja2FibGUgYGRpdmAgdG8gY2xvc2UgdGhlIGRyb3Bkb3duIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZHJvcGRvd24gZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmKGRyb3Bkb3duQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkY2xpY2thYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuY2xhc3NOYW1lID0gXCJiYWNrZHJvcFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kQ2hpbGQoJGNsaWNrYWJsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGNob2ljZSBldmVudFxuICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdhJykuZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHtcbiAgICAgICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uT3B0aW9uID0gYW5jaG9yLnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwcmV2aW91c2x5IHNlbGVjdGVkIGxpc3QgaXRlbSAocmVtb3ZlIGFjdGl2ZSBjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0gPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3IoJ2xpLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudEFjdGl2ZUxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBjbGlja2VkIGxpc3QgaXRlbSBieSBnaXZpbmcgaXQgYGFjdGl2ZWAgY2xhc3MgYW5kIGNoYW5naW5nIGJ1dHRvbiBsYWJlbCB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc2VsZWN0aW9uT3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBkcm9wZG93bi1saXN0XG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCA6IHJlbW92ZSBvcGVuZWQgYmFja2Ryb3BcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xuICAgICAgICAgICAgICAgICAgICAkYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMgYnV0dG9uJyk7XG4gICAgICAgIHRlc3RCdXR0b25zLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tUZXh0ID0gdGhpcy5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0R3JvdXAgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIHN3aXRjaChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRpc2FibGVkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGlzYWJsZShidXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc2FibGVkID0gIWlucHV0LmRpc2FibGVkO1xuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRW5hYmxlIG1lXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIG1lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXNldCBzdGF0ZVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZUJ1dHRvbiA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmJ0bi1ncmV5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwb3RlbnRpYWxseSBkaXNhYmxlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgbWVcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3RhdGVzIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZlZWRiYWNrIHN0YXRlIGlmIGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpID8gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKS5yZW1vdmUoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIGlucHV0IHN0YXRlIGZlZWRiYWNrXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3RhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFuIHVwIGluIGNhc2UgdGhlIGlucHV0IGhhcyBiZWVuIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgY2xhc3MgdG8gaW5wdXQtZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwIFwiICsgYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGZlZWRiYWNrIHNwYW4gb3IgY3JlYXRlIG9uZVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tTcGFuID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoISBmZWVkYmFja1NwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4udGV4dENvbnRlbnQgPSBmZWVkYmFja1RleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuaW5zZXJ0QmVmb3JlKGZlZWRiYWNrU3BhbiwgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcblxuLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbmltcG9ydCB7IFN0eWxlZ3VpZGUgfSBmcm9tICcuL1N0eWxlZ3VpZGUnO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBGb3JtLmluaXQoKTtcblxuXG4gICAgLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbiAgICBTdHlsZWd1aWRlLmluaXQoKTtcbn07Il19
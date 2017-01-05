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

var Pagination = exports.Pagination = function () {
    function Pagination() {
        _classCallCheck(this, Pagination);
    }

    _createClass(Pagination, null, [{
        key: 'init',


        // launch class methods
        value: function init() {
            this.pagination();
        }
    }, {
        key: 'pagination',
        value: function pagination() {
            var pagination = document.querySelector('.pagination');
            var items = pagination.querySelectorAll('li');
            var itemsToKeep = [];

            items.forEach(function (item, i) {
                // first and last two items
                if (0 == i || 1 == i || items.length - 2 == i || items.length - 1 == i) {
                    itemsToKeep.push(item);
                }
            });

            console.log(itemsToKeep);

            // replace 'ellipsis' class list item content with 3 dots
            var ellipsisItems = document.querySelectorAll('li.ellipsis');
            ellipsisItems.forEach(function (item) {
                item.querySelector('a').textContent = "...";
            });
        }
    }]);

    return Pagination;
}();

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

var _Pagination = require('./Pagination');

var _Styleguide = require('./Styleguide');

window.onload = function () {

    _Form.Form.init();
    _Pagination.Pagination.init();

    // styleguide custom examples
    _Styleguide.Styleguide.init();
};

// styleguide custom examples

},{"./Form":1,"./Pagination":2,"./Styleguide":3}]},{},[4])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRm9ybS5qcyIsInNyY1xcc2NyaXB0XFxQYWdpbmF0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFN0eWxlZ3VpZGUuanMiLCJzcmNcXHNjcmlwdFxcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBYSxJLFdBQUEsSTs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixpQkFBSyxRQUFMO0FBQ0g7OzttQ0FFaUI7QUFDZCxnQkFBSSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixtQkFBMUIsQ0FBdkI7QUFDQSw2QkFBaUIsT0FBakIsQ0FBeUIsVUFBUyxNQUFULEVBQWlCOztBQUV0QztBQUNBLG9CQUFJLGdCQUFnQixPQUFPLGFBQVAsQ0FBcUIsYUFBckIsQ0FBbUMsZ0JBQW5DLENBQXBCO0FBQ0Esb0JBQUksaUJBQWlCLEtBQXJCOztBQUVBLHVCQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsQ0FBVCxFQUFZO0FBQ3pDLHNCQUFFLGNBQUY7QUFDQSxrQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQStCLGNBQWMsS0FBZCxDQUFvQixPQUFwQixJQUErQixFQUFoQyxHQUFzQyxPQUF0QyxHQUFnRCxFQUE5RTtBQUNBLHFDQUFpQixjQUFjLEtBQWQsQ0FBb0IsT0FBcEIsSUFBK0IsT0FBaEQ7O0FBRUE7QUFDQSx3QkFBRyxjQUFILEVBQW1CO0FBQUE7QUFDZixnQ0FBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBLHVDQUFXLFNBQVgsR0FBdUIsVUFBdkI7O0FBRUEsZ0NBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLGtDQUFNLFdBQU4sQ0FBa0IsVUFBbEI7O0FBRUEsdUNBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBVztBQUM1Qyw4Q0FBYyxLQUFkLENBQW9CLE9BQXBC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b3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgRm9ybSB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyb3Bkb3duKCkge1xuICAgICAgICBsZXQgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi10cmlnZ2VyJyk7XG4gICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSBidXR0b24ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbGlzdCcpO1xuICAgICAgICAgICAgbGV0IGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiXCIpID8gXCJibG9ja1wiIDogXCJcIjtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9ICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCI7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBjbGlja2FibGUgYGRpdmAgdG8gY2xvc2UgdGhlIGRyb3Bkb3duIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZHJvcGRvd24gZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmKGRyb3Bkb3duQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkY2xpY2thYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuY2xhc3NOYW1lID0gXCJiYWNrZHJvcFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kQ2hpbGQoJGNsaWNrYWJsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGNob2ljZSBldmVudFxuICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdhJykuZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHtcbiAgICAgICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uT3B0aW9uID0gYW5jaG9yLnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwcmV2aW91c2x5IHNlbGVjdGVkIGxpc3QgaXRlbSAocmVtb3ZlIGFjdGl2ZSBjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0gPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3IoJ2xpLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudEFjdGl2ZUxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBjbGlja2VkIGxpc3QgaXRlbSBieSBnaXZpbmcgaXQgYGFjdGl2ZWAgY2xhc3MgYW5kIGNoYW5naW5nIGJ1dHRvbiBsYWJlbCB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc2VsZWN0aW9uT3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBkcm9wZG93bi1saXN0XG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCA6IHJlbW92ZSBvcGVuZWQgYmFja2Ryb3BcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xuICAgICAgICAgICAgICAgICAgICAkYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24ge1xyXG5cclxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2luYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcclxuICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xyXG4gICAgICAgIGxldCBpdGVtc1RvS2VlcCA9IFtdO1xyXG5cclxuICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcclxuICAgICAgICAgICAgLy8gZmlyc3QgYW5kIGxhc3QgdHdvIGl0ZW1zXHJcbiAgICAgICAgICAgIGlmKDAgPT0gaSB8fCAxID09IGkgfHwgKGl0ZW1zLmxlbmd0aCAtIDIpID09IGkgfHwgKGl0ZW1zLmxlbmd0aCAtIDEpID09IGkpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9LZWVwLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbXNUb0tlZXApO1xyXG5cclxuICAgICAgICAvLyByZXBsYWNlICdlbGxpcHNpcycgY2xhc3MgbGlzdCBpdGVtIGNvbnRlbnQgd2l0aCAzIGRvdHNcclxuICAgICAgICBsZXQgZWxsaXBzaXNJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLmVsbGlwc2lzJyk7XHJcbiAgICAgICAgZWxsaXBzaXNJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCdhJykudGV4dENvbnRlbnQgPSBcIi4uLlwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXRlcy1pbnB1dC1idXR0b25zIGJ1dHRvbicpO1xyXG4gICAgICAgIHRlc3RCdXR0b25zLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XHJcblxyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrVGV4dCA9IHRoaXMuZGF0YXNldC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRHcm91cCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGlzYWJsZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkaXNhYmxlKGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSAhaW5wdXQuZGlzYWJsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRW5hYmxlIG1lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBtZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVCdXR0b24gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JleScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHBvdGVudGlhbGx5IGRpc2FibGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgbWVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0YXRlcyBjbGFzc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmZWVkYmFjayBzdGF0ZSBpZiBleGlzdHNcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpID8gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKS5yZW1vdmUoKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIGlucHV0IHN0YXRlIGZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbiB1cCBpbiBjYXNlIHRoZSBpbnB1dCBoYXMgYmVlbiBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGNsYXNzIHRvIGlucHV0LWdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwIFwiICsgYWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBmZWVkYmFjayBzcGFuIG9yIGNyZWF0ZSBvbmVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tTcGFuID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighIGZlZWRiYWNrU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4udGV4dENvbnRlbnQgPSBmZWVkYmFja1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUoZmVlZGJhY2tTcGFuLCBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuXG4vLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuaW1wb3J0IHsgU3R5bGVndWlkZSB9IGZyb20gJy4vU3R5bGVndWlkZSc7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIEZvcm0uaW5pdCgpO1xuICAgIFBhZ2luYXRpb24uaW5pdCgpO1xuXG4gICAgLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbiAgICBTdHlsZWd1aWRlLmluaXQoKTtcbn07Il19
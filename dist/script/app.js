(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            [].concat(_toConsumableArray(dropdownTriggers)).forEach(function (button) {
                // spread operator so IE accepts to loop through querySelectorAll result

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
                var $anchorTags = $dropdownList.querySelectorAll('a');
                [].concat(_toConsumableArray($anchorTags)).forEach(function (anchor) {
                    // spread operator so IE accepts to loop through querySelectorAll result
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pagination = exports.Pagination = function () {
    function Pagination() {
        _classCallCheck(this, Pagination);
    }

    _createClass(Pagination, null, [{
        key: 'init',


        // launch class methods
        value: function init() {
            Pagination.pagination();
        }
    }, {
        key: 'pagination',
        value: function pagination() {
            var pagination = document.querySelector('.pagination');
            var prevItem = pagination.querySelector('.prev');
            var nextItem = pagination.querySelector('.next');
            var activeItem = pagination.querySelector('.active');
            var items = pagination.querySelectorAll('li');

            // set / reset items
            [].concat(_toConsumableArray(items)).forEach(function (item, i) {
                if (item.classList.contains('ellipsis')) {
                    item.firstElementChild.textContent = i;
                }
                item.classList.remove('hidden', 'show', 'ellipsis', 'disabled');
                item.dataset.page = i;
            });

            var activeItemIndex = parseInt(activeItem.dataset.page);

            /* add appropriate classes : */

            // disable 'prev' button if active page is the first one
            if (activeItemIndex == 1) {
                prevItem.classList.add('disabled');
                items[3].classList.add('show'); // if active page is 1, the third item is displayed
            }

            // disable 'next' button if active page is the last one
            if (activeItemIndex == items.length - 2) {
                nextItem.classList.add('disabled');
                items[items.length - 4].classList.add('show');
            }

            // first ellipsis check
            if (activeItemIndex >= 4) {
                items[2].classList.add('ellipsis', 'show');
            }

            // last ellipsis check
            if (activeItemIndex <= items.length - 5) {
                items[items.length - 3].classList.add('ellipsis', 'show');
            }

            // active item, previous and next ones
            items[activeItemIndex - 1].classList.add('show');
            items[activeItemIndex].classList.add('show');
            items[activeItemIndex + 1].classList.add('show');

            // prev, next, first and last pages are displayed as well
            prevItem.classList.add('show');
            nextItem.classList.add('show');
            items[1].classList.add('show');
            items[items.length - 2].classList.add('show');

            // hide every other items
            [].concat(_toConsumableArray(items)).forEach(function (item) {
                // spread operator so IE accepts to loop through querySelectorAll result
                if (!item.classList.contains('show')) {
                    item.classList.add('hidden');
                }
            });

            // replace 'ellipsis' class list item content with 3 dots
            var ellipsisItems = document.querySelectorAll('li.ellipsis');
            [].concat(_toConsumableArray(ellipsisItems)).forEach(function (item) {
                // spread operator so IE accepts to loop through querySelectorAll result
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
exports.Styleguide = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pagination = require('./Pagination');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Styleguide = exports.Styleguide = function () {
    function Styleguide() {
        _classCallCheck(this, Styleguide);
    }

    _createClass(Styleguide, null, [{
        key: 'init',
        value: function init() {
            Styleguide.inputFeedback();
            Styleguide.pagination();
        }
    }, {
        key: 'inputFeedback',
        value: function inputFeedback() {
            var testButtons = document.querySelectorAll('.states-input-buttons button');
            [].concat(_toConsumableArray(testButtons)).forEach(function (button) {
                // spread operator so IE accepts to loop through querySelectorAll result

                button.addEventListener('click', function (e) {
                    // e.preventDefault();

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
    }, {
        key: 'pagination',
        value: function pagination() {
            var pagination = document.querySelector('.pagination');
            var items = pagination.querySelectorAll('li');

            [].concat(_toConsumableArray(items)).forEach(function (item) {
                item.addEventListener("click", function (e) {
                    e.preventDefault();

                    var activeItemIndex = parseInt(pagination.querySelector('.active').dataset.page);

                    // remove active class from old active item
                    items[activeItemIndex].classList.remove('active');

                    // prev & next cases
                    if (item.classList.contains('prev')) {
                        items[activeItemIndex - 1].classList.add('active');
                    } else if (item.classList.contains('next')) {
                        items[activeItemIndex + 1].classList.add('active');
                    } else {
                        // selected new active page
                        item.classList.add('active');
                    }

                    // relaunch function for demo purpose
                    _Pagination.Pagination.pagination();
                });
            });
        }
    }]);

    return Styleguide;
}();

},{"./Pagination":2}],4:[function(require,module,exports){
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRm9ybS5qcyIsInNyY1xcc2NyaXB0XFxQYWdpbmF0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFN0eWxlZ3VpZGUuanMiLCJzcmNcXHNjcmlwdFxcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztJQ0FhLEksV0FBQSxJOzs7Ozs7Ozs7QUFFVDsrQkFDYztBQUNWLGlCQUFLLFFBQUw7QUFDSDs7O21DQUVpQjtBQUNkLGdCQUFJLG1CQUFtQixTQUFTLGdCQUFULENBQTBCLG1CQUExQixDQUF2QjtBQUNBLHlDQUFJLGdCQUFKLEdBQXNCLE9BQXRCLENBQThCLFVBQVMsTUFBVCxFQUFpQjtBQUFFOztBQUU3QztBQUNBLG9CQUFJLGdCQUFnQixPQUFPLGFBQVAsQ0FBcUIsYUFBckIsQ0FBbUMsZ0JBQW5DLENBQXBCO0FBQ0Esb0JBQUksaUJBQWlCLEtBQXJCOztBQUVBLHVCQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsQ0FBVCxFQUFZO0FBQ3pDLHNCQUFFLGNBQUY7QUFDQSxrQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQStCLGNBQWMsS0FBZCxDQUFvQixPQUFwQixJQUErQixFQUFoQyxHQUFzQyxPQUF0QyxHQUFnRCxFQUE5RTtBQUNBLHFDQUFpQixjQUFjLEtBQWQsQ0FBb0IsT0FBcEIsSUFBK0IsT0FBaEQ7O0FBRUE7QUFDQSx3QkFBRyxjQUFILEVBQW1CO0FBQUE7QUFDZixnQ0FBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBLHVDQUFXLFNBQVgsR0FBdUIsVUFBdkI7O0FBRUEsZ0NBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLGtDQUFNLFdBQU4sQ0FBa0IsVUFBbEI7O0FBRUEsdUNBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBVztBQUM1Qyw4Q0FB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QUwsQ0FBZSxRQUFmLENBQXdCLE1BQXhCLENBQUgsRUFBb0M7QUFDdkMsOEJBQU0sa0JBQWtCLENBQXhCLEVBQTJCLFNBQTNCLENBQXFDLEdBQXJDLENBQXlDLFFBQXpDO0FBQ0gscUJBRk0sTUFFQTtBQUNIO0FBQ0EsNkJBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsUUFBbkI7QUFDSDs7QUFFRDtBQUNBLDJDQUFXLFVBQVg7QUFDSCxpQkFwQkQ7QUFxQkgsYUF0QkQ7QUF1Qkg7Ozs7Ozs7OztBQzNHTDs7QUFDQTs7QUFHQTs7QUFFQSxPQUFPLE1BQVAsR0FBZ0IsWUFBVzs7QUFFdkIsZUFBSyxJQUFMO0FBQ0EsMkJBQVcsSUFBWDs7QUFFQTtBQUNBLDJCQUFXLElBQVg7QUFDSCxDQVBEOztBQUhBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBGb3JtIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZHJvcGRvd24oKSB7XG4gICAgICAgIGxldCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLXRyaWdnZXInKTtcbiAgICAgICAgWy4uLmRyb3Bkb3duVHJpZ2dlcnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1saXN0Jyk7XG4gICAgICAgICAgICBsZXQgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICgkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJcIikgPyBcImJsb2NrXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIjtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNsaWNrYWJsZSBgZGl2YCB0byBjbG9zZSB0aGUgZHJvcGRvd24gd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBkcm9wZG93biBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYoZHJvcGRvd25BY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjbGlja2FibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5jbGFzc05hbWUgPSBcImJhY2tkcm9wXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmRDaGlsZCgkY2xpY2thYmxlKTtcblxuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2hvaWNlIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGFuY2hvclRhZ3MgPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgICAgIFsuLi4kYW5jaG9yVGFnc10uZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk9wdGlvbiA9IGFuY2hvci50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcHJldmlvdXNseSBzZWxlY3RlZCBsaXN0IGl0ZW0gKHJlbW92ZSBhY3RpdmUgY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3VycmVudEFjdGl2ZUxpc3RJdGVtID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yKCdsaS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3QgY2xpY2tlZCBsaXN0IGl0ZW0gYnkgZ2l2aW5nIGl0IGBhY3RpdmVgIGNsYXNzIGFuZCBjaGFuZ2luZyBidXR0b24gbGFiZWwgdGV4dFxuICAgICAgICAgICAgICAgICAgICBhbmNob3IucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHNlbGVjdGlvbk9wdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgZHJvcGRvd24tbGlzdFxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgOiByZW1vdmUgb3BlbmVkIGJhY2tkcm9wXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcbiAgICAgICAgICAgICAgICAgICAgJGJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnaW5hdGlvbigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYWdpbmF0aW9uKCkge1xuICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnByZXYnKTtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICAgICAgICBsZXQgYWN0aXZlSXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gc2V0IC8gcmVzZXQgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbGxpcHNpcycpKSB7IGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQgPSBpOyB9XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicsICdzaG93JywgJ2VsbGlwc2lzJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtLmRhdGFzZXQucGFnZSA9IGk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBhY3RpdmVJdGVtSW5kZXggPSBwYXJzZUludChhY3RpdmVJdGVtLmRhdGFzZXQucGFnZSk7XG5cbiAgICAgICAgLyogYWRkIGFwcHJvcHJpYXRlIGNsYXNzZXMgOiAqL1xuXG4gICAgICAgIC8vIGRpc2FibGUgJ3ByZXYnIGJ1dHRvbiBpZiBhY3RpdmUgcGFnZSBpcyB0aGUgZmlyc3Qgb25lXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA9PSAxKSB7XG4gICAgICAgICAgICBwcmV2SXRlbS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbXNbM10uY2xhc3NMaXN0LmFkZCgnc2hvdycpOyAvLyBpZiBhY3RpdmUgcGFnZSBpcyAxLCB0aGUgdGhpcmQgaXRlbSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc2FibGUgJ25leHQnIGJ1dHRvbiBpZiBhY3RpdmUgcGFnZSBpcyB0aGUgbGFzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IChpdGVtcy5sZW5ndGggLSAyKSkge1xuICAgICAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW1zWyhpdGVtcy5sZW5ndGggLSA0KV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlyc3QgZWxsaXBzaXMgY2hlY2tcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID49IDQpIHsgaXRlbXNbMl0uY2xhc3NMaXN0LmFkZCgnZWxsaXBzaXMnLCAnc2hvdycpOyB9XG5cbiAgICAgICAgLy8gbGFzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPD0gKGl0ZW1zLmxlbmd0aCAtIDUpKSB7IGl0ZW1zWyhpdGVtcy5sZW5ndGggLSAzKV0uY2xhc3NMaXN0LmFkZCgnZWxsaXBzaXMnLCAnc2hvdycpOyB9XG5cbiAgICAgICAgLy8gYWN0aXZlIGl0ZW0sIHByZXZpb3VzIGFuZCBuZXh0IG9uZXNcbiAgICAgICAgaXRlbXNbKGFjdGl2ZUl0ZW1JbmRleCAtIDEpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1soYWN0aXZlSXRlbUluZGV4ICsgMSldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICAvLyBwcmV2LCBuZXh0LCBmaXJzdCBhbmQgbGFzdCBwYWdlcyBhcmUgZGlzcGxheWVkIGFzIHdlbGxcbiAgICAgICAgcHJldkl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBuZXh0SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWzFdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDIpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gaGlkZSBldmVyeSBvdGhlciBpdGVtc1xuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgIGlmKCEgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlcGxhY2UgJ2VsbGlwc2lzJyBjbGFzcyBsaXN0IGl0ZW0gY29udGVudCB3aXRoIDMgZG90c1xuICAgICAgICBsZXQgZWxsaXBzaXNJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLmVsbGlwc2lzJyk7XG4gICAgICAgIFsuLi5lbGxpcHNpc0l0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS50ZXh0Q29udGVudCA9IFwiLi4uXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgU3R5bGVndWlkZS5pbnB1dEZlZWRiYWNrKCk7XHJcbiAgICAgICAgU3R5bGVndWlkZS5wYWdpbmF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXRlcy1pbnB1dC1idXR0b25zIGJ1dHRvbicpO1xyXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XHJcblxyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrVGV4dCA9IHRoaXMuZGF0YXNldC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRHcm91cCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGlzYWJsZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkaXNhYmxlKGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSAhaW5wdXQuZGlzYWJsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRW5hYmxlIG1lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBtZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVCdXR0b24gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JleScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHBvdGVudGlhbGx5IGRpc2FibGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgbWVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0YXRlcyBjbGFzc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmZWVkYmFjayBzdGF0ZSBpZiBleGlzdHNcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpID8gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKS5yZW1vdmUoKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIGlucHV0IHN0YXRlIGZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbiB1cCBpbiBjYXNlIHRoZSBpbnB1dCBoYXMgYmVlbiBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGNsYXNzIHRvIGlucHV0LWdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwIFwiICsgYWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBmZWVkYmFjayBzcGFuIG9yIGNyZWF0ZSBvbmVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tTcGFuID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighIGZlZWRiYWNrU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4udGV4dENvbnRlbnQgPSBmZWVkYmFja1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUoZmVlZGJhY2tTcGFuLCBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XHJcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xyXG4gICAgICAgIGxldCBpdGVtcyA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcclxuXHJcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVJdGVtSW5kZXggPSBwYXJzZUludChwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5kYXRhc2V0LnBhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBvbGQgYWN0aXZlIGl0ZW1cclxuICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJldiAmIG5leHQgY2FzZXNcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnbmV4dCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4ICsgMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGVkIG5ldyBhY3RpdmUgcGFnZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVsYXVuY2ggZnVuY3Rpb24gZm9yIGRlbW8gcHVycG9zZVxyXG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vRm9ybSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcblxuLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbmltcG9ydCB7IFN0eWxlZ3VpZGUgfSBmcm9tICcuL1N0eWxlZ3VpZGUnO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBGb3JtLmluaXQoKTtcbiAgICBQYWdpbmF0aW9uLmluaXQoKTtcblxuICAgIC8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG4gICAgU3R5bGVndWlkZS5pbml0KCk7XG59OyJdfQ==
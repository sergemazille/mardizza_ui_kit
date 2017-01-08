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
exports.Notification = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var Utils = _interopRequireWildcard(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FADEOUT_DURATION = 4 * 1000;

var Notification = exports.Notification = function () {
    function Notification() {
        _classCallCheck(this, Notification);
    }

    _createClass(Notification, null, [{
        key: 'init',


        // initialize notification behaviour
        value: function init() {
            this.setupContainer();
            this.removeOnClickEvent();
        }

        // create or cleanup notifications container

    }, {
        key: 'setupContainer',
        value: function setupContainer() {
            var container = document.querySelector('#notification-container');

            // remove eventual existing container element to start clean
            if (null != container) {
                container.remove();
            }

            // create and append the notification container as body first element
            container = document.createElement('div');
            container.id = 'notification-container';
            var firstPageElement = document.body.firstElementChild;
            document.body.insertBefore(container, firstPageElement);
        }

        // set message text and notification type (success, info, warning, error)

    }, {
        key: 'create',
        value: function create(message, type) {
            var isSticky = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var container = document.querySelector('#notification-container');

            var notification = document.createElement('div');
            notification.classList.add('notification-' + type);
            if (isSticky) {
                notification.classList.add('stick');
            } // sticky notifications might be used for long messages
            notification.textContent = message;
            container.appendChild(notification);

            // animate in
            setTimeout(function () {
                notification.classList.add('in');

                // fade out notification (unless it has 'stick' class)
                if (!notification.classList.contains('stick')) {
                    Notification.clean(notification);
                }
            }, 100);
        }

        // remove old notifications

    }, {
        key: 'clean',
        value: function clean(notification) {
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FADEOUT_DURATION;

            // fadeout notification after specified duration in milliseconds (default = FADEOUT_DURATION)
            setTimeout(function () {
                notification.classList.remove('in');
                Notification.clear(notification);
            }, duration);
        }
    }, {
        key: 'clear',
        value: function clear(notification) {
            // remove notification from DOM once its fadeout animation has ended (about 1s to be sure)
            setTimeout(function () {
                notification.remove();
            }, 1000);
        }

        // add click event on 'document' for notifications that will be added later on the DOM

    }, {
        key: 'removeOnClickEvent',
        value: function removeOnClickEvent() {
            // notifications are removed when clicked on
            document.body.addEventListener("click", function (e) {
                var element = e.target;
                if (Utils.hasClass(element, 'in')) {
                    Notification.clean(element, 0);
                }
            });
        }

        // getter

    }, {
        key: 'fadeoutDuration',
        get: function get() {
            return FADEOUT_DURATION;
        }
    }]);

    return Notification;
}();

},{"./Utils":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Styleguide = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pagination = require('./Pagination');

var _Notification = require('./Notification');

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
            Styleguide.notification();
        }
    }, {
        key: 'inputFeedback',
        value: function inputFeedback() {
            var testButtons = document.querySelectorAll('.states-input-buttons button');
            [].concat(_toConsumableArray(testButtons)).forEach(function (button) {
                // spread operator so IE accepts to loop through querySelectorAll result

                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    var feedbackText = this.dataset.text;
                    var action = this.dataset.action;
                    var inputGroup = document.querySelector('.states-input-test .input-group');

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
                            button.innerHTML = "Enable input";
                        } else {
                            button.innerHTML = "Disable input";
                        }
                    }

                    // reset state
                    function reset() {
                        var disableButton = inputGroup.querySelector('.btn-grey');

                        // cleanup potentially disabled state
                        inputGroup.querySelector('input').disabled = false;
                        disableButton.innerHTML = "Disable input";

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
    }, {
        key: 'notification',
        value: function notification() {

            // standard buttons (non-sticky notifications)
            var standardNotificationButtons = document.querySelectorAll('.standard-notifications button');

            [].concat(_toConsumableArray(standardNotificationButtons)).forEach(function (button) {
                var notificationText = button.textContent;
                var notificationType = button.className.slice(4);

                button.addEventListener("click", function (e) {
                    e.preventDefault();

                    _Notification.Notification.create(notificationText, notificationType);
                });
            });

            // sticky notification button
            var stickyButton = document.querySelector('.notifications-test .btn-primary');
            stickyButton.addEventListener("click", function (e) {
                e.preventDefault();

                var notificationText = stickyButton.textContent;
                var isSticky = true;
                _Notification.Notification.create(notificationText, "info", isSticky);
            });
        }
    }]);

    return Styleguide;
}();

},{"./Notification":2,"./Pagination":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasClass = hasClass;
function hasClass(element, className) {
    return element.classList.contains(className);
}

},{}],6:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

var _Pagination = require('./Pagination');

var _Notification = require('./Notification');

var _Styleguide = require('./Styleguide');

window.onload = function () {

    _Form.Form.init();
    _Pagination.Pagination.init();
    _Notification.Notification.init();

    // styleguide custom examples
    _Styleguide.Styleguide.init();
};

// styleguide custom examples

},{"./Form":1,"./Notification":2,"./Pagination":3,"./Styleguide":4}]},{},[6])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRm9ybS5qcyIsInNyY1xcc2NyaXB0XFxOb3RpZmljYXRpb24uanMiLCJzcmNcXHNjcmlwdFxcUGFnaW5hdGlvbi5qcyIsInNyY1xcc2NyaXB0XFxTdHlsZWd1aWRlLmpzIiwic3JjXFxzY3JpcHRcXFV0aWxzLmpzIiwic3JjXFxzY3JpcHRcXG1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7SUNBYSxJLFdBQUEsSTs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixpQkFBSyxRQUFMO0FBQ0g7OzttQ0FFaUI7QUFDZCxnQkFBSSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixtQkFBMUIsQ0FBdkI7QUFDQSx5Q0FBSSxnQkFBSixHQUFzQixPQUF0QixDQUE4QixVQUFTLE1BQVQsRUFBaUI7QUFBRTs7QUFFN0M7QUFDQSxvQkFBSSxnQkFBZ0IsT0FBTyxhQUFQLENBQXFCLGFBQXJCLENBQW1DLGdCQUFuQyxDQUFwQjtBQUNBLG9CQUFJLGlCQUFpQixLQUFyQjs7QUFFQSx1QkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLENBQVQsRUFBWTtBQUN6QyxzQkFBRSxjQUFGO0FBQ0Esa0NBQWMsS0FBZCxDQUFvQixPQUFwQixHQUErQixjQUFjLEtBQWQsQ0FBb0IsT0FBcEIsSUFBK0IsRUFBaEMsR0FBc0MsT0FBdEMsR0FBZ0QsRUFBOUU7QUFDQSxxQ0FBaUIsY0FBYyxLQUFkLENBQW9CLE9BQXBCLElBQStCLE9BQWhEOztBQUVBO0FBQ0Esd0JBQUcsY0FBSCxFQUFtQjtBQUFBO0FBQ2YsZ0NBQUksYUFBYSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQSx1Q0FBVyxTQUFYLEdBQXVCLFVBQXZCOztBQUVBLGdDQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxrQ0FBTSxXQUFOLENBQWtCLFVB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LENBQTBCLGdDQUExQixDQUFsQzs7QUFFQSx5Q0FBSSwyQkFBSixHQUFpQyxPQUFqQyxDQUF5QyxVQUFTLE1BQVQsRUFBaUI7QUFDdEQsb0JBQUksbUJBQW1CLE9BQU8sV0FBOUI7QUFDQSxvQkFBSSxtQkFBbUIsT0FBTyxTQUFQLENBQWlCLEtBQWpCLENBQXVCLENBQXZCLENBQXZCOztBQUVBLHVCQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsQ0FBVCxFQUFZO0FBQ3pDLHNCQUFFLGNBQUY7O0FBRUEsK0NBQWEsTUFBYixDQUFvQixnQkFBcEIsRUFBc0MsZ0JBQXRDO0FBQ0gsaUJBSkQ7QUFLSCxhQVREOztBQVdBO0FBQ0EsZ0JBQUksZUFBZSxTQUFTLGFBQVQsQ0FBdUIsa0NBQXZCLENBQW5CO0FBQ0EseUJBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsVUFBUyxDQUFULEVBQVk7QUFDL0Msa0JBQUUsY0FBRjs7QUFFQSxvQkFBSSxtQkFBbUIsYUFBYSxXQUFwQztBQUNBLG9CQUFJLFdBQVcsSUFBZjtBQUNBLDJDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLEVBQXNDLE1BQXRDLEVBQThDLFFBQTlDO0FBQ0gsYUFORDtBQU9IOzs7Ozs7Ozs7Ozs7UUN4SVcsUSxHQUFBLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkIsU0FBM0IsRUFBc0M7QUFDekMsV0FBTyxRQUFRLFNBQVIsQ0FBa0IsUUFBbEIsQ0FBMkIsU0FBM0IsQ0FBUDtBQUNIOzs7OztBQ0ZEOztBQUNBOztBQUNBOztBQUdBOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFXOztBQUV2QixlQUFLLElBQUw7QUFDQSwyQkFBVyxJQUFYO0FBQ0EsK0JBQWEsSUFBYjs7QUFFQTtBQUNBLDJCQUFXLElBQVg7QUFDSCxDQVJEOztBQUhBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBGb3JtIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZHJvcGRvd24oKSB7XG4gICAgICAgIGxldCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLXRyaWdnZXInKTtcbiAgICAgICAgWy4uLmRyb3Bkb3duVHJpZ2dlcnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1saXN0Jyk7XG4gICAgICAgICAgICBsZXQgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICgkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJcIikgPyBcImJsb2NrXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIjtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNsaWNrYWJsZSBgZGl2YCB0byBjbG9zZSB0aGUgZHJvcGRvd24gd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBkcm9wZG93biBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYoZHJvcGRvd25BY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjbGlja2FibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5jbGFzc05hbWUgPSBcImJhY2tkcm9wXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmRDaGlsZCgkY2xpY2thYmxlKTtcblxuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2hvaWNlIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGFuY2hvclRhZ3MgPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgICAgIFsuLi4kYW5jaG9yVGFnc10uZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk9wdGlvbiA9IGFuY2hvci50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcHJldmlvdXNseSBzZWxlY3RlZCBsaXN0IGl0ZW0gKHJlbW92ZSBhY3RpdmUgY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3VycmVudEFjdGl2ZUxpc3RJdGVtID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yKCdsaS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3QgY2xpY2tlZCBsaXN0IGl0ZW0gYnkgZ2l2aW5nIGl0IGBhY3RpdmVgIGNsYXNzIGFuZCBjaGFuZ2luZyBidXR0b24gbGFiZWwgdGV4dFxuICAgICAgICAgICAgICAgICAgICBhbmNob3IucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHNlbGVjdGlvbk9wdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgZHJvcGRvd24tbGlzdFxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgOiByZW1vdmUgb3BlbmVkIGJhY2tkcm9wXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcbiAgICAgICAgICAgICAgICAgICAgJGJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vVXRpbHMnO1xyXG5cclxuY29uc3QgRkFERU9VVF9EVVJBVElPTiA9IDQgKiAxMDAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiB7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSBub3RpZmljYXRpb24gYmVoYXZpb3VyXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldHVwQ29udGFpbmVyKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVPbkNsaWNrRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgb3IgY2xlYW51cCBub3RpZmljYXRpb25zIGNvbnRhaW5lclxyXG4gICAgc3RhdGljIHNldHVwQ29udGFpbmVyKCkgIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGV2ZW50dWFsIGV4aXN0aW5nIGNvbnRhaW5lciBlbGVtZW50IHRvIHN0YXJ0IGNsZWFuXHJcbiAgICAgICAgaWYobnVsbCAhPSBjb250YWluZXIpIHsgY29udGFpbmVyLnJlbW92ZSgpOyB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgYXBwZW5kIHRoZSBub3RpZmljYXRpb24gY29udGFpbmVyIGFzIGJvZHkgZmlyc3QgZWxlbWVudFxyXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pZCA9ICdub3RpZmljYXRpb24tY29udGFpbmVyJztcclxuICAgICAgICBsZXQgZmlyc3RQYWdlRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCBmaXJzdFBhZ2VFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgbWVzc2FnZSB0ZXh0IGFuZCBub3RpZmljYXRpb24gdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IpXHJcbiAgICBzdGF0aWMgY3JlYXRlKG1lc3NhZ2UsIHR5cGUsIGlzU3RpY2t5ID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKGBub3RpZmljYXRpb24tJHt0eXBlfWApO1xyXG4gICAgICAgIGlmKGlzU3RpY2t5KSB7IG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdzdGljaycpOyB9IC8vIHN0aWNreSBub3RpZmljYXRpb25zIG1pZ2h0IGJlIHVzZWQgZm9yIGxvbmcgbWVzc2FnZXNcclxuICAgICAgICBub3RpZmljYXRpb24udGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xyXG5cclxuICAgICAgICAvLyBhbmltYXRlIGluXHJcbiAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnaW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmYWRlIG91dCBub3RpZmljYXRpb24gKHVubGVzcyBpdCBoYXMgJ3N0aWNrJyBjbGFzcylcclxuICAgICAgICAgICAgICAgIGlmKCEgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2snKSkgeyBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uKTsgfVxyXG4gICAgICAgICAgICB9LCAxMDBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSBvbGQgbm90aWZpY2F0aW9uc1xyXG4gICAgc3RhdGljIGNsZWFuKG5vdGlmaWNhdGlvbiwgZHVyYXRpb24gPSBGQURFT1VUX0RVUkFUSU9OKSB7XHJcbiAgICAgICAgLy8gZmFkZW91dCBub3RpZmljYXRpb24gYWZ0ZXIgc3BlY2lmaWVkIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoZGVmYXVsdCA9IEZBREVPVVRfRFVSQVRJT04pXHJcbiAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcclxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jbGVhcihub3RpZmljYXRpb24pO1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyKG5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgIC8vIHJlbW92ZSBub3RpZmljYXRpb24gZnJvbSBET00gb25jZSBpdHMgZmFkZW91dCBhbmltYXRpb24gaGFzIGVuZGVkIChhYm91dCAxcyB0byBiZSBzdXJlKVxyXG4gICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgb24gJ2RvY3VtZW50JyBmb3Igbm90aWZpY2F0aW9ucyB0aGF0IHdpbGwgYmUgYWRkZWQgbGF0ZXIgb24gdGhlIERPTVxyXG4gICAgc3RhdGljIHJlbW92ZU9uQ2xpY2tFdmVudCgpIHtcclxuICAgICAgICAvLyBub3RpZmljYXRpb25zIGFyZSByZW1vdmVkIHdoZW4gY2xpY2tlZCBvblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgaWYoVXRpbHMuaGFzQ2xhc3MoZWxlbWVudCwgJ2luJykpIHsgTm90aWZpY2F0aW9uLmNsZWFuKGVsZW1lbnQsIDApIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJcclxuICAgIHN0YXRpYyBnZXQgZmFkZW91dER1cmF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBGQURFT1VUX0RVUkFUSU9OO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcucHJldicpO1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gICAgICAgIGxldCBhY3RpdmVJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgICAgIGxldCBpdGVtcyA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBzZXQgLyByZXNldCBpdGVtc1xuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VsbGlwc2lzJykpIHsgaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCA9IGk7IH1cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJywgJ3Nob3cnLCAnZWxsaXBzaXMnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5wYWdlID0gaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KGFjdGl2ZUl0ZW0uZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAvKiBhZGQgYXBwcm9wcmlhdGUgY2xhc3NlcyA6ICovXG5cbiAgICAgICAgLy8gZGlzYWJsZSAncHJldicgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IDEpIHtcbiAgICAgICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1szXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7IC8vIGlmIGFjdGl2ZSBwYWdlIGlzIDEsIHRoZSB0aGlyZCBpdGVtIGlzIGRpc3BsYXllZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGlzYWJsZSAnbmV4dCcgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBsYXN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gKGl0ZW1zLmxlbmd0aCAtIDIpKSB7XG4gICAgICAgICAgICBuZXh0SXRlbS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDQpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPj0gNCkgeyBpdGVtc1syXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBsYXN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA8PSAoaXRlbXMubGVuZ3RoIC0gNSkpIHsgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDMpXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBhY3RpdmUgaXRlbSwgcHJldmlvdXMgYW5kIG5leHQgb25lc1xuICAgICAgICBpdGVtc1soYWN0aXZlSXRlbUluZGV4IC0gMSldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggKyAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIHByZXYsIG5leHQsIGZpcnN0IGFuZCBsYXN0IHBhZ2VzIGFyZSBkaXNwbGF5ZWQgYXMgd2VsbFxuICAgICAgICBwcmV2SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbMV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMildLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICAvLyBoaWRlIGV2ZXJ5IG90aGVyIGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaWYoISBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVwbGFjZSAnZWxsaXBzaXMnIGNsYXNzIGxpc3QgaXRlbSBjb250ZW50IHdpdGggMyBkb3RzXG4gICAgICAgIGxldCBlbGxpcHNpc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGkuZWxsaXBzaXMnKTtcbiAgICAgICAgWy4uLmVsbGlwc2lzSXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignYScpLnRleHRDb250ZW50ID0gXCIuLi5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4vUGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHlsZWd1aWRlIHtcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIFN0eWxlZ3VpZGUuaW5wdXRGZWVkYmFjaygpO1xyXG4gICAgICAgIFN0eWxlZ3VpZGUucGFnaW5hdGlvbigpO1xyXG4gICAgICAgIFN0eWxlZ3VpZGUubm90aWZpY2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXRlcy1pbnB1dC1idXR0b25zIGJ1dHRvbicpO1xyXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XHJcblxyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrVGV4dCA9IHRoaXMuZGF0YXNldC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtdGVzdCAuaW5wdXQtZ3JvdXAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRpc2FibGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGlzYWJsZShidXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc2FibGVkID0gIWlucHV0LmRpc2FibGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkVuYWJsZSBpbnB1dFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgaW5wdXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc3RhdGVcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlQnV0dG9uID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWdyZXknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwb3RlbnRpYWxseSBkaXNhYmxlZCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzdGF0ZXMgY2xhc3Nlc1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZmVlZGJhY2sgc3RhdGUgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSA/IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykucmVtb3ZlKCkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBpbnB1dCBzdGF0ZSBmZWVkYmFja1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3RhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgaW4gY2FzZSB0aGUgaW5wdXQgaGFzIGJlZW4gZGlzYWJsZWRcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cCBcIiArIGFjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmVlZGJhY2sgc3BhbiBvciBjcmVhdGUgb25lXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrU3BhbiA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISBmZWVkYmFja1NwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4uY2xhc3NOYW1lID0gXCJmZWVkYmFja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLnRleHRDb250ZW50ID0gZmVlZGJhY2tUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuaW5zZXJ0QmVmb3JlKGZlZWRiYWNrU3BhbiwgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwYWdpbmF0aW9uKCkge1xyXG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XHJcblxyXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZGF0YXNldC5wYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gb2xkIGFjdGl2ZSBpdGVtXHJcbiAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByZXYgJiBuZXh0IGNhc2VzXHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygncHJldicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4IC0gMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCArIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RlZCBuZXcgYWN0aXZlIHBhZ2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlbGF1bmNoIGZ1bmN0aW9uIGZvciBkZW1vIHB1cnBvc2VcclxuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbm90aWZpY2F0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBzdGFuZGFyZCBidXR0b25zIChub24tc3RpY2t5IG5vdGlmaWNhdGlvbnMpXHJcbiAgICAgICAgbGV0IHN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFuZGFyZC1ub3RpZmljYXRpb25zIGJ1dHRvbicpO1xyXG5cclxuICAgICAgICBbLi4uc3RhbmRhcmROb3RpZmljYXRpb25CdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xyXG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVGV4dCA9IGJ1dHRvbi50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblR5cGUgPSBidXR0b24uY2xhc3NOYW1lLnNsaWNlKDQpO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNyZWF0ZShub3RpZmljYXRpb25UZXh0LCBub3RpZmljYXRpb25UeXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHN0aWNreSBub3RpZmljYXRpb24gYnV0dG9uXHJcbiAgICAgICAgbGV0IHN0aWNreUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RpZmljYXRpb25zLXRlc3QgLmJ0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgc3RpY2t5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UZXh0ID0gc3RpY2t5QnV0dG9uLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBsZXQgaXNTdGlja3kgPSB0cnVlO1xyXG4gICAgICAgICAgICBOb3RpZmljYXRpb24uY3JlYXRlKG5vdGlmaWNhdGlvblRleHQsIFwiaW5mb1wiLCBpc1N0aWNreSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxufSIsImltcG9ydCB7IEZvcm0gfSBmcm9tICcuL0Zvcm0nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4vUGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuL05vdGlmaWNhdGlvbic7XG5cbi8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG5pbXBvcnQgeyBTdHlsZWd1aWRlIH0gZnJvbSAnLi9TdHlsZWd1aWRlJztcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgRm9ybS5pbml0KCk7XG4gICAgUGFnaW5hdGlvbi5pbml0KCk7XG4gICAgTm90aWZpY2F0aW9uLmluaXQoKTtcblxuICAgIC8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG4gICAgU3R5bGVndWlkZS5pbml0KCk7XG59OyJdfQ==
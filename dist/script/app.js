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
            notification.innerHTML = message;
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

},{"./Utils":6}],3:[function(require,module,exports){
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
            var inputGroup = document.querySelector('.states-input-test .input-group');
            var testButtonsGroup = document.querySelector('.states-input-buttons');
            var testButtons = testButtonsGroup.querySelectorAll('button');

            // insert an empty span as height placeholder
            createPlaceholder();

            [].concat(_toConsumableArray(testButtons)).forEach(function (button) {
                // spread operator so IE accepts to loop through querySelectorAll result

                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    var feedbackText = this.dataset.text;
                    var action = this.dataset.action;

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

                        // recreate a placeholder
                        createPlaceholder();
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

            function createPlaceholder() {
                var placeholder = document.createElement('span');
                placeholder.className = "feedback";
                placeholder.innerHTML = "&nbsp;";
                inputGroup.insertBefore(placeholder, testButtonsGroup);
            }
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
                var notificationText = button.dataset.text;
                var notificationType = button.className.slice(4);

                button.addEventListener("click", function (e) {
                    e.preventDefault();

                    _Notification.Notification.create(notificationText, notificationType);
                });
            });

            // sticky notification button
            var stickyButtons = document.querySelectorAll('.notifications-test .sticky');

            [].concat(_toConsumableArray(stickyButtons)).forEach(function (button) {
                button.addEventListener("click", function (e) {
                    e.preventDefault();

                    var notificationText = button.dataset.text;
                    var isSticky = true;
                    _Notification.Notification.create(notificationText, "info", isSticky);
                });
            });
        }
    }]);

    return Styleguide;
}();

},{"./Notification":2,"./Pagination":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var Utils = _interopRequireWildcard(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var visibleTabContentIds = void 0;

var Tab = exports.Tab = function () {
    function Tab() {
        _classCallCheck(this, Tab);
    }

    _createClass(Tab, null, [{
        key: 'init',


        // launch class methods
        value: function init() {
            this.tab();
        }
    }, {
        key: 'tab',
        value: function tab() {
            // update active tab(s)
            this.updateActiveContentIds();

            // hide non active content at page start up (show still display active content)
            this.hideNonActiveContent();

            // menu behaviour
            var tabMenuLinks = document.querySelectorAll('.tabs-menu a');
            [].concat(_toConsumableArray(tabMenuLinks)).forEach(function (link) {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    // get link owning tab
                    var tabs = Utils.closest(link, 'tabs');

                    // hide current active content
                    var activeMenuTab = tabs.querySelector('.active');
                    if (null != activeMenuTab) {
                        activeMenuTab.classList.remove('active');
                    }

                    // add 'active' class to link parent
                    link.parentElement.classList.add('active');

                    // and finally update DOM
                    Tab.updateActiveContentIds();
                    Tab.hideNonActiveContent();
                });
            });
        }
    }, {
        key: 'updateActiveContentIds',
        value: function updateActiveContentIds() {
            visibleTabContentIds = new Set(); // start clean
            var activeTabMenus = document.querySelectorAll('.tabs-menu .active');
            [].concat(_toConsumableArray(activeTabMenus)).forEach(function (tabMenu) {
                var targetId = tabMenu.firstElementChild.getAttribute('href').slice(1); // remove the # symbol
                visibleTabContentIds.add(targetId);
            });
        }
    }, {
        key: 'hideNonActiveContent',
        value: function hideNonActiveContent() {
            var tabContents = document.querySelectorAll('.tabs .tabs-content');
            [].concat(_toConsumableArray(tabContents)).forEach(function (contentBlock) {
                [].concat(_toConsumableArray(contentBlock.children)).forEach(function (content) {
                    // start clean by removing 'hidden' class
                    content.classList.remove('hidden');

                    // hide contents that are not in an active state tab
                    if (!visibleTabContentIds.has(content.id)) {
                        content.classList.add('hidden');
                    }
                });
            });
        }
    }]);

    return Tab;
}();

},{"./Utils":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasClass = hasClass;
exports.closest = closest;
function hasClass(element, className) {
    return element.classList.contains(className);
}

function closest(element, className) {
    var parent = void 0;

    while (element) {
        parent = element.parentElement;

        if (hasClass(parent, className)) {
            return parent;
        }

        element = parent;
    };

    return null;
}

},{}],7:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

var _Pagination = require('./Pagination');

var _Notification = require('./Notification');

var _Tab = require('./Tab');

var _Styleguide = require('./Styleguide');

window.onload = function () {

    _Form.Form.init();
    _Pagination.Pagination.init();
    _Notification.Notification.init();
    _Tab.Tab.init();

    // styleguide custom examples
    _Styleguide.Styleguide.init();
};

// styleguide custom examples

},{"./Form":1,"./Notification":2,"./Pagination":3,"./Styleguide":4,"./Tab":5}]},{},[7])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRm9ybS5qcyIsInNyY1xcc2NyaXB0XFxOb3RpZmljYXRpb24uanMiLCJzcmNcXHNjcmlwdFxcUGFnaW5hdGlvbi5qcyIsInNyY1xcc2NyaXB0XFxTdHlsZWd1aWRlLmpzIiwic3JjXFxzY3JpcHRcXFRhYi5qcyIsInNyY1xcc2NyaXB0XFxVdGlscy5qcyIsInNyY1xcc2NyaXB0XFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lDQWEsSSxXQUFBLEk7Ozs7Ozs7OztBQUVUOytCQUNjO0FBQ1YsaUJBQUssUUFBTDtBQUNIOzs7bUNBRWlCO0FBQ2QsZ0JBQUksbUJBQW1CLFNBQVMsZ0JBQVQsQ0FBMEIsbUJBQTFCLENBQXZCO0FBQ0EseUNBQUksZ0JBQUosR0FBc0IsT0FBdEIsQ0FBOEIsVUFBUyxNQUFULEVBQWlCO0FBQUU7O0FBRTdDO0FBQ0Esb0JBQUksZ0JBQWdCLE9BQU8sYUFBUCxDQUFxQixhQUFyQixDQUFtQyxnQkFBbkMsQ0FBcEI7QUFDQSxvQkFBSSxpQkFBaUIsS0FBckI7O0FBRUEsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBUyxDQUFULEVBQVk7QUFDekMsc0JBQUUsY0FBRjtBQUNBLGtDQUFjLEtBQWQsQ0FBb0IsT0FBcEIsR0FBK0IsY0FBYyxLQUFkLENBQW9CLE9BQXBCLElBQStCLEVBQWhDLEdBQXNDLE9BQXRDLEdBQWdELEVBQTlFO0FBQ0EscUNBQWlCLGNBQWMsS0FBZCxDQUFvQixPQUFwQixJQUErQixPQUFoRDs7QUFFQTtBQUNBLHdCQUFHLGNBQUgsRUFBbUI7QUFBQTtBQUNmLGdDQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0EsdUNBQVcsU0FBWCxHQUF1QixVQUF2Qjs7QUFFQSxnQ0FBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFaO0FB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dCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIEZvcm0ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkcm9wZG93bigpIHtcbiAgICAgICAgbGV0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24tdHJpZ2dlcicpO1xuICAgICAgICBbLi4uZHJvcGRvd25UcmlnZ2Vyc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWxpc3QnKTtcbiAgICAgICAgICAgIGxldCBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gKCRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcIlwiKSA/IFwiYmxvY2tcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJibG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgY2xpY2thYmxlIGBkaXZgIHRvIGNsb3NlIHRoZSBkcm9wZG93biB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGRyb3Bkb3duIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBpZihkcm9wZG93bkFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJGNsaWNrYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3BcIjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZENoaWxkKCRjbGlja2FibGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjaG9pY2UgZXZlbnRcbiAgICAgICAgICAgIGxldCAkYW5jaG9yVGFncyA9ICRkcm9wZG93bkxpc3QucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICAgICAgICAgICAgWy4uLiRhbmNob3JUYWdzXS5mb3JFYWNoKGZ1bmN0aW9uKGFuY2hvcikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uT3B0aW9uID0gYW5jaG9yLnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwcmV2aW91c2x5IHNlbGVjdGVkIGxpc3QgaXRlbSAocmVtb3ZlIGFjdGl2ZSBjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0gPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3IoJ2xpLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudEFjdGl2ZUxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBjbGlja2VkIGxpc3QgaXRlbSBieSBnaXZpbmcgaXQgYGFjdGl2ZWAgY2xhc3MgYW5kIGNoYW5naW5nIGJ1dHRvbiBsYWJlbCB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc2VsZWN0aW9uT3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBkcm9wZG93bi1saXN0XG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCA6IHJlbW92ZSBvcGVuZWQgYmFja2Ryb3BcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xuICAgICAgICAgICAgICAgICAgICAkYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbmNvbnN0IEZBREVPVVRfRFVSQVRJT04gPSA0ICogMTAwMDtcblxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiB7XG5cbiAgICAvLyBpbml0aWFsaXplIG5vdGlmaWNhdGlvbiBiZWhhdmlvdXJcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnJlbW92ZU9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvciBjbGVhbnVwIG5vdGlmaWNhdGlvbnMgY29udGFpbmVyXG4gICAgc3RhdGljIHNldHVwQ29udGFpbmVyKCkgIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RpZmljYXRpb24tY29udGFpbmVyJyk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV2ZW50dWFsIGV4aXN0aW5nIGNvbnRhaW5lciBlbGVtZW50IHRvIHN0YXJ0IGNsZWFuXG4gICAgICAgIGlmKG51bGwgIT0gY29udGFpbmVyKSB7IGNvbnRhaW5lci5yZW1vdmUoKTsgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgYXBwZW5kIHRoZSBub3RpZmljYXRpb24gY29udGFpbmVyIGFzIGJvZHkgZmlyc3QgZWxlbWVudFxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmlkID0gJ25vdGlmaWNhdGlvbi1jb250YWluZXInO1xuICAgICAgICBsZXQgZmlyc3RQYWdlRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgZmlyc3RQYWdlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gc2V0IG1lc3NhZ2UgdGV4dCBhbmQgbm90aWZpY2F0aW9uIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yKVxuICAgIHN0YXRpYyBjcmVhdGUobWVzc2FnZSwgdHlwZSwgaXNTdGlja3kgPSBmYWxzZSkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcblxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKGBub3RpZmljYXRpb24tJHt0eXBlfWApO1xuICAgICAgICBpZihpc1N0aWNreSkgeyBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnc3RpY2snKTsgfSAvLyBzdGlja3kgbm90aWZpY2F0aW9ucyBtaWdodCBiZSB1c2VkIGZvciBsb25nIG1lc3NhZ2VzXG4gICAgICAgIG5vdGlmaWNhdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcblxuICAgICAgICAvLyBhbmltYXRlIGluXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnaW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIGZhZGUgb3V0IG5vdGlmaWNhdGlvbiAodW5sZXNzIGl0IGhhcyAnc3RpY2snIGNsYXNzKVxuICAgICAgICAgICAgICAgIGlmKCEgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2snKSkgeyBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uKTsgfVxuICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9sZCBub3RpZmljYXRpb25zXG4gICAgc3RhdGljIGNsZWFuKG5vdGlmaWNhdGlvbiwgZHVyYXRpb24gPSBGQURFT1VUX0RVUkFUSU9OKSB7XG4gICAgICAgIC8vIGZhZGVvdXQgbm90aWZpY2F0aW9uIGFmdGVyIHNwZWNpZmllZCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgKGRlZmF1bHQgPSBGQURFT1VUX0RVUkFUSU9OKVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNsZWFyKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBkdXJhdGlvblxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcihub3RpZmljYXRpb24pIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5vdGlmaWNhdGlvbiBmcm9tIERPTSBvbmNlIGl0cyBmYWRlb3V0IGFuaW1hdGlvbiBoYXMgZW5kZWQgKGFib3V0IDFzIHRvIGJlIHN1cmUpXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAxMDAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50IG9uICdkb2N1bWVudCcgZm9yIG5vdGlmaWNhdGlvbnMgdGhhdCB3aWxsIGJlIGFkZGVkIGxhdGVyIG9uIHRoZSBET01cbiAgICBzdGF0aWMgcmVtb3ZlT25DbGlja0V2ZW50KCkge1xuICAgICAgICAvLyBub3RpZmljYXRpb25zIGFyZSByZW1vdmVkIHdoZW4gY2xpY2tlZCBvblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgaWYoVXRpbHMuaGFzQ2xhc3MoZWxlbWVudCwgJ2luJykpIHsgTm90aWZpY2F0aW9uLmNsZWFuKGVsZW1lbnQsIDApIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyXG4gICAgc3RhdGljIGdldCBmYWRlb3V0RHVyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBGQURFT1VUX0RVUkFUSU9OO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgUGFnaW5hdGlvbiB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2luYXRpb24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICAgICAgICBsZXQgcHJldkl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5wcmV2Jyk7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIHNldCAvIHJlc2V0IGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZWxsaXBzaXMnKSkgeyBpdGVtLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50ID0gaTsgfVxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nLCAnc2hvdycsICdlbGxpcHNpcycsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbS5kYXRhc2V0LnBhZ2UgPSBpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQoYWN0aXZlSXRlbS5kYXRhc2V0LnBhZ2UpO1xuXG4gICAgICAgIC8qIGFkZCBhcHByb3ByaWF0ZSBjbGFzc2VzIDogKi9cblxuICAgICAgICAvLyBkaXNhYmxlICdwcmV2JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgcHJldkl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW1zWzNdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTsgLy8gaWYgYWN0aXZlIHBhZ2UgaXMgMSwgdGhlIHRoaXJkIGl0ZW0gaXMgZGlzcGxheWVkXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNhYmxlICduZXh0JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGxhc3Qgb25lXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA9PSAoaXRlbXMubGVuZ3RoIC0gMikpIHtcbiAgICAgICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gNCldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcnN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA+PSA0KSB7IGl0ZW1zWzJdLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGxhc3QgZWxsaXBzaXMgY2hlY2tcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4IDw9IChpdGVtcy5sZW5ndGggLSA1KSkgeyBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMyldLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGFjdGl2ZSBpdGVtLCBwcmV2aW91cyBhbmQgbmV4dCBvbmVzXG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggLSAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbKGFjdGl2ZUl0ZW1JbmRleCArIDEpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gcHJldiwgbmV4dCwgZmlyc3QgYW5kIGxhc3QgcGFnZXMgYXJlIGRpc3BsYXllZCBhcyB3ZWxsXG4gICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1sxXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhpdGVtcy5sZW5ndGggLSAyKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIGhpZGUgZXZlcnkgb3RoZXIgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpZighIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZXBsYWNlICdlbGxpcHNpcycgY2xhc3MgbGlzdCBpdGVtIGNvbnRlbnQgd2l0aCAzIGRvdHNcbiAgICAgICAgbGV0IGVsbGlwc2lzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaS5lbGxpcHNpcycpO1xuICAgICAgICBbLi4uZWxsaXBzaXNJdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCdhJykudGV4dENvbnRlbnQgPSBcIi4uLlwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcblxuZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBTdHlsZWd1aWRlLmlucHV0RmVlZGJhY2soKTtcbiAgICAgICAgU3R5bGVndWlkZS5wYWdpbmF0aW9uKCk7XG4gICAgICAgIFN0eWxlZ3VpZGUubm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnB1dC10ZXN0IC5pbnB1dC1ncm91cCcpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnNHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnMgPSB0ZXN0QnV0dG9uc0dyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgICAgIC8vIGluc2VydCBhbiBlbXB0eSBzcGFuIGFzIGhlaWdodCBwbGFjZWhvbGRlclxuICAgICAgICBjcmVhdGVQbGFjZWhvbGRlcigpO1xuXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tUZXh0ID0gdGhpcy5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkaXNhYmxlZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRpc2FibGUoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9ICFpbnB1dC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkVuYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc3RhdGVcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVCdXR0b24gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JleScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcG90ZW50aWFsbHkgZGlzYWJsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0YXRlcyBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmZWVkYmFjayBzdGF0ZSBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSA/IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykucmVtb3ZlKCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3JlYXRlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgaW5wdXQgc3RhdGUgZmVlZGJhY2tcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgaW4gY2FzZSB0aGUgaW5wdXQgaGFzIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXAgXCIgKyBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmVlZGJhY2sgc3BhbiBvciBjcmVhdGUgb25lXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1NwYW4gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpO1xuICAgICAgICAgICAgICAgICAgICBpZighIGZlZWRiYWNrU3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi50ZXh0Q29udGVudCA9IGZlZWRiYWNrVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUoZmVlZGJhY2tTcGFuLCBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmlubmVySFRNTCA9IFwiJm5ic3A7XCI7XG4gICAgICAgICAgICBpbnB1dEdyb3VwLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgdGVzdEJ1dHRvbnNHcm91cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBvbGQgYWN0aXZlIGl0ZW1cbiAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJldiAmIG5leHQgY2FzZXNcbiAgICAgICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygncHJldicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCAtIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCArIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGVkIG5ldyBhY3RpdmUgcGFnZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlbGF1bmNoIGZ1bmN0aW9uIGZvciBkZW1vIHB1cnBvc2VcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm90aWZpY2F0aW9uKCkge1xuXG4gICAgICAgIC8vIHN0YW5kYXJkIGJ1dHRvbnMgKG5vbi1zdGlja3kgbm90aWZpY2F0aW9ucylcbiAgICAgICAgbGV0IHN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFuZGFyZC1ub3RpZmljYXRpb25zIGJ1dHRvbicpO1xuXG4gICAgICAgIFsuLi5zdGFuZGFyZE5vdGlmaWNhdGlvbkJ1dHRvbnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZSA9IGJ1dHRvbi5jbGFzc05hbWUuc2xpY2UoNCk7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jcmVhdGUobm90aWZpY2F0aW9uVGV4dCwgbm90aWZpY2F0aW9uVHlwZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc3RpY2t5IG5vdGlmaWNhdGlvbiBidXR0b25cbiAgICAgICAgbGV0IHN0aWNreUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm90aWZpY2F0aW9ucy10ZXN0IC5zdGlja3knKTtcblxuICAgICAgICBbLi4uc3RpY2t5QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgaXNTdGlja3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jcmVhdGUobm90aWZpY2F0aW9uVGV4dCwgXCJpbmZvXCIsIGlzU3RpY2t5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XHJcblxyXG5sZXQgdmlzaWJsZVRhYkNvbnRlbnRJZHM7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFiIHtcclxuXHJcbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdGFiKCkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSBhY3RpdmUgdGFiKHMpXHJcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgbm9uIGFjdGl2ZSBjb250ZW50IGF0IHBhZ2Ugc3RhcnQgdXAgKHNob3cgc3RpbGwgZGlzcGxheSBhY3RpdmUgY29udGVudClcclxuICAgICAgICB0aGlzLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XHJcblxyXG4gICAgICAgIC8vIG1lbnUgYmVoYXZpb3VyXHJcbiAgICAgICAgbGV0IHRhYk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLW1lbnUgYScpO1xyXG4gICAgICAgIFsuLi50YWJNZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24obGluaykge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbGluayBvd25pbmcgdGFiXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFicyA9IFV0aWxzLmNsb3Nlc3QobGluaywgJ3RhYnMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIGN1cnJlbnQgYWN0aXZlIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVNZW51VGFiID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IGFjdGl2ZU1lbnVUYWIpIHsgYWN0aXZlTWVudVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFkZCAnYWN0aXZlJyBjbGFzcyB0byBsaW5rIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFuZCBmaW5hbGx5IHVwZGF0ZSBET01cclxuICAgICAgICAgICAgICAgIFRhYi51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcbiAgICAgICAgICAgICAgICBUYWIuaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKSB7XHJcbiAgICAgICAgdmlzaWJsZVRhYkNvbnRlbnRJZHMgPSBuZXcgU2V0KCk7IC8vIHN0YXJ0IGNsZWFuXHJcbiAgICAgICAgbGV0IGFjdGl2ZVRhYk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSAuYWN0aXZlJyk7XHJcbiAgICAgICAgWy4uLmFjdGl2ZVRhYk1lbnVzXS5mb3JFYWNoKGZ1bmN0aW9uKHRhYk1lbnUpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldElkID0gdGFiTWVudS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zbGljZSgxKTsgLy8gcmVtb3ZlIHRoZSAjIHN5bWJvbFxyXG4gICAgICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcy5hZGQodGFyZ2V0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlTm9uQWN0aXZlQ29udGVudCgpIHtcclxuICAgICAgICBsZXQgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicyAudGFicy1jb250ZW50Jyk7XHJcbiAgICAgICAgWy4uLnRhYkNvbnRlbnRzXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnRCbG9jaykge1xyXG4gICAgICAgICAgICBbLi4uY29udGVudEJsb2NrLmNoaWxkcmVuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGNsZWFuIGJ5IHJlbW92aW5nICdoaWRkZW4nIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY29udGVudHMgdGhhdCBhcmUgbm90IGluIGFuIGFjdGl2ZSBzdGF0ZSB0YWJcclxuICAgICAgICAgICAgICAgIGlmKCEgdmlzaWJsZVRhYkNvbnRlbnRJZHMuaGFzKGNvbnRlbnQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgbGV0IHBhcmVudDtcclxuXHJcbiAgICB3aGlsZShlbGVtZW50KSB7XHJcbiAgICAgICAgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICBpZihoYXNDbGFzcyhwYXJlbnQsIGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQgPSBwYXJlbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59IiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vRm9ybSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4vVGFiJztcblxuLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbmltcG9ydCB7IFN0eWxlZ3VpZGUgfSBmcm9tICcuL1N0eWxlZ3VpZGUnO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBGb3JtLmluaXQoKTtcbiAgICBQYWdpbmF0aW9uLmluaXQoKTtcbiAgICBOb3RpZmljYXRpb24uaW5pdCgpO1xuICAgIFRhYi5pbml0KCk7XG5cbiAgICAvLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuICAgIFN0eWxlZ3VpZGUuaW5pdCgpO1xufTsiXX0=
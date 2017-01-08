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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRm9ybS5qcyIsInNyY1xcc2NyaXB0XFxOb3RpZmljYXRpb24uanMiLCJzcmNcXHNjcmlwdFxcUGFnaW5hdGlvbi5qcyIsInNyY1xcc2NyaXB0XFxTdHlsZWd1aWRlLmpzIiwic3JjXFxzY3JpcHRcXFRhYi5qcyIsInNyY1xcc2NyaXB0XFxVdGlscy5qcyIsInNyY1xcc2NyaXB0XFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lDQWEsSSxXQUFBLEk7Ozs7Ozs7OztBQUVUOytCQUNjO0FBQ1YsaUJBQUssUUFBTDtBQUNIOzs7bUNBRWlCO0FBQ2QsZ0JBQUksbUJBQW1CLFNBQVMsZ0JBQVQsQ0FBMEIsbUJBQTFCLENBQXZCO0FBQ0EseUNBQUksZ0JBQUosR0FBc0IsT0FBdEIsQ0FBOEIsVUFBUyxNQUFULEVBQWlCO0FBQUU7O0FBRTdDO0FBQ0Esb0JBQUksZ0JBQWdCLE9BQU8sYUFBUCxDQUFxQixhQUFyQixDQUFtQyxnQkFBbkMsQ0FBcEI7QUFDQSxvQkFBSSxpQkFBaUIsS0FBckI7O0FBRUEsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBUyxDQUFULEVBQVk7QUFDekMsc0JBQUUsY0FBRjtBQUNBLGtDQUFjLEtBQWQsQ0FBb0IsT0FBcEIsR0FBK0IsY0FBYyxLQUFkLENBQW9CLE9BQXBCLElBQStCLEVBQWhDLEdBQXNDLE9BQXRDLEdBQWdELEVBQTlFO0FBQ0EscUNBQWlCLGNBQWMsS0FBZCxDQUFvQixPQUFwQixJQUErQixPQUFoRDs7QUFFQTtBQUNBLHdCQUFHLGNBQUgsRUFBbUI7QUFBQTtBQUNmLGdDQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0EsdUNBQVcsU0FBWCxHQUF1QixVQUF2Qjs7QUFFQSxnQ0FBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFaO0FB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aUJBUkQ7QUFTSCxhQVZEO0FBV0g7Ozs7Ozs7Ozs7OztRQzlEVyxRLEdBQUEsUTtRQUlBLE8sR0FBQSxPO0FBSlQsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCLEVBQXNDO0FBQ3pDLFdBQU8sUUFBUSxTQUFSLENBQWtCLFFBQWxCLENBQTJCLFNBQTNCLENBQVA7QUFDSDs7QUFFTSxTQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEIsU0FBMUIsRUFBcUM7QUFDeEMsUUFBSSxlQUFKOztBQUVBLFdBQU0sT0FBTixFQUFlO0FBQ1gsaUJBQVMsUUFBUSxhQUFqQjs7QUFFQSxZQUFHLFNBQVMsTUFBVCxFQUFpQixTQUFqQixDQUFILEVBQWdDO0FBQzVCLG1CQUFPLE1BQVA7QUFDSDs7QUFFRCxrQkFBVSxNQUFWO0FBQ0g7O0FBRUQsV0FBTyxJQUFQO0FBQ0g7Ozs7O0FDbEJEOztBQUNBOztBQUNBOztBQUNBOztBQUdBOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFXOztBQUV2QixlQUFLLElBQUw7QUFDQSwyQkFBVyxJQUFYO0FBQ0EsK0JBQWEsSUFBYjtBQUNBLGFBQUksSUFBSjs7QUFFQTtBQUNBLDJCQUFXLElBQVg7QUFDSCxDQVREOztBQUhBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBGb3JtIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZHJvcGRvd24oKSB7XG4gICAgICAgIGxldCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLXRyaWdnZXInKTtcbiAgICAgICAgWy4uLmRyb3Bkb3duVHJpZ2dlcnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1saXN0Jyk7XG4gICAgICAgICAgICBsZXQgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICgkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJcIikgPyBcImJsb2NrXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIjtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNsaWNrYWJsZSBgZGl2YCB0byBjbG9zZSB0aGUgZHJvcGRvd24gd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBkcm9wZG93biBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYoZHJvcGRvd25BY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjbGlja2FibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5jbGFzc05hbWUgPSBcImJhY2tkcm9wXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmRDaGlsZCgkY2xpY2thYmxlKTtcblxuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2hvaWNlIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGFuY2hvclRhZ3MgPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgICAgIFsuLi4kYW5jaG9yVGFnc10uZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk9wdGlvbiA9IGFuY2hvci50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcHJldmlvdXNseSBzZWxlY3RlZCBsaXN0IGl0ZW0gKHJlbW92ZSBhY3RpdmUgY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3VycmVudEFjdGl2ZUxpc3RJdGVtID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yKCdsaS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3QgY2xpY2tlZCBsaXN0IGl0ZW0gYnkgZ2l2aW5nIGl0IGBhY3RpdmVgIGNsYXNzIGFuZCBjaGFuZ2luZyBidXR0b24gbGFiZWwgdGV4dFxuICAgICAgICAgICAgICAgICAgICBhbmNob3IucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHNlbGVjdGlvbk9wdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgZHJvcGRvd24tbGlzdFxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgOiByZW1vdmUgb3BlbmVkIGJhY2tkcm9wXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcbiAgICAgICAgICAgICAgICAgICAgJGJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vVXRpbHMnO1xyXG5cclxuY29uc3QgRkFERU9VVF9EVVJBVElPTiA9IDQgKiAxMDAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiB7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSBub3RpZmljYXRpb24gYmVoYXZpb3VyXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldHVwQ29udGFpbmVyKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVPbkNsaWNrRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgb3IgY2xlYW51cCBub3RpZmljYXRpb25zIGNvbnRhaW5lclxyXG4gICAgc3RhdGljIHNldHVwQ29udGFpbmVyKCkgIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGV2ZW50dWFsIGV4aXN0aW5nIGNvbnRhaW5lciBlbGVtZW50IHRvIHN0YXJ0IGNsZWFuXHJcbiAgICAgICAgaWYobnVsbCAhPSBjb250YWluZXIpIHsgY29udGFpbmVyLnJlbW92ZSgpOyB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgYXBwZW5kIHRoZSBub3RpZmljYXRpb24gY29udGFpbmVyIGFzIGJvZHkgZmlyc3QgZWxlbWVudFxyXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pZCA9ICdub3RpZmljYXRpb24tY29udGFpbmVyJztcclxuICAgICAgICBsZXQgZmlyc3RQYWdlRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCBmaXJzdFBhZ2VFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgbWVzc2FnZSB0ZXh0IGFuZCBub3RpZmljYXRpb24gdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IpXHJcbiAgICBzdGF0aWMgY3JlYXRlKG1lc3NhZ2UsIHR5cGUsIGlzU3RpY2t5ID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKGBub3RpZmljYXRpb24tJHt0eXBlfWApO1xyXG4gICAgICAgIGlmKGlzU3RpY2t5KSB7IG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdzdGljaycpOyB9IC8vIHN0aWNreSBub3RpZmljYXRpb25zIG1pZ2h0IGJlIHVzZWQgZm9yIGxvbmcgbWVzc2FnZXNcclxuICAgICAgICBub3RpZmljYXRpb24udGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xyXG5cclxuICAgICAgICAvLyBhbmltYXRlIGluXHJcbiAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnaW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmYWRlIG91dCBub3RpZmljYXRpb24gKHVubGVzcyBpdCBoYXMgJ3N0aWNrJyBjbGFzcylcclxuICAgICAgICAgICAgICAgIGlmKCEgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2snKSkgeyBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uKTsgfVxyXG4gICAgICAgICAgICB9LCAxMDBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSBvbGQgbm90aWZpY2F0aW9uc1xyXG4gICAgc3RhdGljIGNsZWFuKG5vdGlmaWNhdGlvbiwgZHVyYXRpb24gPSBGQURFT1VUX0RVUkFUSU9OKSB7XHJcbiAgICAgICAgLy8gZmFkZW91dCBub3RpZmljYXRpb24gYWZ0ZXIgc3BlY2lmaWVkIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoZGVmYXVsdCA9IEZBREVPVVRfRFVSQVRJT04pXHJcbiAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcclxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jbGVhcihub3RpZmljYXRpb24pO1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyKG5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgIC8vIHJlbW92ZSBub3RpZmljYXRpb24gZnJvbSBET00gb25jZSBpdHMgZmFkZW91dCBhbmltYXRpb24gaGFzIGVuZGVkIChhYm91dCAxcyB0byBiZSBzdXJlKVxyXG4gICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgb24gJ2RvY3VtZW50JyBmb3Igbm90aWZpY2F0aW9ucyB0aGF0IHdpbGwgYmUgYWRkZWQgbGF0ZXIgb24gdGhlIERPTVxyXG4gICAgc3RhdGljIHJlbW92ZU9uQ2xpY2tFdmVudCgpIHtcclxuICAgICAgICAvLyBub3RpZmljYXRpb25zIGFyZSByZW1vdmVkIHdoZW4gY2xpY2tlZCBvblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgaWYoVXRpbHMuaGFzQ2xhc3MoZWxlbWVudCwgJ2luJykpIHsgTm90aWZpY2F0aW9uLmNsZWFuKGVsZW1lbnQsIDApIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJcclxuICAgIHN0YXRpYyBnZXQgZmFkZW91dER1cmF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBGQURFT1VUX0RVUkFUSU9OO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcucHJldicpO1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gICAgICAgIGxldCBhY3RpdmVJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgICAgIGxldCBpdGVtcyA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBzZXQgLyByZXNldCBpdGVtc1xuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VsbGlwc2lzJykpIHsgaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCA9IGk7IH1cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJywgJ3Nob3cnLCAnZWxsaXBzaXMnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5wYWdlID0gaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KGFjdGl2ZUl0ZW0uZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAvKiBhZGQgYXBwcm9wcmlhdGUgY2xhc3NlcyA6ICovXG5cbiAgICAgICAgLy8gZGlzYWJsZSAncHJldicgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IDEpIHtcbiAgICAgICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1szXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7IC8vIGlmIGFjdGl2ZSBwYWdlIGlzIDEsIHRoZSB0aGlyZCBpdGVtIGlzIGRpc3BsYXllZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGlzYWJsZSAnbmV4dCcgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBsYXN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gKGl0ZW1zLmxlbmd0aCAtIDIpKSB7XG4gICAgICAgICAgICBuZXh0SXRlbS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDQpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPj0gNCkgeyBpdGVtc1syXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBsYXN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA8PSAoaXRlbXMubGVuZ3RoIC0gNSkpIHsgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDMpXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBhY3RpdmUgaXRlbSwgcHJldmlvdXMgYW5kIG5leHQgb25lc1xuICAgICAgICBpdGVtc1soYWN0aXZlSXRlbUluZGV4IC0gMSldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggKyAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIHByZXYsIG5leHQsIGZpcnN0IGFuZCBsYXN0IHBhZ2VzIGFyZSBkaXNwbGF5ZWQgYXMgd2VsbFxuICAgICAgICBwcmV2SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbMV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMildLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICAvLyBoaWRlIGV2ZXJ5IG90aGVyIGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaWYoISBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVwbGFjZSAnZWxsaXBzaXMnIGNsYXNzIGxpc3QgaXRlbSBjb250ZW50IHdpdGggMyBkb3RzXG4gICAgICAgIGxldCBlbGxpcHNpc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGkuZWxsaXBzaXMnKTtcbiAgICAgICAgWy4uLmVsbGlwc2lzSXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignYScpLnRleHRDb250ZW50ID0gXCIuLi5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4vUGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHlsZWd1aWRlIHtcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIFN0eWxlZ3VpZGUuaW5wdXRGZWVkYmFjaygpO1xyXG4gICAgICAgIFN0eWxlZ3VpZGUucGFnaW5hdGlvbigpO1xyXG4gICAgICAgIFN0eWxlZ3VpZGUubm90aWZpY2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XHJcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXRlcy1pbnB1dC1idXR0b25zIGJ1dHRvbicpO1xyXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XHJcblxyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrVGV4dCA9IHRoaXMuZGF0YXNldC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtdGVzdCAuaW5wdXQtZ3JvdXAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRpc2FibGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGlzYWJsZShidXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc2FibGVkID0gIWlucHV0LmRpc2FibGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkVuYWJsZSBpbnB1dFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgaW5wdXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc3RhdGVcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlQnV0dG9uID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWdyZXknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwb3RlbnRpYWxseSBkaXNhYmxlZCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzdGF0ZXMgY2xhc3Nlc1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZmVlZGJhY2sgc3RhdGUgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSA/IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykucmVtb3ZlKCkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBpbnB1dCBzdGF0ZSBmZWVkYmFja1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3RhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgaW4gY2FzZSB0aGUgaW5wdXQgaGFzIGJlZW4gZGlzYWJsZWRcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cCBcIiArIGFjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmVlZGJhY2sgc3BhbiBvciBjcmVhdGUgb25lXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrU3BhbiA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISBmZWVkYmFja1NwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4uY2xhc3NOYW1lID0gXCJmZWVkYmFja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLnRleHRDb250ZW50ID0gZmVlZGJhY2tUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuaW5zZXJ0QmVmb3JlKGZlZWRiYWNrU3BhbiwgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwYWdpbmF0aW9uKCkge1xyXG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XHJcblxyXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZGF0YXNldC5wYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gb2xkIGFjdGl2ZSBpdGVtXHJcbiAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByZXYgJiBuZXh0IGNhc2VzXHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygncHJldicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4IC0gMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCArIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RlZCBuZXcgYWN0aXZlIHBhZ2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlbGF1bmNoIGZ1bmN0aW9uIGZvciBkZW1vIHB1cnBvc2VcclxuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbm90aWZpY2F0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBzdGFuZGFyZCBidXR0b25zIChub24tc3RpY2t5IG5vdGlmaWNhdGlvbnMpXHJcbiAgICAgICAgbGV0IHN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFuZGFyZC1ub3RpZmljYXRpb25zIGJ1dHRvbicpO1xyXG5cclxuICAgICAgICBbLi4uc3RhbmRhcmROb3RpZmljYXRpb25CdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xyXG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVGV4dCA9IGJ1dHRvbi50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblR5cGUgPSBidXR0b24uY2xhc3NOYW1lLnNsaWNlKDQpO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNyZWF0ZShub3RpZmljYXRpb25UZXh0LCBub3RpZmljYXRpb25UeXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHN0aWNreSBub3RpZmljYXRpb24gYnV0dG9uXHJcbiAgICAgICAgbGV0IHN0aWNreUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RpZmljYXRpb25zLXRlc3QgLmJ0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgc3RpY2t5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UZXh0ID0gc3RpY2t5QnV0dG9uLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBsZXQgaXNTdGlja3kgPSB0cnVlO1xyXG4gICAgICAgICAgICBOb3RpZmljYXRpb24uY3JlYXRlKG5vdGlmaWNhdGlvblRleHQsIFwiaW5mb1wiLCBpc1N0aWNreSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL1V0aWxzJztcclxuXHJcbmxldCB2aXNpYmxlVGFiQ29udGVudElkcztcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWIge1xyXG5cclxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0YWIoKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIGFjdGl2ZSB0YWIocylcclxuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKTtcclxuXHJcbiAgICAgICAgLy8gaGlkZSBub24gYWN0aXZlIGNvbnRlbnQgYXQgcGFnZSBzdGFydCB1cCAoc2hvdyBzdGlsbCBkaXNwbGF5IGFjdGl2ZSBjb250ZW50KVxyXG4gICAgICAgIHRoaXMuaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgLy8gbWVudSBiZWhhdmlvdXJcclxuICAgICAgICBsZXQgdGFiTWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSBhJyk7XHJcbiAgICAgICAgWy4uLnRhYk1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XHJcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGdldCBsaW5rIG93bmluZyB0YWJcclxuICAgICAgICAgICAgICAgIGxldCB0YWJzID0gVXRpbHMuY2xvc2VzdChsaW5rLCAndGFicycpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY3VycmVudCBhY3RpdmUgY29udGVudFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZU1lbnVUYWIgPSB0YWJzLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGlmKG51bGwgIT0gYWN0aXZlTWVudVRhYikgeyBhY3RpdmVNZW51VGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWRkICdhY3RpdmUnIGNsYXNzIHRvIGxpbmsgcGFyZW50XHJcbiAgICAgICAgICAgICAgICBsaW5rLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYW5kIGZpbmFsbHkgdXBkYXRlIERPTVxyXG4gICAgICAgICAgICAgICAgVGFiLnVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKTtcclxuICAgICAgICAgICAgICAgIFRhYi5oaWRlTm9uQWN0aXZlQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlQWN0aXZlQ29udGVudElkcygpIHtcclxuICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcyA9IG5ldyBTZXQoKTsgLy8gc3RhcnQgY2xlYW5cclxuICAgICAgICBsZXQgYWN0aXZlVGFiTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicy1tZW51IC5hY3RpdmUnKTtcclxuICAgICAgICBbLi4uYWN0aXZlVGFiTWVudXNdLmZvckVhY2goZnVuY3Rpb24odGFiTWVudSkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0SWQgPSB0YWJNZW51LmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNsaWNlKDEpOyAvLyByZW1vdmUgdGhlICMgc3ltYm9sXHJcbiAgICAgICAgICAgIHZpc2libGVUYWJDb250ZW50SWRzLmFkZCh0YXJnZXRJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGVOb25BY3RpdmVDb250ZW50KCkge1xyXG4gICAgICAgIGxldCB0YWJDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzIC50YWJzLWNvbnRlbnQnKTtcclxuICAgICAgICBbLi4udGFiQ29udGVudHNdLmZvckVhY2goZnVuY3Rpb24oY29udGVudEJsb2NrKSB7XHJcbiAgICAgICAgICAgIFsuLi5jb250ZW50QmxvY2suY2hpbGRyZW5dLmZvckVhY2goZnVuY3Rpb24oY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgY2xlYW4gYnkgcmVtb3ZpbmcgJ2hpZGRlbicgY2xhc3NcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSBjb250ZW50cyB0aGF0IGFyZSBub3QgaW4gYW4gYWN0aXZlIHN0YXRlIHRhYlxyXG4gICAgICAgICAgICAgICAgaWYoISB2aXNpYmxlVGFiQ29udGVudElkcy5oYXMoY29udGVudC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICBsZXQgcGFyZW50O1xyXG5cclxuICAgIHdoaWxlKGVsZW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmKGhhc0NsYXNzKHBhcmVudCwgY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudCA9IHBhcmVudDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn0iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi9UYWInO1xuXG4vLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuaW1wb3J0IHsgU3R5bGVndWlkZSB9IGZyb20gJy4vU3R5bGVndWlkZSc7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIEZvcm0uaW5pdCgpO1xuICAgIFBhZ2luYXRpb24uaW5pdCgpO1xuICAgIE5vdGlmaWNhdGlvbi5pbml0KCk7XG4gICAgVGFiLmluaXQoKTtcblxuICAgIC8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG4gICAgU3R5bGVndWlkZS5pbml0KCk7XG59OyJdfQ==
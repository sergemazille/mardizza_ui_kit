(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dialog = exports.Dialog = function () {
    function Dialog() {
        _classCallCheck(this, Dialog);
    }

    _createClass(Dialog, null, [{
        key: 'init',


        // button events
        value: function init() {
            var dialogTestButtons = document.querySelectorAll('.dialog-trigger');
            if (null == dialogTestButtons) {
                return false;
            }

            [].concat(_toConsumableArray(dialogTestButtons)).forEach(function (button) {
                button.addEventListener("click", function () {
                    Dialog.showDialog(this.dataset.target);
                });
            });
        }
    }, {
        key: 'setup',
        value: function setup() {
            // create backdrop & container
            this.createBackdrop();
            this.createContainer();

            // behaviour setup
            this.containerEvents();
        }
    }, {
        key: 'createBackdrop',
        value: function createBackdrop() {
            this.backdrop = document.createElement('div');
            this.backdrop.className = "backdrop";
        }
    }, {
        key: 'createContainer',
        value: function createContainer() {
            this.dialogContainer = document.createElement('div');
            this.dialogContainer.className = "dialog-container";
        }
    }, {
        key: 'containerEvents',
        value: function containerEvents() {
            this.dialogContainer.addEventListener("click", function (e) {
                e.preventDefault();

                if (e.target.classList.contains('dialog-container') || e.target.classList.contains('dismiss')) {
                    // animate out
                    setTimeout(function () {
                        Dialog.dialog.classList.remove('in');
                        Dialog.backdrop.classList.remove('in');
                        Dialog.clear();
                    }, 100);
                }
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            // remove dialog from DOM once its fadeout animation has ended
            setTimeout(function () {
                Dialog.backdrop.remove();
                Dialog.dialogContainer.remove();
            }, 500);
        }
    }, {
        key: 'showDialog',
        value: function showDialog(dialogId) {
            this.dialog = document.querySelector(dialogId).cloneNode(true); // doesn't mess with the original element
            if (null == this.dialog) {
                return null;
            }

            // dismiss button
            var dismissButton = document.createElement('span');
            dismissButton.classList.add('dismiss');
            this.dialog.appendChild(dismissButton);

            // create backdrop and container
            Dialog.setup();

            // add new elements on DOM
            document.body.appendChild(this.backdrop);
            document.body.appendChild(this.dialogContainer);
            this.dialogContainer.appendChild(this.dialog);
            this.dialog.style.display = "block";

            // animate in
            setTimeout(function () {
                Dialog.backdrop.classList.add('in');
                Dialog.dialog.classList.add('in');
            }, 100);
        }
    }]);

    return Dialog;
}();

},{}],2:[function(require,module,exports){
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
                            $clickable.className = "backdrop-hidden";

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

                        // cleanup : remove opened backdrop-hidden
                        var backdrop = document.querySelector('.backdrop-hidden');
                        backdrop.remove();
                    });
                });
            });
        }
    }]);

    return Form;
}();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

                var notificationTypes = ['notification-success', 'notification-info', 'notification-warning', 'notification-error'];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = notificationTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var notification = _step.value;

                        if (element.classList.contains(notification)) {
                            Notification.clean(element, 0);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
            var standardNotificationButtons = document.querySelectorAll('.notifications-test-buttons button');

            [].concat(_toConsumableArray(standardNotificationButtons)).forEach(function (button) {
                var notificationText = button.dataset.text;
                var notificationType = button.dataset.type;
                var isSticky = button.classList.contains('sticky');

                button.addEventListener("click", function (e) {
                    e.preventDefault();

                    _Notification.Notification.create(notificationText, notificationType, isSticky);
                });
            });
        }
    }]);

    return Styleguide;
}();

},{"./Notification":3,"./Pagination":4}],6:[function(require,module,exports){
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

},{"./Utils":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.closest = closest;
function closest(element, className) {
    var parent = void 0;

    while (element) {
        parent = element.parentElement;
        if (parent.classList.contains(className)) {
            return parent;
        }
        element = parent;
    }

    return null;
}

},{}],8:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

var _Pagination = require('./Pagination');

var _Notification = require('./Notification');

var _Tab = require('./Tab');

var _Dialog = require('./Dialog');

var _Styleguide = require('./Styleguide');

window.onload = function () {

    _Form.Form.init();
    _Pagination.Pagination.init();
    _Notification.Notification.init();
    _Tab.Tab.init();
    _Dialog.Dialog.init();

    // styleguide custom examples
    _Styleguide.Styleguide.init();
};

// styleguide custom examples

},{"./Dialog":1,"./Form":2,"./Notification":3,"./Pagination":4,"./Styleguide":5,"./Tab":6}]},{},[8])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0L0RpYWxvZy5qcyIsInNyYy9zY3JpcHQvRm9ybS5qcyIsInNyYy9zY3JpcHQvTm90aWZpY2F0aW9uLmpzIiwic3JjL3NjcmlwdC9QYWdpbmF0aW9uLmpzIiwic3JjL3NjcmlwdC9TdHlsZWd1aWRlLmpzIiwic3JjL3NjcmlwdC9UYWIuanMiLCJzcmMvc2NyaXB0L1V0aWxzLmpzIiwic3JjL3NjcmlwdC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lDQWEsTSxXQUFBLE07Ozs7Ozs7OztBQUVUOytCQUNjO0FBQ1YsZ0JBQUksb0JBQW9CLFNBQVMsZ0JBQVQsQ0FBMEIsaUJBQTFCLENBQXhCO0FBQ0EsZ0JBQUcsUUFBUSxpQkFBWCxFQUE4QjtBQUFFLHVCQUFPLEtBQVA7QUFBYzs7QUFFOUMseUNBQUksaUJBQUosR0FBdUIsT0FBdkIsQ0FBK0IsVUFBUyxNQUFULEVBQWlCO0FBQzVDLHVCQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7QUFDeEMsMkJBQU8sVUFBUCxDQUFrQixLQUFLLE9BQUwsQ0FBYSxNQUEvQjtBQUNILGlCQUZEO0FBR0gsYUFKRDtBQUtIOzs7Z0NBRWM7QUFDWDtBQUNBLGlCQUFLLGNBQUw7QUFDQSxpQkFBSyxlQUFMOztBQUVBO0FBQ0EsaUJBQUssZUFBTDtBQUNIOzs7eUNBRXVCO0FBQ3BCLGlCQUFLLFFBQUwsR0FBZ0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0EsaUJBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsVUFBMUI7QUFDSDs7OzBDQUV3QjtBQUNyQixpQkFBSyxlQUFMLEdBQXVCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF2QjtBQUNBLGlCQUFLLGVBQUwsQ0FBcUIsU0FBckIsR0FBaUMsa0JBQWpDO0FBQ0g7OzswQ0FFd0I7QUFDckIsaUJBQUssZUFBTCxDQUFx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RUFBdUI7QUFDNUMsNkNBQUksYUFBYSxRQUFqQixHQUEyQixPQUEzQixDQUFtQyxVQUFTLE9BQVQsRUFBa0I7QUFDakQ7QUFDQSw0QkFBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLFFBQXpCOztBQUVBO0FBQ0Esd0JBQUcsQ0FBRSxxQkFBcUIsR0FBckIsQ0FBeUIsUUFBUSxFQUFqQyxDQUFMLEVBQTJDO0FBQ3ZDLGdDQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsUUFBdEI7QUFDSDtBQUNKLGlCQVJEO0FBU0gsYUFWRDtBQVdIOzs7Ozs7Ozs7Ozs7UUM5RFcsTyxHQUFBLE87QUFBVCxTQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEIsU0FBMUIsRUFBcUM7QUFDeEMsUUFBSSxlQUFKOztBQUVBLFdBQU0sT0FBTixFQUFlO0FBQ1gsaUJBQVMsUUFBUSxhQUFqQjtBQUNBLFlBQUcsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLFNBQTFCLENBQUgsRUFBeUM7QUFBRSxtQkFBTyxNQUFQO0FBQWdCO0FBQzNELGtCQUFVLE1BQVY7QUFDSDs7QUFFRCxXQUFPLElBQVA7QUFDSDs7Ozs7QUNWRDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFFQSxPQUFPLE1BQVAsR0FBZ0IsWUFBVzs7QUFFdkIsZUFBSyxJQUFMO0FBQ0EsMkJBQVcsSUFBWDtBQUNBLCtCQUFhLElBQWI7QUFDQSxhQUFJLElBQUo7QUFDQSxtQkFBTyxJQUFQOztBQUVBO0FBQ0EsMkJBQVcsSUFBWDtBQUNILENBVkQ7O0FBSEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIERpYWxvZyB7XG5cbiAgICAvLyBidXR0b24gZXZlbnRzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIGxldCBkaWFsb2dUZXN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWFsb2ctdHJpZ2dlcicpO1xuICAgICAgICBpZihudWxsID09IGRpYWxvZ1Rlc3RCdXR0b25zKSB7IHJldHVybiBmYWxzZTt9XG5cbiAgICAgICAgWy4uLmRpYWxvZ1Rlc3RCdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBEaWFsb2cuc2hvd0RpYWxvZyh0aGlzLmRhdGFzZXQudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0dXAoKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZHJvcCAmIGNvbnRhaW5lclxuICAgICAgICB0aGlzLmNyZWF0ZUJhY2tkcm9wKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29udGFpbmVyKCk7XG5cbiAgICAgICAgLy8gYmVoYXZpb3VyIHNldHVwXG4gICAgICAgIHRoaXMuY29udGFpbmVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUJhY2tkcm9wKCkge1xuICAgICAgICB0aGlzLmJhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYmFja2Ryb3AuY2xhc3NOYW1lID0gXCJiYWNrZHJvcFwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZGlhbG9nLWNvbnRhaW5lclwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluZXJFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKChlLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaWFsb2ctY29udGFpbmVyJykgfHwgKGUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc21pc3MnKSkge1xuICAgICAgICAgICAgICAgIC8vIGFuaW1hdGUgb3V0XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyKCkge1xuICAgICAgICAvLyByZW1vdmUgZGlhbG9nIGZyb20gRE9NIG9uY2UgaXRzIGZhZGVvdXQgYW5pbWF0aW9uIGhhcyBlbmRlZFxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2dDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCA1MDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd0RpYWxvZyhkaWFsb2dJZCkge1xuICAgICAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGlhbG9nSWQpLmNsb25lTm9kZSh0cnVlKTsgLy8gZG9lc24ndCBtZXNzIHdpdGggdGhlIG9yaWdpbmFsIGVsZW1lbnRcbiAgICAgICAgaWYobnVsbCA9PSB0aGlzLmRpYWxvZykgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIC8vIGRpc21pc3MgYnV0dG9uXG4gICAgICAgIGxldCBkaXNtaXNzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBkaXNtaXNzQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rpc21pc3MnKTtcbiAgICAgICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQoZGlzbWlzc0J1dHRvbik7XG5cbiAgICAgICAgLy8gY3JlYXRlIGJhY2tkcm9wIGFuZCBjb250YWluZXJcbiAgICAgICAgRGlhbG9nLnNldHVwKCk7XG5cbiAgICAgICAgLy8gYWRkIG5ldyBlbGVtZW50cyBvbiBET01cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZ0NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICAvLyBhbmltYXRlIGluXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBEaWFsb2cuYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgICAgICAgICAgICBEaWFsb2cuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICAgICAgICB9LCAxMDBcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRm9ybSB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyb3Bkb3duKCkge1xuICAgICAgICBsZXQgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi10cmlnZ2VyJyk7XG4gICAgICAgIFsuLi5kcm9wZG93blRyaWdnZXJzXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSBidXR0b24ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbGlzdCcpO1xuICAgICAgICAgICAgbGV0IGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiXCIpID8gXCJibG9ja1wiIDogXCJcIjtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9ICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCI7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBjbGlja2FibGUgYGRpdmAgdG8gY2xvc2UgdGhlIGRyb3Bkb3duIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZHJvcGRvd24gZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmKGRyb3Bkb3duQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkY2xpY2thYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuY2xhc3NOYW1lID0gXCJiYWNrZHJvcC1oaWRkZW5cIjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZENoaWxkKCRjbGlja2FibGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjaG9pY2UgZXZlbnRcbiAgICAgICAgICAgIGxldCAkYW5jaG9yVGFncyA9ICRkcm9wZG93bkxpc3QucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICAgICAgICAgICAgWy4uLiRhbmNob3JUYWdzXS5mb3JFYWNoKGZ1bmN0aW9uKGFuY2hvcikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uT3B0aW9uID0gYW5jaG9yLnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwcmV2aW91c2x5IHNlbGVjdGVkIGxpc3QgaXRlbSAocmVtb3ZlIGFjdGl2ZSBjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0gPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3IoJ2xpLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudEFjdGl2ZUxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBjbGlja2VkIGxpc3QgaXRlbSBieSBnaXZpbmcgaXQgYGFjdGl2ZWAgY2xhc3MgYW5kIGNoYW5naW5nIGJ1dHRvbiBsYWJlbCB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc2VsZWN0aW9uT3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBkcm9wZG93bi1saXN0XG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCA6IHJlbW92ZSBvcGVuZWQgYmFja2Ryb3AtaGlkZGVuXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcC1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiY29uc3QgRkFERU9VVF9EVVJBVElPTiA9IDQgKiAxMDAwO1xuXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuICAgIC8vIGluaXRpYWxpemUgbm90aWZpY2F0aW9uIGJlaGF2aW91clxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLnNldHVwQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT25DbGlja0V2ZW50KCk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG9yIGNsZWFudXAgbm90aWZpY2F0aW9ucyBjb250YWluZXJcbiAgICBzdGF0aWMgc2V0dXBDb250YWluZXIoKSAge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcblxuICAgICAgICAvLyByZW1vdmUgZXZlbnR1YWwgZXhpc3RpbmcgY29udGFpbmVyIGVsZW1lbnQgdG8gc3RhcnQgY2xlYW5cbiAgICAgICAgaWYobnVsbCAhPSBjb250YWluZXIpIHsgY29udGFpbmVyLnJlbW92ZSgpOyB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuZCBhcHBlbmQgdGhlIG5vdGlmaWNhdGlvbiBjb250YWluZXIgYXMgYm9keSBmaXJzdCBlbGVtZW50XG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuaWQgPSAnbm90aWZpY2F0aW9uLWNvbnRhaW5lcic7XG4gICAgICAgIGxldCBmaXJzdFBhZ2VFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCBmaXJzdFBhZ2VFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBzZXQgbWVzc2FnZSB0ZXh0IGFuZCBub3RpZmljYXRpb24gdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IpXG4gICAgc3RhdGljIGNyZWF0ZShtZXNzYWdlLCB0eXBlLCBpc1N0aWNreSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90aWZpY2F0aW9uLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxldCBub3RpZmljYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoYG5vdGlmaWNhdGlvbi0ke3R5cGV9YCk7XG4gICAgICAgIGlmKGlzU3RpY2t5KSB7IG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdzdGljaycpOyB9IC8vIHN0aWNreSBub3RpZmljYXRpb25zIG1pZ2h0IGJlIHVzZWQgZm9yIGxvbmcgbWVzc2FnZXNcbiAgICAgICAgbm90aWZpY2F0aW9uLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgaW5cbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdpbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gZmFkZSBvdXQgbm90aWZpY2F0aW9uICh1bmxlc3MgaXQgaGFzICdzdGljaycgY2xhc3MpXG4gICAgICAgICAgICAgICAgaWYoISBub3RpZmljYXRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGljaycpKSB7IE5vdGlmaWNhdGlvbi5jbGVhbihub3RpZmljYXRpb24pOyB9XG4gICAgICAgICAgICB9LCAxMDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgb2xkIG5vdGlmaWNhdGlvbnNcbiAgICBzdGF0aWMgY2xlYW4obm90aWZpY2F0aW9uLCBkdXJhdGlvbiA9IEZBREVPVVRfRFVSQVRJT04pIHtcbiAgICAgICAgLy8gZmFkZW91dCBub3RpZmljYXRpb24gYWZ0ZXIgc3BlY2lmaWVkIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoZGVmYXVsdCA9IEZBREVPVVRfRFVSQVRJT04pXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uY2xlYXIobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAvLyByZW1vdmUgbm90aWZpY2F0aW9uIGZyb20gRE9NIG9uY2UgaXRzIGZhZGVvdXQgYW5pbWF0aW9uIGhhcyBlbmRlZCAoYWJvdXQgMXMgdG8gYmUgc3VyZSlcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDEwMDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgb24gJ2RvY3VtZW50JyBmb3Igbm90aWZpY2F0aW9ucyB0aGF0IHdpbGwgYmUgYWRkZWQgbGF0ZXIgb24gdGhlIERPTVxuICAgIHN0YXRpYyByZW1vdmVPbkNsaWNrRXZlbnQoKSB7XG4gICAgICAgIC8vIG5vdGlmaWNhdGlvbnMgYXJlIHJlbW92ZWQgd2hlbiBjbGlja2VkIG9uXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlcyA9IFsnbm90aWZpY2F0aW9uLXN1Y2Nlc3MnLCAnbm90aWZpY2F0aW9uLWluZm8nLCAnbm90aWZpY2F0aW9uLXdhcm5pbmcnLCAnbm90aWZpY2F0aW9uLWVycm9yJ107XG4gICAgICAgICAgICBmb3IobGV0IG5vdGlmaWNhdGlvbiBvZiBub3RpZmljYXRpb25UeXBlcykge1xuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5vdGlmaWNhdGlvbikpIHsgTm90aWZpY2F0aW9uLmNsZWFuKGVsZW1lbnQsIDApIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyXG4gICAgc3RhdGljIGdldCBmYWRlb3V0RHVyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBGQURFT1VUX0RVUkFUSU9OO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgUGFnaW5hdGlvbiB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2luYXRpb24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICAgICAgICBsZXQgcHJldkl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5wcmV2Jyk7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIHNldCAvIHJlc2V0IGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZWxsaXBzaXMnKSkgeyBpdGVtLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50ID0gaTsgfVxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nLCAnc2hvdycsICdlbGxpcHNpcycsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbS5kYXRhc2V0LnBhZ2UgPSBpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQoYWN0aXZlSXRlbS5kYXRhc2V0LnBhZ2UpO1xuXG4gICAgICAgIC8qIGFkZCBhcHByb3ByaWF0ZSBjbGFzc2VzIDogKi9cblxuICAgICAgICAvLyBkaXNhYmxlICdwcmV2JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgcHJldkl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW1zWzNdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTsgLy8gaWYgYWN0aXZlIHBhZ2UgaXMgMSwgdGhlIHRoaXJkIGl0ZW0gaXMgZGlzcGxheWVkXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNhYmxlICduZXh0JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGxhc3Qgb25lXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA9PSAoaXRlbXMubGVuZ3RoIC0gMikpIHtcbiAgICAgICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gNCldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcnN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA+PSA0KSB7IGl0ZW1zWzJdLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGxhc3QgZWxsaXBzaXMgY2hlY2tcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4IDw9IChpdGVtcy5sZW5ndGggLSA1KSkgeyBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMyldLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGFjdGl2ZSBpdGVtLCBwcmV2aW91cyBhbmQgbmV4dCBvbmVzXG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggLSAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbKGFjdGl2ZUl0ZW1JbmRleCArIDEpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gcHJldiwgbmV4dCwgZmlyc3QgYW5kIGxhc3QgcGFnZXMgYXJlIGRpc3BsYXllZCBhcyB3ZWxsXG4gICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1sxXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhpdGVtcy5sZW5ndGggLSAyKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIGhpZGUgZXZlcnkgb3RoZXIgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpZighIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZXBsYWNlICdlbGxpcHNpcycgY2xhc3MgbGlzdCBpdGVtIGNvbnRlbnQgd2l0aCAzIGRvdHNcbiAgICAgICAgbGV0IGVsbGlwc2lzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaS5lbGxpcHNpcycpO1xuICAgICAgICBbLi4uZWxsaXBzaXNJdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCdhJykudGV4dENvbnRlbnQgPSBcIi4uLlwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcblxuZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBTdHlsZWd1aWRlLmlucHV0RmVlZGJhY2soKTtcbiAgICAgICAgU3R5bGVndWlkZS5wYWdpbmF0aW9uKCk7XG4gICAgICAgIFN0eWxlZ3VpZGUubm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnB1dC10ZXN0IC5pbnB1dC1ncm91cCcpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnNHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnMgPSB0ZXN0QnV0dG9uc0dyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgICAgIC8vIGluc2VydCBhbiBlbXB0eSBzcGFuIGFzIGhlaWdodCBwbGFjZWhvbGRlclxuICAgICAgICBjcmVhdGVQbGFjZWhvbGRlcigpO1xuXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tUZXh0ID0gdGhpcy5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkaXNhYmxlZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRpc2FibGUoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9ICFpbnB1dC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkVuYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc3RhdGVcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVCdXR0b24gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JleScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcG90ZW50aWFsbHkgZGlzYWJsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0YXRlcyBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmZWVkYmFjayBzdGF0ZSBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSA/IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykucmVtb3ZlKCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3JlYXRlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgaW5wdXQgc3RhdGUgZmVlZGJhY2tcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgaW4gY2FzZSB0aGUgaW5wdXQgaGFzIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXAgXCIgKyBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmVlZGJhY2sgc3BhbiBvciBjcmVhdGUgb25lXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1NwYW4gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpO1xuICAgICAgICAgICAgICAgICAgICBpZighIGZlZWRiYWNrU3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi50ZXh0Q29udGVudCA9IGZlZWRiYWNrVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUoZmVlZGJhY2tTcGFuLCBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmlubmVySFRNTCA9IFwiJm5ic3A7XCI7XG4gICAgICAgICAgICBpbnB1dEdyb3VwLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgdGVzdEJ1dHRvbnNHcm91cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBvbGQgYWN0aXZlIGl0ZW1cbiAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJldiAmIG5leHQgY2FzZXNcbiAgICAgICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygncHJldicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCAtIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCArIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGVkIG5ldyBhY3RpdmUgcGFnZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlbGF1bmNoIGZ1bmN0aW9uIGZvciBkZW1vIHB1cnBvc2VcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm90aWZpY2F0aW9uKCkge1xuXG4gICAgICAgIC8vIHN0YW5kYXJkIGJ1dHRvbnMgKG5vbi1zdGlja3kgbm90aWZpY2F0aW9ucylcbiAgICAgICAgbGV0IHN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RpZmljYXRpb25zLXRlc3QtYnV0dG9ucyBidXR0b24nKTtcblxuICAgICAgICBbLi4uc3RhbmRhcmROb3RpZmljYXRpb25CdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblRleHQgPSBidXR0b24uZGF0YXNldC50ZXh0O1xuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblR5cGUgPSBidXR0b24uZGF0YXNldC50eXBlO1xuICAgICAgICAgICAgbGV0IGlzU3RpY2t5ID0gYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2t5JylcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNyZWF0ZShub3RpZmljYXRpb25UZXh0LCBub3RpZmljYXRpb25UeXBlLCBpc1N0aWNreSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbmxldCB2aXNpYmxlVGFiQ29udGVudElkcztcblxuZXhwb3J0IGNsYXNzIFRhYiB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLnRhYigpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0YWIoKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBhY3RpdmUgdGFiKHMpXG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlQ29udGVudElkcygpO1xuXG4gICAgICAgIC8vIGhpZGUgbm9uIGFjdGl2ZSBjb250ZW50IGF0IHBhZ2Ugc3RhcnQgdXAgKHNob3cgc3RpbGwgZGlzcGxheSBhY3RpdmUgY29udGVudClcbiAgICAgICAgdGhpcy5oaWRlTm9uQWN0aXZlQ29udGVudCgpO1xuXG4gICAgICAgIC8vIG1lbnUgYmVoYXZpb3VyXG4gICAgICAgIGxldCB0YWJNZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicy1tZW51IGEnKTtcbiAgICAgICAgWy4uLnRhYk1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIC8vIGdldCBsaW5rIG93bmluZyB0YWJcbiAgICAgICAgICAgICAgICBsZXQgdGFicyA9IFV0aWxzLmNsb3Nlc3QobGluaywgJ3RhYnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY3VycmVudCBhY3RpdmUgY29udGVudFxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVNZW51VGFiID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgaWYobnVsbCAhPSBhY3RpdmVNZW51VGFiKSB7IGFjdGl2ZU1lbnVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7IH1cblxuICAgICAgICAgICAgICAgIC8vIGFkZCAnYWN0aXZlJyBjbGFzcyB0byBsaW5rIHBhcmVudFxuICAgICAgICAgICAgICAgIGxpbmsucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIC8vIGFuZCBmaW5hbGx5IHVwZGF0ZSBET01cbiAgICAgICAgICAgICAgICBUYWIudXBkYXRlQWN0aXZlQ29udGVudElkcygpO1xuICAgICAgICAgICAgICAgIFRhYi5oaWRlTm9uQWN0aXZlQ29udGVudCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB1cGRhdGVBY3RpdmVDb250ZW50SWRzKCkge1xuICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcyA9IG5ldyBTZXQoKTsgLy8gc3RhcnQgY2xlYW5cbiAgICAgICAgbGV0IGFjdGl2ZVRhYk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSAuYWN0aXZlJyk7XG4gICAgICAgIFsuLi5hY3RpdmVUYWJNZW51c10uZm9yRWFjaChmdW5jdGlvbih0YWJNZW51KSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0SWQgPSB0YWJNZW51LmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNsaWNlKDEpOyAvLyByZW1vdmUgdGhlICMgc3ltYm9sXG4gICAgICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcy5hZGQodGFyZ2V0SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKSB7XG4gICAgICAgIGxldCB0YWJDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzIC50YWJzLWNvbnRlbnQnKTtcbiAgICAgICAgWy4uLnRhYkNvbnRlbnRzXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnRCbG9jaykge1xuICAgICAgICAgICAgWy4uLmNvbnRlbnRCbG9jay5jaGlsZHJlbl0uZm9yRWFjaChmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgY2xlYW4gYnkgcmVtb3ZpbmcgJ2hpZGRlbicgY2xhc3NcbiAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGlkZSBjb250ZW50cyB0aGF0IGFyZSBub3QgaW4gYW4gYWN0aXZlIHN0YXRlIHRhYlxuICAgICAgICAgICAgICAgIGlmKCEgdmlzaWJsZVRhYkNvbnRlbnRJZHMuaGFzKGNvbnRlbnQuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGxldCBwYXJlbnQ7XG5cbiAgICB3aGlsZShlbGVtZW50KSB7XG4gICAgICAgIHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYocGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7IHJldHVybiBwYXJlbnQ7IH1cbiAgICAgICAgZWxlbWVudCA9IHBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn0iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi9UYWInO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi9EaWFsb2cnO1xuXG4vLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuaW1wb3J0IHsgU3R5bGVndWlkZSB9IGZyb20gJy4vU3R5bGVndWlkZSc7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIEZvcm0uaW5pdCgpO1xuICAgIFBhZ2luYXRpb24uaW5pdCgpO1xuICAgIE5vdGlmaWNhdGlvbi5pbml0KCk7XG4gICAgVGFiLmluaXQoKTtcbiAgICBEaWFsb2cuaW5pdCgpO1xuXG4gICAgLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbiAgICBTdHlsZWd1aWRlLmluaXQoKTtcbn07Il19
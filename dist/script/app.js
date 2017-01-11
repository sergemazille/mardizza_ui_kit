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

        if (hasClass(parent, className)) {
            return parent;
        }

        element = parent;
    };

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRGlhbG9nLmpzIiwic3JjXFxzY3JpcHRcXEZvcm0uanMiLCJzcmNcXHNjcmlwdFxcTm90aWZpY2F0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFBhZ2luYXRpb24uanMiLCJzcmNcXHNjcmlwdFxcU3R5bGVndWlkZS5qcyIsInNyY1xcc2NyaXB0XFxUYWIuanMiLCJzcmNcXHNjcmlwdFxcVXRpbHMuanMiLCJzcmNcXHNjcmlwdFxcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztJQ0FhLE0sV0FBQSxNOzs7Ozs7Ozs7QUFFVDsrQkFDYztBQUNWLGdCQUFJLG9CQUFvQixTQUFTLGdCQUFULENBQTBCLGlCQUExQixDQUF4QjtBQUNBLGdCQUFHLFFBQVEsaUJBQVgsRUFBOEI7QUFBRSx1QkFBTyxLQUFQO0FBQWM7O0FBRTlDLHlDQUFJLGlCQUFKLEdBQXVCLE9BQXZCLENBQStCLFVBQVMsTUFBVCxFQUFpQjtBQUM1Qyx1QkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFXO0FBQ3hDLDJCQUFPLFVBQVAsQ0FBa0IsS0FBSyxPQUFMLENBQWEsTUFBL0I7QUFDSCxpQkFGRDtBQUdILGFBSkQ7QUFLSDs7O2dDQUVjO0FBQ1g7QUFDQSxpQkFBSyxjQUFMO0FBQ0EsaUJBQUssZUFBTDs7QUFFQTtBQUNBLGlCQUFLLGVBQUw7QUFDSDs7O3lDQUV1QjtBQUNwQixpQkFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLFVBQTFCO0FBQ0g7OzswQ0FFd0I7QUFDckIsaUJBQUssZUFBTCxHQUF1QixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQSxpQkFBSyxlQUFMLENBQXFCLFNBQXJCLEdBQWlDLGtCQUFqQztBQUNIOzs7MENBRXdCO0FBQ3JC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SUFBUDs7QUFFQTtBQUNBLDJCQUFXLElBQVg7QUFDSCxDQVZEOztBQUhBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBEaWFsb2cge1xuXG4gICAgLy8gYnV0dG9uIGV2ZW50c1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgZGlhbG9nVGVzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlhbG9nLXRyaWdnZXInKTtcbiAgICAgICAgaWYobnVsbCA9PSBkaWFsb2dUZXN0QnV0dG9ucykgeyByZXR1cm4gZmFsc2U7fVxuXG4gICAgICAgIFsuLi5kaWFsb2dUZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLnNob3dEaWFsb2codGhpcy5kYXRhc2V0LnRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldHVwKCkge1xuICAgICAgICAvLyBjcmVhdGUgYmFja2Ryb3AgJiBjb250YWluZXJcbiAgICAgICAgdGhpcy5jcmVhdGVCYWNrZHJvcCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUNvbnRhaW5lcigpO1xuXG4gICAgICAgIC8vIGJlaGF2aW91ciBzZXR1cFxuICAgICAgICB0aGlzLmNvbnRhaW5lckV2ZW50cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVCYWNrZHJvcCgpIHtcbiAgICAgICAgdGhpcy5iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJhY2tkcm9wLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3BcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc05hbWUgPSBcImRpYWxvZy1jb250YWluZXJcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbmVyRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZigoZS50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygnZGlhbG9nLWNvbnRhaW5lcicpIHx8IChlLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNtaXNzJykpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmltYXRlIG91dFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2cuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcigpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGRpYWxvZyBmcm9tIERPTSBvbmNlIGl0cyBmYWRlb3V0IGFuaW1hdGlvbiBoYXMgZW5kZWRcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBEaWFsb2cuZGlhbG9nQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgNTAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dEaWFsb2coZGlhbG9nSWQpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRpYWxvZ0lkKS5jbG9uZU5vZGUodHJ1ZSk7IC8vIGRvZXNuJ3QgbWVzcyB3aXRoIHRoZSBvcmlnaW5hbCBlbGVtZW50XG4gICAgICAgIGlmKG51bGwgPT0gdGhpcy5kaWFsb2cpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAvLyBkaXNtaXNzIGJ1dHRvblxuICAgICAgICBsZXQgZGlzbWlzc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZGlzbWlzc0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdkaXNtaXNzJyk7XG4gICAgICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKGRpc21pc3NCdXR0b24pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZHJvcCBhbmQgY29udGFpbmVyXG4gICAgICAgIERpYWxvZy5zZXR1cCgpO1xuXG4gICAgICAgIC8vIGFkZCBuZXcgZWxlbWVudHMgb24gRE9NXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2dDb250YWluZXIpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgLy8gYW5pbWF0ZSBpblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEZvcm0ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkcm9wZG93bigpIHtcbiAgICAgICAgbGV0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24tdHJpZ2dlcicpO1xuICAgICAgICBbLi4uZHJvcGRvd25UcmlnZ2Vyc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWxpc3QnKTtcbiAgICAgICAgICAgIGxldCBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gKCRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcIlwiKSA/IFwiYmxvY2tcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJibG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgY2xpY2thYmxlIGBkaXZgIHRvIGNsb3NlIHRoZSBkcm9wZG93biB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGRyb3Bkb3duIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBpZihkcm9wZG93bkFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJGNsaWNrYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3AtaGlkZGVuXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmRDaGlsZCgkY2xpY2thYmxlKTtcblxuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2hvaWNlIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGFuY2hvclRhZ3MgPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgICAgIFsuLi4kYW5jaG9yVGFnc10uZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk9wdGlvbiA9IGFuY2hvci50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcHJldmlvdXNseSBzZWxlY3RlZCBsaXN0IGl0ZW0gKHJlbW92ZSBhY3RpdmUgY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3VycmVudEFjdGl2ZUxpc3RJdGVtID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yKCdsaS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3QgY2xpY2tlZCBsaXN0IGl0ZW0gYnkgZ2l2aW5nIGl0IGBhY3RpdmVgIGNsYXNzIGFuZCBjaGFuZ2luZyBidXR0b24gbGFiZWwgdGV4dFxuICAgICAgICAgICAgICAgICAgICBhbmNob3IucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHNlbGVjdGlvbk9wdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgZHJvcGRvd24tbGlzdFxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgOiByZW1vdmUgb3BlbmVkIGJhY2tkcm9wLWhpZGRlblxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImNvbnN0IEZBREVPVVRfRFVSQVRJT04gPSA0ICogMTAwMDtcblxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiB7XG5cbiAgICAvLyBpbml0aWFsaXplIG5vdGlmaWNhdGlvbiBiZWhhdmlvdXJcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnJlbW92ZU9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvciBjbGVhbnVwIG5vdGlmaWNhdGlvbnMgY29udGFpbmVyXG4gICAgc3RhdGljIHNldHVwQ29udGFpbmVyKCkgIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RpZmljYXRpb24tY29udGFpbmVyJyk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV2ZW50dWFsIGV4aXN0aW5nIGNvbnRhaW5lciBlbGVtZW50IHRvIHN0YXJ0IGNsZWFuXG4gICAgICAgIGlmKG51bGwgIT0gY29udGFpbmVyKSB7IGNvbnRhaW5lci5yZW1vdmUoKTsgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgYXBwZW5kIHRoZSBub3RpZmljYXRpb24gY29udGFpbmVyIGFzIGJvZHkgZmlyc3QgZWxlbWVudFxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmlkID0gJ25vdGlmaWNhdGlvbi1jb250YWluZXInO1xuICAgICAgICBsZXQgZmlyc3RQYWdlRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgZmlyc3RQYWdlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gc2V0IG1lc3NhZ2UgdGV4dCBhbmQgbm90aWZpY2F0aW9uIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yKVxuICAgIHN0YXRpYyBjcmVhdGUobWVzc2FnZSwgdHlwZSwgaXNTdGlja3kgPSBmYWxzZSkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcblxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKGBub3RpZmljYXRpb24tJHt0eXBlfWApO1xuICAgICAgICBpZihpc1N0aWNreSkgeyBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnc3RpY2snKTsgfSAvLyBzdGlja3kgbm90aWZpY2F0aW9ucyBtaWdodCBiZSB1c2VkIGZvciBsb25nIG1lc3NhZ2VzXG4gICAgICAgIG5vdGlmaWNhdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcblxuICAgICAgICAvLyBhbmltYXRlIGluXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnaW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIGZhZGUgb3V0IG5vdGlmaWNhdGlvbiAodW5sZXNzIGl0IGhhcyAnc3RpY2snIGNsYXNzKVxuICAgICAgICAgICAgICAgIGlmKCEgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2snKSkgeyBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uKTsgfVxuICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9sZCBub3RpZmljYXRpb25zXG4gICAgc3RhdGljIGNsZWFuKG5vdGlmaWNhdGlvbiwgZHVyYXRpb24gPSBGQURFT1VUX0RVUkFUSU9OKSB7XG4gICAgICAgIC8vIGZhZGVvdXQgbm90aWZpY2F0aW9uIGFmdGVyIHNwZWNpZmllZCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgKGRlZmF1bHQgPSBGQURFT1VUX0RVUkFUSU9OKVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNsZWFyKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBkdXJhdGlvblxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcihub3RpZmljYXRpb24pIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5vdGlmaWNhdGlvbiBmcm9tIERPTSBvbmNlIGl0cyBmYWRlb3V0IGFuaW1hdGlvbiBoYXMgZW5kZWQgKGFib3V0IDFzIHRvIGJlIHN1cmUpXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAxMDAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50IG9uICdkb2N1bWVudCcgZm9yIG5vdGlmaWNhdGlvbnMgdGhhdCB3aWxsIGJlIGFkZGVkIGxhdGVyIG9uIHRoZSBET01cbiAgICBzdGF0aWMgcmVtb3ZlT25DbGlja0V2ZW50KCkge1xuICAgICAgICAvLyBub3RpZmljYXRpb25zIGFyZSByZW1vdmVkIHdoZW4gY2xpY2tlZCBvblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZXMgPSBbJ25vdGlmaWNhdGlvbi1zdWNjZXNzJywgJ25vdGlmaWNhdGlvbi1pbmZvJywgJ25vdGlmaWNhdGlvbi13YXJuaW5nJywgJ25vdGlmaWNhdGlvbi1lcnJvciddO1xuICAgICAgICAgICAgZm9yKGxldCBub3RpZmljYXRpb24gb2Ygbm90aWZpY2F0aW9uVHlwZXMpIHtcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhub3RpZmljYXRpb24pKSB7IE5vdGlmaWNhdGlvbi5jbGVhbihlbGVtZW50LCAwKSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGdldHRlclxuICAgIHN0YXRpYyBnZXQgZmFkZW91dER1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gRkFERU9VVF9EVVJBVElPTjtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcucHJldicpO1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gICAgICAgIGxldCBhY3RpdmVJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgICAgIGxldCBpdGVtcyA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBzZXQgLyByZXNldCBpdGVtc1xuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VsbGlwc2lzJykpIHsgaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCA9IGk7IH1cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJywgJ3Nob3cnLCAnZWxsaXBzaXMnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5wYWdlID0gaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KGFjdGl2ZUl0ZW0uZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAvKiBhZGQgYXBwcm9wcmlhdGUgY2xhc3NlcyA6ICovXG5cbiAgICAgICAgLy8gZGlzYWJsZSAncHJldicgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IDEpIHtcbiAgICAgICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1szXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7IC8vIGlmIGFjdGl2ZSBwYWdlIGlzIDEsIHRoZSB0aGlyZCBpdGVtIGlzIGRpc3BsYXllZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGlzYWJsZSAnbmV4dCcgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBsYXN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gKGl0ZW1zLmxlbmd0aCAtIDIpKSB7XG4gICAgICAgICAgICBuZXh0SXRlbS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDQpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPj0gNCkgeyBpdGVtc1syXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBsYXN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA8PSAoaXRlbXMubGVuZ3RoIC0gNSkpIHsgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDMpXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBhY3RpdmUgaXRlbSwgcHJldmlvdXMgYW5kIG5leHQgb25lc1xuICAgICAgICBpdGVtc1soYWN0aXZlSXRlbUluZGV4IC0gMSldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggKyAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIHByZXYsIG5leHQsIGZpcnN0IGFuZCBsYXN0IHBhZ2VzIGFyZSBkaXNwbGF5ZWQgYXMgd2VsbFxuICAgICAgICBwcmV2SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbMV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMildLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICAvLyBoaWRlIGV2ZXJ5IG90aGVyIGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaWYoISBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVwbGFjZSAnZWxsaXBzaXMnIGNsYXNzIGxpc3QgaXRlbSBjb250ZW50IHdpdGggMyBkb3RzXG4gICAgICAgIGxldCBlbGxpcHNpc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGkuZWxsaXBzaXMnKTtcbiAgICAgICAgWy4uLmVsbGlwc2lzSXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignYScpLnRleHRDb250ZW50ID0gXCIuLi5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4vUGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuL05vdGlmaWNhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBTdHlsZWd1aWRlIHtcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgU3R5bGVndWlkZS5pbnB1dEZlZWRiYWNrKCk7XG4gICAgICAgIFN0eWxlZ3VpZGUucGFnaW5hdGlvbigpO1xuICAgICAgICBTdHlsZWd1aWRlLm5vdGlmaWNhdGlvbigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dEZlZWRiYWNrKCkge1xuICAgICAgICBsZXQgaW5wdXRHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtdGVzdCAuaW5wdXQtZ3JvdXAnKTtcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zR3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMnKTtcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zID0gdGVzdEJ1dHRvbnNHcm91cC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblxuICAgICAgICAvLyBpbnNlcnQgYW4gZW1wdHkgc3BhbiBhcyBoZWlnaHQgcGxhY2Vob2xkZXJcbiAgICAgICAgY3JlYXRlUGxhY2Vob2xkZXIoKTtcblxuICAgICAgICBbLi4udGVzdEJ1dHRvbnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrVGV4dCA9IHRoaXMuZGF0YXNldC50ZXh0O1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSB0aGlzLmRhdGFzZXQuYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGlzYWJsZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBidXR0b25cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkaXNhYmxlKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSAhaW5wdXQuZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJFbmFibGUgaW5wdXRcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgaW5wdXRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IHN0YXRlXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlQnV0dG9uID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWdyZXknKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHBvdGVudGlhbGx5IGRpc2FibGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBpbnB1dFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzdGF0ZXMgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXBcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZmVlZGJhY2sgc3RhdGUgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykgPyBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpLnJlbW92ZSgpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZWNyZWF0ZSBhIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVBsYWNlaG9sZGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIGlucHV0IHN0YXRlIGZlZWRiYWNrXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3RhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFuIHVwIGluIGNhc2UgdGhlIGlucHV0IGhhcyBiZWVuIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgY2xhc3MgdG8gaW5wdXQtZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwIFwiICsgYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGZlZWRiYWNrIHNwYW4gb3IgY3JlYXRlIG9uZVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tTcGFuID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoISBmZWVkYmFja1NwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4udGV4dENvbnRlbnQgPSBmZWVkYmFja1RleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuaW5zZXJ0QmVmb3JlKGZlZWRiYWNrU3BhbiwgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMnKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5pbm5lckhUTUwgPSBcIiZuYnNwO1wiO1xuICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIHRlc3RCdXR0b25zR3JvdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmRhdGFzZXQucGFnZSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gb2xkIGFjdGl2ZSBpdGVtXG4gICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIC8vIHByZXYgJiBuZXh0IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXYnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggKyAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RlZCBuZXcgYWN0aXZlIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZWxhdW5jaCBmdW5jdGlvbiBmb3IgZGVtbyBwdXJwb3NlXG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmaWNhdGlvbigpIHtcblxuICAgICAgICAvLyBzdGFuZGFyZCBidXR0b25zIChub24tc3RpY2t5IG5vdGlmaWNhdGlvbnMpXG4gICAgICAgIGxldCBzdGFuZGFyZE5vdGlmaWNhdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhbmRhcmQtbm90aWZpY2F0aW9ucyBidXR0b24nKTtcblxuICAgICAgICBbLi4uc3RhbmRhcmROb3RpZmljYXRpb25CdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblRleHQgPSBidXR0b24uZGF0YXNldC50ZXh0O1xuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblR5cGUgPSBidXR0b24uY2xhc3NOYW1lLnNsaWNlKDQpO1xuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uY3JlYXRlKG5vdGlmaWNhdGlvblRleHQsIG5vdGlmaWNhdGlvblR5cGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHN0aWNreSBub3RpZmljYXRpb24gYnV0dG9uXG4gICAgICAgIGxldCBzdGlja3lCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vdGlmaWNhdGlvbnMtdGVzdCAuc3RpY2t5Jyk7XG5cbiAgICAgICAgWy4uLnN0aWNreUJ1dHRvbnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGlzU3RpY2t5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uY3JlYXRlKG5vdGlmaWNhdGlvblRleHQsIFwiaW5mb1wiLCBpc1N0aWNreSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XHJcblxyXG5sZXQgdmlzaWJsZVRhYkNvbnRlbnRJZHM7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFiIHtcclxuXHJcbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdGFiKCkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSBhY3RpdmUgdGFiKHMpXHJcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgbm9uIGFjdGl2ZSBjb250ZW50IGF0IHBhZ2Ugc3RhcnQgdXAgKHNob3cgc3RpbGwgZGlzcGxheSBhY3RpdmUgY29udGVudClcclxuICAgICAgICB0aGlzLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XHJcblxyXG4gICAgICAgIC8vIG1lbnUgYmVoYXZpb3VyXHJcbiAgICAgICAgbGV0IHRhYk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLW1lbnUgYScpO1xyXG4gICAgICAgIFsuLi50YWJNZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24obGluaykge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbGluayBvd25pbmcgdGFiXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFicyA9IFV0aWxzLmNsb3Nlc3QobGluaywgJ3RhYnMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIGN1cnJlbnQgYWN0aXZlIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVNZW51VGFiID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IGFjdGl2ZU1lbnVUYWIpIHsgYWN0aXZlTWVudVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFkZCAnYWN0aXZlJyBjbGFzcyB0byBsaW5rIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFuZCBmaW5hbGx5IHVwZGF0ZSBET01cclxuICAgICAgICAgICAgICAgIFRhYi51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcbiAgICAgICAgICAgICAgICBUYWIuaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKSB7XHJcbiAgICAgICAgdmlzaWJsZVRhYkNvbnRlbnRJZHMgPSBuZXcgU2V0KCk7IC8vIHN0YXJ0IGNsZWFuXHJcbiAgICAgICAgbGV0IGFjdGl2ZVRhYk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSAuYWN0aXZlJyk7XHJcbiAgICAgICAgWy4uLmFjdGl2ZVRhYk1lbnVzXS5mb3JFYWNoKGZ1bmN0aW9uKHRhYk1lbnUpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldElkID0gdGFiTWVudS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zbGljZSgxKTsgLy8gcmVtb3ZlIHRoZSAjIHN5bWJvbFxyXG4gICAgICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcy5hZGQodGFyZ2V0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlTm9uQWN0aXZlQ29udGVudCgpIHtcclxuICAgICAgICBsZXQgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicyAudGFicy1jb250ZW50Jyk7XHJcbiAgICAgICAgWy4uLnRhYkNvbnRlbnRzXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnRCbG9jaykge1xyXG4gICAgICAgICAgICBbLi4uY29udGVudEJsb2NrLmNoaWxkcmVuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGNsZWFuIGJ5IHJlbW92aW5nICdoaWRkZW4nIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY29udGVudHMgdGhhdCBhcmUgbm90IGluIGFuIGFjdGl2ZSBzdGF0ZSB0YWJcclxuICAgICAgICAgICAgICAgIGlmKCEgdmlzaWJsZVRhYkNvbnRlbnRJZHMuaGFzKGNvbnRlbnQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICBsZXQgcGFyZW50O1xyXG5cclxuICAgIHdoaWxlKGVsZW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmKGhhc0NsYXNzKHBhcmVudCwgY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudCA9IHBhcmVudDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn0iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi9UYWInO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi9EaWFsb2cnO1xuXG4vLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuaW1wb3J0IHsgU3R5bGVndWlkZSB9IGZyb20gJy4vU3R5bGVndWlkZSc7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIEZvcm0uaW5pdCgpO1xuICAgIFBhZ2luYXRpb24uaW5pdCgpO1xuICAgIE5vdGlmaWNhdGlvbi5pbml0KCk7XG4gICAgVGFiLmluaXQoKTtcbiAgICBEaWFsb2cuaW5pdCgpO1xuXG4gICAgLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbiAgICBTdHlsZWd1aWRlLmluaXQoKTtcbn07Il19
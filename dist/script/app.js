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
exports.Filter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var Utils = _interopRequireWildcard(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = exports.Filter = function () {
    function Filter() {
        _classCallCheck(this, Filter);
    }

    _createClass(Filter, null, [{
        key: 'init',
        value: function init() {
            this.createClearOutButton(); // element creation (and then event registration)
            this.removeItemOnClick(); // register events
            this.registerContainerChildrenCountObserver(); // register a 'child removed' event to disable container if need be
        }
    }, {
        key: 'createClearOutButton',
        value: function createClearOutButton() {
            // target every filter block on the page
            var filterContainers = document.querySelectorAll('.filter');

            // create a 'clear filter out' button for each one
            [].concat(_toConsumableArray(filterContainers)).forEach(function (container) {
                var clearOutButton = document.createElement('div');
                clearOutButton.classList.add('filter-clear');
                container.appendChild(clearOutButton);

                // register clear out button click event
                clearOutButton.addEventListener('click', function () {
                    Filter.clearOutFilters(container);
                });
            });
        }
    }, {
        key: 'removeItemOnClick',
        value: function removeItemOnClick() {
            Utils.clickWatch(['filter-item', 'tag-item'], function (item) {
                Filter.removeItemAction(item);
            });
        }
    }, {
        key: 'convertItem',
        value: function convertItem(item) {
            // get filter parent for newTag data-target attribute
            var itemDataTarget = item.parentElement.id;

            // create a tag with filter's data
            var newItem = document.createElement('li');
            newItem.className = item.classList.contains('filter-item') ? 'tag-item' : 'filter-item';
            newItem.innerHTML = item.innerHTML;
            newItem.dataset.target = '#' + itemDataTarget;
            return newItem;
        }
    }, {
        key: 'removeItemAction',
        value: function removeItemAction(item) {
            // select targeted container
            var itemContainer = document.querySelector(item.dataset.target);

            var newItem = Filter.convertItem(item);
            item.remove();

            // insert newly created tag into filter tags container
            itemContainer.appendChild(newItem);
        }
    }, {
        key: 'clearOutFilters',
        value: function clearOutFilters(container) {
            // get filter items
            var filterItems = container.querySelectorAll('.filter-item');
            [].concat(_toConsumableArray(filterItems)).forEach(function (filter) {
                Filter.removeItemAction(filter);
            });
        }
    }, {
        key: 'registerContainerChildrenCountObserver',
        value: function registerContainerChildrenCountObserver() {
            // observe if a child element is removed from a container
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    Filter.checkFilterContainerDisabled(mutation.target);
                });
            });

            var config = { childList: true, attributes: false, characterData: false };
            var filterLists = document.querySelectorAll('.filter-list');
            [].concat(_toConsumableArray(filterLists)).forEach(function (filterList) {
                observer.observe(filterList, config);
                Filter.checkFilterContainerDisabled(filterList); // page load first check
            });
        }
    }, {
        key: 'checkFilterContainerDisabled',
        value: function checkFilterContainerDisabled(filterList) {
            var filterContainer = filterList.parentElement;

            if (filterList.childElementCount < 1) {
                filterContainer.classList.add('disabled');
            } else {
                filterContainer.classList.remove('disabled');
            }
        }
    }]);

    return Filter;
}();

},{"./Utils":8}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
            var notificationTypes = ['notification-success', 'notification-info', 'notification-warning', 'notification-error'];

            Utils.clickWatch(notificationTypes, function (notification) {
                Notification.clean(notification, 0);
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

},{"./Utils":8}],5:[function(require,module,exports){
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
            this.pagination();
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

},{}],6:[function(require,module,exports){
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

},{"./Notification":4,"./Pagination":5}],7:[function(require,module,exports){
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

},{"./Utils":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.closest = closest;
exports.clickWatch = clickWatch;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

// allows elements with a specific class to be clickable even if they are not on the DOM when this method is called
function clickWatch(targetedElementClasses, callback) {
    document.body.addEventListener("click", function (e) {
        [].concat(_toConsumableArray(targetedElementClasses)).forEach(function (classItem) {
            if (e.target.classList.contains(classItem)) {
                callback(e.target);
            }
        });
    });
}

},{}],9:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

var _Pagination = require('./Pagination');

var _Notification = require('./Notification');

var _Tab = require('./Tab');

var _Dialog = require('./Dialog');

var _Filter = require('./Filter');

var _Styleguide = require('./Styleguide');

window.onload = function () {

    _Form.Form.init();
    _Pagination.Pagination.init();
    _Notification.Notification.init();
    _Tab.Tab.init();
    _Dialog.Dialog.init();
    _Filter.Filter.init();

    // styleguide custom examples
    _Styleguide.Styleguide.init();
};

// styleguide custom examples

},{"./Dialog":1,"./Filter":2,"./Form":3,"./Notification":4,"./Pagination":5,"./Styleguide":6,"./Tab":7}]},{},[9])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRGlhbG9nLmpzIiwic3JjXFxzY3JpcHRcXEZpbHRlci5qcyIsInNyY1xcc2NyaXB0XFxGb3JtLmpzIiwic3JjXFxzY3JpcHRcXE5vdGlmaWNhdGlvbi5qcyIsInNyY1xcc2NyaXB0XFxQYWdpbmF0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFN0eWxlZ3VpZGUuanMiLCJzcmNcXHNjcmlwdFxcVGFiLmpzIiwic3JjXFxzY3JpcHRcXFV0aWxzLmpzIiwic3JjXFxzY3JpcHRcXG1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7SUNBYSxNLFdBQUEsTTs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixnQkFBSSxvQkFBb0IsU0FBUyxnQkFBVCxDQUEwQixpQkFBMUIsQ0FBeEI7QUFDQSxnQkFBRyxRQUFRLGlCQUFYLEVBQThCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOztBQUU5Qyx5Q0FBSSxpQkFBSixHQUF1QixPQUF2QixDQUErQixVQUFTLE1BQVQsRUFBaUI7QUFDNUMsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4QywyQkFBTyxVQUFQLENBQWtCLEtBQUssT0FBTCxDQUFhLE1BQS9CO0FBQ0gsaUJBRkQ7QUFHSCxhQUpEO0FBS0g7OztnQ0FFYztBQUNYO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLGVBQUw7O0FBRUE7QUFDQSxpQkFBSyxlQUFMO0FBQ0g7Ozt5Q0FFdUI7QUFDcEIsaUJBQUssUUFBTCxHQUFnQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxpQkFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNIOzs7MENBRXdCO0FBQ3JCLGlCQUFLLGVBQUwsR0FBdUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0EsaUJBQUssZUFBTCxDQUFxQixTQUFyQixHQUFpQyxr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LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIERpYWxvZyB7XG5cbiAgICAvLyBidXR0b24gZXZlbnRzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIGxldCBkaWFsb2dUZXN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWFsb2ctdHJpZ2dlcicpO1xuICAgICAgICBpZihudWxsID09IGRpYWxvZ1Rlc3RCdXR0b25zKSB7IHJldHVybiBmYWxzZTt9XG5cbiAgICAgICAgWy4uLmRpYWxvZ1Rlc3RCdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBEaWFsb2cuc2hvd0RpYWxvZyh0aGlzLmRhdGFzZXQudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0dXAoKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZHJvcCAmIGNvbnRhaW5lclxuICAgICAgICB0aGlzLmNyZWF0ZUJhY2tkcm9wKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29udGFpbmVyKCk7XG5cbiAgICAgICAgLy8gYmVoYXZpb3VyIHNldHVwXG4gICAgICAgIHRoaXMuY29udGFpbmVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUJhY2tkcm9wKCkge1xuICAgICAgICB0aGlzLmJhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYmFja2Ryb3AuY2xhc3NOYW1lID0gXCJiYWNrZHJvcFwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZGlhbG9nLWNvbnRhaW5lclwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluZXJFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKChlLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaWFsb2ctY29udGFpbmVyJykgfHwgKGUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc21pc3MnKSkge1xuICAgICAgICAgICAgICAgIC8vIGFuaW1hdGUgb3V0XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyKCkge1xuICAgICAgICAvLyByZW1vdmUgZGlhbG9nIGZyb20gRE9NIG9uY2UgaXRzIGZhZGVvdXQgYW5pbWF0aW9uIGhhcyBlbmRlZFxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2dDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCA1MDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd0RpYWxvZyhkaWFsb2dJZCkge1xuICAgICAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGlhbG9nSWQpLmNsb25lTm9kZSh0cnVlKTsgLy8gZG9lc24ndCBtZXNzIHdpdGggdGhlIG9yaWdpbmFsIGVsZW1lbnRcbiAgICAgICAgaWYobnVsbCA9PSB0aGlzLmRpYWxvZykgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIC8vIGRpc21pc3MgYnV0dG9uXG4gICAgICAgIGxldCBkaXNtaXNzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBkaXNtaXNzQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rpc21pc3MnKTtcbiAgICAgICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQoZGlzbWlzc0J1dHRvbik7XG5cbiAgICAgICAgLy8gY3JlYXRlIGJhY2tkcm9wIGFuZCBjb250YWluZXJcbiAgICAgICAgRGlhbG9nLnNldHVwKCk7XG5cbiAgICAgICAgLy8gYWRkIG5ldyBlbGVtZW50cyBvbiBET01cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZ0NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICAvLyBhbmltYXRlIGluXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBEaWFsb2cuYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgICAgICAgICAgICBEaWFsb2cuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICAgICAgICB9LCAxMDBcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBVdGlscyAgZnJvbSAnLi9VdGlscyc7XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2xlYXJPdXRCdXR0b24oKTsgLy8gZWxlbWVudCBjcmVhdGlvbiAoYW5kIHRoZW4gZXZlbnQgcmVnaXN0cmF0aW9uKVxuICAgICAgICB0aGlzLnJlbW92ZUl0ZW1PbkNsaWNrKCk7IC8vIHJlZ2lzdGVyIGV2ZW50c1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQ29udGFpbmVyQ2hpbGRyZW5Db3VudE9ic2VydmVyKCk7IC8vIHJlZ2lzdGVyIGEgJ2NoaWxkIHJlbW92ZWQnIGV2ZW50IHRvIGRpc2FibGUgY29udGFpbmVyIGlmIG5lZWQgYmVcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ2xlYXJPdXRCdXR0b24oKSB7XG4gICAgICAgIC8vIHRhcmdldCBldmVyeSBmaWx0ZXIgYmxvY2sgb24gdGhlIHBhZ2VcbiAgICAgICAgbGV0IGZpbHRlckNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVyJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBjcmVhdGUgYSAnY2xlYXIgZmlsdGVyIG91dCcgYnV0dG9uIGZvciBlYWNoIG9uZVxuICAgICAgICBbLi4uZmlsdGVyQ29udGFpbmVyc10uZm9yRWFjaChmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgICAgIGxldCBjbGVhck91dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY2xlYXJPdXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmlsdGVyLWNsZWFyJyk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2xlYXJPdXRCdXR0b24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyByZWdpc3RlciBjbGVhciBvdXQgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAgICAgICAgICBjbGVhck91dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEZpbHRlci5jbGVhck91dEZpbHRlcnMoY29udGFpbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlSXRlbU9uQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLmNsaWNrV2F0Y2goWydmaWx0ZXItaXRlbScsICd0YWctaXRlbSddLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgRmlsdGVyLnJlbW92ZUl0ZW1BY3Rpb24oaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb252ZXJ0SXRlbShpdGVtKSB7XG4gICAgICAgIC8vIGdldCBmaWx0ZXIgcGFyZW50IGZvciBuZXdUYWcgZGF0YS10YXJnZXQgYXR0cmlidXRlXG4gICAgICAgIGxldCBpdGVtRGF0YVRhcmdldCA9IGl0ZW0ucGFyZW50RWxlbWVudC5pZDtcblxuICAgICAgICAvLyBjcmVhdGUgYSB0YWcgd2l0aCBmaWx0ZXIncyBkYXRhXG4gICAgICAgIGxldCBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbmV3SXRlbS5jbGFzc05hbWUgPSBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZmlsdGVyLWl0ZW0nKSA/ICd0YWctaXRlbScgOiAnZmlsdGVyLWl0ZW0nO1xuICAgICAgICBuZXdJdGVtLmlubmVySFRNTCA9IGl0ZW0uaW5uZXJIVE1MO1xuICAgICAgICBuZXdJdGVtLmRhdGFzZXQudGFyZ2V0ID0gYCMke2l0ZW1EYXRhVGFyZ2V0fWA7XG4gICAgICAgIHJldHVybiBuZXdJdGVtO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVJdGVtQWN0aW9uKGl0ZW0pIHtcbiAgICAgICAgLy8gc2VsZWN0IHRhcmdldGVkIGNvbnRhaW5lclxuICAgICAgICBsZXQgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbS5kYXRhc2V0LnRhcmdldCk7XG5cbiAgICAgICAgbGV0IG5ld0l0ZW0gPSBGaWx0ZXIuY29udmVydEl0ZW0oaXRlbSk7XG4gICAgICAgIGl0ZW0ucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gaW5zZXJ0IG5ld2x5IGNyZWF0ZWQgdGFnIGludG8gZmlsdGVyIHRhZ3MgY29udGFpbmVyXG4gICAgICAgIGl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQobmV3SXRlbSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyT3V0RmlsdGVycyhjb250YWluZXIpIHtcbiAgICAgICAgLy8gZ2V0IGZpbHRlciBpdGVtc1xuICAgICAgICBsZXQgZmlsdGVySXRlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlci1pdGVtJyk7XG4gICAgICAgIFsuLi5maWx0ZXJJdGVtc10uZm9yRWFjaChmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgICAgIEZpbHRlci5yZW1vdmVJdGVtQWN0aW9uKGZpbHRlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyByZWdpc3RlckNvbnRhaW5lckNoaWxkcmVuQ291bnRPYnNlcnZlcigpIHtcbiAgICAgICAgLy8gb2JzZXJ2ZSBpZiBhIGNoaWxkIGVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tIGEgY29udGFpbmVyXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcbiAgICAgICAgICAgICAgICBGaWx0ZXIuY2hlY2tGaWx0ZXJDb250YWluZXJEaXNhYmxlZChtdXRhdGlvbi50YXJnZXQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNvbmZpZyA9IHsgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiBmYWxzZSwgY2hhcmFjdGVyRGF0YTogZmFsc2UgfTtcbiAgICAgICAgbGV0IGZpbHRlckxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlci1saXN0Jyk7XG4gICAgICAgIFsuLi5maWx0ZXJMaXN0c10uZm9yRWFjaChmdW5jdGlvbihmaWx0ZXJMaXN0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGZpbHRlckxpc3QsIGNvbmZpZyk7XG4gICAgICAgICAgICBGaWx0ZXIuY2hlY2tGaWx0ZXJDb250YWluZXJEaXNhYmxlZChmaWx0ZXJMaXN0KTsgLy8gcGFnZSBsb2FkIGZpcnN0IGNoZWNrXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGVja0ZpbHRlckNvbnRhaW5lckRpc2FibGVkKGZpbHRlckxpc3QpIHtcbiAgICAgICAgbGV0IGZpbHRlckNvbnRhaW5lciA9IGZpbHRlckxpc3QucGFyZW50RWxlbWVudDtcblxuICAgICAgICBpZihmaWx0ZXJMaXN0LmNoaWxkRWxlbWVudENvdW50IDwgMSkge1xuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgRm9ybSB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyb3Bkb3duKCkge1xuICAgICAgICBsZXQgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi10cmlnZ2VyJyk7XG4gICAgICAgIFsuLi5kcm9wZG93blRyaWdnZXJzXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSBidXR0b24ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbGlzdCcpO1xuICAgICAgICAgICAgbGV0IGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiXCIpID8gXCJibG9ja1wiIDogXCJcIjtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9ICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCI7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBjbGlja2FibGUgYGRpdmAgdG8gY2xvc2UgdGhlIGRyb3Bkb3duIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZHJvcGRvd24gZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmKGRyb3Bkb3duQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkY2xpY2thYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuY2xhc3NOYW1lID0gXCJiYWNrZHJvcC1oaWRkZW5cIjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZENoaWxkKCRjbGlja2FibGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjaG9pY2UgZXZlbnRcbiAgICAgICAgICAgIGxldCAkYW5jaG9yVGFncyA9ICRkcm9wZG93bkxpc3QucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICAgICAgICAgICAgWy4uLiRhbmNob3JUYWdzXS5mb3JFYWNoKGZ1bmN0aW9uKGFuY2hvcikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uT3B0aW9uID0gYW5jaG9yLnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwcmV2aW91c2x5IHNlbGVjdGVkIGxpc3QgaXRlbSAocmVtb3ZlIGFjdGl2ZSBjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0gPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3IoJ2xpLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudEFjdGl2ZUxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBjbGlja2VkIGxpc3QgaXRlbSBieSBnaXZpbmcgaXQgYGFjdGl2ZWAgY2xhc3MgYW5kIGNoYW5naW5nIGJ1dHRvbiBsYWJlbCB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc2VsZWN0aW9uT3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBkcm9wZG93bi1saXN0XG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCA6IHJlbW92ZSBvcGVuZWQgYmFja2Ryb3AtaGlkZGVuXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcC1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbmNvbnN0IEZBREVPVVRfRFVSQVRJT04gPSA0ICogMTAwMDtcblxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiB7XG5cbiAgICAvLyBpbml0aWFsaXplIG5vdGlmaWNhdGlvbiBiZWhhdmlvdXJcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnJlbW92ZU9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvciBjbGVhbnVwIG5vdGlmaWNhdGlvbnMgY29udGFpbmVyXG4gICAgc3RhdGljIHNldHVwQ29udGFpbmVyKCkgIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RpZmljYXRpb24tY29udGFpbmVyJyk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV2ZW50dWFsIGV4aXN0aW5nIGNvbnRhaW5lciBlbGVtZW50IHRvIHN0YXJ0IGNsZWFuXG4gICAgICAgIGlmKG51bGwgIT0gY29udGFpbmVyKSB7IGNvbnRhaW5lci5yZW1vdmUoKTsgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgYXBwZW5kIHRoZSBub3RpZmljYXRpb24gY29udGFpbmVyIGFzIGJvZHkgZmlyc3QgZWxlbWVudFxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmlkID0gJ25vdGlmaWNhdGlvbi1jb250YWluZXInO1xuICAgICAgICBsZXQgZmlyc3RQYWdlRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgZmlyc3RQYWdlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gc2V0IG1lc3NhZ2UgdGV4dCBhbmQgbm90aWZpY2F0aW9uIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yKVxuICAgIHN0YXRpYyBjcmVhdGUobWVzc2FnZSwgdHlwZSwgaXNTdGlja3kgPSBmYWxzZSkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcblxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKGBub3RpZmljYXRpb24tJHt0eXBlfWApO1xuICAgICAgICBpZihpc1N0aWNreSkgeyBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnc3RpY2snKTsgfSAvLyBzdGlja3kgbm90aWZpY2F0aW9ucyBtaWdodCBiZSB1c2VkIGZvciBsb25nIG1lc3NhZ2VzXG4gICAgICAgIG5vdGlmaWNhdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcblxuICAgICAgICAvLyBhbmltYXRlIGluXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnaW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIGZhZGUgb3V0IG5vdGlmaWNhdGlvbiAodW5sZXNzIGl0IGhhcyAnc3RpY2snIGNsYXNzKVxuICAgICAgICAgICAgICAgIGlmKCEgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2snKSkgeyBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uKTsgfVxuICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9sZCBub3RpZmljYXRpb25zXG4gICAgc3RhdGljIGNsZWFuKG5vdGlmaWNhdGlvbiwgZHVyYXRpb24gPSBGQURFT1VUX0RVUkFUSU9OKSB7XG4gICAgICAgIC8vIGZhZGVvdXQgbm90aWZpY2F0aW9uIGFmdGVyIHNwZWNpZmllZCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgKGRlZmF1bHQgPSBGQURFT1VUX0RVUkFUSU9OKVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNsZWFyKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBkdXJhdGlvblxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcihub3RpZmljYXRpb24pIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5vdGlmaWNhdGlvbiBmcm9tIERPTSBvbmNlIGl0cyBmYWRlb3V0IGFuaW1hdGlvbiBoYXMgZW5kZWQgKGFib3V0IDFzIHRvIGJlIHN1cmUpXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAxMDAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50IG9uICdkb2N1bWVudCcgZm9yIG5vdGlmaWNhdGlvbnMgdGhhdCB3aWxsIGJlIGFkZGVkIGxhdGVyIG9uIHRoZSBET01cbiAgICBzdGF0aWMgcmVtb3ZlT25DbGlja0V2ZW50KCkge1xuICAgICAgICAvLyBub3RpZmljYXRpb25zIGFyZSByZW1vdmVkIHdoZW4gY2xpY2tlZCBvblxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZXMgPSBbJ25vdGlmaWNhdGlvbi1zdWNjZXNzJywgJ25vdGlmaWNhdGlvbi1pbmZvJywgJ25vdGlmaWNhdGlvbi13YXJuaW5nJywgJ25vdGlmaWNhdGlvbi1lcnJvciddO1xuXG4gICAgICAgIFV0aWxzLmNsaWNrV2F0Y2gobm90aWZpY2F0aW9uVHlwZXMsIGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNsZWFuKG5vdGlmaWNhdGlvbiwgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGdldHRlclxuICAgIHN0YXRpYyBnZXQgZmFkZW91dER1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gRkFERU9VVF9EVVJBVElPTjtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcucHJldicpO1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gICAgICAgIGxldCBhY3RpdmVJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgICAgIGxldCBpdGVtcyA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBzZXQgLyByZXNldCBpdGVtc1xuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VsbGlwc2lzJykpIHsgaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCA9IGk7IH1cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJywgJ3Nob3cnLCAnZWxsaXBzaXMnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5wYWdlID0gaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KGFjdGl2ZUl0ZW0uZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAvKiBhZGQgYXBwcm9wcmlhdGUgY2xhc3NlcyA6ICovXG5cbiAgICAgICAgLy8gZGlzYWJsZSAncHJldicgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IDEpIHtcbiAgICAgICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1szXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7IC8vIGlmIGFjdGl2ZSBwYWdlIGlzIDEsIHRoZSB0aGlyZCBpdGVtIGlzIGRpc3BsYXllZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGlzYWJsZSAnbmV4dCcgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBsYXN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gKGl0ZW1zLmxlbmd0aCAtIDIpKSB7XG4gICAgICAgICAgICBuZXh0SXRlbS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDQpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPj0gNCkgeyBpdGVtc1syXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBsYXN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA8PSAoaXRlbXMubGVuZ3RoIC0gNSkpIHsgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDMpXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cblxuICAgICAgICAvLyBhY3RpdmUgaXRlbSwgcHJldmlvdXMgYW5kIG5leHQgb25lc1xuICAgICAgICBpdGVtc1soYWN0aXZlSXRlbUluZGV4IC0gMSldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggKyAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIHByZXYsIG5leHQsIGZpcnN0IGFuZCBsYXN0IHBhZ2VzIGFyZSBkaXNwbGF5ZWQgYXMgd2VsbFxuICAgICAgICBwcmV2SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbMV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMildLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICAvLyBoaWRlIGV2ZXJ5IG90aGVyIGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaWYoISBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVwbGFjZSAnZWxsaXBzaXMnIGNsYXNzIGxpc3QgaXRlbSBjb250ZW50IHdpdGggMyBkb3RzXG4gICAgICAgIGxldCBlbGxpcHNpc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGkuZWxsaXBzaXMnKTtcbiAgICAgICAgWy4uLmVsbGlwc2lzSXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignYScpLnRleHRDb250ZW50ID0gXCIuLi5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4vUGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuL05vdGlmaWNhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBTdHlsZWd1aWRlIHtcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgU3R5bGVndWlkZS5pbnB1dEZlZWRiYWNrKCk7XG4gICAgICAgIFN0eWxlZ3VpZGUucGFnaW5hdGlvbigpO1xuICAgICAgICBTdHlsZWd1aWRlLm5vdGlmaWNhdGlvbigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dEZlZWRiYWNrKCkge1xuICAgICAgICBsZXQgaW5wdXRHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtdGVzdCAuaW5wdXQtZ3JvdXAnKTtcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zR3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMnKTtcbiAgICAgICAgbGV0IHRlc3RCdXR0b25zID0gdGVzdEJ1dHRvbnNHcm91cC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblxuICAgICAgICAvLyBpbnNlcnQgYW4gZW1wdHkgc3BhbiBhcyBoZWlnaHQgcGxhY2Vob2xkZXJcbiAgICAgICAgY3JlYXRlUGxhY2Vob2xkZXIoKTtcblxuICAgICAgICBbLi4udGVzdEJ1dHRvbnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrVGV4dCA9IHRoaXMuZGF0YXNldC50ZXh0O1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSB0aGlzLmRhdGFzZXQuYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGlzYWJsZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBidXR0b25cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkaXNhYmxlKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSAhaW5wdXQuZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJFbmFibGUgaW5wdXRcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgaW5wdXRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IHN0YXRlXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlQnV0dG9uID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWdyZXknKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHBvdGVudGlhbGx5IGRpc2FibGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBpbnB1dFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzdGF0ZXMgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXBcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZmVlZGJhY2sgc3RhdGUgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykgPyBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpLnJlbW92ZSgpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZWNyZWF0ZSBhIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVBsYWNlaG9sZGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIGlucHV0IHN0YXRlIGZlZWRiYWNrXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3RhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFuIHVwIGluIGNhc2UgdGhlIGlucHV0IGhhcyBiZWVuIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgY2xhc3MgdG8gaW5wdXQtZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwIFwiICsgYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGZlZWRiYWNrIHNwYW4gb3IgY3JlYXRlIG9uZVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tTcGFuID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoISBmZWVkYmFja1NwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4udGV4dENvbnRlbnQgPSBmZWVkYmFja1RleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuaW5zZXJ0QmVmb3JlKGZlZWRiYWNrU3BhbiwgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LWJ1dHRvbnMnKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5pbm5lckhUTUwgPSBcIiZuYnNwO1wiO1xuICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIHRlc3RCdXR0b25zR3JvdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmRhdGFzZXQucGFnZSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gb2xkIGFjdGl2ZSBpdGVtXG4gICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIC8vIHByZXYgJiBuZXh0IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXYnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggKyAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RlZCBuZXcgYWN0aXZlIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZWxhdW5jaCBmdW5jdGlvbiBmb3IgZGVtbyBwdXJwb3NlXG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmaWNhdGlvbigpIHtcblxuICAgICAgICAvLyBzdGFuZGFyZCBidXR0b25zIChub24tc3RpY2t5IG5vdGlmaWNhdGlvbnMpXG4gICAgICAgIGxldCBzdGFuZGFyZE5vdGlmaWNhdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm90aWZpY2F0aW9ucy10ZXN0LWJ1dHRvbnMgYnV0dG9uJyk7XG5cbiAgICAgICAgWy4uLnN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dDtcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlID0gYnV0dG9uLmRhdGFzZXQudHlwZTtcbiAgICAgICAgICAgIGxldCBpc1N0aWNreSA9IGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3N0aWNreScpXG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jcmVhdGUobm90aWZpY2F0aW9uVGV4dCwgbm90aWZpY2F0aW9uVHlwZSwgaXNTdGlja3kpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vVXRpbHMnO1xyXG5cclxubGV0IHZpc2libGVUYWJDb250ZW50SWRzO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhYiB7XHJcblxyXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRhYigpIHtcclxuICAgICAgICAvLyB1cGRhdGUgYWN0aXZlIHRhYihzKVxyXG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlQ29udGVudElkcygpO1xyXG5cclxuICAgICAgICAvLyBoaWRlIG5vbiBhY3RpdmUgY29udGVudCBhdCBwYWdlIHN0YXJ0IHVwIChzaG93IHN0aWxsIGRpc3BsYXkgYWN0aXZlIGNvbnRlbnQpXHJcbiAgICAgICAgdGhpcy5oaWRlTm9uQWN0aXZlQ29udGVudCgpO1xyXG5cclxuICAgICAgICAvLyBtZW51IGJlaGF2aW91clxyXG4gICAgICAgIGxldCB0YWJNZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicy1tZW51IGEnKTtcclxuICAgICAgICBbLi4udGFiTWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmspIHtcclxuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGxpbmsgb3duaW5nIHRhYlxyXG4gICAgICAgICAgICAgICAgbGV0IHRhYnMgPSBVdGlscy5jbG9zZXN0KGxpbmssICd0YWJzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSBjdXJyZW50IGFjdGl2ZSBjb250ZW50XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlTWVudVRhYiA9IHRhYnMucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYobnVsbCAhPSBhY3RpdmVNZW51VGFiKSB7IGFjdGl2ZU1lbnVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgJ2FjdGl2ZScgY2xhc3MgdG8gbGluayBwYXJlbnRcclxuICAgICAgICAgICAgICAgIGxpbmsucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgZmluYWxseSB1cGRhdGUgRE9NXHJcbiAgICAgICAgICAgICAgICBUYWIudXBkYXRlQWN0aXZlQ29udGVudElkcygpO1xyXG4gICAgICAgICAgICAgICAgVGFiLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGVBY3RpdmVDb250ZW50SWRzKCkge1xyXG4gICAgICAgIHZpc2libGVUYWJDb250ZW50SWRzID0gbmV3IFNldCgpOyAvLyBzdGFydCBjbGVhblxyXG4gICAgICAgIGxldCBhY3RpdmVUYWJNZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLW1lbnUgLmFjdGl2ZScpO1xyXG4gICAgICAgIFsuLi5hY3RpdmVUYWJNZW51c10uZm9yRWFjaChmdW5jdGlvbih0YWJNZW51KSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRJZCA9IHRhYk1lbnUuZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJykuc2xpY2UoMSk7IC8vIHJlbW92ZSB0aGUgIyBzeW1ib2xcclxuICAgICAgICAgICAgdmlzaWJsZVRhYkNvbnRlbnRJZHMuYWRkKHRhcmdldElkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgbGV0IHRhYkNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMgLnRhYnMtY29udGVudCcpO1xyXG4gICAgICAgIFsuLi50YWJDb250ZW50c10uZm9yRWFjaChmdW5jdGlvbihjb250ZW50QmxvY2spIHtcclxuICAgICAgICAgICAgWy4uLmNvbnRlbnRCbG9jay5jaGlsZHJlbl0uZm9yRWFjaChmdW5jdGlvbihjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzdGFydCBjbGVhbiBieSByZW1vdmluZyAnaGlkZGVuJyBjbGFzc1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIGNvbnRlbnRzIHRoYXQgYXJlIG5vdCBpbiBhbiBhY3RpdmUgc3RhdGUgdGFiXHJcbiAgICAgICAgICAgICAgICBpZighIHZpc2libGVUYWJDb250ZW50SWRzLmhhcyhjb250ZW50LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGxldCBwYXJlbnQ7XG5cbiAgICB3aGlsZShlbGVtZW50KSB7XG4gICAgICAgIHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYocGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7IHJldHVybiBwYXJlbnQ7IH1cbiAgICAgICAgZWxlbWVudCA9IHBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gYWxsb3dzIGVsZW1lbnRzIHdpdGggYSBzcGVjaWZpYyBjbGFzcyB0byBiZSBjbGlja2FibGUgZXZlbiBpZiB0aGV5IGFyZSBub3Qgb24gdGhlIERPTSB3aGVuIHRoaXMgbWV0aG9kIGlzIGNhbGxlZFxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrV2F0Y2godGFyZ2V0ZWRFbGVtZW50Q2xhc3NlcywgY2FsbGJhY2spIHtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIFsuLi50YXJnZXRlZEVsZW1lbnRDbGFzc2VzXS5mb3JFYWNoKGZ1bmN0aW9uKGNsYXNzSXRlbSkge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzSXRlbSkpIHsgY2FsbGJhY2soZS50YXJnZXQpIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59IiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vRm9ybSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4vVGFiJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJy4vRGlhbG9nJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vRmlsdGVyJztcblxuLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbmltcG9ydCB7IFN0eWxlZ3VpZGUgfSBmcm9tICcuL1N0eWxlZ3VpZGUnO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBGb3JtLmluaXQoKTtcbiAgICBQYWdpbmF0aW9uLmluaXQoKTtcbiAgICBOb3RpZmljYXRpb24uaW5pdCgpO1xuICAgIFRhYi5pbml0KCk7XG4gICAgRGlhbG9nLmluaXQoKTtcbiAgICBGaWx0ZXIuaW5pdCgpO1xuXG4gICAgLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbiAgICBTdHlsZWd1aWRlLmluaXQoKTtcbn07Il19
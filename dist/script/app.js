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
                    item.firstElementChild.textContent = '' + i;
                }
                item.classList.remove('hidden', 'show', 'ellipsis', 'disabled');
                item.dataset.page = i;
            });

            var activeItemIndex = parseInt(activeItem.dataset.page);

            /* add appropriate classes: */

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
                        inputGroup.querySelector('.demo-block').appendChild(feedbackSpan);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRGlhbG9nLmpzIiwic3JjXFxzY3JpcHRcXEZpbHRlci5qcyIsInNyY1xcc2NyaXB0XFxGb3JtLmpzIiwic3JjXFxzY3JpcHRcXE5vdGlmaWNhdGlvbi5qcyIsInNyY1xcc2NyaXB0XFxQYWdpbmF0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFN0eWxlZ3VpZGUuanMiLCJzcmNcXHNjcmlwdFxcVGFiLmpzIiwic3JjXFxzY3JpcHRcXFV0aWxzLmpzIiwic3JjXFxzY3JpcHRcXG1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7SUNBYSxNLFdBQUEsTTs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixnQkFBSSxvQkFBb0IsU0FBUyxnQkFBVCxDQUEwQixpQkFBMUIsQ0FBeEI7QUFDQSxnQkFBRyxRQUFRLGlCQUFYLEVBQThCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOztBQUU5Qyx5Q0FBSSxpQkFBSixHQUF1QixPQUF2QixDQUErQixVQUFTLE1BQVQsRUFBaUI7QUFDNUMsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4QywyQkFBTyxVQUFQLENBQWtCLEtBQUssT0FBTCxDQUFhLE1BQS9CO0FBQ0gsaUJBRkQ7QUFHSCxhQUpEO0FBS0g7OztnQ0FFYztBQUNYO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLGVBQUw7O0FBRUE7QUFDQSxpQkFBSyxlQUFMO0FBQ0g7Ozt5Q0FFdUI7QUFDcEIsaUJBQUssUUFBTCxHQUFnQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxpQkFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNIOzs7MENBRXdCO0FBQ3JCLGlCQUFLLGVBQUwsR0FBdUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0EsaUJBQUssZUFBTCxDQUFxQixTQUFyQixHQUFpQyxr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ZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBEaWFsb2cge1xuXG4gICAgLy8gYnV0dG9uIGV2ZW50c1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgZGlhbG9nVGVzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlhbG9nLXRyaWdnZXInKTtcbiAgICAgICAgaWYobnVsbCA9PSBkaWFsb2dUZXN0QnV0dG9ucykgeyByZXR1cm4gZmFsc2U7fVxuXG4gICAgICAgIFsuLi5kaWFsb2dUZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLnNob3dEaWFsb2codGhpcy5kYXRhc2V0LnRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldHVwKCkge1xuICAgICAgICAvLyBjcmVhdGUgYmFja2Ryb3AgJiBjb250YWluZXJcbiAgICAgICAgdGhpcy5jcmVhdGVCYWNrZHJvcCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUNvbnRhaW5lcigpO1xuXG4gICAgICAgIC8vIGJlaGF2aW91ciBzZXR1cFxuICAgICAgICB0aGlzLmNvbnRhaW5lckV2ZW50cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVCYWNrZHJvcCgpIHtcbiAgICAgICAgdGhpcy5iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJhY2tkcm9wLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3BcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc05hbWUgPSBcImRpYWxvZy1jb250YWluZXJcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbmVyRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZigoZS50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygnZGlhbG9nLWNvbnRhaW5lcicpIHx8IChlLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNtaXNzJykpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmltYXRlIG91dFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2cuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcigpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGRpYWxvZyBmcm9tIERPTSBvbmNlIGl0cyBmYWRlb3V0IGFuaW1hdGlvbiBoYXMgZW5kZWRcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBEaWFsb2cuZGlhbG9nQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgNTAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dEaWFsb2coZGlhbG9nSWQpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRpYWxvZ0lkKS5jbG9uZU5vZGUodHJ1ZSk7IC8vIGRvZXNuJ3QgbWVzcyB3aXRoIHRoZSBvcmlnaW5hbCBlbGVtZW50XG4gICAgICAgIGlmKG51bGwgPT0gdGhpcy5kaWFsb2cpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAvLyBkaXNtaXNzIGJ1dHRvblxuICAgICAgICBsZXQgZGlzbWlzc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZGlzbWlzc0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdkaXNtaXNzJyk7XG4gICAgICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKGRpc21pc3NCdXR0b24pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZHJvcCBhbmQgY29udGFpbmVyXG4gICAgICAgIERpYWxvZy5zZXR1cCgpO1xuXG4gICAgICAgIC8vIGFkZCBuZXcgZWxlbWVudHMgb24gRE9NXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2dDb250YWluZXIpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgLy8gYW5pbWF0ZSBpblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgIGZyb20gJy4vVXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUNsZWFyT3V0QnV0dG9uKCk7IC8vIGVsZW1lbnQgY3JlYXRpb24gKGFuZCB0aGVuIGV2ZW50IHJlZ2lzdHJhdGlvbilcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtT25DbGljaygpOyAvLyByZWdpc3RlciBldmVudHNcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbnRhaW5lckNoaWxkcmVuQ291bnRPYnNlcnZlcigpOyAvLyByZWdpc3RlciBhICdjaGlsZCByZW1vdmVkJyBldmVudCB0byBkaXNhYmxlIGNvbnRhaW5lciBpZiBuZWVkIGJlXG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUNsZWFyT3V0QnV0dG9uKCkge1xuICAgICAgICAvLyB0YXJnZXQgZXZlcnkgZmlsdGVyIGJsb2NrIG9uIHRoZSBwYWdlXG4gICAgICAgIGxldCBmaWx0ZXJDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcicpO1xuICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIGEgJ2NsZWFyIGZpbHRlciBvdXQnIGJ1dHRvbiBmb3IgZWFjaCBvbmVcbiAgICAgICAgWy4uLmZpbHRlckNvbnRhaW5lcnNdLmZvckVhY2goZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgICAgICBsZXQgY2xlYXJPdXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNsZWFyT3V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZpbHRlci1jbGVhcicpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNsZWFyT3V0QnV0dG9uKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgY2xlYXIgb3V0IGJ1dHRvbiBjbGljayBldmVudFxuICAgICAgICAgICAgY2xlYXJPdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBGaWx0ZXIuY2xlYXJPdXRGaWx0ZXJzKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUl0ZW1PbkNsaWNrKCkge1xuICAgICAgICBVdGlscy5jbGlja1dhdGNoKFsnZmlsdGVyLWl0ZW0nLCAndGFnLWl0ZW0nXSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIEZpbHRlci5yZW1vdmVJdGVtQWN0aW9uKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udmVydEl0ZW0oaXRlbSkge1xuICAgICAgICAvLyBnZXQgZmlsdGVyIHBhcmVudCBmb3IgbmV3VGFnIGRhdGEtdGFyZ2V0IGF0dHJpYnV0ZVxuICAgICAgICBsZXQgaXRlbURhdGFUYXJnZXQgPSBpdGVtLnBhcmVudEVsZW1lbnQuaWQ7XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgdGFnIHdpdGggZmlsdGVyJ3MgZGF0YVxuICAgICAgICBsZXQgbmV3SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIG5ld0l0ZW0uY2xhc3NOYW1lID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbHRlci1pdGVtJykgPyAndGFnLWl0ZW0nIDogJ2ZpbHRlci1pdGVtJztcbiAgICAgICAgbmV3SXRlbS5pbm5lckhUTUwgPSBpdGVtLmlubmVySFRNTDtcbiAgICAgICAgbmV3SXRlbS5kYXRhc2V0LnRhcmdldCA9IGAjJHtpdGVtRGF0YVRhcmdldH1gO1xuICAgICAgICByZXR1cm4gbmV3SXRlbTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlSXRlbUFjdGlvbihpdGVtKSB7XG4gICAgICAgIC8vIHNlbGVjdCB0YXJnZXRlZCBjb250YWluZXJcbiAgICAgICAgbGV0IGl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW0uZGF0YXNldC50YXJnZXQpO1xuXG4gICAgICAgIGxldCBuZXdJdGVtID0gRmlsdGVyLmNvbnZlcnRJdGVtKGl0ZW0pO1xuICAgICAgICBpdGVtLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIGluc2VydCBuZXdseSBjcmVhdGVkIHRhZyBpbnRvIGZpbHRlciB0YWdzIGNvbnRhaW5lclxuICAgICAgICBpdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhck91dEZpbHRlcnMoY29udGFpbmVyKSB7XG4gICAgICAgIC8vIGdldCBmaWx0ZXIgaXRlbXNcbiAgICAgICAgbGV0IGZpbHRlckl0ZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItaXRlbScpO1xuICAgICAgICBbLi4uZmlsdGVySXRlbXNdLmZvckVhY2goZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgICAgICAgICBGaWx0ZXIucmVtb3ZlSXRlbUFjdGlvbihmaWx0ZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVnaXN0ZXJDb250YWluZXJDaGlsZHJlbkNvdW50T2JzZXJ2ZXIoKSB7XG4gICAgICAgIC8vIG9ic2VydmUgaWYgYSBjaGlsZCBlbGVtZW50IGlzIHJlbW92ZWQgZnJvbSBhIGNvbnRhaW5lclxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgRmlsdGVyLmNoZWNrRmlsdGVyQ29udGFpbmVyRGlzYWJsZWQobXV0YXRpb24udGFyZ2V0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb25maWcgPSB7IGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogZmFsc2UsIGNoYXJhY3RlckRhdGE6IGZhbHNlIH07XG4gICAgICAgIGxldCBmaWx0ZXJMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItbGlzdCcpO1xuICAgICAgICBbLi4uZmlsdGVyTGlzdHNdLmZvckVhY2goZnVuY3Rpb24oZmlsdGVyTGlzdCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShmaWx0ZXJMaXN0LCBjb25maWcpO1xuICAgICAgICAgICAgRmlsdGVyLmNoZWNrRmlsdGVyQ29udGFpbmVyRGlzYWJsZWQoZmlsdGVyTGlzdCk7IC8vIHBhZ2UgbG9hZCBmaXJzdCBjaGVja1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hlY2tGaWx0ZXJDb250YWluZXJEaXNhYmxlZChmaWx0ZXJMaXN0KSB7XG4gICAgICAgIGxldCBmaWx0ZXJDb250YWluZXIgPSBmaWx0ZXJMaXN0LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYoZmlsdGVyTGlzdC5jaGlsZEVsZW1lbnRDb3VudCA8IDEpIHtcbiAgICAgICAgICAgIGZpbHRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEZvcm0ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkcm9wZG93bigpIHtcbiAgICAgICAgbGV0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24tdHJpZ2dlcicpO1xuICAgICAgICBbLi4uZHJvcGRvd25UcmlnZ2Vyc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWxpc3QnKTtcbiAgICAgICAgICAgIGxldCBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gKCRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcIlwiKSA/IFwiYmxvY2tcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJibG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgY2xpY2thYmxlIGBkaXZgIHRvIGNsb3NlIHRoZSBkcm9wZG93biB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGRyb3Bkb3duIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBpZihkcm9wZG93bkFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJGNsaWNrYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3AtaGlkZGVuXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmRDaGlsZCgkY2xpY2thYmxlKTtcblxuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2hvaWNlIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGFuY2hvclRhZ3MgPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgICAgIFsuLi4kYW5jaG9yVGFnc10uZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk9wdGlvbiA9IGFuY2hvci50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcHJldmlvdXNseSBzZWxlY3RlZCBsaXN0IGl0ZW0gKHJlbW92ZSBhY3RpdmUgY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3VycmVudEFjdGl2ZUxpc3RJdGVtID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yKCdsaS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3QgY2xpY2tlZCBsaXN0IGl0ZW0gYnkgZ2l2aW5nIGl0IGBhY3RpdmVgIGNsYXNzIGFuZCBjaGFuZ2luZyBidXR0b24gbGFiZWwgdGV4dFxuICAgICAgICAgICAgICAgICAgICBhbmNob3IucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHNlbGVjdGlvbk9wdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgZHJvcGRvd24tbGlzdFxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgOiByZW1vdmUgb3BlbmVkIGJhY2tkcm9wLWhpZGRlblxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG5jb25zdCBGQURFT1VUX0RVUkFUSU9OID0gNCAqIDEwMDA7XG5cbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb24ge1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBub3RpZmljYXRpb24gYmVoYXZpb3VyXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVPbkNsaWNrRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgb3IgY2xlYW51cCBub3RpZmljYXRpb25zIGNvbnRhaW5lclxuICAgIHN0YXRpYyBzZXR1cENvbnRhaW5lcigpICB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90aWZpY2F0aW9uLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBldmVudHVhbCBleGlzdGluZyBjb250YWluZXIgZWxlbWVudCB0byBzdGFydCBjbGVhblxuICAgICAgICBpZihudWxsICE9IGNvbnRhaW5lcikgeyBjb250YWluZXIucmVtb3ZlKCk7IH1cblxuICAgICAgICAvLyBjcmVhdGUgYW5kIGFwcGVuZCB0aGUgbm90aWZpY2F0aW9uIGNvbnRhaW5lciBhcyBib2R5IGZpcnN0IGVsZW1lbnRcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5pZCA9ICdub3RpZmljYXRpb24tY29udGFpbmVyJztcbiAgICAgICAgbGV0IGZpcnN0UGFnZUVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShjb250YWluZXIsIGZpcnN0UGFnZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIHNldCBtZXNzYWdlIHRleHQgYW5kIG5vdGlmaWNhdGlvbiB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvcilcbiAgICBzdGF0aWMgY3JlYXRlKG1lc3NhZ2UsIHR5cGUsIGlzU3RpY2t5ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RpZmljYXRpb24tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZChgbm90aWZpY2F0aW9uLSR7dHlwZX1gKTtcbiAgICAgICAgaWYoaXNTdGlja3kpIHsgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ3N0aWNrJyk7IH0gLy8gc3RpY2t5IG5vdGlmaWNhdGlvbnMgbWlnaHQgYmUgdXNlZCBmb3IgbG9uZyBtZXNzYWdlc1xuICAgICAgICBub3RpZmljYXRpb24uaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbik7XG5cbiAgICAgICAgLy8gYW5pbWF0ZSBpblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ2luJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBmYWRlIG91dCBub3RpZmljYXRpb24gKHVubGVzcyBpdCBoYXMgJ3N0aWNrJyBjbGFzcylcbiAgICAgICAgICAgICAgICBpZighIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3N0aWNrJykpIHsgTm90aWZpY2F0aW9uLmNsZWFuKG5vdGlmaWNhdGlvbik7IH1cbiAgICAgICAgICAgIH0sIDEwMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBvbGQgbm90aWZpY2F0aW9uc1xuICAgIHN0YXRpYyBjbGVhbihub3RpZmljYXRpb24sIGR1cmF0aW9uID0gRkFERU9VVF9EVVJBVElPTikge1xuICAgICAgICAvLyBmYWRlb3V0IG5vdGlmaWNhdGlvbiBhZnRlciBzcGVjaWZpZWQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIChkZWZhdWx0ID0gRkFERU9VVF9EVVJBVElPTilcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jbGVhcihub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZHVyYXRpb25cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXIobm90aWZpY2F0aW9uKSB7XG4gICAgICAgIC8vIHJlbW92ZSBub3RpZmljYXRpb24gZnJvbSBET00gb25jZSBpdHMgZmFkZW91dCBhbmltYXRpb24gaGFzIGVuZGVkIChhYm91dCAxcyB0byBiZSBzdXJlKVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMTAwMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGFkZCBjbGljayBldmVudCBvbiAnZG9jdW1lbnQnIGZvciBub3RpZmljYXRpb25zIHRoYXQgd2lsbCBiZSBhZGRlZCBsYXRlciBvbiB0aGUgRE9NXG4gICAgc3RhdGljIHJlbW92ZU9uQ2xpY2tFdmVudCgpIHtcbiAgICAgICAgLy8gbm90aWZpY2F0aW9ucyBhcmUgcmVtb3ZlZCB3aGVuIGNsaWNrZWQgb25cbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvblR5cGVzID0gWydub3RpZmljYXRpb24tc3VjY2VzcycsICdub3RpZmljYXRpb24taW5mbycsICdub3RpZmljYXRpb24td2FybmluZycsICdub3RpZmljYXRpb24tZXJyb3InXTtcblxuICAgICAgICBVdGlscy5jbGlja1dhdGNoKG5vdGlmaWNhdGlvblR5cGVzLCBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jbGVhbihub3RpZmljYXRpb24sIDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXJcbiAgICBzdGF0aWMgZ2V0IGZhZGVvdXREdXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEZBREVPVVRfRFVSQVRJT047XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYWdpbmF0aW9uKCkge1xuICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnByZXYnKTtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICAgICAgICBsZXQgYWN0aXZlSXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gc2V0IC8gcmVzZXQgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbGxpcHNpcycpKSB7IGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQgPSBgJHtpfWA7IH1cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJywgJ3Nob3cnLCAnZWxsaXBzaXMnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5wYWdlID0gaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KGFjdGl2ZUl0ZW0uZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAvKiBhZGQgYXBwcm9wcmlhdGUgY2xhc3NlczogKi9cblxuICAgICAgICAvLyBkaXNhYmxlICdwcmV2JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgcHJldkl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW1zWzNdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTsgLy8gaWYgYWN0aXZlIHBhZ2UgaXMgMSwgdGhlIHRoaXJkIGl0ZW0gaXMgZGlzcGxheWVkXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNhYmxlICduZXh0JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGxhc3Qgb25lXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA9PSAoaXRlbXMubGVuZ3RoIC0gMikpIHtcbiAgICAgICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gNCldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcnN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA+PSA0KSB7IGl0ZW1zWzJdLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGxhc3QgZWxsaXBzaXMgY2hlY2tcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4IDw9IChpdGVtcy5sZW5ndGggLSA1KSkgeyBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMyldLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGFjdGl2ZSBpdGVtLCBwcmV2aW91cyBhbmQgbmV4dCBvbmVzXG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggLSAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbKGFjdGl2ZUl0ZW1JbmRleCArIDEpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gcHJldiwgbmV4dCwgZmlyc3QgYW5kIGxhc3QgcGFnZXMgYXJlIGRpc3BsYXllZCBhcyB3ZWxsXG4gICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1sxXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhpdGVtcy5sZW5ndGggLSAyKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIGhpZGUgZXZlcnkgb3RoZXIgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpZighIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZXBsYWNlICdlbGxpcHNpcycgY2xhc3MgbGlzdCBpdGVtIGNvbnRlbnQgd2l0aCAzIGRvdHNcbiAgICAgICAgbGV0IGVsbGlwc2lzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaS5lbGxpcHNpcycpO1xuICAgICAgICBbLi4uZWxsaXBzaXNJdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCdhJykudGV4dENvbnRlbnQgPSBcIi4uLlwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcblxuZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBTdHlsZWd1aWRlLmlucHV0RmVlZGJhY2soKTtcbiAgICAgICAgU3R5bGVndWlkZS5wYWdpbmF0aW9uKCk7XG4gICAgICAgIFN0eWxlZ3VpZGUubm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnB1dC10ZXN0IC5pbnB1dC1ncm91cCcpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnNHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnMgPSB0ZXN0QnV0dG9uc0dyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgICAgIC8vIGluc2VydCBhbiBlbXB0eSBzcGFuIGFzIGhlaWdodCBwbGFjZWhvbGRlclxuICAgICAgICBjcmVhdGVQbGFjZWhvbGRlcigpO1xuXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tUZXh0ID0gdGhpcy5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkaXNhYmxlZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRpc2FibGUoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9ICFpbnB1dC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkVuYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc3RhdGVcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVCdXR0b24gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JleScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcG90ZW50aWFsbHkgZGlzYWJsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0YXRlcyBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmZWVkYmFjayBzdGF0ZSBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSA/IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykucmVtb3ZlKCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3JlYXRlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgaW5wdXQgc3RhdGUgZmVlZGJhY2tcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgaW4gY2FzZSB0aGUgaW5wdXQgaGFzIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXAgXCIgKyBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmVlZGJhY2sgc3BhbiBvciBjcmVhdGUgb25lXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1NwYW4gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpO1xuICAgICAgICAgICAgICAgICAgICBpZighIGZlZWRiYWNrU3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi50ZXh0Q29udGVudCA9IGZlZWRiYWNrVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZGVtby1ibG9jaycpLmFwcGVuZENoaWxkKGZlZWRiYWNrU3Bhbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyKCkge1xuICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgcGxhY2Vob2xkZXIuY2xhc3NOYW1lID0gXCJmZWVkYmFja1wiO1xuICAgICAgICAgICAgcGxhY2Vob2xkZXIuaW5uZXJIVE1MID0gXCImbmJzcDtcIjtcbiAgICAgICAgICAgIGlucHV0R3JvdXAuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCB0ZXN0QnV0dG9uc0dyb3VwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwYWdpbmF0aW9uKCkge1xuICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gICAgICAgIGxldCBpdGVtcyA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVJdGVtSW5kZXggPSBwYXJzZUludChwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5kYXRhc2V0LnBhZ2UpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIG9sZCBhY3RpdmUgaXRlbVxuICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmV2ICYgbmV4dCBjYXNlc1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4IC0gMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCduZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4ICsgMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0ZWQgbmV3IGFjdGl2ZSBwYWdlXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVsYXVuY2ggZnVuY3Rpb24gZm9yIGRlbW8gcHVycG9zZVxuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3RpZmljYXRpb24oKSB7XG5cbiAgICAgICAgLy8gc3RhbmRhcmQgYnV0dG9ucyAobm9uLXN0aWNreSBub3RpZmljYXRpb25zKVxuICAgICAgICBsZXQgc3RhbmRhcmROb3RpZmljYXRpb25CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vdGlmaWNhdGlvbnMtdGVzdC1idXR0b25zIGJ1dHRvbicpO1xuXG4gICAgICAgIFsuLi5zdGFuZGFyZE5vdGlmaWNhdGlvbkJ1dHRvbnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZSA9IGJ1dHRvbi5kYXRhc2V0LnR5cGU7XG4gICAgICAgICAgICBsZXQgaXNTdGlja3kgPSBidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGlja3knKVxuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uY3JlYXRlKG5vdGlmaWNhdGlvblRleHQsIG5vdGlmaWNhdGlvblR5cGUsIGlzU3RpY2t5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XHJcblxyXG5sZXQgdmlzaWJsZVRhYkNvbnRlbnRJZHM7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFiIHtcclxuXHJcbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdGFiKCkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSBhY3RpdmUgdGFiKHMpXHJcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgbm9uIGFjdGl2ZSBjb250ZW50IGF0IHBhZ2Ugc3RhcnQgdXAgKHNob3cgc3RpbGwgZGlzcGxheSBhY3RpdmUgY29udGVudClcclxuICAgICAgICB0aGlzLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XHJcblxyXG4gICAgICAgIC8vIG1lbnUgYmVoYXZpb3VyXHJcbiAgICAgICAgbGV0IHRhYk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLW1lbnUgYScpO1xyXG4gICAgICAgIFsuLi50YWJNZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24obGluaykge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbGluayBvd25pbmcgdGFiXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFicyA9IFV0aWxzLmNsb3Nlc3QobGluaywgJ3RhYnMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIGN1cnJlbnQgYWN0aXZlIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVNZW51VGFiID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IGFjdGl2ZU1lbnVUYWIpIHsgYWN0aXZlTWVudVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFkZCAnYWN0aXZlJyBjbGFzcyB0byBsaW5rIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFuZCBmaW5hbGx5IHVwZGF0ZSBET01cclxuICAgICAgICAgICAgICAgIFRhYi51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcbiAgICAgICAgICAgICAgICBUYWIuaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKSB7XHJcbiAgICAgICAgdmlzaWJsZVRhYkNvbnRlbnRJZHMgPSBuZXcgU2V0KCk7IC8vIHN0YXJ0IGNsZWFuXHJcbiAgICAgICAgbGV0IGFjdGl2ZVRhYk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSAuYWN0aXZlJyk7XHJcbiAgICAgICAgWy4uLmFjdGl2ZVRhYk1lbnVzXS5mb3JFYWNoKGZ1bmN0aW9uKHRhYk1lbnUpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldElkID0gdGFiTWVudS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zbGljZSgxKTsgLy8gcmVtb3ZlIHRoZSAjIHN5bWJvbFxyXG4gICAgICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcy5hZGQodGFyZ2V0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlTm9uQWN0aXZlQ29udGVudCgpIHtcclxuICAgICAgICBsZXQgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicyAudGFicy1jb250ZW50Jyk7XHJcbiAgICAgICAgWy4uLnRhYkNvbnRlbnRzXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnRCbG9jaykge1xyXG4gICAgICAgICAgICBbLi4uY29udGVudEJsb2NrLmNoaWxkcmVuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGNsZWFuIGJ5IHJlbW92aW5nICdoaWRkZW4nIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY29udGVudHMgdGhhdCBhcmUgbm90IGluIGFuIGFjdGl2ZSBzdGF0ZSB0YWJcclxuICAgICAgICAgICAgICAgIGlmKCEgdmlzaWJsZVRhYkNvbnRlbnRJZHMuaGFzKGNvbnRlbnQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gY2xvc2VzdChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICBsZXQgcGFyZW50O1xuXG4gICAgd2hpbGUoZWxlbWVudCkge1xuICAgICAgICBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmKHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkgeyByZXR1cm4gcGFyZW50OyB9XG4gICAgICAgIGVsZW1lbnQgPSBwYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGFsbG93cyBlbGVtZW50cyB3aXRoIGEgc3BlY2lmaWMgY2xhc3MgdG8gYmUgY2xpY2thYmxlIGV2ZW4gaWYgdGhleSBhcmUgbm90IG9uIHRoZSBET00gd2hlbiB0aGlzIG1ldGhvZCBpcyBjYWxsZWRcbmV4cG9ydCBmdW5jdGlvbiBjbGlja1dhdGNoKHRhcmdldGVkRWxlbWVudENsYXNzZXMsIGNhbGxiYWNrKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBbLi4udGFyZ2V0ZWRFbGVtZW50Q2xhc3Nlc10uZm9yRWFjaChmdW5jdGlvbihjbGFzc0l0ZW0pIHtcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc0l0ZW0pKSB7IGNhbGxiYWNrKGUudGFyZ2V0KSB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSIsImltcG9ydCB7IEZvcm0gfSBmcm9tICcuL0Zvcm0nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4vUGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuL05vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBUYWIgfSBmcm9tICcuL1RhYic7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICcuL0RpYWxvZyc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuL0ZpbHRlcic7XG5cbi8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG5pbXBvcnQgeyBTdHlsZWd1aWRlIH0gZnJvbSAnLi9TdHlsZWd1aWRlJztcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgRm9ybS5pbml0KCk7XG4gICAgUGFnaW5hdGlvbi5pbml0KCk7XG4gICAgTm90aWZpY2F0aW9uLmluaXQoKTtcbiAgICBUYWIuaW5pdCgpO1xuICAgIERpYWxvZy5pbml0KCk7XG4gICAgRmlsdGVyLmluaXQoKTtcblxuICAgIC8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG4gICAgU3R5bGVndWlkZS5pbml0KCk7XG59O1xuIl19
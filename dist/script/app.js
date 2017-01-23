(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var XXS = exports.XXS = "xxs";
var XS = exports.XS = "xs";
var SM = exports.SM = "sm";
var MD = exports.MD = "md";
var LG = exports.LG = "lg";
var XL = exports.XL = "xl";
var XXL = exports.XXL = "xxl";

},{}],2:[function(require,module,exports){
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

                if (e.target.classList.contains('dialog-container') || e.target.classList.contains('dismiss') || e.target.classList.contains('dismiss-button')) {
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
            dismissButton.classList.add('dismiss-button');
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

},{}],3:[function(require,module,exports){
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

            // create two 'clear filter out' buttons for each one (one button for mobile screen, one for larger screens)
            [].concat(_toConsumableArray(filterContainers)).forEach(function (container) {

                /* mobile screens */

                // create clear out button
                var xsClearOutButton = document.createElement('div');
                xsClearOutButton.classList.add('filter-clear-xs');
                container.querySelector('.filter-label').appendChild(xsClearOutButton);

                // register mobile clear out button click event
                xsClearOutButton.addEventListener('click', function () {
                    Filter.clearOutFilters(container);
                });

                /* larger screens (from sm breakpoint) */

                // create clear out button
                var smClearOutButton = document.createElement('div');
                smClearOutButton.classList.add('filter-clear');
                container.appendChild(smClearOutButton);

                // register clear out button click event
                smClearOutButton.addEventListener('click', function () {
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

},{"./Utils":9}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./Utils":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pagination = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constantes = require('./Constantes');

var Constantes = _interopRequireWildcard(_Constantes);

var _ViewPort = require('./ViewPort');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
            this.isSmallPagination = _ViewPort.ViewPort.getWidth() === Constantes.XXS || _ViewPort.ViewPort.getWidth() === Constantes.XS;
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

                if (!this.isSmallPagination) {
                    items[3].classList.add('show'); // if active page is 1, the third item is displayed
                }
            }

            // disable 'next' button if active page is the last one
            if (activeItemIndex == items.length - 2) {
                nextItem.classList.add('disabled');

                if (!this.isSmallPagination) {
                    items[items.length - 4].classList.add('show');
                }
            }

            // first ellipsis check
            if (!this.isSmallPagination) {
                if (activeItemIndex >= 4) {
                    items[2].classList.add('ellipsis', 'show');
                }
            }

            // last ellipsis check
            if (!this.isSmallPagination) {
                if (activeItemIndex <= items.length - 5) {
                    items[items.length - 3].classList.add('ellipsis', 'show');
                }
            }

            // active item, previous and next ones
            if (!this.isSmallPagination) {
                items[activeItemIndex - 1].classList.add('show');
            }

            items[activeItemIndex].classList.add('show');

            if (!this.isSmallPagination) {
                items[activeItemIndex + 1].classList.add('show');
            }

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

},{"./Constantes":1,"./ViewPort":10}],7:[function(require,module,exports){
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

},{"./Notification":5,"./Pagination":6}],8:[function(require,module,exports){
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

},{"./Utils":9}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewPort = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constantes = require('./Constantes');

var Constantes = _interopRequireWildcard(_Constantes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewPort = exports.ViewPort = function () {
    function ViewPort() {
        _classCallCheck(this, ViewPort);
    }

    _createClass(ViewPort, null, [{
        key: 'init',
        value: function init() {
            this.injectViewPortUtils();
        }

        // inject custom DOM elements to get breakpoints info

    }, {
        key: 'injectViewPortUtils',
        value: function injectViewPortUtils() {
            var viewPortUtilsContainer = document.createElement('div');
            var xxsView = document.createElement('div');
            var xsView = document.createElement('div');
            var smView = document.createElement('div');
            var mdView = document.createElement('div');
            var lgView = document.createElement('div');
            var xlView = document.createElement('div');
            var xxlView = document.createElement('div');

            viewPortUtilsContainer.classList.add("view-port-utils");
            xxsView.classList.add(Constantes.XXS, "visible-xxs");
            xsView.classList.add(Constantes.XS, "visible-xs");
            smView.classList.add(Constantes.SM, "visible-sm");
            mdView.classList.add(Constantes.MD, "visible-md");
            lgView.classList.add(Constantes.LG, "visible-lg");
            xlView.classList.add(Constantes.XL, "visible-xl");
            xxlView.classList.add(Constantes.XXL, "visible-xxl");

            var viewPortUtilsDomElements = [xxsView, xsView, smView, mdView, lgView, xlView, xxlView];

            [].concat(viewPortUtilsDomElements).forEach(function (element) {
                viewPortUtilsContainer.appendChild(element);
            });

            document.body.appendChild(viewPortUtilsContainer);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            var viewPortUtilsDomElements = document.querySelector('.view-port-utils').children;
            var currentWidth = null;

            [].concat(_toConsumableArray(viewPortUtilsDomElements)).forEach(function (element) {
                var elementStyle = window.getComputedStyle(element).display;

                if ("block" == elementStyle) {
                    currentWidth = element.classList.item(0);
                }
            });

            return currentWidth;
        }
    }]);

    return ViewPort;
}();

},{"./Constantes":1}],11:[function(require,module,exports){
'use strict';

var _Form = require('./Form');

var _Pagination = require('./Pagination');

var _Notification = require('./Notification');

var _Tab = require('./Tab');

var _Dialog = require('./Dialog');

var _Filter = require('./Filter');

var _ViewPort = require('./ViewPort');

var _Styleguide = require('./Styleguide');

window.onload = function () {

    _ViewPort.ViewPort.init();
    _Form.Form.init();
    _Pagination.Pagination.init();
    _Notification.Notification.init();
    _Tab.Tab.init();
    _Dialog.Dialog.init();
    _Filter.Filter.init();

    // styleguide custom examples
    _Styleguide.Styleguide.init();

    // methods to reload on page resize
    window.onresize = function () {
        _Pagination.Pagination.init();
    };
};

// styleguide custom examples

},{"./Dialog":2,"./Filter":3,"./Form":4,"./Notification":5,"./Pagination":6,"./Styleguide":7,"./Tab":8,"./ViewPort":10}]},{},[11])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcQ29uc3RhbnRlcy5qcyIsInNyY1xcc2NyaXB0XFxEaWFsb2cuanMiLCJzcmNcXHNjcmlwdFxcRmlsdGVyLmpzIiwic3JjXFxzY3JpcHRcXEZvcm0uanMiLCJzcmNcXHNjcmlwdFxcTm90aWZpY2F0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFBhZ2luYXRpb24uanMiLCJzcmNcXHNjcmlwdFxcU3R5bGVndWlkZS5qcyIsInNyY1xcc2NyaXB0XFxUYWIuanMiLCJzcmNcXHNjcmlwdFxcVXRpbHMuanMiLCJzcmNcXHNjcmlwdFxcVmlld1BvcnQuanMiLCJzcmNcXHNjcmlwdFxcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSxvQkFBTSxLQUFaO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxvQkFBTSxLQUFaOzs7Ozs7Ozs7Ozs7Ozs7SUNOTSxNLFdBQUEsTTs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixnQkFBSSxvQkFBb0IsU0FBUyxnQkFBVCxDQUEwQixpQkFBMUIsQ0FBeEI7QUFDQSxnQkFBRyxRQUFRLGlCQUFYLEVBQThCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOztBQUU5Qyx5Q0FBSSxpQkFBSixHQUF1QixPQUF2QixDQUErQixVQUFTLE1BQVQsRUFBaUI7QUFDNUMsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4QywyQkFBTyxVQUFQLENBQWtCLEtBQUssT0FBTCxDQUFhLE1BQS9CO0FBQ0gsaUJBRkQ7QUFHSCxhQUpEO0FBS0g7OztnQ0FFYztBQUNYO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLGVBQUw7O0FBRUE7QUFDQSxpQkFB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UyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxRQUExRTtBQUNBLGdCQUFJLGVBQWUsSUFBbkI7O0FBR0EseUNBQUksd0JBQUosR0FBOEIsT0FBOUIsQ0FBc0MsVUFBUyxPQUFULEVBQWtCO0FBQ3BELG9CQUFJLGVBQWdCLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsT0FBckQ7O0FBRUEsb0JBQUcsV0FBVyxZQUFkLEVBQTRCO0FBQ3hCLG1DQUFlLFFBQVEsU0FBUixDQUFrQixJQUFsQixDQUF1QixDQUF2QixDQUFmO0FBQ0g7QUFDSixhQU5EOztBQVFBLG1CQUFPLFlBQVA7QUFDSDs7Ozs7Ozs7O0FDbkRMOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFXOztBQUV2Qix1QkFBUyxJQUFUO0FBQ0EsZUFBSyxJQUFMO0FBQ0EsMkJBQVcsSUFBWDtBQUNBLCtCQUFhLElBQWI7QUFDQSxhQUFJLElBQUo7QUFDQSxtQkFBTyxJQUFQO0FBQ0EsbUJBQU8sSUFBUDs7QUFFQTtBQUNBLDJCQUFXLElBQVg7O0FBRUE7QUFDQSxXQUFPLFFBQVAsR0FBa0IsWUFBVztBQUN6QiwrQkFBVyxJQUFYO0FBQ0gsS0FGRDtBQUdILENBakJEOztBQUhBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCBYWFMgPSBcInh4c1wiO1xyXG5leHBvcnQgY29uc3QgWFMgPSBcInhzXCI7XHJcbmV4cG9ydCBjb25zdCBTTSA9IFwic21cIjtcclxuZXhwb3J0IGNvbnN0IE1EID0gXCJtZFwiO1xyXG5leHBvcnQgY29uc3QgTEcgPSBcImxnXCI7XHJcbmV4cG9ydCBjb25zdCBYTCA9IFwieGxcIjtcclxuZXhwb3J0IGNvbnN0IFhYTCA9IFwieHhsXCI7XHJcbiIsImV4cG9ydCBjbGFzcyBEaWFsb2cge1xuXG4gICAgLy8gYnV0dG9uIGV2ZW50c1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgZGlhbG9nVGVzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlhbG9nLXRyaWdnZXInKTtcbiAgICAgICAgaWYobnVsbCA9PSBkaWFsb2dUZXN0QnV0dG9ucykgeyByZXR1cm4gZmFsc2U7fVxuXG4gICAgICAgIFsuLi5kaWFsb2dUZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLnNob3dEaWFsb2codGhpcy5kYXRhc2V0LnRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldHVwKCkge1xuICAgICAgICAvLyBjcmVhdGUgYmFja2Ryb3AgJiBjb250YWluZXJcbiAgICAgICAgdGhpcy5jcmVhdGVCYWNrZHJvcCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUNvbnRhaW5lcigpO1xuXG4gICAgICAgIC8vIGJlaGF2aW91ciBzZXR1cFxuICAgICAgICB0aGlzLmNvbnRhaW5lckV2ZW50cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVCYWNrZHJvcCgpIHtcbiAgICAgICAgdGhpcy5iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJhY2tkcm9wLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3BcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc05hbWUgPSBcImRpYWxvZy1jb250YWluZXJcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbmVyRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZigoZS50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygnZGlhbG9nLWNvbnRhaW5lcicpIHx8IChlLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNtaXNzJykgfHwgKGUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc21pc3MtYnV0dG9uJykpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmltYXRlIG91dFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2cuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcigpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGRpYWxvZyBmcm9tIERPTSBvbmNlIGl0cyBmYWRlb3V0IGFuaW1hdGlvbiBoYXMgZW5kZWRcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBEaWFsb2cuZGlhbG9nQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgNTAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dEaWFsb2coZGlhbG9nSWQpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRpYWxvZ0lkKS5jbG9uZU5vZGUodHJ1ZSk7IC8vIGRvZXNuJ3QgbWVzcyB3aXRoIHRoZSBvcmlnaW5hbCBlbGVtZW50XG4gICAgICAgIGlmKG51bGwgPT0gdGhpcy5kaWFsb2cpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAvLyBkaXNtaXNzIGJ1dHRvblxuICAgICAgICBsZXQgZGlzbWlzc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZGlzbWlzc0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdkaXNtaXNzLWJ1dHRvbicpO1xuICAgICAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZChkaXNtaXNzQnV0dG9uKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2Ryb3AgYW5kIGNvbnRhaW5lclxuICAgICAgICBEaWFsb2cuc2V0dXAoKTtcblxuICAgICAgICAvLyBhZGQgbmV3IGVsZW1lbnRzIG9uIERPTVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3ApO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5kaWFsb2dDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgaW5cbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgICAgICAgIH0sIDEwMFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzICBmcm9tICcuL1V0aWxzJztcblxuZXhwb3J0IGNsYXNzIEZpbHRlciB7XG5cbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDbGVhck91dEJ1dHRvbigpOyAvLyBlbGVtZW50IGNyZWF0aW9uIChhbmQgdGhlbiBldmVudCByZWdpc3RyYXRpb24pXG4gICAgICAgIHRoaXMucmVtb3ZlSXRlbU9uQ2xpY2soKTsgLy8gcmVnaXN0ZXIgZXZlbnRzXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDb250YWluZXJDaGlsZHJlbkNvdW50T2JzZXJ2ZXIoKTsgLy8gcmVnaXN0ZXIgYSAnY2hpbGQgcmVtb3ZlZCcgZXZlbnQgdG8gZGlzYWJsZSBjb250YWluZXIgaWYgbmVlZCBiZVxuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVDbGVhck91dEJ1dHRvbigpIHtcbiAgICAgICAgLy8gdGFyZ2V0IGV2ZXJ5IGZpbHRlciBibG9jayBvbiB0aGUgcGFnZVxuICAgICAgICBsZXQgZmlsdGVyQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXInKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGNyZWF0ZSB0d28gJ2NsZWFyIGZpbHRlciBvdXQnIGJ1dHRvbnMgZm9yIGVhY2ggb25lIChvbmUgYnV0dG9uIGZvciBtb2JpbGUgc2NyZWVuLCBvbmUgZm9yIGxhcmdlciBzY3JlZW5zKVxuICAgICAgICBbLi4uZmlsdGVyQ29udGFpbmVyc10uZm9yRWFjaChmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyogbW9iaWxlIHNjcmVlbnMgKi9cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY3JlYXRlIGNsZWFyIG91dCBidXR0b25cbiAgICAgICAgICAgIGxldCB4c0NsZWFyT3V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB4c0NsZWFyT3V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZpbHRlci1jbGVhci14cycpO1xuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXItbGFiZWwnKS5hcHBlbmRDaGlsZCh4c0NsZWFyT3V0QnV0dG9uKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgbW9iaWxlIGNsZWFyIG91dCBidXR0b24gY2xpY2sgZXZlbnRcbiAgICAgICAgICAgIHhzQ2xlYXJPdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBGaWx0ZXIuY2xlYXJPdXRGaWx0ZXJzKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogbGFyZ2VyIHNjcmVlbnMgKGZyb20gc20gYnJlYWtwb2ludCkgKi9cblxuICAgICAgICAgICAgLy8gY3JlYXRlIGNsZWFyIG91dCBidXR0b25cbiAgICAgICAgICAgIGxldCBzbUNsZWFyT3V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzbUNsZWFyT3V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZpbHRlci1jbGVhcicpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNtQ2xlYXJPdXRCdXR0b24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyByZWdpc3RlciBjbGVhciBvdXQgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAgICAgICAgICBzbUNsZWFyT3V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRmlsdGVyLmNsZWFyT3V0RmlsdGVycyhjb250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVJdGVtT25DbGljaygpIHtcbiAgICAgICAgVXRpbHMuY2xpY2tXYXRjaChbJ2ZpbHRlci1pdGVtJywgJ3RhZy1pdGVtJ10sIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBGaWx0ZXIucmVtb3ZlSXRlbUFjdGlvbihpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnZlcnRJdGVtKGl0ZW0pIHtcbiAgICAgICAgLy8gZ2V0IGZpbHRlciBwYXJlbnQgZm9yIG5ld1RhZyBkYXRhLXRhcmdldCBhdHRyaWJ1dGVcbiAgICAgICAgbGV0IGl0ZW1EYXRhVGFyZ2V0ID0gaXRlbS5wYXJlbnRFbGVtZW50LmlkO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhIHRhZyB3aXRoIGZpbHRlcidzIGRhdGFcbiAgICAgICAgbGV0IG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBuZXdJdGVtLmNsYXNzTmFtZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWx0ZXItaXRlbScpID8gJ3RhZy1pdGVtJyA6ICdmaWx0ZXItaXRlbSc7XG4gICAgICAgIG5ld0l0ZW0uaW5uZXJIVE1MID0gaXRlbS5pbm5lckhUTUw7XG4gICAgICAgIG5ld0l0ZW0uZGF0YXNldC50YXJnZXQgPSBgIyR7aXRlbURhdGFUYXJnZXR9YDtcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW07XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUl0ZW1BY3Rpb24oaXRlbSkge1xuICAgICAgICAvLyBzZWxlY3QgdGFyZ2V0ZWQgY29udGFpbmVyXG4gICAgICAgIGxldCBpdGVtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpdGVtLmRhdGFzZXQudGFyZ2V0KTtcblxuICAgICAgICBsZXQgbmV3SXRlbSA9IEZpbHRlci5jb252ZXJ0SXRlbShpdGVtKTtcbiAgICAgICAgaXRlbS5yZW1vdmUoKTtcblxuICAgICAgICAvLyBpbnNlcnQgbmV3bHkgY3JlYXRlZCB0YWcgaW50byBmaWx0ZXIgdGFncyBjb250YWluZXJcbiAgICAgICAgaXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdJdGVtKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJPdXRGaWx0ZXJzKGNvbnRhaW5lcikge1xuICAgICAgICAvLyBnZXQgZmlsdGVyIGl0ZW1zXG4gICAgICAgIGxldCBmaWx0ZXJJdGVtcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVyLWl0ZW0nKTtcbiAgICAgICAgWy4uLmZpbHRlckl0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGZpbHRlcikge1xuICAgICAgICAgICAgRmlsdGVyLnJlbW92ZUl0ZW1BY3Rpb24oZmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlZ2lzdGVyQ29udGFpbmVyQ2hpbGRyZW5Db3VudE9ic2VydmVyKCkge1xuICAgICAgICAvLyBvYnNlcnZlIGlmIGEgY2hpbGQgZWxlbWVudCBpcyByZW1vdmVkIGZyb20gYSBjb250YWluZXJcbiAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xuICAgICAgICAgICAgICAgIEZpbHRlci5jaGVja0ZpbHRlckNvbnRhaW5lckRpc2FibGVkKG11dGF0aW9uLnRhcmdldClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY29uZmlnID0geyBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IGZhbHNlLCBjaGFyYWN0ZXJEYXRhOiBmYWxzZSB9O1xuICAgICAgICBsZXQgZmlsdGVyTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVyLWxpc3QnKTtcbiAgICAgICAgWy4uLmZpbHRlckxpc3RzXS5mb3JFYWNoKGZ1bmN0aW9uKGZpbHRlckxpc3QpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZmlsdGVyTGlzdCwgY29uZmlnKTtcbiAgICAgICAgICAgIEZpbHRlci5jaGVja0ZpbHRlckNvbnRhaW5lckRpc2FibGVkKGZpbHRlckxpc3QpOyAvLyBwYWdlIGxvYWQgZmlyc3QgY2hlY2tcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNoZWNrRmlsdGVyQ29udGFpbmVyRGlzYWJsZWQoZmlsdGVyTGlzdCkge1xuICAgICAgICBsZXQgZmlsdGVyQ29udGFpbmVyID0gZmlsdGVyTGlzdC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGlmKGZpbHRlckxpc3QuY2hpbGRFbGVtZW50Q291bnQgPCAxKSB7XG4gICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbHRlckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBGb3JtIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZHJvcGRvd24oKSB7XG4gICAgICAgIGxldCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLXRyaWdnZXInKTtcbiAgICAgICAgWy4uLmRyb3Bkb3duVHJpZ2dlcnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1saXN0Jyk7XG4gICAgICAgICAgICBsZXQgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICgkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJcIikgPyBcImJsb2NrXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIjtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNsaWNrYWJsZSBgZGl2YCB0byBjbG9zZSB0aGUgZHJvcGRvd24gd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBkcm9wZG93biBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYoZHJvcGRvd25BY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjbGlja2FibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5jbGFzc05hbWUgPSBcImJhY2tkcm9wLWhpZGRlblwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kQ2hpbGQoJGNsaWNrYWJsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGNob2ljZSBldmVudFxuICAgICAgICAgICAgbGV0ICRhbmNob3JUYWdzID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gICAgICAgICAgICBbLi4uJGFuY2hvclRhZ3NdLmZvckVhY2goZnVuY3Rpb24oYW5jaG9yKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25PcHRpb24gPSBhbmNob3IudGV4dDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHByZXZpb3VzbHkgc2VsZWN0ZWQgbGlzdCBpdGVtIChyZW1vdmUgYWN0aXZlIGNsYXNzKVxuICAgICAgICAgICAgICAgICAgICBsZXQgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbSA9ICRkcm9wZG93bkxpc3QucXVlcnlTZWxlY3RvcignbGkuYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0IGNsaWNrZWQgbGlzdCBpdGVtIGJ5IGdpdmluZyBpdCBgYWN0aXZlYCBjbGFzcyBhbmQgY2hhbmdpbmcgYnV0dG9uIGxhYmVsIHRleHRcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBzZWxlY3Rpb25PcHRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgdGhlIGRyb3Bkb3duLWxpc3RcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIDogcmVtb3ZlIG9wZW5lZCBiYWNrZHJvcC1oaWRkZW5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL1V0aWxzJztcblxuY29uc3QgRkFERU9VVF9EVVJBVElPTiA9IDQgKiAxMDAwO1xuXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuICAgIC8vIGluaXRpYWxpemUgbm90aWZpY2F0aW9uIGJlaGF2aW91clxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLnNldHVwQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT25DbGlja0V2ZW50KCk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG9yIGNsZWFudXAgbm90aWZpY2F0aW9ucyBjb250YWluZXJcbiAgICBzdGF0aWMgc2V0dXBDb250YWluZXIoKSAge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcblxuICAgICAgICAvLyByZW1vdmUgZXZlbnR1YWwgZXhpc3RpbmcgY29udGFpbmVyIGVsZW1lbnQgdG8gc3RhcnQgY2xlYW5cbiAgICAgICAgaWYobnVsbCAhPSBjb250YWluZXIpIHsgY29udGFpbmVyLnJlbW92ZSgpOyB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuZCBhcHBlbmQgdGhlIG5vdGlmaWNhdGlvbiBjb250YWluZXIgYXMgYm9keSBmaXJzdCBlbGVtZW50XG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuaWQgPSAnbm90aWZpY2F0aW9uLWNvbnRhaW5lcic7XG4gICAgICAgIGxldCBmaXJzdFBhZ2VFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCBmaXJzdFBhZ2VFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBzZXQgbWVzc2FnZSB0ZXh0IGFuZCBub3RpZmljYXRpb24gdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IpXG4gICAgc3RhdGljIGNyZWF0ZShtZXNzYWdlLCB0eXBlLCBpc1N0aWNreSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90aWZpY2F0aW9uLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxldCBub3RpZmljYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoYG5vdGlmaWNhdGlvbi0ke3R5cGV9YCk7XG4gICAgICAgIGlmKGlzU3RpY2t5KSB7IG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdzdGljaycpOyB9IC8vIHN0aWNreSBub3RpZmljYXRpb25zIG1pZ2h0IGJlIHVzZWQgZm9yIGxvbmcgbWVzc2FnZXNcbiAgICAgICAgbm90aWZpY2F0aW9uLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgaW5cbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdpbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gZmFkZSBvdXQgbm90aWZpY2F0aW9uICh1bmxlc3MgaXQgaGFzICdzdGljaycgY2xhc3MpXG4gICAgICAgICAgICAgICAgaWYoISBub3RpZmljYXRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGljaycpKSB7IE5vdGlmaWNhdGlvbi5jbGVhbihub3RpZmljYXRpb24pOyB9XG4gICAgICAgICAgICB9LCAxMDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgb2xkIG5vdGlmaWNhdGlvbnNcbiAgICBzdGF0aWMgY2xlYW4obm90aWZpY2F0aW9uLCBkdXJhdGlvbiA9IEZBREVPVVRfRFVSQVRJT04pIHtcbiAgICAgICAgLy8gZmFkZW91dCBub3RpZmljYXRpb24gYWZ0ZXIgc3BlY2lmaWVkIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoZGVmYXVsdCA9IEZBREVPVVRfRFVSQVRJT04pXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uY2xlYXIobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAvLyByZW1vdmUgbm90aWZpY2F0aW9uIGZyb20gRE9NIG9uY2UgaXRzIGZhZGVvdXQgYW5pbWF0aW9uIGhhcyBlbmRlZCAoYWJvdXQgMXMgdG8gYmUgc3VyZSlcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDEwMDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgb24gJ2RvY3VtZW50JyBmb3Igbm90aWZpY2F0aW9ucyB0aGF0IHdpbGwgYmUgYWRkZWQgbGF0ZXIgb24gdGhlIERPTVxuICAgIHN0YXRpYyByZW1vdmVPbkNsaWNrRXZlbnQoKSB7XG4gICAgICAgIC8vIG5vdGlmaWNhdGlvbnMgYXJlIHJlbW92ZWQgd2hlbiBjbGlja2VkIG9uXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlcyA9IFsnbm90aWZpY2F0aW9uLXN1Y2Nlc3MnLCAnbm90aWZpY2F0aW9uLWluZm8nLCAnbm90aWZpY2F0aW9uLXdhcm5pbmcnLCAnbm90aWZpY2F0aW9uLWVycm9yJ107XG5cbiAgICAgICAgVXRpbHMuY2xpY2tXYXRjaChub3RpZmljYXRpb25UeXBlcywgZnVuY3Rpb24obm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uLCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyXG4gICAgc3RhdGljIGdldCBmYWRlb3V0RHVyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBGQURFT1VUX0RVUkFUSU9OO1xuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBDb25zdGFudGVzIGZyb20gJy4vQ29uc3RhbnRlcyc7XG5pbXBvcnQgeyBWaWV3UG9ydCB9IGZyb20gJy4vVmlld1BvcnQnO1xuXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbiB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmlzU21hbGxQYWdpbmF0aW9uID0gKFZpZXdQb3J0LmdldFdpZHRoKCkgPT09IENvbnN0YW50ZXMuWFhTKSB8fCAoVmlld1BvcnQuZ2V0V2lkdGgoKSA9PT0gQ29uc3RhbnRlcy5YUyk7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYWdpbmF0aW9uKCkge1xuICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnByZXYnKTtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICAgICAgICBsZXQgYWN0aXZlSXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gc2V0IC8gcmVzZXQgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbGxpcHNpcycpKSB7IGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQgPSBgJHtpfWA7IH1cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJywgJ3Nob3cnLCAnZWxsaXBzaXMnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5wYWdlID0gaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KGFjdGl2ZUl0ZW0uZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAvKiBhZGQgYXBwcm9wcmlhdGUgY2xhc3NlczogKi9cblxuICAgICAgICAvLyBkaXNhYmxlICdwcmV2JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgcHJldkl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgaWYoISB0aGlzLmlzU21hbGxQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNbM10uY2xhc3NMaXN0LmFkZCgnc2hvdycpOyAvLyBpZiBhY3RpdmUgcGFnZSBpcyAxLCB0aGUgdGhpcmQgaXRlbSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc2FibGUgJ25leHQnIGJ1dHRvbiBpZiBhY3RpdmUgcGFnZSBpcyB0aGUgbGFzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IChpdGVtcy5sZW5ndGggLSAyKSkge1xuICAgICAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgaWYoISB0aGlzLmlzU21hbGxQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDQpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZighIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA+PSA0KSB7IGl0ZW1zWzJdLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbGFzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZighIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA8PSAoaXRlbXMubGVuZ3RoIC0gNSkpIHsgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDMpXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2ZSBpdGVtLCBwcmV2aW91cyBhbmQgbmV4dCBvbmVzXG4gICAgICAgIGlmKCEgdGhpcy5pc1NtYWxsUGFnaW5hdGlvbikge1xuICAgICAgICAgICAgaXRlbXNbKGFjdGl2ZUl0ZW1JbmRleCAtIDEpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICBpZighIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggKyAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldiwgbmV4dCwgZmlyc3QgYW5kIGxhc3QgcGFnZXMgYXJlIGRpc3BsYXllZCBhcyB3ZWxsXG4gICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIGl0ZW1zWzFdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDIpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gaGlkZSBldmVyeSBvdGhlciBpdGVtc1xuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgIGlmKCEgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlcGxhY2UgJ2VsbGlwc2lzJyBjbGFzcyBsaXN0IGl0ZW0gY29udGVudCB3aXRoIDMgZG90c1xuICAgICAgICBsZXQgZWxsaXBzaXNJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLmVsbGlwc2lzJyk7XG4gICAgICAgIFsuLi5lbGxpcHNpc0l0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS50ZXh0Q29udGVudCA9IFwiLi4uXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Ob3RpZmljYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgU3R5bGVndWlkZSB7XG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIFN0eWxlZ3VpZGUuaW5wdXRGZWVkYmFjaygpO1xuICAgICAgICBTdHlsZWd1aWRlLnBhZ2luYXRpb24oKTtcbiAgICAgICAgU3R5bGVndWlkZS5ub3RpZmljYXRpb24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5wdXRGZWVkYmFjaygpIHtcbiAgICAgICAgbGV0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LXRlc3QgLmlucHV0LWdyb3VwJyk7XG4gICAgICAgIGxldCB0ZXN0QnV0dG9uc0dyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnB1dC1idXR0b25zJyk7XG4gICAgICAgIGxldCB0ZXN0QnV0dG9ucyA9IHRlc3RCdXR0b25zR3JvdXAucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cbiAgICAgICAgLy8gaW5zZXJ0IGFuIGVtcHR5IHNwYW4gYXMgaGVpZ2h0IHBsYWNlaG9sZGVyXG4gICAgICAgIGNyZWF0ZVBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgWy4uLnRlc3RCdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1RleHQgPSB0aGlzLmRhdGFzZXQudGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uID0gdGhpcy5kYXRhc2V0LmFjdGlvbjtcblxuICAgICAgICAgICAgICAgIHN3aXRjaChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRpc2FibGVkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGlzYWJsZShidXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc2FibGVkID0gIWlucHV0LmRpc2FibGVkO1xuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRW5hYmxlIGlucHV0XCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXNldCBzdGF0ZVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZUJ1dHRvbiA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmJ0bi1ncmV5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwb3RlbnRpYWxseSBkaXNhYmxlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgaW5wdXRcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3RhdGVzIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZlZWRiYWNrIHN0YXRlIGlmIGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpID8gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKS5yZW1vdmUoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjcmVhdGUgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVQbGFjZWhvbGRlcigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBpbnB1dCBzdGF0ZSBmZWVkYmFja1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHN0YXRlKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbiB1cCBpbiBjYXNlIHRoZSBpbnB1dCBoYXMgYmVlbiBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGNsYXNzIHRvIGlucHV0LWdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cCBcIiArIGFjdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBmZWVkYmFjayBzcGFuIG9yIGNyZWF0ZSBvbmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrU3BhbiA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCEgZmVlZGJhY2tTcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4uY2xhc3NOYW1lID0gXCJmZWVkYmFja1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLnRleHRDb250ZW50ID0gZmVlZGJhY2tUZXh0O1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJsb2NrJykuYXBwZW5kQ2hpbGQoZmVlZGJhY2tTcGFuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5pbm5lckhUTUwgPSBcIiZuYnNwO1wiO1xuICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIHRlc3RCdXR0b25zR3JvdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmRhdGFzZXQucGFnZSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gb2xkIGFjdGl2ZSBpdGVtXG4gICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIC8vIHByZXYgJiBuZXh0IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXYnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggKyAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RlZCBuZXcgYWN0aXZlIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZWxhdW5jaCBmdW5jdGlvbiBmb3IgZGVtbyBwdXJwb3NlXG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmaWNhdGlvbigpIHtcblxuICAgICAgICAvLyBzdGFuZGFyZCBidXR0b25zIChub24tc3RpY2t5IG5vdGlmaWNhdGlvbnMpXG4gICAgICAgIGxldCBzdGFuZGFyZE5vdGlmaWNhdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm90aWZpY2F0aW9ucy10ZXN0LWJ1dHRvbnMgYnV0dG9uJyk7XG5cbiAgICAgICAgWy4uLnN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dDtcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlID0gYnV0dG9uLmRhdGFzZXQudHlwZTtcbiAgICAgICAgICAgIGxldCBpc1N0aWNreSA9IGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3N0aWNreScpXG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jcmVhdGUobm90aWZpY2F0aW9uVGV4dCwgbm90aWZpY2F0aW9uVHlwZSwgaXNTdGlja3kpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL1V0aWxzJztcclxuXHJcbmxldCB2aXNpYmxlVGFiQ29udGVudElkcztcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWIge1xyXG5cclxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0YWIoKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIGFjdGl2ZSB0YWIocylcclxuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKTtcclxuXHJcbiAgICAgICAgLy8gaGlkZSBub24gYWN0aXZlIGNvbnRlbnQgYXQgcGFnZSBzdGFydCB1cCAoc2hvdyBzdGlsbCBkaXNwbGF5IGFjdGl2ZSBjb250ZW50KVxyXG4gICAgICAgIHRoaXMuaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgLy8gbWVudSBiZWhhdmlvdXJcclxuICAgICAgICBsZXQgdGFiTWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSBhJyk7XHJcbiAgICAgICAgWy4uLnRhYk1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XHJcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGdldCBsaW5rIG93bmluZyB0YWJcclxuICAgICAgICAgICAgICAgIGxldCB0YWJzID0gVXRpbHMuY2xvc2VzdChsaW5rLCAndGFicycpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY3VycmVudCBhY3RpdmUgY29udGVudFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZU1lbnVUYWIgPSB0YWJzLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGlmKG51bGwgIT0gYWN0aXZlTWVudVRhYikgeyBhY3RpdmVNZW51VGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWRkICdhY3RpdmUnIGNsYXNzIHRvIGxpbmsgcGFyZW50XHJcbiAgICAgICAgICAgICAgICBsaW5rLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYW5kIGZpbmFsbHkgdXBkYXRlIERPTVxyXG4gICAgICAgICAgICAgICAgVGFiLnVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKTtcclxuICAgICAgICAgICAgICAgIFRhYi5oaWRlTm9uQWN0aXZlQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlQWN0aXZlQ29udGVudElkcygpIHtcclxuICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcyA9IG5ldyBTZXQoKTsgLy8gc3RhcnQgY2xlYW5cclxuICAgICAgICBsZXQgYWN0aXZlVGFiTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicy1tZW51IC5hY3RpdmUnKTtcclxuICAgICAgICBbLi4uYWN0aXZlVGFiTWVudXNdLmZvckVhY2goZnVuY3Rpb24odGFiTWVudSkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0SWQgPSB0YWJNZW51LmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNsaWNlKDEpOyAvLyByZW1vdmUgdGhlICMgc3ltYm9sXHJcbiAgICAgICAgICAgIHZpc2libGVUYWJDb250ZW50SWRzLmFkZCh0YXJnZXRJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGVOb25BY3RpdmVDb250ZW50KCkge1xyXG4gICAgICAgIGxldCB0YWJDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzIC50YWJzLWNvbnRlbnQnKTtcclxuICAgICAgICBbLi4udGFiQ29udGVudHNdLmZvckVhY2goZnVuY3Rpb24oY29udGVudEJsb2NrKSB7XHJcbiAgICAgICAgICAgIFsuLi5jb250ZW50QmxvY2suY2hpbGRyZW5dLmZvckVhY2goZnVuY3Rpb24oY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgY2xlYW4gYnkgcmVtb3ZpbmcgJ2hpZGRlbicgY2xhc3NcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSBjb250ZW50cyB0aGF0IGFyZSBub3QgaW4gYW4gYWN0aXZlIHN0YXRlIHRhYlxyXG4gICAgICAgICAgICAgICAgaWYoISB2aXNpYmxlVGFiQ29udGVudElkcy5oYXMoY29udGVudC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGxldCBwYXJlbnQ7XG5cbiAgICB3aGlsZShlbGVtZW50KSB7XG4gICAgICAgIHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYocGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7IHJldHVybiBwYXJlbnQ7IH1cbiAgICAgICAgZWxlbWVudCA9IHBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gYWxsb3dzIGVsZW1lbnRzIHdpdGggYSBzcGVjaWZpYyBjbGFzcyB0byBiZSBjbGlja2FibGUgZXZlbiBpZiB0aGV5IGFyZSBub3Qgb24gdGhlIERPTSB3aGVuIHRoaXMgbWV0aG9kIGlzIGNhbGxlZFxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrV2F0Y2godGFyZ2V0ZWRFbGVtZW50Q2xhc3NlcywgY2FsbGJhY2spIHtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIFsuLi50YXJnZXRlZEVsZW1lbnRDbGFzc2VzXS5mb3JFYWNoKGZ1bmN0aW9uKGNsYXNzSXRlbSkge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzSXRlbSkpIHsgY2FsbGJhY2soZS50YXJnZXQpIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59IiwiaW1wb3J0ICogYXMgQ29uc3RhbnRlcyBmcm9tICcuL0NvbnN0YW50ZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdQb3J0IHtcclxuXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluamVjdFZpZXdQb3J0VXRpbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbmplY3QgY3VzdG9tIERPTSBlbGVtZW50cyB0byBnZXQgYnJlYWtwb2ludHMgaW5mb1xyXG4gICAgc3RhdGljIGluamVjdFZpZXdQb3J0VXRpbHMoKSB7XHJcbiAgICAgICAgbGV0IHZpZXdQb3J0VXRpbHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgeHhzVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCB4c1ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgc21WaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGV0IG1kVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBsZ1ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgeGxWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGV0IHh4bFZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgdmlld1BvcnRVdGlsc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidmlldy1wb3J0LXV0aWxzXCIpO1xyXG4gICAgICAgIHh4c1ZpZXcuY2xhc3NMaXN0LmFkZChDb25zdGFudGVzLlhYUywgXCJ2aXNpYmxlLXh4c1wiKTtcclxuICAgICAgICB4c1ZpZXcuY2xhc3NMaXN0LmFkZChDb25zdGFudGVzLlhTLCBcInZpc2libGUteHNcIik7XHJcbiAgICAgICAgc21WaWV3LmNsYXNzTGlzdC5hZGQoQ29uc3RhbnRlcy5TTSwgXCJ2aXNpYmxlLXNtXCIpO1xyXG4gICAgICAgIG1kVmlldy5jbGFzc0xpc3QuYWRkKENvbnN0YW50ZXMuTUQsIFwidmlzaWJsZS1tZFwiKTtcclxuICAgICAgICBsZ1ZpZXcuY2xhc3NMaXN0LmFkZChDb25zdGFudGVzLkxHLCBcInZpc2libGUtbGdcIik7XHJcbiAgICAgICAgeGxWaWV3LmNsYXNzTGlzdC5hZGQoQ29uc3RhbnRlcy5YTCwgXCJ2aXNpYmxlLXhsXCIpO1xyXG4gICAgICAgIHh4bFZpZXcuY2xhc3NMaXN0LmFkZChDb25zdGFudGVzLlhYTCwgXCJ2aXNpYmxlLXh4bFwiKTtcclxuXHJcbiAgICAgICAgbGV0IHZpZXdQb3J0VXRpbHNEb21FbGVtZW50cyA9IFt4eHNWaWV3LCB4c1ZpZXcsIHNtVmlldywgbWRWaWV3LCBsZ1ZpZXcsIHhsVmlldywgeHhsVmlld107XHJcblxyXG4gICAgICAgIFsuLi52aWV3UG9ydFV0aWxzRG9tRWxlbWVudHNdLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2aWV3UG9ydFV0aWxzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdQb3J0VXRpbHNDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRXaWR0aCgpIHtcclxuICAgICAgICBsZXQgdmlld1BvcnRVdGlsc0RvbUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZXctcG9ydC11dGlscycpLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBjdXJyZW50V2lkdGggPSBudWxsO1xyXG5cclxuXHJcbiAgICAgICAgWy4uLnZpZXdQb3J0VXRpbHNEb21FbGVtZW50c10uZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50U3R5bGUgPSAod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZGlzcGxheSk7XHJcblxyXG4gICAgICAgICAgICBpZihcImJsb2NrXCIgPT0gZWxlbWVudFN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50V2lkdGggPSBlbGVtZW50LmNsYXNzTGlzdC5pdGVtKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50V2lkdGg7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi9UYWInO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi9EaWFsb2cnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi9GaWx0ZXInO1xuaW1wb3J0IHsgVmlld1BvcnQgfSBmcm9tICcuL1ZpZXdQb3J0JztcblxuLy8gc3R5bGVndWlkZSBjdXN0b20gZXhhbXBsZXNcbmltcG9ydCB7IFN0eWxlZ3VpZGUgfSBmcm9tICcuL1N0eWxlZ3VpZGUnO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBWaWV3UG9ydC5pbml0KCk7XG4gICAgRm9ybS5pbml0KCk7XG4gICAgUGFnaW5hdGlvbi5pbml0KCk7XG4gICAgTm90aWZpY2F0aW9uLmluaXQoKTtcbiAgICBUYWIuaW5pdCgpO1xuICAgIERpYWxvZy5pbml0KCk7XG4gICAgRmlsdGVyLmluaXQoKTtcblxuICAgIC8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG4gICAgU3R5bGVndWlkZS5pbml0KCk7XG5cbiAgICAvLyBtZXRob2RzIHRvIHJlbG9hZCBvbiBwYWdlIHJlc2l6ZVxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBQYWdpbmF0aW9uLmluaXQoKTtcbiAgICB9O1xufTsiXX0=
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

            // check if page contains a pagination element before moving forward
            if (null === pagination) {
                return false;
            };

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcQ29uc3RhbnRlcy5qcyIsInNyY1xcc2NyaXB0XFxEaWFsb2cuanMiLCJzcmNcXHNjcmlwdFxcRmlsdGVyLmpzIiwic3JjXFxzY3JpcHRcXEZvcm0uanMiLCJzcmNcXHNjcmlwdFxcTm90aWZpY2F0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFBhZ2luYXRpb24uanMiLCJzcmNcXHNjcmlwdFxcU3R5bGVndWlkZS5qcyIsInNyY1xcc2NyaXB0XFxUYWIuanMiLCJzcmNcXHNjcmlwdFxcVXRpbHMuanMiLCJzcmNcXHNjcmlwdFxcVmlld1BvcnQuanMiLCJzcmNcXHNjcmlwdFxcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSxvQkFBTSxLQUFaO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxrQkFBSyxJQUFYO0FBQ0EsSUFBTSxvQkFBTSxLQUFaOzs7Ozs7Ozs7Ozs7Ozs7SUNOTSxNLFdBQUEsTTs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixnQkFBSSxvQkFBb0IsU0FBUyxnQkFBVCxDQUEwQixpQkFBMUIsQ0FBeEI7QUFDQSxnQkFBRyxRQUFRLGlCQUFYLEVBQThCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOztBQUU5Qyx5Q0FBSSxpQkFBSixHQUF1QixPQUF2QixDQUErQixVQUFTLE1BQVQsRUFBaUI7QUFDNUMsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4QywyQkFBTyxVQUFQLENBQWtCLEtBQUssT0FBTCxDQUFhLE1BQS9CO0FBQ0gsaUJBRkQ7QUFHSCxhQUpEO0FBS0g7OztnQ0FFYztBQUNYO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLGVBQUw7O0FBRUE7QUFDQSxpQkFB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QWMsV0FBZCxDQUEwQixzQkFBMUI7QUFDSDs7O21DQUVpQjtBQUNkLGdCQUFJLDJCQUEyQixTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFFBQTFFO0FBQ0EsZ0JBQUksZUFBZSxJQUFuQjs7QUFHQSx5Q0FBSSx3QkFBSixHQUE4QixPQUE5QixDQUFzQyxVQUFTLE9BQVQsRUFBa0I7QUFDcEQsb0JBQUksZUFBZ0IsT0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxPQUFyRDs7QUFFQSxvQkFBRyxXQUFXLFlBQWQsRUFBNEI7QUFDeEIsbUNBQWUsUUFBUSxTQUFSLENBQWtCLElBQWxCLENBQXVCLENBQXZCLENBQWY7QUFDSDtBQUNKLGFBTkQ7O0FBUUEsbUJBQU8sWUFBUDtBQUNIOzs7Ozs7Ozs7QUNuREw7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBRUEsT0FBTyxNQUFQLEdBQWdCLFlBQVc7O0FBRXZCLHVCQUFTLElBQVQ7QUFDQSxlQUFLLElBQUw7QUFDQSwyQkFBVyxJQUFYO0FBQ0EsK0JBQWEsSUFBYjtBQUNBLGFBQUksSUFBSjtBQUNBLG1CQUFPLElBQVA7QUFDQSxtQkFBTyxJQUFQOztBQUVBO0FBQ0EsMkJBQVcsSUFBWDs7QUFFQTtBQUNBLFdBQU8sUUFBUCxHQUFrQixZQUFXO0FBQ3pCLCtCQUFXLElBQVg7QUFDSCxLQUZEO0FBR0gsQ0FqQkQ7O0FBSEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IFhYUyA9IFwieHhzXCI7XHJcbmV4cG9ydCBjb25zdCBYUyA9IFwieHNcIjtcclxuZXhwb3J0IGNvbnN0IFNNID0gXCJzbVwiO1xyXG5leHBvcnQgY29uc3QgTUQgPSBcIm1kXCI7XHJcbmV4cG9ydCBjb25zdCBMRyA9IFwibGdcIjtcclxuZXhwb3J0IGNvbnN0IFhMID0gXCJ4bFwiO1xyXG5leHBvcnQgY29uc3QgWFhMID0gXCJ4eGxcIjtcclxuIiwiZXhwb3J0IGNsYXNzIERpYWxvZyB7XG5cbiAgICAvLyBidXR0b24gZXZlbnRzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIGxldCBkaWFsb2dUZXN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWFsb2ctdHJpZ2dlcicpO1xuICAgICAgICBpZihudWxsID09IGRpYWxvZ1Rlc3RCdXR0b25zKSB7IHJldHVybiBmYWxzZTt9XG5cbiAgICAgICAgWy4uLmRpYWxvZ1Rlc3RCdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBEaWFsb2cuc2hvd0RpYWxvZyh0aGlzLmRhdGFzZXQudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0dXAoKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZHJvcCAmIGNvbnRhaW5lclxuICAgICAgICB0aGlzLmNyZWF0ZUJhY2tkcm9wKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29udGFpbmVyKCk7XG5cbiAgICAgICAgLy8gYmVoYXZpb3VyIHNldHVwXG4gICAgICAgIHRoaXMuY29udGFpbmVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUJhY2tkcm9wKCkge1xuICAgICAgICB0aGlzLmJhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYmFja2Ryb3AuY2xhc3NOYW1lID0gXCJiYWNrZHJvcFwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZGlhbG9nLWNvbnRhaW5lclwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluZXJFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKChlLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaWFsb2ctY29udGFpbmVyJykgfHwgKGUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc21pc3MnKSB8fCAoZS50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygnZGlzbWlzcy1idXR0b24nKSkge1xuICAgICAgICAgICAgICAgIC8vIGFuaW1hdGUgb3V0XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyKCkge1xuICAgICAgICAvLyByZW1vdmUgZGlhbG9nIGZyb20gRE9NIG9uY2UgaXRzIGZhZGVvdXQgYW5pbWF0aW9uIGhhcyBlbmRlZFxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2dDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCA1MDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd0RpYWxvZyhkaWFsb2dJZCkge1xuICAgICAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGlhbG9nSWQpLmNsb25lTm9kZSh0cnVlKTsgLy8gZG9lc24ndCBtZXNzIHdpdGggdGhlIG9yaWdpbmFsIGVsZW1lbnRcbiAgICAgICAgaWYobnVsbCA9PSB0aGlzLmRpYWxvZykgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIC8vIGRpc21pc3MgYnV0dG9uXG4gICAgICAgIGxldCBkaXNtaXNzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBkaXNtaXNzQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rpc21pc3MtYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKGRpc21pc3NCdXR0b24pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZHJvcCBhbmQgY29udGFpbmVyXG4gICAgICAgIERpYWxvZy5zZXR1cCgpO1xuXG4gICAgICAgIC8vIGFkZCBuZXcgZWxlbWVudHMgb24gRE9NXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2dDb250YWluZXIpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgLy8gYW5pbWF0ZSBpblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgIGZyb20gJy4vVXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUNsZWFyT3V0QnV0dG9uKCk7IC8vIGVsZW1lbnQgY3JlYXRpb24gKGFuZCB0aGVuIGV2ZW50IHJlZ2lzdHJhdGlvbilcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtT25DbGljaygpOyAvLyByZWdpc3RlciBldmVudHNcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbnRhaW5lckNoaWxkcmVuQ291bnRPYnNlcnZlcigpOyAvLyByZWdpc3RlciBhICdjaGlsZCByZW1vdmVkJyBldmVudCB0byBkaXNhYmxlIGNvbnRhaW5lciBpZiBuZWVkIGJlXG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUNsZWFyT3V0QnV0dG9uKCkge1xuICAgICAgICAvLyB0YXJnZXQgZXZlcnkgZmlsdGVyIGJsb2NrIG9uIHRoZSBwYWdlXG4gICAgICAgIGxldCBmaWx0ZXJDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcicpO1xuICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIHR3byAnY2xlYXIgZmlsdGVyIG91dCcgYnV0dG9ucyBmb3IgZWFjaCBvbmUgKG9uZSBidXR0b24gZm9yIG1vYmlsZSBzY3JlZW4sIG9uZSBmb3IgbGFyZ2VyIHNjcmVlbnMpXG4gICAgICAgIFsuLi5maWx0ZXJDb250YWluZXJzXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKiBtb2JpbGUgc2NyZWVucyAqL1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjcmVhdGUgY2xlYXIgb3V0IGJ1dHRvblxuICAgICAgICAgICAgbGV0IHhzQ2xlYXJPdXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHhzQ2xlYXJPdXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmlsdGVyLWNsZWFyLXhzJyk7XG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmZpbHRlci1sYWJlbCcpLmFwcGVuZENoaWxkKHhzQ2xlYXJPdXRCdXR0b24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyByZWdpc3RlciBtb2JpbGUgY2xlYXIgb3V0IGJ1dHRvbiBjbGljayBldmVudFxuICAgICAgICAgICAgeHNDbGVhck91dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEZpbHRlci5jbGVhck91dEZpbHRlcnMoY29udGFpbmVyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBsYXJnZXIgc2NyZWVucyAoZnJvbSBzbSBicmVha3BvaW50KSAqL1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgY2xlYXIgb3V0IGJ1dHRvblxuICAgICAgICAgICAgbGV0IHNtQ2xlYXJPdXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNtQ2xlYXJPdXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmlsdGVyLWNsZWFyJyk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc21DbGVhck91dEJ1dHRvbik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGNsZWFyIG91dCBidXR0b24gY2xpY2sgZXZlbnRcbiAgICAgICAgICAgIHNtQ2xlYXJPdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBGaWx0ZXIuY2xlYXJPdXRGaWx0ZXJzKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUl0ZW1PbkNsaWNrKCkge1xuICAgICAgICBVdGlscy5jbGlja1dhdGNoKFsnZmlsdGVyLWl0ZW0nLCAndGFnLWl0ZW0nXSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIEZpbHRlci5yZW1vdmVJdGVtQWN0aW9uKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udmVydEl0ZW0oaXRlbSkge1xuICAgICAgICAvLyBnZXQgZmlsdGVyIHBhcmVudCBmb3IgbmV3VGFnIGRhdGEtdGFyZ2V0IGF0dHJpYnV0ZVxuICAgICAgICBsZXQgaXRlbURhdGFUYXJnZXQgPSBpdGVtLnBhcmVudEVsZW1lbnQuaWQ7XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgdGFnIHdpdGggZmlsdGVyJ3MgZGF0YVxuICAgICAgICBsZXQgbmV3SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIG5ld0l0ZW0uY2xhc3NOYW1lID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbHRlci1pdGVtJykgPyAndGFnLWl0ZW0nIDogJ2ZpbHRlci1pdGVtJztcbiAgICAgICAgbmV3SXRlbS5pbm5lckhUTUwgPSBpdGVtLmlubmVySFRNTDtcbiAgICAgICAgbmV3SXRlbS5kYXRhc2V0LnRhcmdldCA9IGAjJHtpdGVtRGF0YVRhcmdldH1gO1xuICAgICAgICByZXR1cm4gbmV3SXRlbTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlSXRlbUFjdGlvbihpdGVtKSB7XG4gICAgICAgIC8vIHNlbGVjdCB0YXJnZXRlZCBjb250YWluZXJcbiAgICAgICAgbGV0IGl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW0uZGF0YXNldC50YXJnZXQpO1xuXG4gICAgICAgIGxldCBuZXdJdGVtID0gRmlsdGVyLmNvbnZlcnRJdGVtKGl0ZW0pO1xuICAgICAgICBpdGVtLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIGluc2VydCBuZXdseSBjcmVhdGVkIHRhZyBpbnRvIGZpbHRlciB0YWdzIGNvbnRhaW5lclxuICAgICAgICBpdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhck91dEZpbHRlcnMoY29udGFpbmVyKSB7XG4gICAgICAgIC8vIGdldCBmaWx0ZXIgaXRlbXNcbiAgICAgICAgbGV0IGZpbHRlckl0ZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItaXRlbScpO1xuICAgICAgICBbLi4uZmlsdGVySXRlbXNdLmZvckVhY2goZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgICAgICAgICBGaWx0ZXIucmVtb3ZlSXRlbUFjdGlvbihmaWx0ZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVnaXN0ZXJDb250YWluZXJDaGlsZHJlbkNvdW50T2JzZXJ2ZXIoKSB7XG4gICAgICAgIC8vIG9ic2VydmUgaWYgYSBjaGlsZCBlbGVtZW50IGlzIHJlbW92ZWQgZnJvbSBhIGNvbnRhaW5lclxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgRmlsdGVyLmNoZWNrRmlsdGVyQ29udGFpbmVyRGlzYWJsZWQobXV0YXRpb24udGFyZ2V0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb25maWcgPSB7IGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogZmFsc2UsIGNoYXJhY3RlckRhdGE6IGZhbHNlIH07XG4gICAgICAgIGxldCBmaWx0ZXJMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItbGlzdCcpO1xuICAgICAgICBbLi4uZmlsdGVyTGlzdHNdLmZvckVhY2goZnVuY3Rpb24oZmlsdGVyTGlzdCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShmaWx0ZXJMaXN0LCBjb25maWcpO1xuICAgICAgICAgICAgRmlsdGVyLmNoZWNrRmlsdGVyQ29udGFpbmVyRGlzYWJsZWQoZmlsdGVyTGlzdCk7IC8vIHBhZ2UgbG9hZCBmaXJzdCBjaGVja1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hlY2tGaWx0ZXJDb250YWluZXJEaXNhYmxlZChmaWx0ZXJMaXN0KSB7XG4gICAgICAgIGxldCBmaWx0ZXJDb250YWluZXIgPSBmaWx0ZXJMaXN0LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYoZmlsdGVyTGlzdC5jaGlsZEVsZW1lbnRDb3VudCA8IDEpIHtcbiAgICAgICAgICAgIGZpbHRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEZvcm0ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkcm9wZG93bigpIHtcbiAgICAgICAgbGV0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24tdHJpZ2dlcicpO1xuICAgICAgICBbLi4uZHJvcGRvd25UcmlnZ2Vyc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWxpc3QnKTtcbiAgICAgICAgICAgIGxldCBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gKCRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcIlwiKSA/IFwiYmxvY2tcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJibG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgY2xpY2thYmxlIGBkaXZgIHRvIGNsb3NlIHRoZSBkcm9wZG93biB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGRyb3Bkb3duIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBpZihkcm9wZG93bkFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJGNsaWNrYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3AtaGlkZGVuXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmRDaGlsZCgkY2xpY2thYmxlKTtcblxuICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2hvaWNlIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGFuY2hvclRhZ3MgPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgICAgIFsuLi4kYW5jaG9yVGFnc10uZm9yRWFjaChmdW5jdGlvbihhbmNob3IpIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk9wdGlvbiA9IGFuY2hvci50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcHJldmlvdXNseSBzZWxlY3RlZCBsaXN0IGl0ZW0gKHJlbW92ZSBhY3RpdmUgY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3VycmVudEFjdGl2ZUxpc3RJdGVtID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yKCdsaS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3QgY2xpY2tlZCBsaXN0IGl0ZW0gYnkgZ2l2aW5nIGl0IGBhY3RpdmVgIGNsYXNzIGFuZCBjaGFuZ2luZyBidXR0b24gbGFiZWwgdGV4dFxuICAgICAgICAgICAgICAgICAgICBhbmNob3IucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHNlbGVjdGlvbk9wdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgZHJvcGRvd24tbGlzdFxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgOiByZW1vdmUgb3BlbmVkIGJhY2tkcm9wLWhpZGRlblxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG5jb25zdCBGQURFT1VUX0RVUkFUSU9OID0gNCAqIDEwMDA7XG5cbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb24ge1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBub3RpZmljYXRpb24gYmVoYXZpb3VyXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVPbkNsaWNrRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgb3IgY2xlYW51cCBub3RpZmljYXRpb25zIGNvbnRhaW5lclxuICAgIHN0YXRpYyBzZXR1cENvbnRhaW5lcigpICB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90aWZpY2F0aW9uLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBldmVudHVhbCBleGlzdGluZyBjb250YWluZXIgZWxlbWVudCB0byBzdGFydCBjbGVhblxuICAgICAgICBpZihudWxsICE9IGNvbnRhaW5lcikgeyBjb250YWluZXIucmVtb3ZlKCk7IH1cblxuICAgICAgICAvLyBjcmVhdGUgYW5kIGFwcGVuZCB0aGUgbm90aWZpY2F0aW9uIGNvbnRhaW5lciBhcyBib2R5IGZpcnN0IGVsZW1lbnRcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5pZCA9ICdub3RpZmljYXRpb24tY29udGFpbmVyJztcbiAgICAgICAgbGV0IGZpcnN0UGFnZUVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShjb250YWluZXIsIGZpcnN0UGFnZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIHNldCBtZXNzYWdlIHRleHQgYW5kIG5vdGlmaWNhdGlvbiB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvcilcbiAgICBzdGF0aWMgY3JlYXRlKG1lc3NhZ2UsIHR5cGUsIGlzU3RpY2t5ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RpZmljYXRpb24tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZChgbm90aWZpY2F0aW9uLSR7dHlwZX1gKTtcbiAgICAgICAgaWYoaXNTdGlja3kpIHsgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ3N0aWNrJyk7IH0gLy8gc3RpY2t5IG5vdGlmaWNhdGlvbnMgbWlnaHQgYmUgdXNlZCBmb3IgbG9uZyBtZXNzYWdlc1xuICAgICAgICBub3RpZmljYXRpb24uaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbik7XG5cbiAgICAgICAgLy8gYW5pbWF0ZSBpblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ2luJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBmYWRlIG91dCBub3RpZmljYXRpb24gKHVubGVzcyBpdCBoYXMgJ3N0aWNrJyBjbGFzcylcbiAgICAgICAgICAgICAgICBpZighIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3N0aWNrJykpIHsgTm90aWZpY2F0aW9uLmNsZWFuKG5vdGlmaWNhdGlvbik7IH1cbiAgICAgICAgICAgIH0sIDEwMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBvbGQgbm90aWZpY2F0aW9uc1xuICAgIHN0YXRpYyBjbGVhbihub3RpZmljYXRpb24sIGR1cmF0aW9uID0gRkFERU9VVF9EVVJBVElPTikge1xuICAgICAgICAvLyBmYWRlb3V0IG5vdGlmaWNhdGlvbiBhZnRlciBzcGVjaWZpZWQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIChkZWZhdWx0ID0gRkFERU9VVF9EVVJBVElPTilcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jbGVhcihub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZHVyYXRpb25cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXIobm90aWZpY2F0aW9uKSB7XG4gICAgICAgIC8vIHJlbW92ZSBub3RpZmljYXRpb24gZnJvbSBET00gb25jZSBpdHMgZmFkZW91dCBhbmltYXRpb24gaGFzIGVuZGVkIChhYm91dCAxcyB0byBiZSBzdXJlKVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMTAwMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGFkZCBjbGljayBldmVudCBvbiAnZG9jdW1lbnQnIGZvciBub3RpZmljYXRpb25zIHRoYXQgd2lsbCBiZSBhZGRlZCBsYXRlciBvbiB0aGUgRE9NXG4gICAgc3RhdGljIHJlbW92ZU9uQ2xpY2tFdmVudCgpIHtcbiAgICAgICAgLy8gbm90aWZpY2F0aW9ucyBhcmUgcmVtb3ZlZCB3aGVuIGNsaWNrZWQgb25cbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvblR5cGVzID0gWydub3RpZmljYXRpb24tc3VjY2VzcycsICdub3RpZmljYXRpb24taW5mbycsICdub3RpZmljYXRpb24td2FybmluZycsICdub3RpZmljYXRpb24tZXJyb3InXTtcblxuICAgICAgICBVdGlscy5jbGlja1dhdGNoKG5vdGlmaWNhdGlvblR5cGVzLCBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jbGVhbihub3RpZmljYXRpb24sIDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXJcbiAgICBzdGF0aWMgZ2V0IGZhZGVvdXREdXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEZBREVPVVRfRFVSQVRJT047XG4gICAgfVxufSIsImltcG9ydCAqIGFzIENvbnN0YW50ZXMgZnJvbSAnLi9Db25zdGFudGVzJztcbmltcG9ydCB7IFZpZXdQb3J0IH0gZnJvbSAnLi9WaWV3UG9ydCc7XG5cbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24gPSAoVmlld1BvcnQuZ2V0V2lkdGgoKSA9PT0gQ29uc3RhbnRlcy5YWFMpIHx8IChWaWV3UG9ydC5nZXRXaWR0aCgpID09PSBDb25zdGFudGVzLlhTKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBwYWdlIGNvbnRhaW5zIGEgcGFnaW5hdGlvbiBlbGVtZW50IGJlZm9yZSBtb3ZpbmcgZm9yd2FyZFxuICAgICAgICBpZihudWxsID09PSBwYWdpbmF0aW9uKSB7cmV0dXJuIGZhbHNlfTtcblxuICAgICAgICBsZXQgcHJldkl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5wcmV2Jyk7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIHNldCAvIHJlc2V0IGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZWxsaXBzaXMnKSkgeyBpdGVtLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50ID0gYCR7aX1gOyB9XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicsICdzaG93JywgJ2VsbGlwc2lzJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtLmRhdGFzZXQucGFnZSA9IGk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBhY3RpdmVJdGVtSW5kZXggPSBwYXJzZUludChhY3RpdmVJdGVtLmRhdGFzZXQucGFnZSk7XG5cbiAgICAgICAgLyogYWRkIGFwcHJvcHJpYXRlIGNsYXNzZXM6ICovXG5cbiAgICAgICAgLy8gZGlzYWJsZSAncHJldicgYnV0dG9uIGlmIGFjdGl2ZSBwYWdlIGlzIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IDEpIHtcbiAgICAgICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgIGlmKCEgdGhpcy5pc1NtYWxsUGFnaW5hdGlvbikge1xuICAgICAgICAgICAgICAgIGl0ZW1zWzNdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTsgLy8gaWYgYWN0aXZlIHBhZ2UgaXMgMSwgdGhlIHRoaXJkIGl0ZW0gaXMgZGlzcGxheWVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNhYmxlICduZXh0JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGxhc3Qgb25lXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA9PSAoaXRlbXMubGVuZ3RoIC0gMikpIHtcbiAgICAgICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgIGlmKCEgdGhpcy5pc1NtYWxsUGFnaW5hdGlvbikge1xuICAgICAgICAgICAgICAgIGl0ZW1zWyhpdGVtcy5sZW5ndGggLSA0KV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlyc3QgZWxsaXBzaXMgY2hlY2tcbiAgICAgICAgaWYoISB0aGlzLmlzU21hbGxQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPj0gNCkgeyBpdGVtc1syXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxhc3QgZWxsaXBzaXMgY2hlY2tcbiAgICAgICAgaWYoISB0aGlzLmlzU21hbGxQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPD0gKGl0ZW1zLmxlbmd0aCAtIDUpKSB7IGl0ZW1zWyhpdGVtcy5sZW5ndGggLSAzKV0uY2xhc3NMaXN0LmFkZCgnZWxsaXBzaXMnLCAnc2hvdycpOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhY3RpdmUgaXRlbSwgcHJldmlvdXMgYW5kIG5leHQgb25lc1xuICAgICAgICBpZighIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggLSAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgaWYoISB0aGlzLmlzU21hbGxQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICBpdGVtc1soYWN0aXZlSXRlbUluZGV4ICsgMSldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZXYsIG5leHQsIGZpcnN0IGFuZCBsYXN0IHBhZ2VzIGFyZSBkaXNwbGF5ZWQgYXMgd2VsbFxuICAgICAgICBwcmV2SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICBpdGVtc1sxXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhpdGVtcy5sZW5ndGggLSAyKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIGhpZGUgZXZlcnkgb3RoZXIgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpZighIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZXBsYWNlICdlbGxpcHNpcycgY2xhc3MgbGlzdCBpdGVtIGNvbnRlbnQgd2l0aCAzIGRvdHNcbiAgICAgICAgbGV0IGVsbGlwc2lzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaS5lbGxpcHNpcycpO1xuICAgICAgICBbLi4uZWxsaXBzaXNJdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCdhJykudGV4dENvbnRlbnQgPSBcIi4uLlwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcblxuZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBTdHlsZWd1aWRlLmlucHV0RmVlZGJhY2soKTtcbiAgICAgICAgU3R5bGVndWlkZS5wYWdpbmF0aW9uKCk7XG4gICAgICAgIFN0eWxlZ3VpZGUubm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnB1dC10ZXN0IC5pbnB1dC1ncm91cCcpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnNHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnMgPSB0ZXN0QnV0dG9uc0dyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgICAgIC8vIGluc2VydCBhbiBlbXB0eSBzcGFuIGFzIGhlaWdodCBwbGFjZWhvbGRlclxuICAgICAgICBjcmVhdGVQbGFjZWhvbGRlcigpO1xuXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tUZXh0ID0gdGhpcy5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkaXNhYmxlZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRpc2FibGUoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9ICFpbnB1dC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkVuYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc3RhdGVcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVCdXR0b24gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JleScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcG90ZW50aWFsbHkgZGlzYWJsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0YXRlcyBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmZWVkYmFjayBzdGF0ZSBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSA/IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykucmVtb3ZlKCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3JlYXRlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgaW5wdXQgc3RhdGUgZmVlZGJhY2tcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgaW4gY2FzZSB0aGUgaW5wdXQgaGFzIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXAgXCIgKyBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmVlZGJhY2sgc3BhbiBvciBjcmVhdGUgb25lXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1NwYW4gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpO1xuICAgICAgICAgICAgICAgICAgICBpZighIGZlZWRiYWNrU3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi50ZXh0Q29udGVudCA9IGZlZWRiYWNrVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZGVtby1ibG9jaycpLmFwcGVuZENoaWxkKGZlZWRiYWNrU3Bhbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyKCkge1xuICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgcGxhY2Vob2xkZXIuY2xhc3NOYW1lID0gXCJmZWVkYmFja1wiO1xuICAgICAgICAgICAgcGxhY2Vob2xkZXIuaW5uZXJIVE1MID0gXCImbmJzcDtcIjtcbiAgICAgICAgICAgIGlucHV0R3JvdXAuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCB0ZXN0QnV0dG9uc0dyb3VwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwYWdpbmF0aW9uKCkge1xuICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gICAgICAgIGxldCBpdGVtcyA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVJdGVtSW5kZXggPSBwYXJzZUludChwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5kYXRhc2V0LnBhZ2UpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIG9sZCBhY3RpdmUgaXRlbVxuICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmV2ICYgbmV4dCBjYXNlc1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4IC0gMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCduZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4ICsgMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0ZWQgbmV3IGFjdGl2ZSBwYWdlXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVsYXVuY2ggZnVuY3Rpb24gZm9yIGRlbW8gcHVycG9zZVxuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3RpZmljYXRpb24oKSB7XG5cbiAgICAgICAgLy8gc3RhbmRhcmQgYnV0dG9ucyAobm9uLXN0aWNreSBub3RpZmljYXRpb25zKVxuICAgICAgICBsZXQgc3RhbmRhcmROb3RpZmljYXRpb25CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vdGlmaWNhdGlvbnMtdGVzdC1idXR0b25zIGJ1dHRvbicpO1xuXG4gICAgICAgIFsuLi5zdGFuZGFyZE5vdGlmaWNhdGlvbkJ1dHRvbnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZSA9IGJ1dHRvbi5kYXRhc2V0LnR5cGU7XG4gICAgICAgICAgICBsZXQgaXNTdGlja3kgPSBidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGlja3knKVxuXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uY3JlYXRlKG5vdGlmaWNhdGlvblRleHQsIG5vdGlmaWNhdGlvblR5cGUsIGlzU3RpY2t5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XHJcblxyXG5sZXQgdmlzaWJsZVRhYkNvbnRlbnRJZHM7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFiIHtcclxuXHJcbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdGFiKCkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSBhY3RpdmUgdGFiKHMpXHJcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgbm9uIGFjdGl2ZSBjb250ZW50IGF0IHBhZ2Ugc3RhcnQgdXAgKHNob3cgc3RpbGwgZGlzcGxheSBhY3RpdmUgY29udGVudClcclxuICAgICAgICB0aGlzLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XHJcblxyXG4gICAgICAgIC8vIG1lbnUgYmVoYXZpb3VyXHJcbiAgICAgICAgbGV0IHRhYk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLW1lbnUgYScpO1xyXG4gICAgICAgIFsuLi50YWJNZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24obGluaykge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbGluayBvd25pbmcgdGFiXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFicyA9IFV0aWxzLmNsb3Nlc3QobGluaywgJ3RhYnMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIGN1cnJlbnQgYWN0aXZlIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVNZW51VGFiID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IGFjdGl2ZU1lbnVUYWIpIHsgYWN0aXZlTWVudVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFkZCAnYWN0aXZlJyBjbGFzcyB0byBsaW5rIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFuZCBmaW5hbGx5IHVwZGF0ZSBET01cclxuICAgICAgICAgICAgICAgIFRhYi51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcbiAgICAgICAgICAgICAgICBUYWIuaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKSB7XHJcbiAgICAgICAgdmlzaWJsZVRhYkNvbnRlbnRJZHMgPSBuZXcgU2V0KCk7IC8vIHN0YXJ0IGNsZWFuXHJcbiAgICAgICAgbGV0IGFjdGl2ZVRhYk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSAuYWN0aXZlJyk7XHJcbiAgICAgICAgWy4uLmFjdGl2ZVRhYk1lbnVzXS5mb3JFYWNoKGZ1bmN0aW9uKHRhYk1lbnUpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldElkID0gdGFiTWVudS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zbGljZSgxKTsgLy8gcmVtb3ZlIHRoZSAjIHN5bWJvbFxyXG4gICAgICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcy5hZGQodGFyZ2V0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlTm9uQWN0aXZlQ29udGVudCgpIHtcclxuICAgICAgICBsZXQgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicyAudGFicy1jb250ZW50Jyk7XHJcbiAgICAgICAgWy4uLnRhYkNvbnRlbnRzXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnRCbG9jaykge1xyXG4gICAgICAgICAgICBbLi4uY29udGVudEJsb2NrLmNoaWxkcmVuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGNsZWFuIGJ5IHJlbW92aW5nICdoaWRkZW4nIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY29udGVudHMgdGhhdCBhcmUgbm90IGluIGFuIGFjdGl2ZSBzdGF0ZSB0YWJcclxuICAgICAgICAgICAgICAgIGlmKCEgdmlzaWJsZVRhYkNvbnRlbnRJZHMuaGFzKGNvbnRlbnQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gY2xvc2VzdChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICBsZXQgcGFyZW50O1xuXG4gICAgd2hpbGUoZWxlbWVudCkge1xuICAgICAgICBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmKHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkgeyByZXR1cm4gcGFyZW50OyB9XG4gICAgICAgIGVsZW1lbnQgPSBwYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGFsbG93cyBlbGVtZW50cyB3aXRoIGEgc3BlY2lmaWMgY2xhc3MgdG8gYmUgY2xpY2thYmxlIGV2ZW4gaWYgdGhleSBhcmUgbm90IG9uIHRoZSBET00gd2hlbiB0aGlzIG1ldGhvZCBpcyBjYWxsZWRcbmV4cG9ydCBmdW5jdGlvbiBjbGlja1dhdGNoKHRhcmdldGVkRWxlbWVudENsYXNzZXMsIGNhbGxiYWNrKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBbLi4udGFyZ2V0ZWRFbGVtZW50Q2xhc3Nlc10uZm9yRWFjaChmdW5jdGlvbihjbGFzc0l0ZW0pIHtcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc0l0ZW0pKSB7IGNhbGxiYWNrKGUudGFyZ2V0KSB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSIsImltcG9ydCAqIGFzIENvbnN0YW50ZXMgZnJvbSAnLi9Db25zdGFudGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWaWV3UG9ydCB7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbmplY3RWaWV3UG9ydFV0aWxzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW5qZWN0IGN1c3RvbSBET00gZWxlbWVudHMgdG8gZ2V0IGJyZWFrcG9pbnRzIGluZm9cclxuICAgIHN0YXRpYyBpbmplY3RWaWV3UG9ydFV0aWxzKCkge1xyXG4gICAgICAgIGxldCB2aWV3UG9ydFV0aWxzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGV0IHh4c1ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgeHNWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGV0IHNtVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBtZFZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgbGdWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGV0IHhsVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCB4eGxWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIHZpZXdQb3J0VXRpbHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInZpZXctcG9ydC11dGlsc1wiKTtcclxuICAgICAgICB4eHNWaWV3LmNsYXNzTGlzdC5hZGQoQ29uc3RhbnRlcy5YWFMsIFwidmlzaWJsZS14eHNcIik7XHJcbiAgICAgICAgeHNWaWV3LmNsYXNzTGlzdC5hZGQoQ29uc3RhbnRlcy5YUywgXCJ2aXNpYmxlLXhzXCIpO1xyXG4gICAgICAgIHNtVmlldy5jbGFzc0xpc3QuYWRkKENvbnN0YW50ZXMuU00sIFwidmlzaWJsZS1zbVwiKTtcclxuICAgICAgICBtZFZpZXcuY2xhc3NMaXN0LmFkZChDb25zdGFudGVzLk1ELCBcInZpc2libGUtbWRcIik7XHJcbiAgICAgICAgbGdWaWV3LmNsYXNzTGlzdC5hZGQoQ29uc3RhbnRlcy5MRywgXCJ2aXNpYmxlLWxnXCIpO1xyXG4gICAgICAgIHhsVmlldy5jbGFzc0xpc3QuYWRkKENvbnN0YW50ZXMuWEwsIFwidmlzaWJsZS14bFwiKTtcclxuICAgICAgICB4eGxWaWV3LmNsYXNzTGlzdC5hZGQoQ29uc3RhbnRlcy5YWEwsIFwidmlzaWJsZS14eGxcIik7XHJcblxyXG4gICAgICAgIGxldCB2aWV3UG9ydFV0aWxzRG9tRWxlbWVudHMgPSBbeHhzVmlldywgeHNWaWV3LCBzbVZpZXcsIG1kVmlldywgbGdWaWV3LCB4bFZpZXcsIHh4bFZpZXddO1xyXG5cclxuICAgICAgICBbLi4udmlld1BvcnRVdGlsc0RvbUVsZW1lbnRzXS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmlld1BvcnRVdGlsc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3UG9ydFV0aWxzQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0V2lkdGgoKSB7XHJcbiAgICAgICAgbGV0IHZpZXdQb3J0VXRpbHNEb21FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWV3LXBvcnQtdXRpbHMnKS5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgY3VycmVudFdpZHRoID0gbnVsbDtcclxuXHJcblxyXG4gICAgICAgIFsuLi52aWV3UG9ydFV0aWxzRG9tRWxlbWVudHNdLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudFN0eWxlID0gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkpO1xyXG5cclxuICAgICAgICAgICAgaWYoXCJibG9ja1wiID09IGVsZW1lbnRTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFdpZHRoID0gZWxlbWVudC5jbGFzc0xpc3QuaXRlbSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudFdpZHRoO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vRm9ybSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4vVGFiJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJy4vRGlhbG9nJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vRmlsdGVyJztcbmltcG9ydCB7IFZpZXdQb3J0IH0gZnJvbSAnLi9WaWV3UG9ydCc7XG5cbi8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG5pbXBvcnQgeyBTdHlsZWd1aWRlIH0gZnJvbSAnLi9TdHlsZWd1aWRlJztcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgVmlld1BvcnQuaW5pdCgpO1xuICAgIEZvcm0uaW5pdCgpO1xuICAgIFBhZ2luYXRpb24uaW5pdCgpO1xuICAgIE5vdGlmaWNhdGlvbi5pbml0KCk7XG4gICAgVGFiLmluaXQoKTtcbiAgICBEaWFsb2cuaW5pdCgpO1xuICAgIEZpbHRlci5pbml0KCk7XG5cbiAgICAvLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuICAgIFN0eWxlZ3VpZGUuaW5pdCgpO1xuXG4gICAgLy8gbWV0aG9kcyB0byByZWxvYWQgb24gcGFnZSByZXNpemVcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5pbml0KCk7XG4gICAgfTtcbn07Il19
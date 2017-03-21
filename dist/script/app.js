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
        value: function init() {
            var dialogTestButtons = document.querySelectorAll('.dialog-trigger');
            if (null == dialogTestButtons) {
                return false;
            }

            [].concat(_toConsumableArray(dialogTestButtons)).forEach(function (button) {
                button.addEventListener("click", function () {
                    Dialog.setup(this.dataset.target);
                });
            });
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
        key: 'createDismissButton',
        value: function createDismissButton() {
            var dismissButton = document.createElement('span');
            dismissButton.classList.add('dismiss-button');
            this.dialog.appendChild(dismissButton);
        }
    }, {
        key: 'containerEvents',
        value: function containerEvents() {
            this.dialogContainer.addEventListener("click", function (e) {
                e.preventDefault();

                // animate out
                if (e.target.classList.contains('dialog-container') || // click on backdrop
                e.target.classList.contains('dismiss') || // click on dismiss button
                e.target.classList.contains('dismiss-button')) {
                    // click on closing icon

                    Dialog.hide();
                }
            });
        }
    }, {
        key: 'appendOnDom',
        value: function appendOnDom() {
            document.body.appendChild(Dialog.backdrop);
            document.body.appendChild(Dialog.dialogContainer);
            Dialog.dialogContainer.appendChild(Dialog.dialog);
            Dialog.dialog.style.display = "block";
        }
    }, {
        key: 'show',
        value: function show() {
            Dialog.backdrop.classList.add('in');
            Dialog.dialog.classList.add('in');

            // focus on first input
            // ====================
            var dialogInputs = Dialog.dialog.querySelectorAll("input");
            var focusInputIsSet = false; // flag to stop with first input
            [].concat(_toConsumableArray(dialogInputs)).forEach(function (input) {
                if ("hidden" !== input.type && false === focusInputIsSet) {
                    input.focus();
                    focusInputIsSet = true;
                }
            });
        }
    }, {
        key: 'removeAnimationClasses',
        value: function removeAnimationClasses() {
            Dialog.dialog.classList.remove('in');
            Dialog.backdrop.classList.remove('in');
        }
    }, {
        key: 'hide',
        value: function hide() {
            Dialog.removeAnimationClasses();

            // wait for animation to end before clearing dialog out
            setTimeout(Dialog.clear, 400);
        }
    }, {
        key: 'clear',
        value: function clear() {
            document.body.appendChild(Dialog.dialog); // move dialog before its container is removed
            Dialog.backdrop.remove();
            Dialog.dialogContainer.remove();
            Dialog.dialog = null;
        }
    }, {
        key: 'setup',
        value: function setup(dialogId) {
            // start clean if an other dialog box is displayed
            if (null != Dialog.dialog) {
                Dialog.removeAnimationClasses();
                Dialog.clear();
            }

            Dialog.dialog = document.querySelector(dialogId);
            if (null == Dialog.dialog) {
                return;
            }

            Dialog.createDismissButton();
            Dialog.createBackdrop();
            Dialog.createContainer();
            Dialog.containerEvents();
            Dialog.appendOnDom();
            setTimeout(Dialog.show, 100); // give time for 'in' animation
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0L0NvbnN0YW50ZXMuanMiLCJzcmMvc2NyaXB0L0RpYWxvZy5qcyIsInNyYy9zY3JpcHQvRmlsdGVyLmpzIiwic3JjL3NjcmlwdC9Gb3JtLmpzIiwic3JjL3NjcmlwdC9Ob3RpZmljYXRpb24uanMiLCJzcmMvc2NyaXB0L1BhZ2luYXRpb24uanMiLCJzcmMvc2NyaXB0L1N0eWxlZ3VpZGUuanMiLCJzcmMvc2NyaXB0L1RhYi5qcyIsInNyYy9zY3JpcHQvVXRpbHMuanMiLCJzcmMvc2NyaXB0L1ZpZXdQb3J0LmpzIiwic3JjL3NjcmlwdC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBTyxJQUFNLG9CQUFNLEtBQVo7QUFDQSxJQUFNLGtCQUFLLElBQVg7QUFDQSxJQUFNLGtCQUFLLElBQVg7QUFDQSxJQUFNLGtCQUFLLElBQVg7QUFDQSxJQUFNLGtCQUFLLElBQVg7QUFDQSxJQUFNLGtCQUFLLElBQVg7QUFDQSxJQUFNLG9CQUFNLEtBQVo7Ozs7Ozs7Ozs7Ozs7OztJQ05NLE0sV0FBQSxNOzs7Ozs7OytCQUVLO0FBQ1YsZ0JBQUksb0JBQW9CLFNBQVMsZ0JBQVQsQ0FBMEIsaUJBQTFCLENBQXhCO0FBQ0EsZ0JBQUcsUUFBUSxpQkFBWCxFQUE4QjtBQUFFLHVCQUFPLEtBQVA7QUFBYzs7QUFFOUMseUNBQUksaUJBQUosR0FBdUIsT0FBdkIsQ0FBK0IsVUFBUyxNQUFULEVBQWlCO0FBQzVDLHVCQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7QUFDeEMsMkJBQU8sS0FBUCxDQUFhLEtBQUssT0FBTCxDQUFhLE1BQTFCO0FBQ0gsaUJBRkQ7QUFHSCxhQUpEO0FBS0g7Ozt5Q0FFdUI7QUFDcEIsaUJBQUssUUFBTCxHQUFnQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxpQkFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNIOzs7MENBRXdCO0FBQ3JCLGlCQUFLLGVBQUwsR0FBdUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0EsaUJBQUssZUFBTCxDQUFxQixTQUFyQixHQUFpQyxrQkFBakM7QUFDSDs7OzhDQUU0QjtBQUN6QixnQkFBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCO0FBQ0EsMEJBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixnQkFBNUI7QUFDQSxpQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixhQUF4QjtBQUNIOzs7MENBRXdCO0FBQ3JCLGlCQUFLLGVBQUwsQ0FBcUIsZ0JBQXJCLENBQXNDLE9BQXRDLEVBQStDLFVBQVMsQ0FBVCxFQUFZO0FBQ3ZELGtCQUFFLGNBQUY7O0FBRUE7QUFDQSxvQkFBSyxFQUFFLE1BQUgsQ0FBVyxTQUFYLENBQXFCLFFBQXJCLENBQThCLGtCQUE5QixLQUF3RDtBQUN2RCxrQkFBRSxNQUFILENBQVcsU0FBWCxDQUFxQixRQUFyQixDQUE4QixTQUE5QixDQURBLElBQ3dEO0FBQ3ZELGtCQUFFLE1BQUgsQ0FBVyxTQUFYLENBQXFCLFFBQXJCLENBQThCLGdCQUE5QixDQUZKLEVBRXNEO0FBQU07O0FBRXhELDJCQUFPLElBQVA7QUFDSDtBQUNKLGFBVkQ7QUFXSDs7O3NDQUVvQjtBQUNqQixxQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixPQUFPLFFBQWpDO0FBQ0EscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsT0FBTyxlQUFqQztBQUNBLG1CQUFPLGVBQVAsQ0FBdUIsV0FBdkIsQ0FBbUMsT0FBTyxNQUExQztBQUNBLG1CQUFPLE1BQVAsQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQThCLE9BQTlCO0FBQ0g7OzsrQkFFYTtBQUNWLG1CQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsSUFBOUI7QUFDQSxtQkFBTyxNQUFQLENBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixJQUE1Qjs7QUFFQTtBQUNBO0FBQ0EsZ0JBQUksZUFBZSxPQUFPLE1BQVAsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixDQUFuQjtBQUNBLGdCQUFJLGtCQUFrQixLQUF0QixDQVBVLENBT21CO0FBQzdCLHlDQUFJLFlBQUosR0FBa0IsT0FBbEIsQ0FBMEIsVUFBUyxLQUFULEVBQWdCO0FBQ3RDLG9CQUFHLGFBQWEsTUFBTSxJQUFuQixJQUEyQixVQUFVLGVBQXhDLEVBQTBEO0FBQ3RELDBCQUFNLEtBQU47QUFDQSxzQ0FBa0IsSUFBbEI7QUFDSDtBQUNKLGFBTEQ7QUFNSDs7O2lEQUUrQjtBQUM1QixtQkFBTyxNQUFQLENBQWMsU0FBZCxDQUF3QixNQUF4QixDQUErQixJQUEvQjtBQUNBLG1CQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsSUFBakM7QUFDSDs7OytCQUVhO0FBQ1YsbUJBQU8sc0JBQVA7O0FBRUE7QUFDQSx1QkFBVyxPQUFPLEtBQWxCLEVBQXlCLEdBQXpCO0FBQ0g7OztnQ0FFYztBQUNYLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE9BQU8sTUFBakMsRUFEVyxDQUMrQjtBQUMxQyxtQkFBTyxRQUFQLENBQWdCLE1BQWhCO0FBQ0EsbUJBQU8sZUFBUCxDQUF1QixNQUF2QjtBQUNBLG1CQUFPLE1BQVAsR0FBZ0IsSUFBaEI7QUFDSDs7OzhCQUVZLFEsRUFBVTtBQUNuQjtBQUNBLGdCQUFHLFFBQVEsT0FBTyxNQUFsQixFQUEwQjtBQUN0Qix1QkFBTyxzQkFBUDtBQUNBLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxtQkFBTyxNQUFQLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBLGdCQUFHLFFBQVEsT0FBTyxNQUFsQixFQUEwQjtBQUFFO0FBQVM7O0FBRXJDLG1CQUFPLG1CQUFQO0FBQ0EsbUJBQU8sY0FBUDtBQUNBLG1CQUFPLGVBQVA7QUFDQSxtQkFBTyxlQUFQO0FBQ0EsbUJBQU8sV0FBUDtBQUNBLHVCQUFXLE9BQU8sSUFBbEIsRUFBd0IsR0FBeEIsRUFmbUIsQ0FlVztBQUNqQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHTDs7SUFBWSxLOzs7Ozs7OztJQUVDLE0sV0FBQSxNOzs7Ozs7OytCQUVLO0FBQ1YsaUJBQUssb0JBQUwsR0FEVSxDQUNtQjtBQUM3QixpQkFBSyxpQkFBTCxHQUZVLENBRWdCO0FBQzFCLGlCQUFLLHNDQUFMLEdBSFUsQ0FHcUM7QUFDbEQ7OzsrQ0FFNkI7QUFDMUI7QUFDQSxnQkFBSSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixTQUExQixDQUF2Qjs7QUFFQTtBQUNBLHlDQUFJLGdCQUFKLEdBQXNCLE9BQXRCLENBQThCLFVBQVMsU0FBVCxFQUFvQjs7QUFFOUM7O0FBRUE7QUFDQSxvQkFBSSxtQkFBbUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0EsaUNBQWlCLFNBQWpCLENBQTJCLEdBQTNCLENBQStCLGlCQUEvQjtBQUNBLDBCQUFVLGFBQVYsQ0FBd0IsZUFBeEIsRUFBeUMsV0FBekMsQ0FBcUQsZ0JBQXJEOztBQUVBO0FBQ0EsaUNBQWlCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxZQUFXO0FBQ2xELDJCQUFPLGVBQVAsQ0FBdUIsU0FBdkI7QUFDSCxpQkFGRDs7QUFJQTs7QUFFQTtBQUNBLG9CQUFJLG1CQUFtQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQSxpQ0FBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsY0FBL0I7QUFDQSwwQkFBVSxXQUFWLENBQXNCLGdCQUF0Qjs7QUFFQTtBQUNBLGlDQUFpQixnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBVztBQUNsRCwyQkFBTyxlQUFQLENBQXVCLFNBQXZCO0FBQ0gsaUJBRkQ7QUFHSCxhQXpCRDtBQTBCSDs7OzRDQUUwQjtBQUN2QixrQkFBTSxVQUFOLENBQWlCLENBQUMsYUFBRCxFQUFnQixVQUFoQixDQUFqQixFQUE4QyxVQUFVLElBQVYsRUFBZ0I7QUFDMUQsdUJBQU8sZ0JBQVAsQ0FBd0IsSUFBeEI7QUFDSCxhQUZEO0FBR0g7OztvQ0FFa0IsSSxFQUFNO0FBQ3JCO0FBQ0EsZ0JBQUksaUJBQWlCLEtBQUssYUFBTCxDQUFtQixFQUF4Qzs7QUFFQTtBQUNBLGdCQUFJLFVBQVUsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWQ7QUFDQSxvQkFBUSxTQUFSLEdBQW9CLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsYUFBeEIsSUFBeUMsVUFBekMsR0FBc0QsYUFBMUU7QUFDQSxvQkFBUSxTQUFSLEdBQW9CLEtBQUssU0FBekI7QUFDQSxvQkFBUSxPQUFSLENBQWdCLE1BQWhCLFNBQTZCLGNBQTdCO0FBQ0EsbUJBQU8sT0FBUDtBQUNIOzs7eUNBRXVCLEksRUFBTTtBQUMxQjtBQUNBLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsS0FBSyxPQUFMLENBQWEsTUFBcEMsQ0FBcEI7O0FBRUEsZ0JBQUksVUFBVSxPQUFPLFdBQVAsQ0FBbUIsSUFBbkIsQ0FBZDtBQUNBLGlCQUFLLE1BQUw7O0FBRUE7QUFDQSwwQkFBYyxXQUFkLENBQTBCLE9BQTFCO0FBQ0g7Ozt3Q0FFc0IsUyxFQUFXO0FBQzlCO0FBQ0EsZ0JBQUksY0FBYyxVQUFVLGdCQUFWLENBQTJCLGNBQTNCLENBQWxCO0FBQ0EseUNBQUksV0FBSixHQUFpQixPQUFqQixDQUF5QixVQUFTLE1BQVQsRUFBaUI7QUFDdEMsdUJBQU8sZ0JBQVAsQ0FBd0IsTUFBeEI7QUFDSCxhQUZEO0FBR0g7OztpRUFFK0M7QUFDNUM7QUFDQSxnQkFBSSxXQUFXLElBQUksZ0JBQUosQ0FBcUIsVUFBUyxTQUFULEVBQW9CO0FBQ3BELDBCQUFVLE9BQVYsQ0FBa0IsVUFBUyxRQUFULEVBQW1CO0FBQ2pDLDJCQUFPLDRCQUFQLENBQW9DLFNBQVMsTUFBN0M7QUFDSCxpQkFGRDtBQUdILGFBSmMsQ0FBZjs7QUFNQSxnQkFBSSxTQUFTLEVBQUUsV0FBVyxJQUFiLEVBQW1CLFlBQVksS0FBL0IsRUFBc0MsZUFBZSxLQUFyRCxFQUFiO0FBQ0EsZ0JBQUksY0FBYyxTQUFTLGdCQUFULENBQTBCLGNBQTFCLENBQWxCO0FBQ0EseUNBQUksV0FBSixHQUFpQixPQUFqQixDQUF5QixVQUFTLFVBQVQsRUFBcUI7QUFDMUMseUJBQVMsT0FBVCxDQUFpQixVQUFqQixFQUE2QixNQUE3QjtBQUNBLHVCQUFPLDRCQUFQLENBQW9DLFVBQXBDLEVBRjBDLENBRU87QUFDcEQsYUFIRDtBQUlIOzs7cURBRW1DLFUsRUFBWTtBQUM1QyxnQkFBSSxrQkFBa0IsV0FBVyxhQUFqQzs7QUFFQSxnQkFBRyxXQUFXLGlCQUFYLEdBQStCLENBQWxDLEVBQXFDO0FBQ2pDLGdDQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QixVQUE5QjtBQUNILGFBRkQsTUFFTztBQUNILGdDQUFnQixTQUFoQixDQUEwQixNQUExQixDQUFpQyxVQUFqQztBQUNIO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN4R1EsSSxXQUFBLEk7Ozs7Ozs7OztBQUVUOytCQUNjO0FBQ1YsaUJBQUssUUFBTDtBQUNIOzs7bUNBRWlCO0FBQ2QsZ0JBQUksbUJBQW1CLFNBQVMsZ0JBQVQsQ0FBMEIsbUJBQTFCLENBQXZCO0FBQ0EseUNBQUksZ0JBQUosR0FBc0IsT0FBdEIsQ0FBOEIsVUFBUyxNQUFULEVBQWlCO0FBQUU7O0FBRTdDO0FBQ0Esb0JBQUksZ0JBQWdCLE9BQU8sYUFBUCxDQUFxQixhQUFyQixDQUFtQyxnQkFBbkMsQ0FBcEI7QUFDQSxvQkFBSSxpQkFBaUIsS0FBckI7O0FBRUEsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBUyxDQUFULEVBQVk7QUFDekMsc0JBQUUsY0FBRjtBQUNBLGtDQUFjLEtBQWQsQ0FBb0IsT0FBcEIsR0FBK0IsY0FBYyxLQUFkLENBQW9CLE9BQXBCLElBQStCLEVBQWhDLEdBQXNDLE9BQXRDLEdBQWdELEVBQTlFO0FBQ0EscUNBQWlCLGNBQWMsS0FBZCxDQUFvQixPQUFwQixJQUErQixPQUFoRDs7QUFFQTtBQUNBLHdCQUFHLGNBQUgsRUFBbUI7QUFBQTtBQUNmLGdDQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0EsdUNBQVcsU0FBWCxHQUF1QixpQkFBdkI7O0FBRUEsZ0NBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLGtDQUFNLFdBQU4sQ0FBa0IsVUFBbEI7O0FBRUEsdUNBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBVztBQUM1Qyw4Q0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQThCLEVBQTlCO0FBQ0EsaURBQWlCLEtBQWpCO0FBQ0EsMkNBQVcsbUJBQVgsQ0FBK0IsT0FBL0IsRUFBd0MsSUFBeEM7QUFDQSxxQ0FBSyxNQUFMO0FBQ0gsNkJBTEQ7QUFQZTtBQWFsQjtBQUNKLGlCQXBCRDs7QUFzQkE7QUFDQSxvQkFBSSxjQUFjLGNBQWMsZ0JBQWQsQ0FBK0IsR0FBL0IsQ0FBbEI7QUFDQSw2Q0FBSSxXQUFKLEdBQWlCLE9BQWpCLENBQXlCLFVBQVMsTUFBVCxFQUFpQjtBQUFFO0FBQ3hDLDJCQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsQ0FBVCxFQUFZO0FBQ3pDLDBCQUFFLGNBQUY7QUFDQSw0QkFBSSxrQkFBa0IsT0FBTyxJQUE3Qjs7QUFFQTtBQUNBLDRCQUFJLHlCQUF5QixjQUFjLGFBQWQsQ0FBNEIsV0FBNUIsQ0FBN0I7QUFDQSwrQ0FBdUIsU0FBdkIsQ0FBaUMsTUFBakMsQ0FBd0MsUUFBeEM7O0FBRUE7QUFDQSwrQkFBTyxhQUFQLENBQXFCLFNBQXJCLENBQStCLEdBQS9CLENBQW1DLFFBQW5DO0FBQ0EsK0JBQU8sU0FBUCxHQUFtQixlQUFuQjs7QUFFQTtBQUNBLHNDQUFjLEtBQWQsQ0FBb0IsT0FBcEIsR0FBOEIsRUFBOUI7O0FBRUE7QUFDQSw0QkFBSSxXQUFXLFNBQVMsYUFBVCxDQUF1QixrQkFBdkIsQ0FBZjtBQUNBLGlDQUFTLE1BQVQ7QUFDSCxxQkFsQkQ7QUFtQkgsaUJBcEJEO0FBcUJILGFBbkREO0FBb0RIOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RMOztJQUFZLEs7Ozs7OztBQUVaLElBQU0sbUJBQW1CLElBQUksSUFBN0I7O0lBRWEsWSxXQUFBLFk7Ozs7Ozs7OztBQUVUOytCQUNjO0FBQ1YsaUJBQUssY0FBTDtBQUNBLGlCQUFLLGtCQUFMO0FBQ0g7O0FBRUQ7Ozs7eUNBQ3lCO0FBQ3JCLGdCQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLHlCQUF2QixDQUFoQjs7QUFFQTtBQUNBLGdCQUFHLFFBQVEsU0FBWCxFQUFzQjtBQUFFLDBCQUFVLE1BQVY7QUFBcUI7O0FBRTdDO0FBQ0Esd0JBQVksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxzQkFBVSxFQUFWLEdBQWUsd0JBQWY7QUFDQSxnQkFBSSxtQkFBbUIsU0FBUyxJQUFULENBQWMsaUJBQXJDO0FBQ0EscUJBQVMsSUFBVCxDQUFjLFlBQWQsQ0FBMkIsU0FBM0IsRUFBc0MsZ0JBQXRDO0FBQ0g7O0FBRUQ7Ozs7K0JBQ2MsTyxFQUFTLEksRUFBd0I7QUFBQSxnQkFBbEIsUUFBa0IsdUVBQVAsS0FBTzs7QUFDM0MsZ0JBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIseUJBQXZCLENBQWhCOztBQUVBLGdCQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EseUJBQWEsU0FBYixDQUF1QixHQUF2QixtQkFBMkMsSUFBM0M7QUFDQSxnQkFBRyxRQUFILEVBQWE7QUFBRSw2QkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLE9BQTNCO0FBQXNDLGFBTFYsQ0FLVztBQUN0RCx5QkFBYSxTQUFiLEdBQXlCLE9BQXpCO0FBQ0Esc0JBQVUsV0FBVixDQUFzQixZQUF0Qjs7QUFFQTtBQUNBLHVCQUNJLFlBQVc7QUFDUCw2QkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQTNCOztBQUVBO0FBQ0Esb0JBQUcsQ0FBRSxhQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsT0FBaEMsQ0FBTCxFQUErQztBQUFFLGlDQUFhLEtBQWIsQ0FBbUIsWUFBbkI7QUFBbUM7QUFDdkYsYUFOTCxFQU1PLEdBTlA7QUFRSDs7QUFFRDs7Ozs4QkFDYSxZLEVBQTJDO0FBQUEsZ0JBQTdCLFFBQTZCLHVFQUFsQixnQkFBa0I7O0FBQ3BEO0FBQ0EsdUJBQ0ksWUFBVztBQUNQLDZCQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsSUFBOUI7QUFDQSw2QkFBYSxLQUFiLENBQW1CLFlBQW5CO0FBQ0gsYUFKTCxFQUlPLFFBSlA7QUFNSDs7OzhCQUVZLFksRUFBYztBQUN2QjtBQUNBLHVCQUNJLFlBQVc7QUFDUCw2QkFBYSxNQUFiO0FBQ0gsYUFITCxFQUdPLElBSFA7QUFLSDs7QUFFRDs7Ozs2Q0FDNEI7QUFDeEI7QUFDQSxnQkFBSSxvQkFBb0IsQ0FBQyxzQkFBRCxFQUF5QixtQkFBekIsRUFBOEMsc0JBQTlDLEVBQXNFLG9CQUF0RSxDQUF4Qjs7QUFFQSxrQkFBTSxVQUFOLENBQWlCLGlCQUFqQixFQUFvQyxVQUFTLFlBQVQsRUFBdUI7QUFDdkQsNkJBQWEsS0FBYixDQUFtQixZQUFuQixFQUFpQyxDQUFqQztBQUNILGFBRkQ7QUFHSDs7QUFFRDs7Ozs0QkFDNkI7QUFDekIsbUJBQU8sZ0JBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGTDs7SUFBWSxVOztBQUNaOzs7Ozs7OztJQUVhLFUsV0FBQSxVOzs7Ozs7Ozs7QUFFVDsrQkFDYztBQUNWLGlCQUFLLGlCQUFMLEdBQTBCLG1CQUFTLFFBQVQsT0FBd0IsV0FBVyxHQUFwQyxJQUE2QyxtQkFBUyxRQUFULE9BQXdCLFdBQVcsRUFBekc7QUFDQSxpQkFBSyxVQUFMO0FBQ0g7OztxQ0FFbUI7QUFDaEIsZ0JBQUksYUFBYSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBakI7O0FBRUE7QUFDQSxnQkFBRyxTQUFTLFVBQVosRUFBd0I7QUFBQyx1QkFBTyxLQUFQO0FBQWE7O0FBRXRDLGdCQUFJLFdBQVcsV0FBVyxhQUFYLENBQXlCLE9BQXpCLENBQWY7QUFDQSxnQkFBSSxXQUFXLFdBQVcsYUFBWCxDQUF5QixPQUF6QixDQUFmO0FBQ0EsZ0JBQUksYUFBYSxXQUFXLGFBQVgsQ0FBeUIsU0FBekIsQ0FBakI7QUFDQSxnQkFBSSxRQUFRLFdBQVcsZ0JBQVgsQ0FBNEIsSUFBNUIsQ0FBWjs7QUFFQTtBQUNBLHlDQUFJLEtBQUosR0FBVyxPQUFYLENBQW1CLFVBQVMsSUFBVCxFQUFlLENBQWYsRUFBa0I7QUFDakMsb0JBQUcsS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QixVQUF4QixDQUFILEVBQXdDO0FBQUUseUJBQUssaUJBQUwsQ0FBdUIsV0FBdkIsUUFBd0MsQ0FBeEM7QUFBOEM7QUFDeEYscUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsUUFBdEIsRUFBZ0MsTUFBaEMsRUFBd0MsVUFBeEMsRUFBb0QsVUFBcEQ7QUFDQSxxQkFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixDQUFwQjtBQUNILGFBSkQ7O0FBTUEsZ0JBQUksa0JBQWtCLFNBQVMsV0FBVyxPQUFYLENBQW1CLElBQTVCLENBQXRCOztBQUVBOztBQUVBO0FBQ0EsZ0JBQUcsbUJBQW1CLENBQXRCLEVBQXlCO0FBQ3JCLHlCQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsVUFBdkI7O0FBRUEsb0JBQUcsQ0FBRSxLQUFLLGlCQUFWLEVBQTZCO0FBQ3pCLDBCQUFNLENBQU4sRUFBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLE1BQXZCLEVBRHlCLENBQ087QUFDbkM7QUFDSjs7QUFFRDtBQUNBLGdCQUFHLG1CQUFvQixNQUFNLE1BQU4sR0FBZSxDQUF0QyxFQUEwQztBQUN0Qyx5QkFBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLFVBQXZCOztBQUVBLG9CQUFHLENBQUUsS0FBSyxpQkFBVixFQUE2QjtBQUN6QiwwQkFBTyxNQUFNLE1BQU4sR0FBZSxDQUF0QixFQUEwQixTQUExQixDQUFvQyxHQUFwQyxDQUF3QyxNQUF4QztBQUNIO0FBQ0o7O0FBRUQ7QUFDQSxnQkFBRyxDQUFFLEtBQUssaUJBQVYsRUFBNkI7QUFDekIsb0JBQUcsbUJBQW1CLENBQXRCLEVBQXlCO0FBQUUsMEJBQU0sQ0FBTixFQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsVUFBdkIsRUFBbUMsTUFBbkM7QUFBNkM7QUFDM0U7O0FBRUQ7QUFDQSxnQkFBRyxDQUFFLEtBQUssaUJBQVYsRUFBNkI7QUFDekIsb0JBQUcsbUJBQW9CLE1BQU0sTUFBTixHQUFlLENBQXRDLEVBQTBDO0FBQUUsMEJBQU8sTUFBTSxNQUFOLEdBQWUsQ0FBdEIsRUFBMEIsU0FBMUIsQ0FBb0MsR0FBcEMsQ0FBd0MsVUFBeEMsRUFBb0QsTUFBcEQ7QUFBOEQ7QUFDN0c7O0FBRUQ7QUFDQSxnQkFBRyxDQUFFLEtBQUssaUJBQVYsRUFBNkI7QUFDekIsc0JBQU8sa0JBQWtCLENBQXpCLEVBQTZCLFNBQTdCLENBQXVDLEdBQXZDLENBQTJDLE1BQTNDO0FBQ0g7O0FBRUQsa0JBQU0sZUFBTixFQUF1QixTQUF2QixDQUFpQyxHQUFqQyxDQUFxQyxNQUFyQzs7QUFFQSxnQkFBRyxDQUFFLEtBQUssaUJBQVYsRUFBNkI7QUFDekIsc0JBQU8sa0JBQWtCLENBQXpCLEVBQTZCLFNBQTdCLENBQXVDLEdBQXZDLENBQTJDLE1BQTNDO0FBQ0g7O0FBRUQ7QUFDQSxxQkFBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLE1BQXZCO0FBQ0EscUJBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixNQUF2Qjs7QUFFQSxrQkFBTSxDQUFOLEVBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixNQUF2QjtBQUNBLGtCQUFPLE1BQU0sTUFBTixHQUFlLENBQXRCLEVBQTBCLFNBQTFCLENBQW9DLEdBQXBDLENBQXdDLE1BQXhDOztBQUVBO0FBQ0EseUNBQUksS0FBSixHQUFXLE9BQVgsQ0FBbUIsVUFBUyxJQUFULEVBQWU7QUFBRTtBQUNoQyxvQkFBRyxDQUFFLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsTUFBeEIsQ0FBTCxFQUFzQztBQUNsQyx5QkFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixRQUFuQjtBQUNIO0FBQ0osYUFKRDs7QUFNQTtBQUNBLGdCQUFJLGdCQUFnQixTQUFTLGdCQUFULENBQTBCLGFBQTFCLENBQXBCO0FBQ0EseUNBQUksYUFBSixHQUFtQixPQUFuQixDQUEyQixVQUFTLElBQVQsRUFBZTtBQUFFO0FBQ3hDLHFCQUFLLGFBQUwsQ0FBbUIsR0FBbkIsRUFBd0IsV0FBeEIsR0FBc0MsS0FBdEM7QUFDSCxhQUZEO0FBR0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRkw7O0FBQ0E7Ozs7OztJQUVhLFUsV0FBQSxVOzs7Ozs7OytCQUNLO0FBQ1YsdUJBQVcsYUFBWDtBQUNBLHVCQUFXLFVBQVg7QUFDQSx1QkFBVyxZQUFYO0FBQ0g7Ozt3Q0FFc0I7QUFDbkIsZ0JBQUksYUFBYSxTQUFTLGFBQVQsQ0FBdUIsaUNBQXZCLENBQWpCO0FBQ0EsZ0JBQUksbUJBQW1CLFNBQVMsYUFBVCxDQUF1Qix1QkFBdkIsQ0FBdkI7QUFDQSxnQkFBSSxjQUFjLGlCQUFpQixnQkFBakIsQ0FBa0MsUUFBbEMsQ0FBbEI7O0FBRUE7QUFDQTs7QUFFQSx5Q0FBSSxXQUFKLEdBQWlCLE9BQWpCLENBQXlCLFVBQVMsTUFBVCxFQUFpQjtBQUFFOztBQUV4Qyx1QkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLENBQVQsRUFBWTtBQUN6QyxzQkFBRSxjQUFGOztBQUVBLHdCQUFJLGVBQWUsS0FBSyxPQUFMLENBQWEsSUFBaEM7QUFDQSx3QkFBSSxTQUFTLEtBQUssT0FBTCxDQUFhLE1BQTFCOztBQUVBLDRCQUFPLE1BQVA7QUFDSSw2QkFBSyxVQUFMO0FBQ0ksb0NBQVEsSUFBUjtBQUNBO0FBQ0osNkJBQUssT0FBTDtBQUNJO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFUUjs7QUFZQTtBQUNBLDZCQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFBeUI7QUFDckIsNEJBQUksUUFBUSxXQUFXLGFBQVgsQ0FBeUIsT0FBekIsQ0FBWjs7QUFFQSw4QkFBTSxRQUFOLEdBQWlCLENBQUMsTUFBTSxRQUF4QjtBQUNBLDRCQUFHLE1BQU0sUUFBVCxFQUFtQjtBQUNmLG1DQUFPLFNBQVAsR0FBbUIsY0FBbkI7QUFDSCx5QkFGRCxNQUVPO0FBQ0gsbUNBQU8sU0FBUCxHQUFtQixlQUFuQjtBQUNIO0FBQ0o7O0FBRUQ7QUFDQSw2QkFBUyxLQUFULEdBQWlCO0FBQ2IsNEJBQUksZ0JBQWdCLFdBQVcsYUFBWCxDQUF5QixXQUF6QixDQUFwQjs7QUFFQTtBQUNBLG1DQUFXLGFBQVgsQ0FBeUIsT0FBekIsRUFBa0MsUUFBbEMsR0FBNkMsS0FBN0M7QUFDQSxzQ0FBYyxTQUFkLEdBQTBCLGVBQTFCOztBQUVBO0FBQ0EsbUNBQVcsU0FBWCxHQUF1QixhQUF2Qjs7QUFFQTtBQUNBLG1DQUFXLGFBQVgsQ0FBeUIsV0FBekIsSUFBd0MsV0FBVyxhQUFYLENBQXlCLFdBQXpCLEVBQXNDLE1BQXRDLEVBQXhDLEdBQXlGLElBQXpGOztBQUVBO0FBQ0E7QUFDSDs7QUFFRDtBQUNBLDZCQUFTLEtBQVQsR0FBaUI7QUFDYjtBQUNBLG1DQUFXLGFBQVgsQ0FBeUIsT0FBekIsRUFBa0MsUUFBbEMsR0FBNkMsS0FBN0M7O0FBRUE7QUFDQSxtQ0FBVyxTQUFYLEdBQXVCLGlCQUFpQixNQUF4Qzs7QUFFQTtBQUNBLDRCQUFJLGVBQWUsV0FBVyxhQUFYLENBQXlCLFdBQXpCLENBQW5CO0FBQ0EsNEJBQUcsQ0FBRSxZQUFMLEVBQW1CO0FBQ2YsMkNBQWUsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWY7QUFDQSx5Q0FBYSxTQUFiLEdBQXlCLFVBQXpCO0FBQ0g7O0FBRUQscUNBQWEsV0FBYixHQUEyQixZQUEzQjtBQUNBLG1DQUFXLGFBQVgsQ0FBeUIsYUFBekIsRUFBd0MsV0FBeEMsQ0FBb0QsWUFBcEQ7QUFDSDtBQUNKLGlCQWxFRDtBQW1FSCxhQXJFRDs7QUF1RUEscUJBQVMsaUJBQVQsR0FBNkI7QUFDekIsb0JBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBbEI7QUFDQSw0QkFBWSxTQUFaLEdBQXdCLFVBQXhCO0FBQ0EsNEJBQVksU0FBWixHQUF3QixRQUF4QjtBQUNBLDJCQUFXLFlBQVgsQ0FBd0IsV0FBeEIsRUFBcUMsZ0JBQXJDO0FBQ0g7QUFDSjs7O3FDQUVtQjtBQUNoQixnQkFBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFqQjtBQUNBLGdCQUFJLFFBQVEsV0FBVyxnQkFBWCxDQUE0QixJQUE1QixDQUFaOztBQUVBLHlDQUFJLEtBQUosR0FBVyxPQUFYLENBQW1CLFVBQVMsSUFBVCxFQUFlO0FBQzlCLHFCQUFLLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQVMsQ0FBVCxFQUFZO0FBQ3ZDLHNCQUFFLGNBQUY7O0FBRUEsd0JBQUksa0JBQWtCLFNBQVMsV0FBVyxhQUFYLENBQXlCLFNBQXpCLEVBQW9DLE9BQXBDLENBQTRDLElBQXJELENBQXRCOztBQUVBO0FBQ0EsMEJBQU0sZUFBTixFQUF1QixTQUF2QixDQUFpQyxNQUFqQyxDQUF3QyxRQUF4Qzs7QUFFQTtBQUNBLHdCQUFHLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsTUFBeEIsQ0FBSCxFQUFvQztBQUNoQyw4QkFBTSxrQkFBa0IsQ0FBeEIsRUFBMkIsU0FBM0IsQ0FBcUMsR0FBckMsQ0FBeUMsUUFBekM7QUFDSCxxQkFGRCxNQUVPLElBQUcsS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QixNQUF4QixDQUFILEVBQW9DO0FBQ3ZDLDhCQUFNLGtCQUFrQixDQUF4QixFQUEyQixTQUEzQixDQUFxQyxHQUFyQyxDQUF5QyxRQUF6QztBQUNILHFCQUZNLE1BRUE7QUFDSDtBQUNBLDZCQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFFBQW5CO0FBQ0g7O0FBRUQ7QUFDQSwyQ0FBVyxVQUFYO0FBQ0gsaUJBcEJEO0FBcUJILGFBdEJEO0FBdUJIOzs7dUNBRXFCOztBQUVsQjtBQUNBLGdCQUFJLDhCQUE4QixTQUFTLGdCQUFULENBQTBCLG9DQUExQixDQUFsQzs7QUFFQSx5Q0FBSSwyQkFBSixHQUFpQyxPQUFqQyxDQUF5QyxVQUFTLE1BQVQsRUFBaUI7QUFDdEQsb0JBQUksbUJBQW1CLE9BQU8sT0FBUCxDQUFlLElBQXRDO0FBQ0Esb0JBQUksbUJBQW1CLE9BQU8sT0FBUCxDQUFlLElBQXRDO0FBQ0Esb0JBQUksV0FBVyxPQUFPLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsUUFBMUIsQ0FBZjs7QUFFQSx1QkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLENBQVQsRUFBWTtBQUN6QyxzQkFBRSxjQUFGOztBQUVBLCtDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLEVBQXNDLGdCQUF0QyxFQUF3RCxRQUF4RDtBQUNILGlCQUpEO0FBS0gsYUFWRDtBQVdIOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUlMOztJQUFZLEs7Ozs7Ozs7O0FBRVosSUFBSSw2QkFBSjs7SUFFYSxHLFdBQUEsRzs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixpQkFBSyxHQUFMO0FBQ0g7Ozs4QkFFWTtBQUNUO0FBQ0EsaUJBQUssc0JBQUw7O0FBRUE7QUFDQSxpQkFBSyxvQkFBTDs7QUFFQTtBQUNBLGdCQUFJLGVBQWUsU0FBUyxnQkFBVCxDQUEwQixjQUExQixDQUFuQjtBQUNBLHlDQUFJLFlBQUosR0FBa0IsT0FBbEIsQ0FBMEIsVUFBUyxJQUFULEVBQWU7QUFDckMscUJBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBUyxDQUFULEVBQVk7QUFDdkMsc0JBQUUsY0FBRjtBQUNBO0FBQ0Esd0JBQUksT0FBTyxNQUFNLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLE1BQXBCLENBQVg7O0FBRUE7QUFDQSx3QkFBSSxnQkFBZ0IsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQXBCO0FBQ0Esd0JBQUcsUUFBUSxhQUFYLEVBQTBCO0FBQUUsc0NBQWMsU0FBZCxDQUF3QixNQUF4QixDQUErQixRQUEvQjtBQUEyQzs7QUFFdkU7QUFDQSx5QkFBSyxhQUFMLENBQW1CLFNBQW5CLENBQTZCLEdBQTdCLENBQWlDLFFBQWpDOztBQUVBO0FBQ0Esd0JBQUksc0JBQUo7QUFDQSx3QkFBSSxvQkFBSjtBQUNILGlCQWZEO0FBZ0JILGFBakJEO0FBa0JIOzs7aURBRStCO0FBQzVCLG1DQUF1QixJQUFJLEdBQUosRUFBdkIsQ0FENEIsQ0FDTTtBQUNsQyxnQkFBSSxpQkFBaUIsU0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsQ0FBckI7QUFDQSx5Q0FBSSxjQUFKLEdBQW9CLE9BQXBCLENBQTRCLFVBQVMsT0FBVCxFQUFrQjtBQUMxQyxvQkFBSSxXQUFXLFFBQVEsaUJBQVIsQ0FBMEIsWUFBMUIsQ0FBdUMsTUFBdkMsRUFBK0MsS0FBL0MsQ0FBcUQsQ0FBckQsQ0FBZixDQUQwQyxDQUM4QjtBQUN4RSxxQ0FBcUIsR0FBckIsQ0FBeUIsUUFBekI7QUFDSCxhQUhEO0FBSUg7OzsrQ0FFNkI7QUFDMUIsZ0JBQUksY0FBYyxTQUFTLGdCQUFULENBQTBCLHFCQUExQixDQUFsQjtBQUNBLHlDQUFJLFdBQUosR0FBaUIsT0FBakIsQ0FBeUIsVUFBUyxZQUFULEVBQXVCO0FBQzVDLDZDQUFJLGFBQWEsUUFBakIsR0FBMkIsT0FBM0IsQ0FBbUMsVUFBUyxPQUFULEVBQWtCO0FBQ2pEO0FBQ0EsNEJBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixRQUF6Qjs7QUFFQTtBQUNBLHdCQUFHLENBQUUscUJBQXFCLEdBQXJCLENBQXlCLFFBQVEsRUFBakMsQ0FBTCxFQUEyQztBQUN2QyxnQ0FBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFFBQXRCO0FBQ0g7QUFDSixpQkFSRDtBQVNILGFBVkQ7QUFXSDs7Ozs7Ozs7Ozs7O1FDOURXLE8sR0FBQSxPO1FBYUEsVSxHQUFBLFU7Ozs7QUFiVCxTQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEIsU0FBMUIsRUFBcUM7QUFDeEMsUUFBSSxlQUFKOztBQUVBLFdBQU0sT0FBTixFQUFlO0FBQ1gsaUJBQVMsUUFBUSxhQUFqQjtBQUNBLFlBQUcsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLFNBQTFCLENBQUgsRUFBeUM7QUFBRSxtQkFBTyxNQUFQO0FBQWdCO0FBQzNELGtCQUFVLE1BQVY7QUFDSDs7QUFFRCxXQUFPLElBQVA7QUFDSDs7QUFFRDtBQUNPLFNBQVMsVUFBVCxDQUFvQixzQkFBcEIsRUFBNEMsUUFBNUMsRUFBc0Q7QUFDekQsYUFBUyxJQUFULENBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsVUFBUyxDQUFULEVBQVk7QUFDaEQscUNBQUksc0JBQUosR0FBNEIsT0FBNUIsQ0FBb0MsVUFBUyxTQUFULEVBQW9CO0FBQ3BELGdCQUFHLEVBQUUsTUFBRixDQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBSCxFQUEyQztBQUFFLHlCQUFTLEVBQUUsTUFBWDtBQUFvQjtBQUNwRSxTQUZEO0FBR0gsS0FKRDtBQUtIOzs7Ozs7Ozs7Ozs7QUNuQkQ7O0lBQVksVTs7Ozs7Ozs7SUFFQyxRLFdBQUEsUTs7Ozs7OzsrQkFFSztBQUNWLGlCQUFLLG1CQUFMO0FBQ0g7O0FBRUQ7Ozs7OENBQzZCO0FBQ3pCLGdCQUFJLHlCQUF5QixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBN0I7QUFDQSxnQkFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0EsZ0JBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBLGdCQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxnQkFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsZ0JBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBLGdCQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxnQkFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFkOztBQUVBLG1DQUF1QixTQUF2QixDQUFpQyxHQUFqQyxDQUFxQyxpQkFBckM7QUFDQSxvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFdBQVcsR0FBakMsRUFBc0MsYUFBdEM7QUFDQSxtQkFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLFdBQVcsRUFBaEMsRUFBb0MsWUFBcEM7QUFDQSxtQkFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLFdBQVcsRUFBaEMsRUFBb0MsWUFBcEM7QUFDQSxtQkFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLFdBQVcsRUFBaEMsRUFBb0MsWUFBcEM7QUFDQSxtQkFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLFdBQVcsRUFBaEMsRUFBb0MsWUFBcEM7QUFDQSxtQkFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLFdBQVcsRUFBaEMsRUFBb0MsWUFBcEM7QUFDQSxvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFdBQVcsR0FBakMsRUFBc0MsYUFBdEM7O0FBRUEsZ0JBQUksMkJBQTJCLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsTUFBbEIsRUFBMEIsTUFBMUIsRUFBa0MsTUFBbEMsRUFBMEMsTUFBMUMsRUFBa0QsT0FBbEQsQ0FBL0I7O0FBRUEsc0JBQUksd0JBQUosRUFBOEIsT0FBOUIsQ0FBc0MsVUFBUyxPQUFULEVBQWtCO0FBQ3BELHVDQUF1QixXQUF2QixDQUFtQyxPQUFuQztBQUNILGFBRkQ7O0FBSUEscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsc0JBQTFCO0FBQ0g7OzttQ0FFaUI7QUFDZCxnQkFBSSwyQkFBMkIsU0FBUyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxRQUExRTtBQUNBLGdCQUFJLGVBQWUsSUFBbkI7O0FBR0EseUNBQUksd0JBQUosR0FBOEIsT0FBOUIsQ0FBc0MsVUFBUyxPQUFULEVBQWtCO0FBQ3BELG9CQUFJLGVBQWdCLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsT0FBckQ7O0FBRUEsb0JBQUcsV0FBVyxZQUFkLEVBQTRCO0FBQ3hCLG1DQUFlLFFBQVEsU0FBUixDQUFrQixJQUFsQixDQUF1QixDQUF2QixDQUFmO0FBQ0g7QUFDSixhQU5EOztBQVFBLG1CQUFPLFlBQVA7QUFDSDs7Ozs7Ozs7O0FDbkRMOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFXOztBQUV2Qix1QkFBUyxJQUFUO0FBQ0EsZUFBSyxJQUFMO0FBQ0EsMkJBQVcsSUFBWDtBQUNBLCtCQUFhLElBQWI7QUFDQSxhQUFJLElBQUo7QUFDQSxtQkFBTyxJQUFQO0FBQ0EsbUJBQU8sSUFBUDs7QUFFQTtBQUNBLDJCQUFXLElBQVg7O0FBRUE7QUFDQSxXQUFPLFFBQVAsR0FBa0IsWUFBVztBQUN6QiwrQkFBVyxJQUFYO0FBQ0gsS0FGRDtBQUdILENBakJEOztBQUhBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCBYWFMgPSBcInh4c1wiO1xuZXhwb3J0IGNvbnN0IFhTID0gXCJ4c1wiO1xuZXhwb3J0IGNvbnN0IFNNID0gXCJzbVwiO1xuZXhwb3J0IGNvbnN0IE1EID0gXCJtZFwiO1xuZXhwb3J0IGNvbnN0IExHID0gXCJsZ1wiO1xuZXhwb3J0IGNvbnN0IFhMID0gXCJ4bFwiO1xuZXhwb3J0IGNvbnN0IFhYTCA9IFwieHhsXCI7XG4iLCJleHBvcnQgY2xhc3MgRGlhbG9nIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgZGlhbG9nVGVzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlhbG9nLXRyaWdnZXInKTtcbiAgICAgICAgaWYobnVsbCA9PSBkaWFsb2dUZXN0QnV0dG9ucykgeyByZXR1cm4gZmFsc2U7fVxuXG4gICAgICAgIFsuLi5kaWFsb2dUZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRGlhbG9nLnNldHVwKHRoaXMuZGF0YXNldC50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVCYWNrZHJvcCgpIHtcbiAgICAgICAgdGhpcy5iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJhY2tkcm9wLmNsYXNzTmFtZSA9IFwiYmFja2Ryb3BcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc05hbWUgPSBcImRpYWxvZy1jb250YWluZXJcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRGlzbWlzc0J1dHRvbigpIHtcbiAgICAgICAgbGV0IGRpc21pc3NCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGRpc21pc3NCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGlzbWlzcy1idXR0b24nKTtcbiAgICAgICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQoZGlzbWlzc0J1dHRvbik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5lckV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gYW5pbWF0ZSBvdXRcbiAgICAgICAgICAgIGlmKCAoZS50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygnZGlhbG9nLWNvbnRhaW5lcicpIHx8ICAgIC8vIGNsaWNrIG9uIGJhY2tkcm9wXG4gICAgICAgICAgICAgICAgKGUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc21pc3MnKSB8fCAgICAgICAgICAgICAvLyBjbGljayBvbiBkaXNtaXNzIGJ1dHRvblxuICAgICAgICAgICAgICAgIChlLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNtaXNzLWJ1dHRvbicpICkgeyAgICAgLy8gY2xpY2sgb24gY2xvc2luZyBpY29uXG5cbiAgICAgICAgICAgICAgICBEaWFsb2cuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwZW5kT25Eb20oKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoRGlhbG9nLmJhY2tkcm9wKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChEaWFsb2cuZGlhbG9nQ29udGFpbmVyKTtcbiAgICAgICAgRGlhbG9nLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChEaWFsb2cuZGlhbG9nKTtcbiAgICAgICAgRGlhbG9nLmRpYWxvZy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KCkge1xuICAgICAgICBEaWFsb2cuYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdpbicpO1xuXG4gICAgICAgIC8vIGZvY3VzIG9uIGZpcnN0IGlucHV0XG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGxldCBkaWFsb2dJbnB1dHMgPSBEaWFsb2cuZGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcbiAgICAgICAgbGV0IGZvY3VzSW5wdXRJc1NldCA9IGZhbHNlOyAvLyBmbGFnIHRvIHN0b3Agd2l0aCBmaXJzdCBpbnB1dFxuICAgICAgICBbLi4uZGlhbG9nSW5wdXRzXS5mb3JFYWNoKGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgICBpZihcImhpZGRlblwiICE9PSBpbnB1dC50eXBlICYmIGZhbHNlID09PSBmb2N1c0lucHV0SXNTZXQgKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBmb2N1c0lucHV0SXNTZXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQW5pbWF0aW9uQ2xhc3NlcygpIHtcbiAgICAgICAgRGlhbG9nLmRpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgICAgICBEaWFsb2cuYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZSgpIHtcbiAgICAgICAgRGlhbG9nLnJlbW92ZUFuaW1hdGlvbkNsYXNzZXMoKTtcblxuICAgICAgICAvLyB3YWl0IGZvciBhbmltYXRpb24gdG8gZW5kIGJlZm9yZSBjbGVhcmluZyBkaWFsb2cgb3V0XG4gICAgICAgIHNldFRpbWVvdXQoRGlhbG9nLmNsZWFyLCA0MDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcigpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChEaWFsb2cuZGlhbG9nKTsgLy8gbW92ZSBkaWFsb2cgYmVmb3JlIGl0cyBjb250YWluZXIgaXMgcmVtb3ZlZFxuICAgICAgICBEaWFsb2cuYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgIERpYWxvZy5kaWFsb2dDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIERpYWxvZy5kaWFsb2cgPSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXR1cChkaWFsb2dJZCkge1xuICAgICAgICAvLyBzdGFydCBjbGVhbiBpZiBhbiBvdGhlciBkaWFsb2cgYm94IGlzIGRpc3BsYXllZFxuICAgICAgICBpZihudWxsICE9IERpYWxvZy5kaWFsb2cpIHtcbiAgICAgICAgICAgIERpYWxvZy5yZW1vdmVBbmltYXRpb25DbGFzc2VzKCk7XG4gICAgICAgICAgICBEaWFsb2cuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIERpYWxvZy5kaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRpYWxvZ0lkKTtcbiAgICAgICAgaWYobnVsbCA9PSBEaWFsb2cuZGlhbG9nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIERpYWxvZy5jcmVhdGVEaXNtaXNzQnV0dG9uKCk7XG4gICAgICAgIERpYWxvZy5jcmVhdGVCYWNrZHJvcCgpO1xuICAgICAgICBEaWFsb2cuY3JlYXRlQ29udGFpbmVyKCk7XG4gICAgICAgIERpYWxvZy5jb250YWluZXJFdmVudHMoKTtcbiAgICAgICAgRGlhbG9nLmFwcGVuZE9uRG9tKCk7XG4gICAgICAgIHNldFRpbWVvdXQoRGlhbG9nLnNob3csIDEwMCk7IC8vIGdpdmUgdGltZSBmb3IgJ2luJyBhbmltYXRpb25cbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBVdGlscyAgZnJvbSAnLi9VdGlscyc7XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2xlYXJPdXRCdXR0b24oKTsgLy8gZWxlbWVudCBjcmVhdGlvbiAoYW5kIHRoZW4gZXZlbnQgcmVnaXN0cmF0aW9uKVxuICAgICAgICB0aGlzLnJlbW92ZUl0ZW1PbkNsaWNrKCk7IC8vIHJlZ2lzdGVyIGV2ZW50c1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQ29udGFpbmVyQ2hpbGRyZW5Db3VudE9ic2VydmVyKCk7IC8vIHJlZ2lzdGVyIGEgJ2NoaWxkIHJlbW92ZWQnIGV2ZW50IHRvIGRpc2FibGUgY29udGFpbmVyIGlmIG5lZWQgYmVcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ2xlYXJPdXRCdXR0b24oKSB7XG4gICAgICAgIC8vIHRhcmdldCBldmVyeSBmaWx0ZXIgYmxvY2sgb24gdGhlIHBhZ2VcbiAgICAgICAgbGV0IGZpbHRlckNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVyJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBjcmVhdGUgdHdvICdjbGVhciBmaWx0ZXIgb3V0JyBidXR0b25zIGZvciBlYWNoIG9uZSAob25lIGJ1dHRvbiBmb3IgbW9iaWxlIHNjcmVlbiwgb25lIGZvciBsYXJnZXIgc2NyZWVucylcbiAgICAgICAgWy4uLmZpbHRlckNvbnRhaW5lcnNdLmZvckVhY2goZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qIG1vYmlsZSBzY3JlZW5zICovXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBjbGVhciBvdXQgYnV0dG9uXG4gICAgICAgICAgICBsZXQgeHNDbGVhck91dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeHNDbGVhck91dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmaWx0ZXItY2xlYXIteHMnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyLWxhYmVsJykuYXBwZW5kQ2hpbGQoeHNDbGVhck91dEJ1dHRvbik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIG1vYmlsZSBjbGVhciBvdXQgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAgICAgICAgICB4c0NsZWFyT3V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRmlsdGVyLmNsZWFyT3V0RmlsdGVycyhjb250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIGxhcmdlciBzY3JlZW5zIChmcm9tIHNtIGJyZWFrcG9pbnQpICovXG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBjbGVhciBvdXQgYnV0dG9uXG4gICAgICAgICAgICBsZXQgc21DbGVhck91dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc21DbGVhck91dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmaWx0ZXItY2xlYXInKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzbUNsZWFyT3V0QnV0dG9uKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgY2xlYXIgb3V0IGJ1dHRvbiBjbGljayBldmVudFxuICAgICAgICAgICAgc21DbGVhck91dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEZpbHRlci5jbGVhck91dEZpbHRlcnMoY29udGFpbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlSXRlbU9uQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLmNsaWNrV2F0Y2goWydmaWx0ZXItaXRlbScsICd0YWctaXRlbSddLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgRmlsdGVyLnJlbW92ZUl0ZW1BY3Rpb24oaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb252ZXJ0SXRlbShpdGVtKSB7XG4gICAgICAgIC8vIGdldCBmaWx0ZXIgcGFyZW50IGZvciBuZXdUYWcgZGF0YS10YXJnZXQgYXR0cmlidXRlXG4gICAgICAgIGxldCBpdGVtRGF0YVRhcmdldCA9IGl0ZW0ucGFyZW50RWxlbWVudC5pZDtcblxuICAgICAgICAvLyBjcmVhdGUgYSB0YWcgd2l0aCBmaWx0ZXIncyBkYXRhXG4gICAgICAgIGxldCBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbmV3SXRlbS5jbGFzc05hbWUgPSBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZmlsdGVyLWl0ZW0nKSA/ICd0YWctaXRlbScgOiAnZmlsdGVyLWl0ZW0nO1xuICAgICAgICBuZXdJdGVtLmlubmVySFRNTCA9IGl0ZW0uaW5uZXJIVE1MO1xuICAgICAgICBuZXdJdGVtLmRhdGFzZXQudGFyZ2V0ID0gYCMke2l0ZW1EYXRhVGFyZ2V0fWA7XG4gICAgICAgIHJldHVybiBuZXdJdGVtO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVJdGVtQWN0aW9uKGl0ZW0pIHtcbiAgICAgICAgLy8gc2VsZWN0IHRhcmdldGVkIGNvbnRhaW5lclxuICAgICAgICBsZXQgaXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbS5kYXRhc2V0LnRhcmdldCk7XG5cbiAgICAgICAgbGV0IG5ld0l0ZW0gPSBGaWx0ZXIuY29udmVydEl0ZW0oaXRlbSk7XG4gICAgICAgIGl0ZW0ucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gaW5zZXJ0IG5ld2x5IGNyZWF0ZWQgdGFnIGludG8gZmlsdGVyIHRhZ3MgY29udGFpbmVyXG4gICAgICAgIGl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQobmV3SXRlbSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyT3V0RmlsdGVycyhjb250YWluZXIpIHtcbiAgICAgICAgLy8gZ2V0IGZpbHRlciBpdGVtc1xuICAgICAgICBsZXQgZmlsdGVySXRlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlci1pdGVtJyk7XG4gICAgICAgIFsuLi5maWx0ZXJJdGVtc10uZm9yRWFjaChmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgICAgIEZpbHRlci5yZW1vdmVJdGVtQWN0aW9uKGZpbHRlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyByZWdpc3RlckNvbnRhaW5lckNoaWxkcmVuQ291bnRPYnNlcnZlcigpIHtcbiAgICAgICAgLy8gb2JzZXJ2ZSBpZiBhIGNoaWxkIGVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tIGEgY29udGFpbmVyXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcbiAgICAgICAgICAgICAgICBGaWx0ZXIuY2hlY2tGaWx0ZXJDb250YWluZXJEaXNhYmxlZChtdXRhdGlvbi50YXJnZXQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNvbmZpZyA9IHsgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiBmYWxzZSwgY2hhcmFjdGVyRGF0YTogZmFsc2UgfTtcbiAgICAgICAgbGV0IGZpbHRlckxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlci1saXN0Jyk7XG4gICAgICAgIFsuLi5maWx0ZXJMaXN0c10uZm9yRWFjaChmdW5jdGlvbihmaWx0ZXJMaXN0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGZpbHRlckxpc3QsIGNvbmZpZyk7XG4gICAgICAgICAgICBGaWx0ZXIuY2hlY2tGaWx0ZXJDb250YWluZXJEaXNhYmxlZChmaWx0ZXJMaXN0KTsgLy8gcGFnZSBsb2FkIGZpcnN0IGNoZWNrXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGVja0ZpbHRlckNvbnRhaW5lckRpc2FibGVkKGZpbHRlckxpc3QpIHtcbiAgICAgICAgbGV0IGZpbHRlckNvbnRhaW5lciA9IGZpbHRlckxpc3QucGFyZW50RWxlbWVudDtcblxuICAgICAgICBpZihmaWx0ZXJMaXN0LmNoaWxkRWxlbWVudENvdW50IDwgMSkge1xuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgRm9ybSB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyb3Bkb3duKCkge1xuICAgICAgICBsZXQgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi10cmlnZ2VyJyk7XG4gICAgICAgIFsuLi5kcm9wZG93blRyaWdnZXJzXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSBidXR0b24ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbGlzdCcpO1xuICAgICAgICAgICAgbGV0IGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiXCIpID8gXCJibG9ja1wiIDogXCJcIjtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkFjdGl2ZSA9ICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCI7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBjbGlja2FibGUgYGRpdmAgdG8gY2xvc2UgdGhlIGRyb3Bkb3duIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZHJvcGRvd24gZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmKGRyb3Bkb3duQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkY2xpY2thYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuY2xhc3NOYW1lID0gXCJiYWNrZHJvcC1oaWRkZW5cIjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZENoaWxkKCRjbGlja2FibGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2xpY2thYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjaG9pY2UgZXZlbnRcbiAgICAgICAgICAgIGxldCAkYW5jaG9yVGFncyA9ICRkcm9wZG93bkxpc3QucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICAgICAgICAgICAgWy4uLiRhbmNob3JUYWdzXS5mb3JFYWNoKGZ1bmN0aW9uKGFuY2hvcikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uT3B0aW9uID0gYW5jaG9yLnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwcmV2aW91c2x5IHNlbGVjdGVkIGxpc3QgaXRlbSAocmVtb3ZlIGFjdGl2ZSBjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0gPSAkZHJvcGRvd25MaXN0LnF1ZXJ5U2VsZWN0b3IoJ2xpLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudEFjdGl2ZUxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBjbGlja2VkIGxpc3QgaXRlbSBieSBnaXZpbmcgaXQgYGFjdGl2ZWAgY2xhc3MgYW5kIGNoYW5naW5nIGJ1dHRvbiBsYWJlbCB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc2VsZWN0aW9uT3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBkcm9wZG93bi1saXN0XG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCA6IHJlbW92ZSBvcGVuZWQgYmFja2Ryb3AtaGlkZGVuXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcC1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbmNvbnN0IEZBREVPVVRfRFVSQVRJT04gPSA0ICogMTAwMDtcblxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiB7XG5cbiAgICAvLyBpbml0aWFsaXplIG5vdGlmaWNhdGlvbiBiZWhhdmlvdXJcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnJlbW92ZU9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvciBjbGVhbnVwIG5vdGlmaWNhdGlvbnMgY29udGFpbmVyXG4gICAgc3RhdGljIHNldHVwQ29udGFpbmVyKCkgIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RpZmljYXRpb24tY29udGFpbmVyJyk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV2ZW50dWFsIGV4aXN0aW5nIGNvbnRhaW5lciBlbGVtZW50IHRvIHN0YXJ0IGNsZWFuXG4gICAgICAgIGlmKG51bGwgIT0gY29udGFpbmVyKSB7IGNvbnRhaW5lci5yZW1vdmUoKTsgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgYXBwZW5kIHRoZSBub3RpZmljYXRpb24gY29udGFpbmVyIGFzIGJvZHkgZmlyc3QgZWxlbWVudFxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmlkID0gJ25vdGlmaWNhdGlvbi1jb250YWluZXInO1xuICAgICAgICBsZXQgZmlyc3RQYWdlRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgZmlyc3RQYWdlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gc2V0IG1lc3NhZ2UgdGV4dCBhbmQgbm90aWZpY2F0aW9uIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yKVxuICAgIHN0YXRpYyBjcmVhdGUobWVzc2FnZSwgdHlwZSwgaXNTdGlja3kgPSBmYWxzZSkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcblxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKGBub3RpZmljYXRpb24tJHt0eXBlfWApO1xuICAgICAgICBpZihpc1N0aWNreSkgeyBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnc3RpY2snKTsgfSAvLyBzdGlja3kgbm90aWZpY2F0aW9ucyBtaWdodCBiZSB1c2VkIGZvciBsb25nIG1lc3NhZ2VzXG4gICAgICAgIG5vdGlmaWNhdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcblxuICAgICAgICAvLyBhbmltYXRlIGluXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnaW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIGZhZGUgb3V0IG5vdGlmaWNhdGlvbiAodW5sZXNzIGl0IGhhcyAnc3RpY2snIGNsYXNzKVxuICAgICAgICAgICAgICAgIGlmKCEgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2snKSkgeyBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uKTsgfVxuICAgICAgICAgICAgfSwgMTAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9sZCBub3RpZmljYXRpb25zXG4gICAgc3RhdGljIGNsZWFuKG5vdGlmaWNhdGlvbiwgZHVyYXRpb24gPSBGQURFT1VUX0RVUkFUSU9OKSB7XG4gICAgICAgIC8vIGZhZGVvdXQgbm90aWZpY2F0aW9uIGFmdGVyIHNwZWNpZmllZCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgKGRlZmF1bHQgPSBGQURFT1VUX0RVUkFUSU9OKVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNsZWFyKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBkdXJhdGlvblxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcihub3RpZmljYXRpb24pIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5vdGlmaWNhdGlvbiBmcm9tIERPTSBvbmNlIGl0cyBmYWRlb3V0IGFuaW1hdGlvbiBoYXMgZW5kZWQgKGFib3V0IDFzIHRvIGJlIHN1cmUpXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAxMDAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50IG9uICdkb2N1bWVudCcgZm9yIG5vdGlmaWNhdGlvbnMgdGhhdCB3aWxsIGJlIGFkZGVkIGxhdGVyIG9uIHRoZSBET01cbiAgICBzdGF0aWMgcmVtb3ZlT25DbGlja0V2ZW50KCkge1xuICAgICAgICAvLyBub3RpZmljYXRpb25zIGFyZSByZW1vdmVkIHdoZW4gY2xpY2tlZCBvblxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZXMgPSBbJ25vdGlmaWNhdGlvbi1zdWNjZXNzJywgJ25vdGlmaWNhdGlvbi1pbmZvJywgJ25vdGlmaWNhdGlvbi13YXJuaW5nJywgJ25vdGlmaWNhdGlvbi1lcnJvciddO1xuXG4gICAgICAgIFV0aWxzLmNsaWNrV2F0Y2gobm90aWZpY2F0aW9uVHlwZXMsIGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNsZWFuKG5vdGlmaWNhdGlvbiwgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGdldHRlclxuICAgIHN0YXRpYyBnZXQgZmFkZW91dER1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gRkFERU9VVF9EVVJBVElPTjtcbiAgICB9XG59IiwiaW1wb3J0ICogYXMgQ29uc3RhbnRlcyBmcm9tICcuL0NvbnN0YW50ZXMnO1xuaW1wb3J0IHsgVmlld1BvcnQgfSBmcm9tICcuL1ZpZXdQb3J0JztcblxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24ge1xuXG4gICAgLy8gbGF1bmNoIGNsYXNzIG1ldGhvZHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5pc1NtYWxsUGFnaW5hdGlvbiA9IChWaWV3UG9ydC5nZXRXaWR0aCgpID09PSBDb25zdGFudGVzLlhYUykgfHwgKFZpZXdQb3J0LmdldFdpZHRoKCkgPT09IENvbnN0YW50ZXMuWFMpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHBhZ2UgY29udGFpbnMgYSBwYWdpbmF0aW9uIGVsZW1lbnQgYmVmb3JlIG1vdmluZyBmb3J3YXJkXG4gICAgICAgIGlmKG51bGwgPT09IHBhZ2luYXRpb24pIHtyZXR1cm4gZmFsc2V9O1xuXG4gICAgICAgIGxldCBwcmV2SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnByZXYnKTtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICAgICAgICBsZXQgYWN0aXZlSXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gc2V0IC8gcmVzZXQgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbGxpcHNpcycpKSB7IGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQgPSBgJHtpfWA7IH1cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJywgJ3Nob3cnLCAnZWxsaXBzaXMnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5wYWdlID0gaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KGFjdGl2ZUl0ZW0uZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAvKiBhZGQgYXBwcm9wcmlhdGUgY2xhc3NlczogKi9cblxuICAgICAgICAvLyBkaXNhYmxlICdwcmV2JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgcHJldkl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgaWYoISB0aGlzLmlzU21hbGxQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNbM10uY2xhc3NMaXN0LmFkZCgnc2hvdycpOyAvLyBpZiBhY3RpdmUgcGFnZSBpcyAxLCB0aGUgdGhpcmQgaXRlbSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc2FibGUgJ25leHQnIGJ1dHRvbiBpZiBhY3RpdmUgcGFnZSBpcyB0aGUgbGFzdCBvbmVcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4ID09IChpdGVtcy5sZW5ndGggLSAyKSkge1xuICAgICAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgaWYoISB0aGlzLmlzU21hbGxQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDQpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZighIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA+PSA0KSB7IGl0ZW1zWzJdLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbGFzdCBlbGxpcHNpcyBjaGVja1xuICAgICAgICBpZighIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA8PSAoaXRlbXMubGVuZ3RoIC0gNSkpIHsgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDMpXS5jbGFzc0xpc3QuYWRkKCdlbGxpcHNpcycsICdzaG93Jyk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2ZSBpdGVtLCBwcmV2aW91cyBhbmQgbmV4dCBvbmVzXG4gICAgICAgIGlmKCEgdGhpcy5pc1NtYWxsUGFnaW5hdGlvbikge1xuICAgICAgICAgICAgaXRlbXNbKGFjdGl2ZUl0ZW1JbmRleCAtIDEpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICBpZighIHRoaXMuaXNTbWFsbFBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggKyAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldiwgbmV4dCwgZmlyc3QgYW5kIGxhc3QgcGFnZXMgYXJlIGRpc3BsYXllZCBhcyB3ZWxsXG4gICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIGl0ZW1zWzFdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbKGl0ZW1zLmxlbmd0aCAtIDIpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gaGlkZSBldmVyeSBvdGhlciBpdGVtc1xuICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcbiAgICAgICAgICAgIGlmKCEgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlcGxhY2UgJ2VsbGlwc2lzJyBjbGFzcyBsaXN0IGl0ZW0gY29udGVudCB3aXRoIDMgZG90c1xuICAgICAgICBsZXQgZWxsaXBzaXNJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLmVsbGlwc2lzJyk7XG4gICAgICAgIFsuLi5lbGxpcHNpc0l0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS50ZXh0Q29udGVudCA9IFwiLi4uXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Ob3RpZmljYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgU3R5bGVndWlkZSB7XG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIFN0eWxlZ3VpZGUuaW5wdXRGZWVkYmFjaygpO1xuICAgICAgICBTdHlsZWd1aWRlLnBhZ2luYXRpb24oKTtcbiAgICAgICAgU3R5bGVndWlkZS5ub3RpZmljYXRpb24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5wdXRGZWVkYmFjaygpIHtcbiAgICAgICAgbGV0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdGVzLWlucHV0LXRlc3QgLmlucHV0LWdyb3VwJyk7XG4gICAgICAgIGxldCB0ZXN0QnV0dG9uc0dyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnB1dC1idXR0b25zJyk7XG4gICAgICAgIGxldCB0ZXN0QnV0dG9ucyA9IHRlc3RCdXR0b25zR3JvdXAucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cbiAgICAgICAgLy8gaW5zZXJ0IGFuIGVtcHR5IHNwYW4gYXMgaGVpZ2h0IHBsYWNlaG9sZGVyXG4gICAgICAgIGNyZWF0ZVBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgWy4uLnRlc3RCdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikgeyAvLyBzcHJlYWQgb3BlcmF0b3Igc28gSUUgYWNjZXB0cyB0byBsb29wIHRocm91Z2ggcXVlcnlTZWxlY3RvckFsbCByZXN1bHRcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1RleHQgPSB0aGlzLmRhdGFzZXQudGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uID0gdGhpcy5kYXRhc2V0LmFjdGlvbjtcblxuICAgICAgICAgICAgICAgIHN3aXRjaChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRpc2FibGVkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGlzYWJsZShidXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc2FibGVkID0gIWlucHV0LmRpc2FibGVkO1xuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRW5hYmxlIGlucHV0XCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXNldCBzdGF0ZVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZUJ1dHRvbiA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmJ0bi1ncmV5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW51cCBwb3RlbnRpYWxseSBkaXNhYmxlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUJ1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2FibGUgaW5wdXRcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3RhdGVzIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSBcImlucHV0LWdyb3VwXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZlZWRiYWNrIHN0YXRlIGlmIGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpID8gaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKS5yZW1vdmUoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjcmVhdGUgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVQbGFjZWhvbGRlcigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBpbnB1dCBzdGF0ZSBmZWVkYmFja1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHN0YXRlKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbiB1cCBpbiBjYXNlIHRoZSBpbnB1dCBoYXMgYmVlbiBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGNsYXNzIHRvIGlucHV0LWdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cCBcIiArIGFjdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBmZWVkYmFjayBzcGFuIG9yIGNyZWF0ZSBvbmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrU3BhbiA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCEgZmVlZGJhY2tTcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkYmFja1NwYW4uY2xhc3NOYW1lID0gXCJmZWVkYmFja1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLnRleHRDb250ZW50ID0gZmVlZGJhY2tUZXh0O1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJsb2NrJykuYXBwZW5kQ2hpbGQoZmVlZGJhY2tTcGFuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5jbGFzc05hbWUgPSBcImZlZWRiYWNrXCI7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5pbm5lckhUTUwgPSBcIiZuYnNwO1wiO1xuICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIHRlc3RCdXR0b25zR3JvdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHBhZ2luYXRpb24oKSB7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IHBhcnNlSW50KHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmRhdGFzZXQucGFnZSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gb2xkIGFjdGl2ZSBpdGVtXG4gICAgICAgICAgICAgICAgaXRlbXNbYWN0aXZlSXRlbUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIC8vIHByZXYgJiBuZXh0IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXYnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXggKyAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RlZCBuZXcgYWN0aXZlIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZWxhdW5jaCBmdW5jdGlvbiBmb3IgZGVtbyBwdXJwb3NlXG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmaWNhdGlvbigpIHtcblxuICAgICAgICAvLyBzdGFuZGFyZCBidXR0b25zIChub24tc3RpY2t5IG5vdGlmaWNhdGlvbnMpXG4gICAgICAgIGxldCBzdGFuZGFyZE5vdGlmaWNhdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm90aWZpY2F0aW9ucy10ZXN0LWJ1dHRvbnMgYnV0dG9uJyk7XG5cbiAgICAgICAgWy4uLnN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dDtcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlID0gYnV0dG9uLmRhdGFzZXQudHlwZTtcbiAgICAgICAgICAgIGxldCBpc1N0aWNreSA9IGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3N0aWNreScpXG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5jcmVhdGUobm90aWZpY2F0aW9uVGV4dCwgbm90aWZpY2F0aW9uVHlwZSwgaXNTdGlja3kpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL1V0aWxzJztcblxubGV0IHZpc2libGVUYWJDb250ZW50SWRzO1xuXG5leHBvcnQgY2xhc3MgVGFiIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFiKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRhYigpIHtcbiAgICAgICAgLy8gdXBkYXRlIGFjdGl2ZSB0YWIocylcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XG5cbiAgICAgICAgLy8gaGlkZSBub24gYWN0aXZlIGNvbnRlbnQgYXQgcGFnZSBzdGFydCB1cCAoc2hvdyBzdGlsbCBkaXNwbGF5IGFjdGl2ZSBjb250ZW50KVxuICAgICAgICB0aGlzLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XG5cbiAgICAgICAgLy8gbWVudSBiZWhhdmlvdXJcbiAgICAgICAgbGV0IHRhYk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLW1lbnUgYScpO1xuICAgICAgICBbLi4udGFiTWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGxpbmsgb3duaW5nIHRhYlxuICAgICAgICAgICAgICAgIGxldCB0YWJzID0gVXRpbHMuY2xvc2VzdChsaW5rLCAndGFicycpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGlkZSBjdXJyZW50IGFjdGl2ZSBjb250ZW50XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZU1lbnVUYWIgPSB0YWJzLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IGFjdGl2ZU1lbnVUYWIpIHsgYWN0aXZlTWVudVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkICdhY3RpdmUnIGNsYXNzIHRvIGxpbmsgcGFyZW50XG4gICAgICAgICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gYW5kIGZpbmFsbHkgdXBkYXRlIERPTVxuICAgICAgICAgICAgICAgIFRhYi51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XG4gICAgICAgICAgICAgICAgVGFiLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKSB7XG4gICAgICAgIHZpc2libGVUYWJDb250ZW50SWRzID0gbmV3IFNldCgpOyAvLyBzdGFydCBjbGVhblxuICAgICAgICBsZXQgYWN0aXZlVGFiTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicy1tZW51IC5hY3RpdmUnKTtcbiAgICAgICAgWy4uLmFjdGl2ZVRhYk1lbnVzXS5mb3JFYWNoKGZ1bmN0aW9uKHRhYk1lbnUpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRJZCA9IHRhYk1lbnUuZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJykuc2xpY2UoMSk7IC8vIHJlbW92ZSB0aGUgIyBzeW1ib2xcbiAgICAgICAgICAgIHZpc2libGVUYWJDb250ZW50SWRzLmFkZCh0YXJnZXRJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlTm9uQWN0aXZlQ29udGVudCgpIHtcbiAgICAgICAgbGV0IHRhYkNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMgLnRhYnMtY29udGVudCcpO1xuICAgICAgICBbLi4udGFiQ29udGVudHNdLmZvckVhY2goZnVuY3Rpb24oY29udGVudEJsb2NrKSB7XG4gICAgICAgICAgICBbLi4uY29udGVudEJsb2NrLmNoaWxkcmVuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCBjbGVhbiBieSByZW1vdmluZyAnaGlkZGVuJyBjbGFzc1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIGNvbnRlbnRzIHRoYXQgYXJlIG5vdCBpbiBhbiBhY3RpdmUgc3RhdGUgdGFiXG4gICAgICAgICAgICAgICAgaWYoISB2aXNpYmxlVGFiQ29udGVudElkcy5oYXMoY29udGVudC5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGxldCBwYXJlbnQ7XG5cbiAgICB3aGlsZShlbGVtZW50KSB7XG4gICAgICAgIHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYocGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7IHJldHVybiBwYXJlbnQ7IH1cbiAgICAgICAgZWxlbWVudCA9IHBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gYWxsb3dzIGVsZW1lbnRzIHdpdGggYSBzcGVjaWZpYyBjbGFzcyB0byBiZSBjbGlja2FibGUgZXZlbiBpZiB0aGV5IGFyZSBub3Qgb24gdGhlIERPTSB3aGVuIHRoaXMgbWV0aG9kIGlzIGNhbGxlZFxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrV2F0Y2godGFyZ2V0ZWRFbGVtZW50Q2xhc3NlcywgY2FsbGJhY2spIHtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIFsuLi50YXJnZXRlZEVsZW1lbnRDbGFzc2VzXS5mb3JFYWNoKGZ1bmN0aW9uKGNsYXNzSXRlbSkge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzSXRlbSkpIHsgY2FsbGJhY2soZS50YXJnZXQpIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59IiwiaW1wb3J0ICogYXMgQ29uc3RhbnRlcyBmcm9tICcuL0NvbnN0YW50ZXMnO1xuXG5leHBvcnQgY2xhc3MgVmlld1BvcnQge1xuXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5qZWN0Vmlld1BvcnRVdGlscygpO1xuICAgIH1cblxuICAgIC8vIGluamVjdCBjdXN0b20gRE9NIGVsZW1lbnRzIHRvIGdldCBicmVha3BvaW50cyBpbmZvXG4gICAgc3RhdGljIGluamVjdFZpZXdQb3J0VXRpbHMoKSB7XG4gICAgICAgIGxldCB2aWV3UG9ydFV0aWxzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB4eHNWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB4c1ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHNtVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgbWRWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBsZ1ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHhsVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgeHhsVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHZpZXdQb3J0VXRpbHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInZpZXctcG9ydC11dGlsc1wiKTtcbiAgICAgICAgeHhzVmlldy5jbGFzc0xpc3QuYWRkKENvbnN0YW50ZXMuWFhTLCBcInZpc2libGUteHhzXCIpO1xuICAgICAgICB4c1ZpZXcuY2xhc3NMaXN0LmFkZChDb25zdGFudGVzLlhTLCBcInZpc2libGUteHNcIik7XG4gICAgICAgIHNtVmlldy5jbGFzc0xpc3QuYWRkKENvbnN0YW50ZXMuU00sIFwidmlzaWJsZS1zbVwiKTtcbiAgICAgICAgbWRWaWV3LmNsYXNzTGlzdC5hZGQoQ29uc3RhbnRlcy5NRCwgXCJ2aXNpYmxlLW1kXCIpO1xuICAgICAgICBsZ1ZpZXcuY2xhc3NMaXN0LmFkZChDb25zdGFudGVzLkxHLCBcInZpc2libGUtbGdcIik7XG4gICAgICAgIHhsVmlldy5jbGFzc0xpc3QuYWRkKENvbnN0YW50ZXMuWEwsIFwidmlzaWJsZS14bFwiKTtcbiAgICAgICAgeHhsVmlldy5jbGFzc0xpc3QuYWRkKENvbnN0YW50ZXMuWFhMLCBcInZpc2libGUteHhsXCIpO1xuXG4gICAgICAgIGxldCB2aWV3UG9ydFV0aWxzRG9tRWxlbWVudHMgPSBbeHhzVmlldywgeHNWaWV3LCBzbVZpZXcsIG1kVmlldywgbGdWaWV3LCB4bFZpZXcsIHh4bFZpZXddO1xuXG4gICAgICAgIFsuLi52aWV3UG9ydFV0aWxzRG9tRWxlbWVudHNdLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgdmlld1BvcnRVdGlsc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3UG9ydFV0aWxzQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0V2lkdGgoKSB7XG4gICAgICAgIGxldCB2aWV3UG9ydFV0aWxzRG9tRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlldy1wb3J0LXV0aWxzJykuY2hpbGRyZW47XG4gICAgICAgIGxldCBjdXJyZW50V2lkdGggPSBudWxsO1xuXG5cbiAgICAgICAgWy4uLnZpZXdQb3J0VXRpbHNEb21FbGVtZW50c10uZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudFN0eWxlID0gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkpO1xuXG4gICAgICAgICAgICBpZihcImJsb2NrXCIgPT0gZWxlbWVudFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFdpZHRoID0gZWxlbWVudC5jbGFzc0xpc3QuaXRlbSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRXaWR0aDtcbiAgICB9XG59IiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vRm9ybSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4vVGFiJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJy4vRGlhbG9nJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vRmlsdGVyJztcbmltcG9ydCB7IFZpZXdQb3J0IH0gZnJvbSAnLi9WaWV3UG9ydCc7XG5cbi8vIHN0eWxlZ3VpZGUgY3VzdG9tIGV4YW1wbGVzXG5pbXBvcnQgeyBTdHlsZWd1aWRlIH0gZnJvbSAnLi9TdHlsZWd1aWRlJztcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgVmlld1BvcnQuaW5pdCgpO1xuICAgIEZvcm0uaW5pdCgpO1xuICAgIFBhZ2luYXRpb24uaW5pdCgpO1xuICAgIE5vdGlmaWNhdGlvbi5pbml0KCk7XG4gICAgVGFiLmluaXQoKTtcbiAgICBEaWFsb2cuaW5pdCgpO1xuICAgIEZpbHRlci5pbml0KCk7XG5cbiAgICAvLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuICAgIFN0eWxlZ3VpZGUuaW5pdCgpO1xuXG4gICAgLy8gbWV0aG9kcyB0byByZWxvYWQgb24gcGFnZSByZXNpemVcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5pbml0KCk7XG4gICAgfTtcbn07Il19
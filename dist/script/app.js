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


        // launch class methods
        value: function init() {
            this.clearOutButton(); // element creation
            this.removeFilterOnClick(); // event declaration
            this.removeFilterTagOnClick(); // event declaration
        }
    }, {
        key: 'removeFilterOnClick',
        value: function removeFilterOnClick() {
            Utils.clickWatch(['filter'], function (filter) {
                Filter.removeFilterAction(filter);
            });
        }
    }, {
        key: 'removeFilterTagOnClick',
        value: function removeFilterTagOnClick() {
            Utils.clickWatch(['filter-tag'], function (tag) {
                Filter.removeFilterTagAction(tag);
            });
        }
    }, {
        key: 'convertTagToFilter',
        value: function convertTagToFilter(tag) {
            // get filter parent for newTag data-target attribute
            var filterTagsContainer = tag.parentElement.id;

            // create a filter with tag's data
            var newFilter = document.createElement('li');
            newFilter.className = "filter";
            newFilter.innerHTML = tag.innerHTML;
            newFilter.dataset.origin = '#' + filterTagsContainer;
            return newFilter;
        }
    }, {
        key: 'convertFilterToTag',
        value: function convertFilterToTag(filter) {
            // get filter parent for newTag data-target attribute
            var filtersContainer = filter.parentElement.id;

            // create a tag with filter's data
            var newTag = document.createElement('li');
            newTag.className = "filter-tag";
            newTag.innerHTML = filter.innerHTML;
            newTag.dataset.target = '#' + filtersContainer;
            return newTag;
        }
    }, {
        key: 'removeFilterAction',
        value: function removeFilterAction(filter) {
            // select targeted container
            var filterTagsContainer = document.querySelector(filter.dataset.origin);

            var newTag = Filter.convertFilterToTag(filter);
            filter.remove();

            // insert newly created tag into filter tags container
            filterTagsContainer.appendChild(newTag);
        }
    }, {
        key: 'removeFilterTagAction',
        value: function removeFilterTagAction(tag) {
            // select targeted container and last element (for it to remain the last one)
            var filtersContainer = document.querySelector(tag.dataset.target);
            var lastElementChild = filtersContainer.lastElementChild; // last element is clear out button

            var newFilter = Filter.convertTagToFilter(tag);
            tag.remove();

            // insert newly created filter into filter container
            filtersContainer.insertBefore(newFilter, lastElementChild);
        }
    }, {
        key: 'clearOutButton',
        value: function clearOutButton() {
            var filterContainers = document.querySelectorAll('.filters');
            [].concat(_toConsumableArray(filterContainers)).forEach(function (container) {
                // create the 'button'
                var clearFilter = document.createElement('li');
                clearFilter.classList.add('clear-filters');
                container.appendChild(clearFilter);
                clearFilter.addEventListener('click', function () {
                    Filter.hideFilterContainer(container);
                });
            });
        }
    }, {
        key: 'hideFilterContainer',
        value: function hideFilterContainer(container) {
            // first remove every child element
            [].concat(_toConsumableArray(container.children)).forEach(function (filter) {
                if (filter.classList.contains('clear-filters')) {
                    return;
                } // doesn't remove clear out button
                Filter.removeFilterAction(filter);
            });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdFxcRGlhbG9nLmpzIiwic3JjXFxzY3JpcHRcXEZpbHRlci5qcyIsInNyY1xcc2NyaXB0XFxGb3JtLmpzIiwic3JjXFxzY3JpcHRcXE5vdGlmaWNhdGlvbi5qcyIsInNyY1xcc2NyaXB0XFxQYWdpbmF0aW9uLmpzIiwic3JjXFxzY3JpcHRcXFN0eWxlZ3VpZGUuanMiLCJzcmNcXHNjcmlwdFxcVGFiLmpzIiwic3JjXFxzY3JpcHRcXFV0aWxzLmpzIiwic3JjXFxzY3JpcHRcXG1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7SUNBYSxNLFdBQUEsTTs7Ozs7Ozs7O0FBRVQ7K0JBQ2M7QUFDVixnQkFBSSxvQkFBb0IsU0FBUyxnQkFBVCxDQUEwQixpQkFBMUIsQ0FBeEI7QUFDQSxnQkFBRyxRQUFRLGlCQUFYLEVBQThCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOztBQUU5Qyx5Q0FBSSxpQkFBSixHQUF1QixPQUF2QixDQUErQixVQUFTLE1BQVQsRUFBaUI7QUFDNUMsdUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4QywyQkFBTyxVQUFQLENBQWtCLEtBQUssT0FBTCxDQUFhLE1BQS9CO0FBQ0gsaUJBRkQ7QUFHSCxhQUpEO0FBS0g7OztnQ0FFYztBQUNYO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLGVBQUw7O0FBRUE7QUFDQSxpQkFBSyxlQUFMO0FBQ0g7Ozt5Q0FFdUI7QUFDcEIsaUJBQUssUUFBTCxHQUFnQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxpQkFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNIOzs7MENBRXdCO0FBQ3JCLGlCQUFLLGVBQUwsR0FBdUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0EsaUJBQUssZUFBTCxDQUFxQixTQUFyQixHQUFpQyxr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QVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixRQUF0QjtBQUNIO0FBQ0osaUJBUkQ7QUFTSCxhQVZEO0FBV0g7Ozs7Ozs7Ozs7OztRQzlEVyxPLEdBQUEsTztRQWFBLFUsR0FBQSxVOzs7O0FBYlQsU0FBUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCLFNBQTFCLEVBQXFDO0FBQ3hDLFFBQUksZUFBSjs7QUFFQSxXQUFNLE9BQU4sRUFBZTtBQUNYLGlCQUFTLFFBQVEsYUFBakI7QUFDQSxZQUFHLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixTQUExQixDQUFILEVBQXlDO0FBQUUsbUJBQU8sTUFBUDtBQUFnQjtBQUMzRCxrQkFBVSxNQUFWO0FBQ0g7O0FBRUQsV0FBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDTyxTQUFTLFVBQVQsQ0FBb0Isc0JBQXBCLEVBQTRDLFFBQTVDLEVBQXNEO0FBQ3pELGFBQVMsSUFBVCxDQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFVBQVMsQ0FBVCxFQUFZO0FBQ2hELHFDQUFJLHNCQUFKLEdBQTRCLE9BQTVCLENBQW9DLFVBQVMsU0FBVCxFQUFvQjtBQUNwRCxnQkFBRyxFQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLFFBQW5CLENBQTRCLFNBQTVCLENBQUgsRUFBMkM7QUFBRSx5QkFBUyxFQUFFLE1BQVg7QUFBb0I7QUFDcEUsU0FGRDtBQUdILEtBSkQ7QUFLSDs7Ozs7QUNuQkQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBRUEsT0FBTyxNQUFQLEdBQWdCLFlBQVc7O0FBRXZCLGVBQUssSUFBTDtBQUNBLDJCQUFXLElBQVg7QUFDQSwrQkFBYSxJQUFiO0FBQ0EsYUFBSSxJQUFKO0FBQ0EsbUJBQU8sSUFBUDtBQUNBLG1CQUFPLElBQVA7O0FBRUE7QUFDQSwyQkFBVyxJQUFYO0FBQ0gsQ0FYRDs7QUFIQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgRGlhbG9nIHtcblxuICAgIC8vIGJ1dHRvbiBldmVudHNcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgbGV0IGRpYWxvZ1Rlc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpYWxvZy10cmlnZ2VyJyk7XG4gICAgICAgIGlmKG51bGwgPT0gZGlhbG9nVGVzdEJ1dHRvbnMpIHsgcmV0dXJuIGZhbHNlO31cblxuICAgICAgICBbLi4uZGlhbG9nVGVzdEJ1dHRvbnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIERpYWxvZy5zaG93RGlhbG9nKHRoaXMuZGF0YXNldC50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXR1cCgpIHtcbiAgICAgICAgLy8gY3JlYXRlIGJhY2tkcm9wICYgY29udGFpbmVyXG4gICAgICAgIHRoaXMuY3JlYXRlQmFja2Ryb3AoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVDb250YWluZXIoKTtcblxuICAgICAgICAvLyBiZWhhdmlvdXIgc2V0dXBcbiAgICAgICAgdGhpcy5jb250YWluZXJFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQmFja2Ryb3AoKSB7XG4gICAgICAgIHRoaXMuYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5iYWNrZHJvcC5jbGFzc05hbWUgPSBcImJhY2tkcm9wXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5kaWFsb2dDb250YWluZXIuY2xhc3NOYW1lID0gXCJkaWFsb2ctY29udGFpbmVyXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5lckV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYoKGUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2RpYWxvZy1jb250YWluZXInKSB8fCAoZS50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygnZGlzbWlzcycpKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5pbWF0ZSBvdXRcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuZGlhbG9nLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXIoKSB7XG4gICAgICAgIC8vIHJlbW92ZSBkaWFsb2cgZnJvbSBET00gb25jZSBpdHMgZmFkZW91dCBhbmltYXRpb24gaGFzIGVuZGVkXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBEaWFsb2cuYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgRGlhbG9nLmRpYWxvZ0NvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDUwMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93RGlhbG9nKGRpYWxvZ0lkKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkaWFsb2dJZCkuY2xvbmVOb2RlKHRydWUpOyAvLyBkb2Vzbid0IG1lc3Mgd2l0aCB0aGUgb3JpZ2luYWwgZWxlbWVudFxuICAgICAgICBpZihudWxsID09IHRoaXMuZGlhbG9nKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgLy8gZGlzbWlzcyBidXR0b25cbiAgICAgICAgbGV0IGRpc21pc3NCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGRpc21pc3NCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGlzbWlzcycpO1xuICAgICAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZChkaXNtaXNzQnV0dG9uKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2Ryb3AgYW5kIGNvbnRhaW5lclxuICAgICAgICBEaWFsb2cuc2V0dXAoKTtcblxuICAgICAgICAvLyBhZGQgbmV3IGVsZW1lbnRzIG9uIERPTVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3ApO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5kaWFsb2dDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgaW5cbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIERpYWxvZy5iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgICAgICAgICAgIERpYWxvZy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgICAgICAgIH0sIDEwMFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzICBmcm9tICcuL1V0aWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXIge1xyXG5cclxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyT3V0QnV0dG9uKCk7IC8vIGVsZW1lbnQgY3JlYXRpb25cclxuICAgICAgICB0aGlzLnJlbW92ZUZpbHRlck9uQ2xpY2soKTsgLy8gZXZlbnQgZGVjbGFyYXRpb25cclxuICAgICAgICB0aGlzLnJlbW92ZUZpbHRlclRhZ09uQ2xpY2soKTsgLy8gZXZlbnQgZGVjbGFyYXRpb25cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVtb3ZlRmlsdGVyT25DbGljaygpIHtcclxuICAgICAgICBVdGlscy5jbGlja1dhdGNoKFsnZmlsdGVyJ10sIGZ1bmN0aW9uKGZpbHRlcikge1xyXG4gICAgICAgICAgICBGaWx0ZXIucmVtb3ZlRmlsdGVyQWN0aW9uKGZpbHRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlbW92ZUZpbHRlclRhZ09uQ2xpY2soKSB7XHJcbiAgICAgICAgVXRpbHMuY2xpY2tXYXRjaChbJ2ZpbHRlci10YWcnXSwgZnVuY3Rpb24odGFnKSB7XHJcbiAgICAgICAgICAgIEZpbHRlci5yZW1vdmVGaWx0ZXJUYWdBY3Rpb24odGFnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29udmVydFRhZ1RvRmlsdGVyKHRhZykge1xyXG4gICAgICAgIC8vIGdldCBmaWx0ZXIgcGFyZW50IGZvciBuZXdUYWcgZGF0YS10YXJnZXQgYXR0cmlidXRlXHJcbiAgICAgICAgbGV0IGZpbHRlclRhZ3NDb250YWluZXIgPSB0YWcucGFyZW50RWxlbWVudC5pZDtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgZmlsdGVyIHdpdGggdGFnJ3MgZGF0YVxyXG4gICAgICAgIGxldCBuZXdGaWx0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIG5ld0ZpbHRlci5jbGFzc05hbWUgPSBcImZpbHRlclwiO1xyXG4gICAgICAgIG5ld0ZpbHRlci5pbm5lckhUTUwgPSB0YWcuaW5uZXJIVE1MO1xyXG4gICAgICAgIG5ld0ZpbHRlci5kYXRhc2V0Lm9yaWdpbiA9IGAjJHtmaWx0ZXJUYWdzQ29udGFpbmVyfWA7XHJcbiAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29udmVydEZpbHRlclRvVGFnKGZpbHRlcikge1xyXG4gICAgICAgIC8vIGdldCBmaWx0ZXIgcGFyZW50IGZvciBuZXdUYWcgZGF0YS10YXJnZXQgYXR0cmlidXRlXHJcbiAgICAgICAgbGV0IGZpbHRlcnNDb250YWluZXIgPSBmaWx0ZXIucGFyZW50RWxlbWVudC5pZDtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgdGFnIHdpdGggZmlsdGVyJ3MgZGF0YVxyXG4gICAgICAgIGxldCBuZXdUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIG5ld1RhZy5jbGFzc05hbWUgPSBcImZpbHRlci10YWdcIjtcclxuICAgICAgICBuZXdUYWcuaW5uZXJIVE1MID0gZmlsdGVyLmlubmVySFRNTDtcclxuICAgICAgICBuZXdUYWcuZGF0YXNldC50YXJnZXQgPSBgIyR7ZmlsdGVyc0NvbnRhaW5lcn1gO1xyXG4gICAgICAgIHJldHVybiBuZXdUYWc7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlbW92ZUZpbHRlckFjdGlvbihmaWx0ZXIpIHtcclxuICAgICAgICAvLyBzZWxlY3QgdGFyZ2V0ZWQgY29udGFpbmVyXHJcbiAgICAgICAgbGV0IGZpbHRlclRhZ3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpbHRlci5kYXRhc2V0Lm9yaWdpbik7XHJcblxyXG4gICAgICAgIGxldCBuZXdUYWcgPSBGaWx0ZXIuY29udmVydEZpbHRlclRvVGFnKGZpbHRlcik7XHJcbiAgICAgICAgZmlsdGVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAvLyBpbnNlcnQgbmV3bHkgY3JlYXRlZCB0YWcgaW50byBmaWx0ZXIgdGFncyBjb250YWluZXJcclxuICAgICAgICBmaWx0ZXJUYWdzQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1RhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlbW92ZUZpbHRlclRhZ0FjdGlvbih0YWcpIHtcclxuICAgICAgICAvLyBzZWxlY3QgdGFyZ2V0ZWQgY29udGFpbmVyIGFuZCBsYXN0IGVsZW1lbnQgKGZvciBpdCB0byByZW1haW4gdGhlIGxhc3Qgb25lKVxyXG4gICAgICAgIGxldCBmaWx0ZXJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YWcuZGF0YXNldC50YXJnZXQpO1xyXG4gICAgICAgIGxldCBsYXN0RWxlbWVudENoaWxkID0gZmlsdGVyc0NvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkOyAvLyBsYXN0IGVsZW1lbnQgaXMgY2xlYXIgb3V0IGJ1dHRvblxyXG5cclxuICAgICAgICBsZXQgbmV3RmlsdGVyID0gRmlsdGVyLmNvbnZlcnRUYWdUb0ZpbHRlcih0YWcpO1xyXG4gICAgICAgIHRhZy5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgLy8gaW5zZXJ0IG5ld2x5IGNyZWF0ZWQgZmlsdGVyIGludG8gZmlsdGVyIGNvbnRhaW5lclxyXG4gICAgICAgIGZpbHRlcnNDb250YWluZXIuaW5zZXJ0QmVmb3JlKG5ld0ZpbHRlciwgbGFzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyT3V0QnV0dG9uKCkge1xyXG4gICAgICAgIGxldCBmaWx0ZXJDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcnMnKTtcclxuICAgICAgICBbLi4uZmlsdGVyQ29udGFpbmVyc10uZm9yRWFjaChmdW5jdGlvbihjb250YWluZXIpIHtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSAnYnV0dG9uJ1xyXG4gICAgICAgICAgICBsZXQgY2xlYXJGaWx0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICBjbGVhckZpbHRlci5jbGFzc0xpc3QuYWRkKCdjbGVhci1maWx0ZXJzJyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjbGVhckZpbHRlcik7XHJcbiAgICAgICAgICAgIGNsZWFyRmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBGaWx0ZXIuaGlkZUZpbHRlckNvbnRhaW5lcihjb250YWluZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGlkZUZpbHRlckNvbnRhaW5lcihjb250YWluZXIpIHtcclxuICAgICAgICAvLyBmaXJzdCByZW1vdmUgZXZlcnkgY2hpbGQgZWxlbWVudFxyXG4gICAgICAgIFsuLi5jb250YWluZXIuY2hpbGRyZW5dLmZvckVhY2goZnVuY3Rpb24oZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGlmKGZpbHRlci5jbGFzc0xpc3QuY29udGFpbnMoJ2NsZWFyLWZpbHRlcnMnKSkgeyByZXR1cm4gfSAvLyBkb2Vzbid0IHJlbW92ZSBjbGVhciBvdXQgYnV0dG9uXHJcbiAgICAgICAgICAgIEZpbHRlci5yZW1vdmVGaWx0ZXJBY3Rpb24oZmlsdGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBGb3JtIHtcblxuICAgIC8vIGxhdW5jaCBjbGFzcyBtZXRob2RzXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZHJvcGRvd24oKSB7XG4gICAgICAgIGxldCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLXRyaWdnZXInKTtcbiAgICAgICAgWy4uLmRyb3Bkb3duVHJpZ2dlcnNdLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1saXN0Jyk7XG4gICAgICAgICAgICBsZXQgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICgkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT0gXCJcIikgPyBcImJsb2NrXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQWN0aXZlID0gJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIjtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNsaWNrYWJsZSBgZGl2YCB0byBjbG9zZSB0aGUgZHJvcGRvd24gd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBkcm9wZG93biBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYoZHJvcGRvd25BY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjbGlja2FibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5jbGFzc05hbWUgPSBcImJhY2tkcm9wLWhpZGRlblwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kQ2hpbGQoJGNsaWNrYWJsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGNsaWNrYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25BY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjbGlja2FibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGNob2ljZSBldmVudFxuICAgICAgICAgICAgbGV0ICRhbmNob3JUYWdzID0gJGRyb3Bkb3duTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gICAgICAgICAgICBbLi4uJGFuY2hvclRhZ3NdLmZvckVhY2goZnVuY3Rpb24oYW5jaG9yKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25PcHRpb24gPSBhbmNob3IudGV4dDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHByZXZpb3VzbHkgc2VsZWN0ZWQgbGlzdCBpdGVtIChyZW1vdmUgYWN0aXZlIGNsYXNzKVxuICAgICAgICAgICAgICAgICAgICBsZXQgJGN1cnJlbnRBY3RpdmVMaXN0SXRlbSA9ICRkcm9wZG93bkxpc3QucXVlcnlTZWxlY3RvcignbGkuYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50QWN0aXZlTGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0IGNsaWNrZWQgbGlzdCBpdGVtIGJ5IGdpdmluZyBpdCBgYWN0aXZlYCBjbGFzcyBhbmQgY2hhbmdpbmcgYnV0dG9uIGxhYmVsIHRleHRcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBzZWxlY3Rpb25PcHRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgdGhlIGRyb3Bkb3duLWxpc3RcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIDogcmVtb3ZlIG9wZW5lZCBiYWNrZHJvcC1oaWRkZW5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL1V0aWxzJztcblxuY29uc3QgRkFERU9VVF9EVVJBVElPTiA9IDQgKiAxMDAwO1xuXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuICAgIC8vIGluaXRpYWxpemUgbm90aWZpY2F0aW9uIGJlaGF2aW91clxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLnNldHVwQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT25DbGlja0V2ZW50KCk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG9yIGNsZWFudXAgbm90aWZpY2F0aW9ucyBjb250YWluZXJcbiAgICBzdGF0aWMgc2V0dXBDb250YWluZXIoKSAge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGlmaWNhdGlvbi1jb250YWluZXInKTtcblxuICAgICAgICAvLyByZW1vdmUgZXZlbnR1YWwgZXhpc3RpbmcgY29udGFpbmVyIGVsZW1lbnQgdG8gc3RhcnQgY2xlYW5cbiAgICAgICAgaWYobnVsbCAhPSBjb250YWluZXIpIHsgY29udGFpbmVyLnJlbW92ZSgpOyB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuZCBhcHBlbmQgdGhlIG5vdGlmaWNhdGlvbiBjb250YWluZXIgYXMgYm9keSBmaXJzdCBlbGVtZW50XG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuaWQgPSAnbm90aWZpY2F0aW9uLWNvbnRhaW5lcic7XG4gICAgICAgIGxldCBmaXJzdFBhZ2VFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCBmaXJzdFBhZ2VFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBzZXQgbWVzc2FnZSB0ZXh0IGFuZCBub3RpZmljYXRpb24gdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IpXG4gICAgc3RhdGljIGNyZWF0ZShtZXNzYWdlLCB0eXBlLCBpc1N0aWNreSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90aWZpY2F0aW9uLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxldCBub3RpZmljYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoYG5vdGlmaWNhdGlvbi0ke3R5cGV9YCk7XG4gICAgICAgIGlmKGlzU3RpY2t5KSB7IG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdzdGljaycpOyB9IC8vIHN0aWNreSBub3RpZmljYXRpb25zIG1pZ2h0IGJlIHVzZWQgZm9yIGxvbmcgbWVzc2FnZXNcbiAgICAgICAgbm90aWZpY2F0aW9uLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgaW5cbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QuYWRkKCdpbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gZmFkZSBvdXQgbm90aWZpY2F0aW9uICh1bmxlc3MgaXQgaGFzICdzdGljaycgY2xhc3MpXG4gICAgICAgICAgICAgICAgaWYoISBub3RpZmljYXRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGljaycpKSB7IE5vdGlmaWNhdGlvbi5jbGVhbihub3RpZmljYXRpb24pOyB9XG4gICAgICAgICAgICB9LCAxMDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgb2xkIG5vdGlmaWNhdGlvbnNcbiAgICBzdGF0aWMgY2xlYW4obm90aWZpY2F0aW9uLCBkdXJhdGlvbiA9IEZBREVPVVRfRFVSQVRJT04pIHtcbiAgICAgICAgLy8gZmFkZW91dCBub3RpZmljYXRpb24gYWZ0ZXIgc3BlY2lmaWVkIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoZGVmYXVsdCA9IEZBREVPVVRfRFVSQVRJT04pXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uY2xlYXIobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAvLyByZW1vdmUgbm90aWZpY2F0aW9uIGZyb20gRE9NIG9uY2UgaXRzIGZhZGVvdXQgYW5pbWF0aW9uIGhhcyBlbmRlZCAoYWJvdXQgMXMgdG8gYmUgc3VyZSlcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDEwMDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnQgb24gJ2RvY3VtZW50JyBmb3Igbm90aWZpY2F0aW9ucyB0aGF0IHdpbGwgYmUgYWRkZWQgbGF0ZXIgb24gdGhlIERPTVxuICAgIHN0YXRpYyByZW1vdmVPbkNsaWNrRXZlbnQoKSB7XG4gICAgICAgIC8vIG5vdGlmaWNhdGlvbnMgYXJlIHJlbW92ZWQgd2hlbiBjbGlja2VkIG9uXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlcyA9IFsnbm90aWZpY2F0aW9uLXN1Y2Nlc3MnLCAnbm90aWZpY2F0aW9uLWluZm8nLCAnbm90aWZpY2F0aW9uLXdhcm5pbmcnLCAnbm90aWZpY2F0aW9uLWVycm9yJ107XG5cbiAgICAgICAgVXRpbHMuY2xpY2tXYXRjaChub3RpZmljYXRpb25UeXBlcywgZnVuY3Rpb24obm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICBOb3RpZmljYXRpb24uY2xlYW4obm90aWZpY2F0aW9uLCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyXG4gICAgc3RhdGljIGdldCBmYWRlb3V0RHVyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBGQURFT1VUX0RVUkFUSU9OO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgUGFnaW5hdGlvbiB7XG5cbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICAgICAgICBsZXQgcHJldkl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5wcmV2Jyk7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW0gPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIHNldCAvIHJlc2V0IGl0ZW1zXG4gICAgICAgIFsuLi5pdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZWxsaXBzaXMnKSkgeyBpdGVtLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50ID0gaTsgfVxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nLCAnc2hvdycsICdlbGxpcHNpcycsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgaXRlbS5kYXRhc2V0LnBhZ2UgPSBpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQoYWN0aXZlSXRlbS5kYXRhc2V0LnBhZ2UpO1xuXG4gICAgICAgIC8qIGFkZCBhcHByb3ByaWF0ZSBjbGFzc2VzIDogKi9cblxuICAgICAgICAvLyBkaXNhYmxlICdwcmV2JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZihhY3RpdmVJdGVtSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgcHJldkl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGl0ZW1zWzNdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTsgLy8gaWYgYWN0aXZlIHBhZ2UgaXMgMSwgdGhlIHRoaXJkIGl0ZW0gaXMgZGlzcGxheWVkXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNhYmxlICduZXh0JyBidXR0b24gaWYgYWN0aXZlIHBhZ2UgaXMgdGhlIGxhc3Qgb25lXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA9PSAoaXRlbXMubGVuZ3RoIC0gMikpIHtcbiAgICAgICAgICAgIG5leHRJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBpdGVtc1soaXRlbXMubGVuZ3RoIC0gNCldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcnN0IGVsbGlwc2lzIGNoZWNrXG4gICAgICAgIGlmKGFjdGl2ZUl0ZW1JbmRleCA+PSA0KSB7IGl0ZW1zWzJdLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGxhc3QgZWxsaXBzaXMgY2hlY2tcbiAgICAgICAgaWYoYWN0aXZlSXRlbUluZGV4IDw9IChpdGVtcy5sZW5ndGggLSA1KSkgeyBpdGVtc1soaXRlbXMubGVuZ3RoIC0gMyldLmNsYXNzTGlzdC5hZGQoJ2VsbGlwc2lzJywgJ3Nob3cnKTsgfVxuXG4gICAgICAgIC8vIGFjdGl2ZSBpdGVtLCBwcmV2aW91cyBhbmQgbmV4dCBvbmVzXG4gICAgICAgIGl0ZW1zWyhhY3RpdmVJdGVtSW5kZXggLSAxKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgaXRlbXNbKGFjdGl2ZUl0ZW1JbmRleCArIDEpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gcHJldiwgbmV4dCwgZmlyc3QgYW5kIGxhc3QgcGFnZXMgYXJlIGRpc3BsYXllZCBhcyB3ZWxsXG4gICAgICAgIHByZXZJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgbmV4dEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpdGVtc1sxXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGl0ZW1zWyhpdGVtcy5sZW5ndGggLSAyKV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIGhpZGUgZXZlcnkgb3RoZXIgaXRlbXNcbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG4gICAgICAgICAgICBpZighIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZXBsYWNlICdlbGxpcHNpcycgY2xhc3MgbGlzdCBpdGVtIGNvbnRlbnQgd2l0aCAzIGRvdHNcbiAgICAgICAgbGV0IGVsbGlwc2lzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaS5lbGxpcHNpcycpO1xuICAgICAgICBbLi4uZWxsaXBzaXNJdGVtc10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IC8vIHNwcmVhZCBvcGVyYXRvciBzbyBJRSBhY2NlcHRzIHRvIGxvb3AgdGhyb3VnaCBxdWVyeVNlbGVjdG9yQWxsIHJlc3VsdFxuICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCdhJykudGV4dENvbnRlbnQgPSBcIi4uLlwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcblxuZXhwb3J0IGNsYXNzIFN0eWxlZ3VpZGUge1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBTdHlsZWd1aWRlLmlucHV0RmVlZGJhY2soKTtcbiAgICAgICAgU3R5bGVndWlkZS5wYWdpbmF0aW9uKCk7XG4gICAgICAgIFN0eWxlZ3VpZGUubm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0RmVlZGJhY2soKSB7XG4gICAgICAgIGxldCBpbnB1dEdyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnB1dC10ZXN0IC5pbnB1dC1ncm91cCcpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnNHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpO1xuICAgICAgICBsZXQgdGVzdEJ1dHRvbnMgPSB0ZXN0QnV0dG9uc0dyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgICAgIC8vIGluc2VydCBhbiBlbXB0eSBzcGFuIGFzIGhlaWdodCBwbGFjZWhvbGRlclxuICAgICAgICBjcmVhdGVQbGFjZWhvbGRlcigpO1xuXG4gICAgICAgIFsuLi50ZXN0QnV0dG9uc10uZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgLy8gc3ByZWFkIG9wZXJhdG9yIHNvIElFIGFjY2VwdHMgdG8gbG9vcCB0aHJvdWdoIHF1ZXJ5U2VsZWN0b3JBbGwgcmVzdWx0XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmVlZGJhY2tUZXh0ID0gdGhpcy5kYXRhc2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YXNldC5hY3Rpb247XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkaXNhYmxlZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRpc2FibGUoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9ICFpbnB1dC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkVuYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiRGlzYWJsZSBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc3RhdGVcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVCdXR0b24gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JleScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgcG90ZW50aWFsbHkgZGlzYWJsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVCdXR0b24uaW5uZXJIVE1MID0gXCJEaXNhYmxlIGlucHV0XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0YXRlcyBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gXCJpbnB1dC1ncm91cFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmZWVkYmFjayBzdGF0ZSBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSA/IGlucHV0R3JvdXAucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJykucmVtb3ZlKCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3JlYXRlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgaW5wdXQgc3RhdGUgZmVlZGJhY2tcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgaW4gY2FzZSB0aGUgaW5wdXQgaGFzIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBjbGFzcyB0byBpbnB1dC1ncm91cFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9IFwiaW5wdXQtZ3JvdXAgXCIgKyBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmVlZGJhY2sgc3BhbiBvciBjcmVhdGUgb25lXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWVkYmFja1NwYW4gPSBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpO1xuICAgICAgICAgICAgICAgICAgICBpZighIGZlZWRiYWNrU3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlZGJhY2tTcGFuLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZlZWRiYWNrU3Bhbi50ZXh0Q29udGVudCA9IGZlZWRiYWNrVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRHcm91cC5pbnNlcnRCZWZvcmUoZmVlZGJhY2tTcGFuLCBpbnB1dEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0ZXMtaW5wdXQtYnV0dG9ucycpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmNsYXNzTmFtZSA9IFwiZmVlZGJhY2tcIjtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmlubmVySFRNTCA9IFwiJm5ic3A7XCI7XG4gICAgICAgICAgICBpbnB1dEdyb3VwLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgdGVzdEJ1dHRvbnNHcm91cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICAgICAgICBsZXQgaXRlbXMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gcGFyc2VJbnQocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZGF0YXNldC5wYWdlKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBvbGQgYWN0aXZlIGl0ZW1cbiAgICAgICAgICAgICAgICBpdGVtc1thY3RpdmVJdGVtSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJldiAmIG5leHQgY2FzZXNcbiAgICAgICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygncHJldicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCAtIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2FjdGl2ZUl0ZW1JbmRleCArIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGVkIG5ldyBhY3RpdmUgcGFnZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlbGF1bmNoIGZ1bmN0aW9uIGZvciBkZW1vIHB1cnBvc2VcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm90aWZpY2F0aW9uKCkge1xuXG4gICAgICAgIC8vIHN0YW5kYXJkIGJ1dHRvbnMgKG5vbi1zdGlja3kgbm90aWZpY2F0aW9ucylcbiAgICAgICAgbGV0IHN0YW5kYXJkTm90aWZpY2F0aW9uQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RpZmljYXRpb25zLXRlc3QtYnV0dG9ucyBidXR0b24nKTtcblxuICAgICAgICBbLi4uc3RhbmRhcmROb3RpZmljYXRpb25CdXR0b25zXS5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikge1xuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblRleHQgPSBidXR0b24uZGF0YXNldC50ZXh0O1xuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvblR5cGUgPSBidXR0b24uZGF0YXNldC50eXBlO1xuICAgICAgICAgICAgbGV0IGlzU3RpY2t5ID0gYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnc3RpY2t5JylcblxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmNyZWF0ZShub3RpZmljYXRpb25UZXh0LCBub3RpZmljYXRpb25UeXBlLCBpc1N0aWNreSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9VdGlscyc7XHJcblxyXG5sZXQgdmlzaWJsZVRhYkNvbnRlbnRJZHM7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFiIHtcclxuXHJcbiAgICAvLyBsYXVuY2ggY2xhc3MgbWV0aG9kc1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdGFiKCkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSBhY3RpdmUgdGFiKHMpXHJcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgbm9uIGFjdGl2ZSBjb250ZW50IGF0IHBhZ2Ugc3RhcnQgdXAgKHNob3cgc3RpbGwgZGlzcGxheSBhY3RpdmUgY29udGVudClcclxuICAgICAgICB0aGlzLmhpZGVOb25BY3RpdmVDb250ZW50KCk7XHJcblxyXG4gICAgICAgIC8vIG1lbnUgYmVoYXZpb3VyXHJcbiAgICAgICAgbGV0IHRhYk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLW1lbnUgYScpO1xyXG4gICAgICAgIFsuLi50YWJNZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24obGluaykge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbGluayBvd25pbmcgdGFiXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFicyA9IFV0aWxzLmNsb3Nlc3QobGluaywgJ3RhYnMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIGN1cnJlbnQgYWN0aXZlIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVNZW51VGFiID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IGFjdGl2ZU1lbnVUYWIpIHsgYWN0aXZlTWVudVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFkZCAnYWN0aXZlJyBjbGFzcyB0byBsaW5rIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFuZCBmaW5hbGx5IHVwZGF0ZSBET01cclxuICAgICAgICAgICAgICAgIFRhYi51cGRhdGVBY3RpdmVDb250ZW50SWRzKCk7XHJcbiAgICAgICAgICAgICAgICBUYWIuaGlkZU5vbkFjdGl2ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUFjdGl2ZUNvbnRlbnRJZHMoKSB7XHJcbiAgICAgICAgdmlzaWJsZVRhYkNvbnRlbnRJZHMgPSBuZXcgU2V0KCk7IC8vIHN0YXJ0IGNsZWFuXHJcbiAgICAgICAgbGV0IGFjdGl2ZVRhYk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtbWVudSAuYWN0aXZlJyk7XHJcbiAgICAgICAgWy4uLmFjdGl2ZVRhYk1lbnVzXS5mb3JFYWNoKGZ1bmN0aW9uKHRhYk1lbnUpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldElkID0gdGFiTWVudS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zbGljZSgxKTsgLy8gcmVtb3ZlIHRoZSAjIHN5bWJvbFxyXG4gICAgICAgICAgICB2aXNpYmxlVGFiQ29udGVudElkcy5hZGQodGFyZ2V0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlTm9uQWN0aXZlQ29udGVudCgpIHtcclxuICAgICAgICBsZXQgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFicyAudGFicy1jb250ZW50Jyk7XHJcbiAgICAgICAgWy4uLnRhYkNvbnRlbnRzXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnRCbG9jaykge1xyXG4gICAgICAgICAgICBbLi4uY29udGVudEJsb2NrLmNoaWxkcmVuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGNsZWFuIGJ5IHJlbW92aW5nICdoaWRkZW4nIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgY29udGVudHMgdGhhdCBhcmUgbm90IGluIGFuIGFjdGl2ZSBzdGF0ZSB0YWJcclxuICAgICAgICAgICAgICAgIGlmKCEgdmlzaWJsZVRhYkNvbnRlbnRJZHMuaGFzKGNvbnRlbnQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgbGV0IHBhcmVudDtcblxuICAgIHdoaWxlKGVsZW1lbnQpIHtcbiAgICAgICAgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZihwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHsgcmV0dXJuIHBhcmVudDsgfVxuICAgICAgICBlbGVtZW50ID0gcGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG4vLyBhbGxvd3MgZWxlbWVudHMgd2l0aCBhIHNwZWNpZmljIGNsYXNzIHRvIGJlIGNsaWNrYWJsZSBldmVuIGlmIHRoZXkgYXJlIG5vdCBvbiB0aGUgRE9NIHdoZW4gdGhpcyBtZXRob2QgaXMgY2FsbGVkXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tXYXRjaCh0YXJnZXRlZEVsZW1lbnRDbGFzc2VzLCBjYWxsYmFjaykge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgWy4uLnRhcmdldGVkRWxlbWVudENsYXNzZXNdLmZvckVhY2goZnVuY3Rpb24oY2xhc3NJdGVtKSB7XG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NJdGVtKSkgeyBjYWxsYmFjayhlLnRhcmdldCkgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi9UYWInO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi9EaWFsb2cnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi9GaWx0ZXInO1xuXG4vLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuaW1wb3J0IHsgU3R5bGVndWlkZSB9IGZyb20gJy4vU3R5bGVndWlkZSc7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIEZvcm0uaW5pdCgpO1xuICAgIFBhZ2luYXRpb24uaW5pdCgpO1xuICAgIE5vdGlmaWNhdGlvbi5pbml0KCk7XG4gICAgVGFiLmluaXQoKTtcbiAgICBEaWFsb2cuaW5pdCgpO1xuICAgIEZpbHRlci5pbml0KCk7XG5cbiAgICAvLyBzdHlsZWd1aWRlIGN1c3RvbSBleGFtcGxlc1xuICAgIFN0eWxlZ3VpZGUuaW5pdCgpO1xufTsiXX0=
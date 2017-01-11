import { Pagination } from './Pagination';
import { Notification } from './Notification';

export class Styleguide {
    static init() {
        Styleguide.inputFeedback();
        Styleguide.pagination();
        Styleguide.notification();
    }

    static inputFeedback() {
        let inputGroup = document.querySelector('.states-input-test .input-group');
        let testButtonsGroup = document.querySelector('.states-input-buttons');
        let testButtons = testButtonsGroup.querySelectorAll('button');

        // insert an empty span as height placeholder
        createPlaceholder();

        [...testButtons].forEach(function(button) { // spread operator so IE accepts to loop through querySelectorAll result

            button.addEventListener('click', function(e) {
                e.preventDefault();

                let feedbackText = this.dataset.text;
                let action = this.dataset.action;

                switch(action) {
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
                    let input = inputGroup.querySelector('input');

                    input.disabled = !input.disabled;
                    if(input.disabled) {
                        button.innerHTML = "Enable input";
                    } else {
                        button.innerHTML = "Disable input";
                    }
                }

                // reset state
                function reset() {
                    let disableButton = inputGroup.querySelector('.btn-grey');

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
                    let feedbackSpan = inputGroup.querySelector('.feedback');
                    if(! feedbackSpan) {
                        feedbackSpan = document.createElement('span');
                        feedbackSpan.className = "feedback";
                    }

                    feedbackSpan.textContent = feedbackText;
                    inputGroup.insertBefore(feedbackSpan, inputGroup.querySelector('.states-input-buttons'));
                }

            });
        });

        function createPlaceholder() {
            let placeholder = document.createElement('span');
            placeholder.className = "feedback";
            placeholder.innerHTML = "&nbsp;";
            inputGroup.insertBefore(placeholder, testButtonsGroup);
        }
    }

    static pagination() {
        let pagination = document.querySelector('.pagination');
        let items = pagination.querySelectorAll('li');

        [...items].forEach(function(item) {
            item.addEventListener("click", function(e) {
                e.preventDefault();

                let activeItemIndex = parseInt(pagination.querySelector('.active').dataset.page);

                // remove active class from old active item
                items[activeItemIndex].classList.remove('active');

                // prev & next cases
                if(item.classList.contains('prev')) {
                    items[activeItemIndex - 1].classList.add('active');
                } else if(item.classList.contains('next')) {
                    items[activeItemIndex + 1].classList.add('active');
                } else {
                    // selected new active page
                    item.classList.add('active');
                }

                // relaunch function for demo purpose
                Pagination.pagination();
            });
        });
    }

    static notification() {

        // standard buttons (non-sticky notifications)
        let standardNotificationButtons = document.querySelectorAll('.standard-notifications button');

        [...standardNotificationButtons].forEach(function(button) {
            let notificationText = button.dataset.text;
            let notificationType = button.className.slice(4);

            button.addEventListener("click", function(e) {
                e.preventDefault();

                Notification.create(notificationText, notificationType);
            });
        });

        // sticky notification button
        let stickyButtons = document.querySelectorAll('.notifications-test .sticky');

        [...stickyButtons].forEach(function(button) {
            button.addEventListener("click", function(e) {
                e.preventDefault();

                let notificationText = button.dataset.text;
                let isSticky = true;
                Notification.create(notificationText, "info", isSticky);
            });
        });
    }
}

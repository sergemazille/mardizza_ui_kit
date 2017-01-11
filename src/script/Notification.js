const FADEOUT_DURATION = 4 * 1000;

export class Notification {

    // initialize notification behaviour
    static init() {
        this.setupContainer();
        this.removeOnClickEvent();
    }

    // create or cleanup notifications container
    static setupContainer()  {
        let container = document.querySelector('#notification-container');

        // remove eventual existing container element to start clean
        if(null != container) { container.remove(); }

        // create and append the notification container as body first element
        container = document.createElement('div');
        container.id = 'notification-container';
        let firstPageElement = document.body.firstElementChild;
        document.body.insertBefore(container, firstPageElement);
    }

    // set message text and notification type (success, info, warning, error)
    static create(message, type, isSticky = false) {
        let container = document.querySelector('#notification-container');

        let notification = document.createElement('div');
        notification.classList.add(`notification-${type}`);
        if(isSticky) { notification.classList.add('stick'); } // sticky notifications might be used for long messages
        notification.innerHTML = message;
        container.appendChild(notification);

        // animate in
        setTimeout(
            function() {
                notification.classList.add('in');

                // fade out notification (unless it has 'stick' class)
                if(! notification.classList.contains('stick')) { Notification.clean(notification); }
            }, 100
        );
    }

    // remove old notifications
    static clean(notification, duration = FADEOUT_DURATION) {
        // fadeout notification after specified duration in milliseconds (default = FADEOUT_DURATION)
        setTimeout(
            function() {
                notification.classList.remove('in');
                Notification.clear(notification);
            }, duration
        );
    }

    static clear(notification) {
        // remove notification from DOM once its fadeout animation has ended (about 1s to be sure)
        setTimeout(
            function() {
                notification.remove();
            }, 1000
        );
    }

    // add click event on 'document' for notifications that will be added later on the DOM
    static removeOnClickEvent() {
        // notifications are removed when clicked on
        document.body.addEventListener("click", function(e) {
            let element = e.target;

            let notificationTypes = ['notification-success', 'notification-info', 'notification-warning', 'notification-error'];
            for(let notification of notificationTypes) {
                if(element.classList.contains(notification)) { Notification.clean(element, 0) }
            }
        });
    }

    // getter
    static get fadeoutDuration() {
        return FADEOUT_DURATION;
    }
}
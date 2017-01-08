import { Form } from './Form';
import { Pagination } from './Pagination';
import { Notification } from './Notification';
import { Tab } from './Tab';

// styleguide custom examples
import { Styleguide } from './Styleguide';

window.onload = function() {

    Form.init();
    Pagination.init();
    Notification.init();
    Tab.init();

    // styleguide custom examples
    Styleguide.init();
};
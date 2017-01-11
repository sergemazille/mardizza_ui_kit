import { Form } from './Form';
import { Pagination } from './Pagination';
import { Notification } from './Notification';
import { Tab } from './Tab';
import { Dialog } from './Dialog';

// styleguide custom examples
import { Styleguide } from './Styleguide';

window.onload = function() {

    Form.init();
    Pagination.init();
    Notification.init();
    Tab.init();
    Dialog.init();

    // styleguide custom examples
    Styleguide.init();
};
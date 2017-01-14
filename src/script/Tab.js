import * as Utils from './Utils';

let visibleTabContentIds;

export class Tab {

    // launch class methods
    static init() {
        this.tab();
    }

    static tab() {
        // update active tab(s)
        this.updateActiveContentIds();

        // hide non active content at page start up (show still display active content)
        this.hideNonActiveContent();

        // menu behaviour
        let tabMenuLinks = document.querySelectorAll('.tabs-menu a');
        [...tabMenuLinks].forEach(function(link) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                // get link owning tab
                let tabs = Utils.closest(link, 'tabs');

                // hide current active content
                let activeMenuTab = tabs.querySelector('.active');
                if(null != activeMenuTab) { activeMenuTab.classList.remove('active'); }

                // add 'active' class to link parent
                link.parentElement.classList.add('active');

                // and finally update DOM
                Tab.updateActiveContentIds();
                Tab.hideNonActiveContent();
            });
        });
    }

    static updateActiveContentIds() {
        visibleTabContentIds = new Set(); // start clean
        let activeTabMenus = document.querySelectorAll('.tabs-menu .active');
        [...activeTabMenus].forEach(function(tabMenu) {
            let targetId = tabMenu.firstElementChild.getAttribute('href').slice(1); // remove the # symbol
            visibleTabContentIds.add(targetId);
        });
    }

    static hideNonActiveContent() {
        let tabContents = document.querySelectorAll('.tabs .tabs-content');
        [...tabContents].forEach(function(contentBlock) {
            [...contentBlock.children].forEach(function(content) {
                // start clean by removing 'hidden' class
                content.classList.remove('hidden');

                // hide contents that are not in an active state tab
                if(! visibleTabContentIds.has(content.id)) {
                    content.classList.add('hidden');
                }
            });
        });
    }
}
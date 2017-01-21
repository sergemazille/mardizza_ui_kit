import * as Utils  from './Utils';

export class Filter {

    static init() {
        this.createClearOutButton(); // element creation (and then event registration)
        this.removeItemOnClick(); // register events
        this.registerContainerChildrenCountObserver(); // register a 'child removed' event to disable container if need be
    }

    static createClearOutButton() {
        // target every filter block on the page
        let filterContainers = document.querySelectorAll('.filter');
        
        // create two 'clear filter out' buttons for each one (one button for mobile screen, one for larger screens)
        [...filterContainers].forEach(function(container) {
            
            /* mobile screens */
            
            // create clear out button
            let xsClearOutButton = document.createElement('div');
            xsClearOutButton.classList.add('filter-clear-xs');
            container.querySelector('.filter-label').appendChild(xsClearOutButton);
            
            // register mobile clear out button click event
            xsClearOutButton.addEventListener('click', function() {
                Filter.clearOutFilters(container);
            });

            /* larger screens (from sm breakpoint) */

            // create clear out button
            let smClearOutButton = document.createElement('div');
            smClearOutButton.classList.add('filter-clear');
            container.appendChild(smClearOutButton);
            
            // register clear out button click event
            smClearOutButton.addEventListener('click', function() {
                Filter.clearOutFilters(container);
            });
        });
    }

    static removeItemOnClick() {
        Utils.clickWatch(['filter-item', 'tag-item'], function (item) {
            Filter.removeItemAction(item);
        });
    }

    static convertItem(item) {
        // get filter parent for newTag data-target attribute
        let itemDataTarget = item.parentElement.id;

        // create a tag with filter's data
        let newItem = document.createElement('li');
        newItem.className = item.classList.contains('filter-item') ? 'tag-item' : 'filter-item';
        newItem.innerHTML = item.innerHTML;
        newItem.dataset.target = `#${itemDataTarget}`;
        return newItem;
    }

    static removeItemAction(item) {
        // select targeted container
        let itemContainer = document.querySelector(item.dataset.target);

        let newItem = Filter.convertItem(item);
        item.remove();

        // insert newly created tag into filter tags container
        itemContainer.appendChild(newItem);
    }

    static clearOutFilters(container) {
        // get filter items
        let filterItems = container.querySelectorAll('.filter-item');
        [...filterItems].forEach(function(filter) {
            Filter.removeItemAction(filter);
        });
    }

    static registerContainerChildrenCountObserver() {
        // observe if a child element is removed from a container
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                Filter.checkFilterContainerDisabled(mutation.target)
            });
        });

        let config = { childList: true, attributes: false, characterData: false };
        let filterLists = document.querySelectorAll('.filter-list');
        [...filterLists].forEach(function(filterList) {
            observer.observe(filterList, config);
            Filter.checkFilterContainerDisabled(filterList); // page load first check
        });
    }

    static checkFilterContainerDisabled(filterList) {
        let filterContainer = filterList.parentElement;

        if(filterList.childElementCount < 1) {
            filterContainer.classList.add('disabled');
        } else {
            filterContainer.classList.remove('disabled');
        }
    }
}
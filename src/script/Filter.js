import * as Utils  from './Utils';

export class Filter {

    static init() {
        this.createClearOutButton(); // element creation (and then event registration)
        this.removeItemOnClick(); // register events
    }

    static createClearOutButton() {
        // target every filter block on the page
        let filterContainers = document.querySelectorAll('.filter');
        
        // create a 'clear filter out' button for each one
        [...filterContainers].forEach(function(container) {
            let clearOutButton = document.createElement('div');
            clearOutButton.classList.add('filter-clear');
            container.appendChild(clearOutButton);
            
            // register clear out button click event
            clearOutButton.addEventListener('click', function() {
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
}
import * as Utils  from './Utils';

export class Filter {

    // launch class methods
    static init() {
        this.clearOutButton(); // element creation
        this.removeFilterOnClick(); // event declaration
        this.removeFilterTagOnClick(); // event declaration
    }

    static removeFilterOnClick() {
        Utils.clickWatch(['filter'], function(filter) {
            Filter.removeFilterAction(filter);
        });
    }

    static removeFilterTagOnClick() {
        Utils.clickWatch(['filter-tag'], function(tag) {
            Filter.removeFilterTagAction(tag);
        });
    }

    static convertTagToFilter(tag) {
        // get filter parent for newTag data-target attribute
        let filterTagsContainer = tag.parentElement.id;

        // create a filter with tag's data
        let newFilter = document.createElement('li');
        newFilter.className = "filter";
        newFilter.innerHTML = tag.innerHTML;
        newFilter.dataset.origin = `#${filterTagsContainer}`;
        return newFilter;
    }

    static convertFilterToTag(filter) {
        // get filter parent for newTag data-target attribute
        let filtersContainer = filter.parentElement.id;

        // create a tag with filter's data
        let newTag = document.createElement('li');
        newTag.className = "filter-tag";
        newTag.innerHTML = filter.innerHTML;
        newTag.dataset.target = `#${filtersContainer}`;
        return newTag;
    }

    static removeFilterAction(filter) {
        // select targeted container
        let filterTagsContainer = document.querySelector(filter.dataset.origin);

        let newTag = Filter.convertFilterToTag(filter);
        filter.remove();

        // insert newly created tag into filter tags container
        filterTagsContainer.appendChild(newTag);
    }

    static removeFilterTagAction(tag) {
        // select targeted container and last element (for it to remain the last one)
        let filtersContainer = document.querySelector(tag.dataset.target);
        let lastElementChild = filtersContainer.lastElementChild; // last element is clear out button

        let newFilter = Filter.convertTagToFilter(tag);
        tag.remove();

        // insert newly created filter into filter container
        filtersContainer.insertBefore(newFilter, lastElementChild);
    }

    static clearOutButton() {
        let filterContainers = document.querySelectorAll('.filters');
        [...filterContainers].forEach(function(container) {
            // create the 'button'
            let clearFilter = document.createElement('li');
            clearFilter.classList.add('clear-filters');
            container.appendChild(clearFilter);
            clearFilter.addEventListener('click', function() {
                Filter.hideFilterContainer(container);
            });
        });
    }

    static hideFilterContainer(container) {
        // first remove every child element
        [...container.children].forEach(function(filter) {
            if(filter.classList.contains('clear-filters')) { return } // doesn't remove clear out button
            Filter.removeFilterAction(filter);
        });
    }
}
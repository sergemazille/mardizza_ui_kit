export class Pagination {

    // launch class methods
    static init() {
        this.pagination();
    }

    static pagination() {
        let pagination = document.querySelector('.pagination');
        let prevItem = pagination.querySelector('.prev');
        let nextItem = pagination.querySelector('.next');
        let items = pagination.querySelectorAll('li');
        let itemsToKeep = new Map();
        let activeItemIndex;

        // tests to get activeItemIndex right away



        // store in a Map the items to display
        items.forEach(function(item, i) {
            // first and last two items are always displayed
            if(0 == i || 1 == i || (items.length - 2) == i || (items.length - 1) == i) {
                itemsToKeep.set(i, item);
            }

            // active items, its previous and next items, are displayed as well
            if(item.classList.contains('active')) {
                itemsToKeep.set(i-1, items[i-1]);
                itemsToKeep.set(i, item);
                itemsToKeep.set(i+1, items[i+1]);

                activeItemIndex = i; // store the information for later use
            }
        });

        /* add appropriate classes : */

        // disable 'prev' button if active page is the first one
        if(activeItemIndex == 1) {
            prevItem.classList.add('disabled');
            items[3].classList.add('show'); // if active page is 1, the third item is displayed
        }

        // disable 'next' button if active page is the last one
        if(activeItemIndex == (items.length - 2)) {
            nextItem.classList.add('disabled');
            items[(items.length - 4)].classList.add('show');
        }

        // first ellipsis check
        if(activeItemIndex >= 4) { items[2].classList.add('ellipsis', 'show'); }

        // last ellipsis check
        if(activeItemIndex <= (items.length - 5)) { items[(items.length - 3)].classList.add('ellipsis', 'show'); }

        // active item, previous and next ones
        items[(activeItemIndex - 1)].classList.add('show');
        items[activeItemIndex].classList.add('show');
        items[(activeItemIndex + 1)].classList.add('show');

        // prev, next, first and last pages are displayed as well
        prevItem.classList.add('show');
        nextItem.classList.add('show');
        items[1].classList.add('show');
        items[(items.length - 2)].classList.add('show');

        // hide every other items
        items.forEach(function(item) {
            if(! item.classList.contains('show')) {
                item.classList.add('hidden');
            }
        });

        // replace 'ellipsis' class list item content with 3 dots
        let ellipsisItems = document.querySelectorAll('li.ellipsis');
        ellipsisItems.forEach(function(item) {
            item.querySelector('a').textContent = "...";
        });
    }
}

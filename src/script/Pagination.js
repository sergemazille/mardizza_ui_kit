export class Pagination {

    // launch class methods
    static init() {
        this.pagination();
    }

    static pagination() {
        let pagination = document.querySelector('.pagination');
        let prevItem = pagination.querySelector('.prev');
        let nextItem = pagination.querySelector('.next');
        let activeItem = pagination.querySelector('.active');
        let items = pagination.querySelectorAll('li');

        // set / reset items
        [...items].forEach(function(item, i) {
            if(item.classList.contains('ellipsis')) { item.firstElementChild.textContent = i; }
            item.classList.remove('hidden', 'show', 'ellipsis', 'disabled');
            item.dataset.page = i;
        });

        let activeItemIndex = parseInt(activeItem.dataset.page);

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
        [...items].forEach(function(item) { // spread operator so IE accepts to loop through querySelectorAll result
            if(! item.classList.contains('show')) {
                item.classList.add('hidden');
            }
        });

        // replace 'ellipsis' class list item content with 3 dots
        let ellipsisItems = document.querySelectorAll('li.ellipsis');
        [...ellipsisItems].forEach(function(item) { // spread operator so IE accepts to loop through querySelectorAll result
            item.querySelector('a').textContent = "...";
        });
    }
}

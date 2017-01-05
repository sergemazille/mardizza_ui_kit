export class Pagination {

    // launch class methods
    static init() {
        this.pagination();
    }

    static pagination() {
        let pagination = document.querySelector('.pagination');
        let items = pagination.querySelectorAll('li');
        let itemsToKeep = [];

        items.forEach(function(item, i) {
            // first and last two items
            if(0 == i || 1 == i || (items.length - 2) == i || (items.length - 1) == i) {
                itemsToKeep.push(item);
            }
        });

        console.log(itemsToKeep);

        // replace 'ellipsis' class list item content with 3 dots
        let ellipsisItems = document.querySelectorAll('li.ellipsis');
        ellipsisItems.forEach(function(item) {
            item.querySelector('a').textContent = "...";
        });
    }
}
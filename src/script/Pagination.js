export class Pagination {

    // launch class methods
    static init() {
        this.pagination();
    }

    static pagination() {
        let pagination = document.querySelector('pagination');

        // step 1: remove unnecessary items

        // step 1a: keep first and last two items



        // replace 'ellipsis' class list item content with 3 dots
        let ellipsisItems = document.querySelectorAll('li.ellipsis');
        ellipsisItems.forEach(function(item) {
            item.querySelector('a').textContent = "...";
        });
    }
}
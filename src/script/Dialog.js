export class Dialog {

    constructor() {
        this.backdrop = document.querySelector('.backdrop');

        if(null == this.backdrop) {
            this.createBackdrop();
        }

        this.backdropEvents();
    }

    createBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.className = "backdrop";
        document.body.appendChild(this.backdrop);
    }

    backdropEvents() {
        this.backdrop.addEventListener("click", function() {
            this.remove();
        });
    }
}

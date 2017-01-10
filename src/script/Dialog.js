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

        this.createDialog();
    }

    backdropEvents() {
        this.backdrop.addEventListener("click", function() {
            this.remove();
        });
    }

    createDialog() {
        // divs creation
        let dialogContainer = document.createElement('div');
        let dialogHeader = document.createElement('div');
        let dialogBody = document.createElement('div');
        let dialogFooter = document.createElement('div');

        // classes assignations
        dialogContainer.className = "dialog-success";
        dialogHeader.className = "dialog-header";
        dialogBody.className = "dialog-body";
        dialogFooter.className = "dialog-footer";

        // TEST content assignation
        dialogHeader.innerHTML = "dialog-header";
        dialogBody.innerHTML = "dialog-body";
        dialogFooter.innerHTML = "dialog-footer";

        // DOM integration
        dialogContainer.appendChild(dialogHeader);
        dialogContainer.appendChild(dialogBody);
        dialogContainer.appendChild(dialogFooter);
        this.backdrop.appendChild(dialogContainer);
    }
}

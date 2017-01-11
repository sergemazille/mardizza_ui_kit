export class Dialog {

    // button events
    static init() {
        let dialogTestButtons = document.querySelectorAll('.dialog-trigger');
        if(null == dialogTestButtons) { return false;}

        [...dialogTestButtons].forEach(function(button) {
            button.addEventListener("click", function() {
                Dialog.showDialog(this.dataset.target);
            });
        });
    }

    static setup() {
        // create backdrop & container
        this.createBackdrop();
        this.createContainer();

        // behaviour setup
        this.containerEvents();
    }

    static createBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.className = "backdrop";
    }

    static createContainer() {
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.className = "dialog-container";
    }

    static containerEvents() {
        this.dialogContainer.addEventListener("click", function(e) {
            e.preventDefault();

            if((e.target).classList.contains('dialog-container') || (e.target).classList.contains('dismiss')) {
                // animate out
                setTimeout(
                    function () {
                        Dialog.dialog.classList.remove('in');
                        Dialog.backdrop.classList.remove('in');
                        Dialog.clear();
                    }, 100
                );
            }
        });
    }

    static clear() {
        // remove dialog from DOM once its fadeout animation has ended
        setTimeout(
            function() {
                Dialog.backdrop.remove();
                Dialog.dialogContainer.remove();
            }, 500
        );
    }

    static showDialog(dialogId) {
        this.dialog = document.querySelector(dialogId).cloneNode(true); // doesn't mess with the original element
        if(null == this.dialog) { return null; }

        // dismiss button
        let dismissButton = document.createElement('span');
        dismissButton.classList.add('dismiss');
        this.dialog.appendChild(dismissButton);

        // create backdrop and container
        Dialog.setup();

        // add new elements on DOM
        document.body.appendChild(this.backdrop);
        document.body.appendChild(this.dialogContainer);
        this.dialogContainer.appendChild(this.dialog);
        this.dialog.style.display = "block";

        // animate in
        setTimeout(
            function() {
                Dialog.backdrop.classList.add('in');
                Dialog.dialog.classList.add('in');
            }, 100
        );
    }
}

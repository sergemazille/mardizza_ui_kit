export class Dialog {

    static init() {
        let dialogTestButtons = document.querySelectorAll('.dialog-trigger');
        if(null == dialogTestButtons) { return false;}

        [...dialogTestButtons].forEach(function(button) {
            button.addEventListener("click", function() {
                Dialog.setup(this.dataset.target);
            });
        });
    }

    static createBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.className = "backdrop";
    }

    static createContainer() {
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.className = "dialog-container";
    }

    static createDismissButton() {
        let dismissButton = document.createElement('span');
        dismissButton.classList.add('dismiss-button');
        this.dialog.appendChild(dismissButton);
    }

    static containerEvents() {
        this.dialogContainer.addEventListener("click", function(e) {
            e.preventDefault();

            // animate out
            if( (e.target).classList.contains('dialog-container') ||    // click on backdrop
                (e.target).classList.contains('dismiss') ||             // click on dismiss button
                (e.target).classList.contains('dismiss-button') ) {     // click on closing icon

                Dialog.hide();
            }
        });
    }

    static appendOnDom() {
        document.body.appendChild(Dialog.backdrop);
        document.body.appendChild(Dialog.dialogContainer);
        Dialog.dialogContainer.appendChild(Dialog.dialog);
        Dialog.dialog.style.display = "block";
    }

    static show() {
        Dialog.backdrop.classList.add('in');
        Dialog.dialog.classList.add('in');

        // focus on first input
        // ====================
        let dialogInputs = Dialog.dialog.querySelectorAll("input");
        let focusInputIsSet = false; // flag to stop with first input
        [...dialogInputs].forEach(function(input) {
            if("hidden" !== input.type && false === focusInputIsSet ) {
                input.focus();
                focusInputIsSet = true;
            }
        });
    }

    static removeAnimationClasses() {
        Dialog.dialog.classList.remove('in');
        Dialog.backdrop.classList.remove('in');
    }

    static hide() {
        Dialog.removeAnimationClasses();

        // wait for animation to end before clearing dialog out
        setTimeout(Dialog.clear, 400);
    }

    static clear() {
        document.body.appendChild(Dialog.dialog); // move dialog before its container is removed
        Dialog.backdrop.remove();
        Dialog.dialogContainer.remove();
        Dialog.dialog = null;
    }

    static setup(dialogId) {
        // start clean if an other dialog box is displayed
        if(null != Dialog.dialog) {
            Dialog.removeAnimationClasses();
            Dialog.clear();
        }

        Dialog.dialog = document.querySelector(dialogId);
        if(null == Dialog.dialog) { return; }

        Dialog.createDismissButton();
        Dialog.createBackdrop();
        Dialog.createContainer();
        Dialog.containerEvents();
        Dialog.appendOnDom();
        setTimeout(Dialog.show, 100); // give time for 'in' animation
    }
}

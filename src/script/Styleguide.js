export class Styleguide {
    static init() {
        let testButtons = document.querySelectorAll('.states-input-buttons button');
        testButtons.forEach(function(button) {

            button.addEventListener('click', function(e) {
                e.preventDefault();

                let feedbackText = this.dataset.text;
                let action = this.dataset.action;
                let inputGroup = this.parentElement.parentElement;

                switch(action) {
                    case "disabled":
                        disable(this);
                        break;
                    case "reset":
                        reset();
                        break;
                    default:
                        state();
                        break;
                }

                // disable button
                function disable(button) {
                    let input = inputGroup.querySelector('input');

                    input.disabled = !input.disabled;
                    if(input.disabled) {
                        button.innerHTML = "Enable me";
                    } else {
                        button.innerHTML = "Disable me";
                    }
                }

                // reset state
                function reset() {
                    let disableButton = inputGroup.querySelector('.btn-grey');

                    // cleanup potentially disabled state
                    inputGroup.querySelector('input').disabled = false;
                    disableButton.innerHTML = "Disable me";

                    // remove states classes
                    inputGroup.className = "input-group";

                    // remove feedback state if exists
                    inputGroup.querySelector('.feedback') ? inputGroup.querySelector('.feedback').remove() : null;
                }

                // change input state feedback
                function state() {
                    // clean up in case the input has been disabled
                    inputGroup.querySelector('input').disabled = false;

                    // add new class to input-group
                    inputGroup.className = "input-group " + action;

                    // replace the feedback span or create one
                    let feedbackSpan = inputGroup.querySelector('.feedback');
                    if(! feedbackSpan) {
                        feedbackSpan = document.createElement('span');
                        feedbackSpan.className = "feedback";
                    }

                    feedbackSpan.textContent = feedbackText;
                    inputGroup.insertBefore(feedbackSpan, inputGroup.querySelector('.states-input-buttons'));
                }
            });
        });
    }
}
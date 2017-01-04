import { Form } from './Form';

window.onload = function() {
    testInputsStates();

};

function testInputsStates() {
    let testButtons = document.querySelectorAll('.states-input-buttons button');
    testButtons.forEach(function(button) {

        button.addEventListener('click', function(e) {
            e.preventDefault();

            let feedbackText = this.dataset.text;
            let action = this.dataset.action;
            let inputGroup = this.parentElement.parentElement;

            if (action != "disabled") {
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

                return true;
            }

            // disable
            inputGroup.querySelector('input').disabled = !inputGroup.querySelector('input').disabled;
            this.innerHTML = "yolo";
        });
    });
}

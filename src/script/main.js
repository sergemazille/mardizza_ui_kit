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
            if (action != "disabled") {

                // add new class to input-group
                let inputGroup = this.parentElement.parentElement;
                inputGroup.className = "input-group " + action;

                // add a new element with feedback text
                let newSpan = document.createElement('span');
                newSpan.className = "feedback";
                newSpan.textContent = feedbackText;

                inputGroup.appendChild(newSpan);

                return true;
            }

            // disable

        });
    });
}

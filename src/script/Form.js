export class Form {

    // launch class methods
    static init() {
        this.dropdown();
    }

    static dropdown() {
        let dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        dropdownTriggers.forEach(function(button) {

            // trigger event
            let $dropdownList = button.parentElement.querySelector('.dropdown-list');
            let dropdownActive = false;

            button.addEventListener("click", function(e) {
                e.preventDefault();
                $dropdownList.style.display = ($dropdownList.style.display == "") ? "block" : "";
                dropdownActive = $dropdownList.style.display == "block";

                // create a clickable `div` to close the dropdown when user clicks outside of the dropdown element
                if(dropdownActive) {
                    let $clickable = document.createElement('div');
                    $clickable.className = "backdrop";

                    let $body = document.querySelector('body');
                    $body.appendChild($clickable);

                    $clickable.addEventListener("click", function() {
                        $dropdownList.style.display = "";
                        dropdownActive = false;
                        $clickable.removeEventListener("click", this);
                        this.remove();
                    });
                }
            });

            // choice event

        });
    }
}

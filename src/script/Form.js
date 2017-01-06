export class Form {

    // launch class methods
    static init() {
        this.dropdown();
    }

    static dropdown() {
        let dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        [...dropdownTriggers].forEach(function(button) { // spread operator so IE accepts to loop through querySelectorAll result

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
            let $anchorTags = $dropdownList.querySelectorAll('a');
            [...$anchorTags].forEach(function(anchor) { // spread operator so IE accepts to loop through querySelectorAll result
                anchor.addEventListener("click", function(e) {
                    e.preventDefault();
                    let selectionOption = anchor.text;

                    // cleanup previously selected list item (remove active class)
                    let $currentActiveListItem = $dropdownList.querySelector('li.active');
                    $currentActiveListItem.classList.remove('active');

                    // select clicked list item by giving it `active` class and changing button label text
                    anchor.parentElement.classList.add('active');
                    button.innerHTML = selectionOption;

                    // close the dropdown-list
                    $dropdownList.style.display = "";

                    // cleanup : remove opened backdrop
                    let $backdrop = document.querySelector('.backdrop');
                    $backdrop.remove();
                });
            });
        });
    }
}

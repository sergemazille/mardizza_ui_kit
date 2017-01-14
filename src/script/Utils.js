export function closest(element, className) {
    let parent;

    while(element) {
        parent = element.parentElement;
        if(parent.classList.contains(className)) { return parent; }
        element = parent;
    }

    return null;
}

// allows elements with a specific class to be clickable even if they are not on the DOM when this method is called
export function clickWatch(targetedElementClasses, callback) {
    document.body.addEventListener("click", function(e) {
        [...targetedElementClasses].forEach(function(classItem) {
            if(e.target.classList.contains(classItem)) { callback(e.target) }
        });
    });
}
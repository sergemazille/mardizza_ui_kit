export function hasClass(element, className) {
    return element.classList.contains(className);
}

export function closest(element, className) {
    let parent;

    while(element) {
        parent = element.parentElement;

        if(hasClass(parent, className)) {
            return parent;
        }

        element = parent;
    };

    return null;
}
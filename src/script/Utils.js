export function closest(element, className) {
    let parent;

    while(element) {
        parent = element.parentElement;
        if(parent.classList.contains(className)) { return parent; }
        element = parent;
    }

    return null;
}
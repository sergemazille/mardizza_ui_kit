import * as Constantes from './Constantes';

export class ViewPort {

    static init() {
        this.injectViewPortUtils();
    }

    // inject custom DOM elements to get breakpoints info
    static injectViewPortUtils() {
        let viewPortUtilsContainer = document.createElement('div');
        let xxsView = document.createElement('div');
        let xsView = document.createElement('div');
        let smView = document.createElement('div');
        let mdView = document.createElement('div');
        let lgView = document.createElement('div');
        let xlView = document.createElement('div');
        let xxlView = document.createElement('div');

        viewPortUtilsContainer.classList.add("view-port-utils");
        xxsView.classList.add(Constantes.XXS, "visible-xxs");
        xsView.classList.add(Constantes.XS, "visible-xs");
        smView.classList.add(Constantes.SM, "visible-sm");
        mdView.classList.add(Constantes.MD, "visible-md");
        lgView.classList.add(Constantes.LG, "visible-lg");
        xlView.classList.add(Constantes.XL, "visible-xl");
        xxlView.classList.add(Constantes.XXL, "visible-xxl");

        let viewPortUtilsDomElements = [xxsView, xsView, smView, mdView, lgView, xlView, xxlView];

        [...viewPortUtilsDomElements].forEach(function(element) {
            viewPortUtilsContainer.appendChild(element);
        });

        document.body.appendChild(viewPortUtilsContainer);
    }

    static getWidth() {
        let viewPortUtilsDomElements = document.querySelector('.view-port-utils').children;
        let currentWidth = null;


        [...viewPortUtilsDomElements].forEach(function(element) {
            let elementStyle = (window.getComputedStyle(element).display);

            if("block" == elementStyle) {
                currentWidth = element.classList.item(0);
            }
        });

        return currentWidth;
    }
}
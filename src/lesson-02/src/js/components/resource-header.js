// resource-header.js
const template = document.createElement('template');
template.innerHTML = `<div>Replace Me</div>`;

class ResourceHeader extends HTMLElement {
    constructor() {
        // The job of a constructor is to make sure the
        // object's properties have "meaningful" values
        super(); // calls the constructor for HTMLElement
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        // Opportunity to do some "initialization"
        // for when this element will be attached
        // to the DOM
        this.render();
    }

    render() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('resource-header', ResourceHeader);

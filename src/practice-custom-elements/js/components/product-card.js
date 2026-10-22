const template = document.createElement('template');
template.innerHTML = `<div>
  <slot />
  <slot name="actions"></slot>
  <slot name="extra></slot>
</div>`
/*
Attributes: name, sku, description
Composes <product-image> and <price-badge>, provides a named slot "actions" for buttons/controls, and a slot "extra" for metadata.
*/
class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() { 
    return ['name', 'sku', 'description'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      switch (attrName) {
        /** Boolean attributes */
        case 'name':
            this[attrName] = this.hasAttribute(attrName);
            break;
        /** Value attributes */
        case 'sku':
            this[attrName] = newValue;
            break;
      }
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('product-card', ProductCard);
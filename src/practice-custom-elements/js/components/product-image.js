const template = document.createElement('template');
template.innerHTML = `<div><img /></div>`
/*
Attributes: src, alt, size (sm|md|lg)
Renders an image inside a shadow root and exposes a CSS custom property for border-radius.
*/
class ProductImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const clone = template.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define('product-image', ProductImage);
const template = document.createElement('template');
template.innerHTML = `<div>
    <span data-id="price"></span>
    <span data-id="currency"></span>
</div>`
/*
Attributes: price, currency (default "CAD"), variant (default|sale)
Uses a template and shadow DOM for scoped styles.
*/
class PriceBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('price-badge', PriceBadge);
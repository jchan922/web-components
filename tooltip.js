class Tooltip extends HTMLElement {

	constructor() {
		super();
		this._tooltipContainer;
		this._tooltipText = 'Default text';
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				div {
					background-color: black;
					color: white;
					position: absolute;
					z-index: 10;
				}
			</style>
			<slot>Some default</slot>
			<span>(?)</span>
		`;
	}

	connectedCallback() {
		const tooltipIcon = this.shadowRoot.querySelector('span');
		this._tooltipText = this.getAttribute('text') ? this.getAttribute('text') : this._tooltipText;

		tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
		tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
		this.shadowRoot.appendChild(tooltipIcon);
	}

	_showTooltip() {
		this._tooltipContainer = document.createElement('div');
		this._tooltipContainer.textContent = this._tooltipText;
		this.shadowRoot.appendChild(this._tooltipContainer);
	}

	_hideTooltip() {
		this.shadowRoot.removeChild(this._tooltipContainer);
	}
}

customElements.define('jc-tooltip', Tooltip);
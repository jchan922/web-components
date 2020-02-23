class ToggleButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.textContent = 'Default text content';
        this.shadowRoot.innerHTML = `
            <style>
                #info-box.hidden { display: none; }
            </style>
            <button type="button">Show</button>
            <p id="info-box" class="hidden">
                <slot></slot>
            </p>
        `;
        this._button = this.shadowRoot.querySelector('button');
        this._infoBox = this.shadowRoot.getElementById('info-box');

        this._button.addEventListener('click', this._toggleInfoBox.bind(this));
    }

    connectedCallback() {
        // if (this.getAttribute('is-visible') === 'true') {
        //     debugger
        //     this._toggleInfoBox();
        // }

    }

    _toggleInfoBox() {
        // this._infoBox.classList.contains('hidden')
        //     ? this._button.textContent = 'Hide'
        //     : this._button.textContent = 'Show'; 
        // this._infoBox.classList.toggle('hidden');
    }
}

customElements.define('toggle-button', ToggleButton);
class Modal extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.isOpen = false;
		const styles = `
			:host([opened]) #backdrop,
			:host([opened]) #modal {
				opacity: 1;
				pointer-events: all;
			}
			:host([opened]) #modal {
				top: 15vh;
			}
			#backdrop {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100vh;
				background: rgba(0,0,0,0.75);
				z-index: 10;
				opacity: 0;
				pointer-events: none;
			}
			#modal {
				position: fixed;
				top: 10vh;
				left: 25%;
				width: 50%;
				height: auto;
				z-index: 100;
				background: white;
				border-radius: 3px;
				box-shadow: 0 2px 8px rgba(0,0,0,0.26);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				opacity: 0;
				pointer-events: none;
				transition: all 0.3s ease-out;
			}

			header { padding: 1rem; border-bottom: 1px soild #ccc; }
			::slotted(h2) { font-size: 1.25rem; margin: 0; }

			#main {	padding: 1rem; }
			#actions {
				border-top: 1px solid #ccc;
				padding: 1rem;
				display: flex;
				justify-content: flex-end;
			}
			#actions button { margin: 0 0.25rem; }
		`;
		this.shadowRoot.innerHTML = `
			<style>${styles}</style>
			<div id="backdrop"></div>
			<div id="modal">
				<header>
					<slot name="title">Default Title</slot>
				</header>
				<section id="main">
					<slot></slot>
				</section>
				<section id="actions">
					<button id="cancel-btn">Cancel</button>
					<button id="confirm-btn">Confirm</button>
				</section>
			</div>
		`;
		const backdrop = this.shadowRoot.querySelector('#backdrop');
		const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
		const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
		const slots = this.shadowRoot.querySelectorAll('slot');

		backdrop.addEventListener('click', this._cancel.bind(this));
		cancelButton.addEventListener('click', this._cancel.bind(this));
		confirmButton.addEventListener('click', this._confirm.bind(this));

		// access content in slots
		slots[1].addEventListener('slotchange', e => console.dir(slots[1].assignedNodes()));
	}

	_cancel(event) {
		this.hide();
		// composed = true allows the event to leave the shadowDOM
		const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
		event.target.dispatchEvent(cancelEvent); // access event outside of component
	}

	_confirm(event) {
		this.hide();
		const confirmEvent = new Event('confirm');
		this.dispatchEvent(confirmEvent); // access event outside of component
	}

	hide() {
		if (this.hasAttribute('opened')) this.removeAttribute('opened');
		this.isOpen = false;
	}

	open() {
		this.setAttribute('opened', '');
		this.isOpen = true;
	}

	// *********************
	// Alternative to open()
	// *********************
	// attributeChangedCallback(name, oldValue, newValue) {
	// 	if (oldValue === newValue) return;
	// 	if (name === 'opened') {
	// 		if (this.hasAttribute('opened')) {
	// 			this.isOpen = true;
	// 			this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
	// 			this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
	// 			this.shadowRoot.querySelector('#modal').style.opacity = 1;
	// 			this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
	// 		}
	// 	} else {
	// 		this.isOpen = false;
	// 	}
	// }

	// static get observedAttributes() {
	// 	return ['opened'];
	// }

}

customElements.define('jc-modal', Modal);
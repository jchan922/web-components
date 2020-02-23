class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', e => {
            if (!confirm('Do you really want to leave?')) {
                e.preventDefault();
            }
        })
    }
}

customElements.define('jc-confirm-link', ConfirmLink, { extends: 'a' });
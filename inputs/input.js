// Create a class for the element
class NfInput extends NoFormField {
  
    constructor() {
      // Always call super first in constructor
      super();
    }

    getStyle(){
        return `
            :host input{
                background: yellow;
            }
        `;
    }

    beforeCreateElement(field){
        return document.createElement('input');
    }
  }
  
  // Define the new element
  customElements.define('nf-input', NfInput);
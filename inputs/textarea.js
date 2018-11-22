// Create a class for the element
class NfTextarea extends NoFormField {
  
    constructor() {
      // Always call super first in constructor
      super();
    }
    getStyle(){
        return `
            :host textarea{
                background: red;
            }
        `;
    }
    beforeCreateElement(field){
        return document.createElement('textarea');
    }
  }
  
  // Define the new element
  customElements.define('nf-textarea', NfTextarea);
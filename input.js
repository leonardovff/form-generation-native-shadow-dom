// Create a class for the element
class NoFormField extends HTMLElement {
  
  constructor() {
    // Always call super first in constructor
    super();

    let observer = new MutationObserver(() => this.run());
     
    // configuração do observador:
    var config = { attributes: true, childList: false, attributeFilter: ['field'], characterData: true };
     
    // passar o nó alvo, bem como as opções de observação
    observer.observe(this, config); 
    if(this.hasAttribute('field')) {
      this.run();
    }
  }
  run() {
    let field = {
      type: 'text'
    }

    if(this.hasAttribute('field')) {
      let attr = this.getAttribute('field');  

      try{
        attr = JSON.parse(attr);

        if(attr) {
          field = attr;
        }        
      } catch (e) {
        console.error(e);
      }
    }
    
    console.log(field);
    field.value = field.value ? field.value : null;
    this.value = field.value;
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});
    

    let el = document.createElement(`input`);
    el.setAttribute('type', field.type);
    el.setAttribute('placeholder', field.placeholder);
    if(field.value){
      el.setAttribute('value', field.value);
    }
    
    el.addEventListener('input', (e) => this.value = e.target.value);
    // Insert icon
    
    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(el);
  }
}

// Define the new element
customElements.define('no-form-field', NoFormField);
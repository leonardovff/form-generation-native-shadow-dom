let convertStringInObj = (field) => {
  if(field) {
    try{
      field = JSON.parse(field);
      if(field) {
        return field;
      }       
    } catch (e) {
      console.error("problems with parms: " + e)
    }
  }
  // Default value
  return {
    tag: 'input',
    attr: {
      type: 'text'
    }
  }
}

class NoFormField extends HTMLElement {
  
  constructor() {
    super();

    let observer = new MutationObserver(() => 
      this.run(this.getAttribute('field'))
    );

    observer.observe(this,  { 
      attributes: true, 
      childList: false, 
      attributeFilter: ['field'], 
      characterData: true
    }); 

    if(this.hasAttribute('field')) {
      this.run(this.getAttribute('field'));
    }
  }
  
  createElement(field){
    let el;
    if(this.beforeCreateElement){
      el = this.beforeCreateElement(field);
    } else{
      el = document.createElement(field.tag);
    }
    for (const attr in field.attr) {
      if (field.attr.hasOwnProperty(attr)) {
        el.setAttribute(attr, field.attr[attr]);
      }
    }
    return el; 
  }
  run(field) {
    field = convertStringInObj(field);

    field.attr.value = field.attr.value ? field.attr.value : null;
    this.value = field.attr.value;
    if(!field.attr.value) delete field.attr.value;
    let el = this.createElement(field);
    el.addEventListener('input', (e) => this.value = e.target.value);
    
    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = this.getStyle();
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(style);
    shadow.appendChild(el);
  }
}

// Define the new element
// customElements.define('no-form-field', NoFormField);
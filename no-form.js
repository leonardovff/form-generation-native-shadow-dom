function createElement(field){
  // style and control to create diferrent inputs
  let el = document.createElement(field.tag);
  el.setAttribute('field', JSON.stringify(field));
  return el;
}
function run(selector, data){
  const appDiv = document.querySelector(selector);

  for(let i = 0; i < data.fields.length; i++){
    let field = data.fields[i];
    field.dom = createElement(field);
    appDiv.appendChild(field.dom);
  }
  return { 
    getValue: () => data.fields.map(field => field.dom.value)
  }
}
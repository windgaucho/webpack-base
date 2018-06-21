export default (text = "HOLA WEBPACK") => {
  const element = document.createElement("div");
  element.innerHTML = text; return element;
};

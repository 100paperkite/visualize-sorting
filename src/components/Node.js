class Node {
  constructor(value) {
    this.initElement(value);
  }

  initElement(value) {
    this.$element = document.createElement('div');
    this.$element.classList.add('node');
    this.$element.appendChild(document.createTextNode(value));
  }

  select() {
    this.$element.classList.add('selected');
  }

  unselect() {
    this.$element.classList.remove('selected');
  }
  // for comparison operator
  valueOf() {
    return parseFloat(this.$element.textContent);
  }
}

export default Node;

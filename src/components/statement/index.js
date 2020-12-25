import './style.scss';

export class NHIEStatement {
  constructor(root) {
    this.rootElement = root;
  }

  set statement(string) {
    this.rootElement.innerHTML = string;
  }
}

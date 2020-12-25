import {v4 as uuidV4} from 'uuid';

export class NHIEGameInstance {
  get identifier() {
    if (localStorage.getItem('instance') === null) {
      this.identifier = uuidV4();
    }

    return localStorage.getItem('instance');
  }

  set identifier(instance) {
    localStorage.setItem('instance', instance);
  }
}

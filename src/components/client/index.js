import axios from 'axios';

export class NHIEClient {
  constructor() {
    this.features = new Map();
  }

  registerFeature(key, callback) {
    this.features.set(key, callback);
  }

  getParams() {
    const params = {};
    this.features.forEach((value, key) => {
      params[key] = value();
    });
    return params;
  }

  async fetchStatement() {
    return axios
        .get('https://api.nhie.io/v1/statements/random', {
          crossdomain: true,
          params: this.getParams(),
        });
  }
}

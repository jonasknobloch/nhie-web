require('cookieconsent');

import 'cookieconsent/build/cookieconsent.min.css';

window.cookieconsent.initialise({
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#f2af0d',
    },
  },
  position: 'top',
  static: true,
});

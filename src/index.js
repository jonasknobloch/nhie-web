import './style.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {MDCDialog} from '@material/dialog';
import {MDCIconButtonToggle} from '@material/icon-button';
import {MDCLinearProgress} from '@material/linear-progress';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCRipple} from '@material/ripple';

import {NHIECategory} from './components/category';
import {NHIECategorySelection} from './components/category-selection';
import {NHIEClient} from './components/client';
import {NHIEGameInstance} from './components/game-instance';
import {NHIELanguageSelection} from './components/language-selection';
import {NHIEStatement} from './components/statement';
import {MDCRadio} from '@material/radio/component';
import {MDCFormField} from '@material/form-field/component';

document.addEventListener('DOMContentLoaded', () => {
  const iconButton = new MDCIconButtonToggle(document.querySelector('.mdc-icon-button'));
  const linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
  const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

  new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
  new MDCRipple(document.querySelector('.mdc-icon-button'));

  [].forEach.call(document.querySelectorAll('.mdc-button'), (e) => new MDCRipple(e));

  [].forEach.call(document.querySelectorAll('.nhie-language-dialog .mdc-form-field'), (formFieldElement) => {
    const formField = new MDCFormField(formFieldElement);
    const radioButton = new MDCRadio(formFieldElement.querySelector('.mdc-radio'));
    formField.input = radioButton;
    return radioButton;
  });

  const statement = new NHIEStatement(document.querySelector('.nhie-statement'));

  const categories = [].slice.call(document.querySelectorAll('.nhie-category')).map((e) => new NHIECategory(e));
  const categorySelection = new NHIECategorySelection(document.querySelector('.nhie-category-selection'));

  const gameInstance = new NHIEGameInstance();
  const languageSelection = new NHIELanguageSelection();

  const client = new NHIEClient();

  categorySelection.registerCategories(...categories);

  iconButton.listen('MDCIconButtonToggle:change', () => {
    dialog.open();
  });

  client.registerFeature('game_id', function() {
    return this.identifier;
  }.bind(gameInstance));

  client.registerFeature('category', function() {
    return this.activeCategories.map((c) => c.key);
  }.bind(categorySelection));

  client.registerFeature('language', function() {
    return this.activeLanguage;
  }.bind(languageSelection));

  document.addEventListener('keydown', (keyboardEvent) => {
    if (keyboardEvent.code === 'Space') {
      refreshStatement();
    }
  });

  document.querySelector('main').addEventListener('click', () => {
    refreshStatement();
  });

  let refreshing = false;

  function refreshStatement() {
    if (!refreshing) {
      refreshing = true;
      linearProgress.open();
      client.fetchStatement()
          .then((response) => {
            statement.statement = response.data.statement;
          })
          .catch((error) => {
            statement.statement = 'Something went wrong. Sucks for you.';
          })
          .finally(() => {
            linearProgress.close();
            refreshing = false;
          });
    }
  }
});

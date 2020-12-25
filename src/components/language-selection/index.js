import './style.scss';

export class NHIELanguageSelection {
  get activeLanguage() {
    return [].slice.call(document.getElementsByName('language')).find((radio) => radio.checked).value;
  }
}

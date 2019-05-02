import { getDecamelized } from './languageSelect';
const getLanguageFile = (lang) => import(`./i18n/${lang}`);

function onLanguageChanged(e) {
  const selectedLanguage = e.target.value;
  window.currentLanguage = selectedLanguage;
  getLanguageFile(selectedLanguage).then(file => {
    const languageFile = file.default;
    getDecamelized().then(decamelize => {
      Object.keys(languageFile).forEach(key => {
        const i18nElement = document.querySelector(`[data-i18n-${decamelize.default(key, '-')}]`);

        if (i18nElement) {
          i18nElement.textContent = languageFile[key]
        }
      })
    });
  });
}

export { onLanguageChanged }

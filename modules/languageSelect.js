import decamelize from 'decamelize'; // TODO: split & load decamelize async
import nl from './i18n/nl';
import en from './i18n/en';

const initLanguageSelect = () => {
  const languageSelect = document.querySelector('[data-language-select]');

  if (languageSelect) {
    window.currentLanguage = languageSelect.value;
    languageSelect.addEventListener('change', onLanguageChanged);
  }
};

function onLanguageChanged(e) {
  const selectedLanguage = e.target.value;
  window.currentLanguage = selectedLanguage;
  let languageFile;
  switch (selectedLanguage) {
    case 'nl':
      languageFile = nl;
      break;

    case 'en':
      languageFile = en;
      break;
  }

  Object.keys(languageFile).forEach(key => {
    const i18nElement = document.querySelector(`[data-i18n-${decamelize(key, '-')}]`);

    if (i18nElement) {
      i18nElement.textContent = languageFile[key]
    }
  })
}

export default initLanguageSelect;

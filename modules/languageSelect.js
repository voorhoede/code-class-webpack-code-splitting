export const getDecamelized = () => import('decamelize');

const initLanguageSelect = () => {
  const languageSelect = document.querySelector('[data-language-select]');

  if (languageSelect) {
    window.currentLanguage = languageSelect.value;
    languageSelect.addEventListener('change', onLanguageChanged)
  }
};

function onLanguageChanged(e) {
  const selectedLanguage = e.target.value;
  window.currentLanguage = selectedLanguage;
  let languageFile;
  switch (selectedLanguage) {
    case 'nl':
      import('./i18n/nl').then(file => {
        languageFile = file.default;
      });
      break;
    case 'en':
      import('./i18n/en').then(file => {
        languageFile = file.default;
      });
      break;
  }

  getDecamelized().then(decamelize => {
    Object.keys(languageFile).forEach(key => {
      const i18nElement = document.querySelector(`[data-i18n-${decamelize.default(key, '-')}]`);

      if (i18nElement) {
        i18nElement.textContent = languageFile[key]
      }
    })
  });
}

export default initLanguageSelect;

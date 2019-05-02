export const getDecamelized = () => import('decamelize');
const getLanguageFile = (lang) => import(`./i18n/${lang}`);

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

export default initLanguageSelect;

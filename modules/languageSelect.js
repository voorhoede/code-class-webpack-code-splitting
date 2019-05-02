export const getDecamelized = () => import('decamelize');
const getOnLanguageChanged = () => import('./onLanguagedChanged');

const initLanguageSelect = () => {
  const languageSelect = document.querySelector('[data-language-select]');

  if (languageSelect) {
    window.currentLanguage = languageSelect.value;
    languageSelect.addEventListener('change', (e) => {
      getOnLanguageChanged().then(module => {
        module.onLanguageChanged(e);
      })
    })
  }
};


export default initLanguageSelect;

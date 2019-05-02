import decamelize from 'decamelize';
import blogPost from './i18n/nl/bouwen-is-macht';

const initCaseSelect = () => {
  const caseSelect = document.querySelector('[data-case-select]');

  if (caseSelect) {
    caseSelect.addEventListener('change', onCaseChanged);
  }
};

function onCaseChanged(e) {
  const selectedCase = e.target.value;
  const currentLang = window.currentLanguage;

  const data = blogPost.page; // TODO: load selectedCase async in currentLang

  Object.keys(data).forEach(key => {
    const i18nElement = document.querySelector(`[data-case-${decamelize(key, '-')}]`);
    if (i18nElement) {
      if (Array.isArray(data[key])) {
        i18nElement.innerHTML = data[key]
          .filter(item => item.__typename === 'TextSectionRecord')
          .map(item => item.body)
          .join('')
      } else {
        i18nElement.textContent = data[key]
      }
    }
  })
}

export default initCaseSelect;

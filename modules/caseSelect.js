import { getDecamelized } from './languageSelect';
const getBlogPost = () => import('./i18n/nl/bouwen-is-macht');

const initCaseSelect = () => {
  const caseSelect = document.querySelector('[data-case-select]');

  if (caseSelect) {
    caseSelect.addEventListener('change', onCaseChanged);
  }
};

function onCaseChanged(e) {
  const selectedCase = e.target.value;
  const currentLang = window.currentLanguage;

  getBlogPost().then(blogPost => {
    const data = blogPost.default.page;

    getDecamelized().then(decamelize => {
      Object.keys(data).forEach(key => {
        const i18nElement = document.querySelector(`[data-case-${decamelize.default(key, '-')}]`);
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
    })
  })
}

export default initCaseSelect;

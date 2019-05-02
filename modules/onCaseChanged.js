import { getDecamelized } from './languageSelect';
const getCasePage = (casePage, lang) => import(`./i18n/${lang}/${casePage}`);

function onCaseChanged(e) {
  const selectedCase = e.target.value;
  const currentLang = window.currentLanguage;

  getCasePage(selectedCase, currentLang).then(blogPost => {
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

export { onCaseChanged }

const getOnCaseChanged = () => import(`./onCaseChanged`);

const initCaseSelect = () => {
  const caseSelect = document.querySelector('[data-case-select]');

  if (caseSelect) {
    caseSelect.addEventListener('change', (e) => {
      getOnCaseChanged().then(module => {
        module.onCaseChanged(e);
      })
    });
  }
};

export default initCaseSelect;

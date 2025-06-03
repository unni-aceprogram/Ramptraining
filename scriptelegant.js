  (function () {
    const modulesPerPage = 5;
    const container = document.body;
    const pagination = document.getElementById('pagination');
    const sections = Array.from(container.querySelectorAll('section'));
    let currentPage = 1;
    const totalPages = Math.ceil(sections.length / modulesPerPage);

    function showPage(page) {
      currentPage = Math.max(1, Math.min(page, totalPages));
      const start = (currentPage - 1) * modulesPerPage;
      const end = start + modulesPerPage;

      sections.forEach((section, idx) => {
        section.style.display = idx >= start && idx < end ? 'block' : 'none';
      });

      renderPagination();
    }

    function renderPagination() {
      pagination.innerHTML = '';

      const createButton = (label, pageNum, disabled = false, isActive = false) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        if (isActive) btn.classList.add('active');
        btn.disabled = disabled;
        if (!disabled) btn.onclick = () => showPage(pageNum);
        pagination.appendChild(btn);
      };

      createButton('Previous', currentPage - 1, currentPage === 1);

      const maxButtons = 7;
      let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      let end = Math.min(totalPages, start + maxButtons - 1);
      if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
      }

      if (start > 1) {
        createButton(1, 1);
        if (start > 2) pagination.appendChild(document.createTextNode('...'));
      }

      for (let i = start; i <= end; i++) {
        createButton(i, i, false, i === currentPage);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pagination.appendChild(document.createTextNode('...'));
        createButton(totalPages, totalPages);
      }

      createButton('Next', currentPage + 1, currentPage === totalPages);
    }

    showPage(1);
  })();
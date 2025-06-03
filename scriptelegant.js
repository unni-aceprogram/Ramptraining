// Pagination Script
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

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Scroll Buttons Script
document.addEventListener('DOMContentLoaded', function () {
  const scrollUpBtn = document.getElementById('scroll-up');
  const scrollDownBtn = document.getElementById('scroll-down');

  if (scrollUpBtn && scrollDownBtn) {
    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollDownBtn.addEventListener('click', () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }

  // Module Progress Tracking Script
  const moduleSequence = ['day1', 'quiz1', 'day2', 'quiz2', 'quiz3'];
  const buttons = document.querySelectorAll('.day-button');

  // Disable all buttons except Day 1
  buttons.forEach(btn => {
    const day = btn.dataset.day;
    if (day === 'day1') {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });

  // Restore progress from localStorage
  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');

  function updateButtonStates() {
    buttons.forEach(btn => {
      const currentDay = btn.dataset.day;
      const index = moduleSequence.indexOf(currentDay);

      if (index === 0 || completedModules.includes(moduleSequence[index - 1])) {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }

      // Add completed style
      if (completedModules.includes(currentDay)) {
        btn.classList.add('completed');
      }
    });
  }

  updateButtonStates();

  // Attach click handlers to store progress
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      if (!completedModules.includes(day)) {
        completedModules.push(day);
        localStorage.setItem('completedModules', JSON.stringify(completedModules));
        updateButtonStates(); // Update UI after marking as complete
      }
    });
  });
});


// Anti Right-Click and Screenshot Protection
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Block PrintScreen key
document.addEventListener('keydown', function (e) {
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText(''); // Try to overwrite clipboard
    alert('Screenshots are disabled on this page.');
    e.preventDefault();
  }

  // Block Ctrl+P or Cmd+P (Print)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
    alert('Printing is disabled on this page.');
    e.preventDefault();
  }
});

// Attempt to block screen recording detection (basic level)
function blurScreen() {
  document.body.style.filter = 'blur(5px)';
}
function unblurScreen() {
  document.body.style.filter = 'none';
}

// Triggers blur on page visibility change (optional trick)
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    blurScreen();
  } else {
    unblurScreen();
  }
});


// On mobile: block long press and screenshot gestures
document.addEventListener('touchstart', function (e) {
  if (e.touches.length > 1) {
    e.preventDefault(); // Block multi-finger gestures
  }
}, { passive: false });

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

// Anti Right-Click and Screenshot Protection
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Block PrintScreen key
document.addEventListener('keydown', function (e) {
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText(''); // Try to overwrite clipboard
    alert('Screenshots are disabled on this page.');
    e.preventDefault();
  }

  // Block Ctrl+P or Cmd+P (Print)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
    alert('Printing is disabled on this page.');
    e.preventDefault();
  }
});

// Optional: Blur content when switching tabs (light deterrent)
function blurScreen() {
  document.body.style.filter = 'blur(5px)';
}
function unblurScreen() {
  document.body.style.filter = 'none';
}

document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    blurScreen();
  } else {
    unblurScreen();
  }
});

// Mobile gesture blocking
document.addEventListener('touchstart', function (e) {
  if (e.touches.length > 1) {
    e.preventDefault(); // Prevent multi-finger gestures
  }
}, { passive: false });

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

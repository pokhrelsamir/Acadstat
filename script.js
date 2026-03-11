/**
 * ACADSTAT - Student App Navigation & Auth
 * Login -> Role-based home | 3-dot -> Courses (node 1-7265)
 */

(function() {
  const app = document.getElementById('app');
  const auth = window.ACADSTAT?.auth;
  const screens = app?.querySelectorAll('.screen') || [];
  const history = [];

  function show(screenId, push = true) {
    const el = document.getElementById('screen-' + screenId);
    if (!el) return;
    screens.forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    if (push && (history.length === 0 || history[history.length - 1] !== screenId)) {
      history.push(screenId);
    }
    updateNavState(screenId);
  }

  function back() {
    if (history.length <= 1) return;
    history.pop();
    const prev = history[history.length - 1];
    const el = document.getElementById('screen-' + prev);
    if (!el) return;
    screens.forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    updateNavState(prev);
  }

  function updateNavState(screenId) {
    document.querySelectorAll('.nav-item').forEach(btn => {
      const target = btn.getAttribute('data-navigate');
      btn.classList.toggle('active', target === screenId);
    });
  }

  function goToRoleHome() {
    if (!auth?.currentUser) return;
    const role = auth.currentUser.role;
    if (role === 'student') {
      show('student-home');
      const nameEl = document.getElementById('student-name');
      if (nameEl) nameEl.textContent = auth.currentUser.name || 'Ram Kumar Sharma';
    } else if (role === 'teacher') {
      window.location.href = 'teacher.html';
    } else if (role === 'admin') {
      window.location.href = 'admin.html';
    }
  }

  // Password toggle functionality
  function initPasswordToggle() {
    const passwordWrappers = document.querySelectorAll('.password-wrapper');
    
    passwordWrappers.forEach(wrapper => {
      const toggleBtn = wrapper.querySelector('.password-toggle');
      const passwordInput = wrapper.querySelector('input[type="password"]');
      
      if (toggleBtn && passwordInput) {
        // Set initial state - hidden (password type)
        toggleBtn.classList.add('icon-eye-closed');
        
        toggleBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          if (passwordInput.type === 'password') {
            // Show password
            passwordInput.type = 'text';
            toggleBtn.classList.remove('icon-eye-closed');
            toggleBtn.classList.add('icon-eye-open');
          } else {
            // Hide password
            passwordInput.type = 'password';
            toggleBtn.classList.remove('icon-eye-open');
            toggleBtn.classList.add('icon-eye-closed');
          }
        });
      }
    });
  }

  app?.addEventListener('click', function(e) {
    const nav = e.target.closest('[data-navigate]');
    if (nav) {
      e.preventDefault();
      show(nav.getAttribute('data-navigate'));
    }
    if (e.target.closest('[data-back]')) {
      e.preventDefault();
      back();
    }
    if (e.target.closest('[data-action="logout"]')) {
      e.preventDefault();
      auth?.logout();
      history.length = 0;
      show('login', false);
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && !e.target.matches('input, textarea') && document.activeElement === document.body) {
      e.preventDefault();
      back();
    }
  });

  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.email.value.trim();
      const pass = this.password.value;
      const err = document.getElementById('login-error');
      const result = auth?.login(email, pass);
      if (result?.success) {
        if (err) err.textContent = '';
        goToRoleHome();
      } else {
        if (err) err.textContent = result?.message || 'Invalid credentials';
      }
    });
  }

  // Tab switching
  app?.querySelectorAll('.course-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.stopPropagation();
      this.closest('.course-tabs')?.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Search functionality for academic options
  function initSearch() {
    // Student search
    const studentSearchInput = document.getElementById('student-search-input');
    const studentGridTiles = document.getElementById('student-grid-tiles');
    
    if (studentSearchInput && studentGridTiles) {
      studentSearchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        const tiles = studentGridTiles.querySelectorAll('.grid-tile');
        
        tiles.forEach(tile => {
          const text = tile.querySelector('span')?.textContent.toLowerCase() || '';
          if (query === '' || text.includes(query)) {
            tile.classList.remove('hidden');
            tile.classList.add('highlight');
          } else {
            tile.classList.add('hidden');
            tile.classList.remove('highlight');
          }
        });
        
        const visibleTiles = studentGridTiles.querySelectorAll('.grid-tile:not(.hidden)');
        const sectionLabel = studentGridTiles.previousElementSibling;
        if (sectionLabel && sectionLabel.classList.contains('section-label')) {
          sectionLabel.style.display = visibleTiles.length > 0 ? 'block' : 'none';
        }
      });
    }
    
    // Teacher search
    const teacherSearchInput = document.getElementById('teacher-search-input');
    const teacherGridTiles = document.getElementById('teacher-grid-tiles');
    
    if (teacherSearchInput && teacherGridTiles) {
      teacherSearchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        const tiles = teacherGridTiles.querySelectorAll('.grid-tile');
        
        tiles.forEach(tile => {
          const text = tile.querySelector('span')?.textContent.toLowerCase() || '';
          if (query === '' || text.includes(query)) {
            tile.classList.remove('hidden');
            tile.classList.add('highlight');
          } else {
            tile.classList.add('hidden');
            tile.classList.remove('highlight');
          }
        });
        
        const visibleTiles = teacherGridTiles.querySelectorAll('.grid-tile:not(.hidden)');
        const sectionLabel = teacherGridTiles.previousElementSibling;
        if (sectionLabel && sectionLabel.classList.contains('section-label')) {
          sectionLabel.style.display = visibleTiles.length > 0 ? 'block' : 'none';
        }
      });
    }
    
    // Admin search
    const adminSearchInput = document.getElementById('admin-search-input');
    const adminGridTiles = document.getElementById('admin-grid-tiles');
    
    if (adminSearchInput && adminGridTiles) {
      adminSearchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        const tiles = adminGridTiles.querySelectorAll('.grid-tile');
        
        tiles.forEach(tile => {
          const text = tile.querySelector('span')?.textContent.toLowerCase() || '';
          if (query === '' || text.includes(query)) {
            tile.classList.remove('hidden');
            tile.classList.add('highlight');
          } else {
            tile.classList.add('hidden');
            tile.classList.remove('highlight');
          }
        });
        
        const visibleTiles = adminGridTiles.querySelectorAll('.grid-tile:not(.hidden)');
        const sectionLabel = adminGridTiles.previousElementSibling;
        if (sectionLabel && sectionLabel.classList.contains('section-label')) {
          sectionLabel.style.display = visibleTiles.length > 0 ? 'block' : 'none';
        }
      });
    }
  }
  
  // Initialize when DOM is ready
  function init() {
    initPasswordToggle();
    initSearch();
    
    // Init: check session on load
    if (auth?.getSession()) {
      goToRoleHome();
    } else {
      show('login', false);
    }
  }
  
  // Run init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

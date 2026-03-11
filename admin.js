/** ACADSTAT - Admin App */
(function() {
  const auth = window.ACADSTAT?.auth;
  if (!auth?.getSession() || !auth.isAdmin()) {
    window.location.href = 'index.html';
    return;
  }
  const app = document.getElementById('app');
  const user = auth.currentUser;
  document.getElementById('admin-name').textContent = user.name || 'Admin Guru';
  document.getElementById('admin-profile-name').textContent = user.name || 'Admin Guru';
  const un = document.getElementById('admin-username');
  if (un) un.textContent = user.username || '_adminguru';

  const screens = app.querySelectorAll('.screen');
  const history = ['admin-home'];

  function show(id, push = true) {
    const el = document.getElementById('screen-' + id);
    if (!el) return;
    screens.forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    if (push && history[history.length - 1] !== id) history.push(id);
    app.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.getAttribute('data-navigate') === id));
  }

  function back() {
    if (history.length <= 1) return;
    history.pop();
    show(history[history.length - 1], false);
  }

  app.addEventListener('click', function(e) {
    const n = e.target.closest('[data-navigate]');
    if (n) { e.preventDefault(); show(n.getAttribute('data-navigate')); }
    if (e.target.closest('[data-back]')) { e.preventDefault(); back(); }
    if (e.target.closest('[data-action="logout"]')) {
      e.preventDefault();
      auth.logout();
      window.location.href = 'index.html';
    }
  });
})();

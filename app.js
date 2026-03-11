/**
 * ACADSTAT - Auth & Role-Based App State
 * Maps login credentials to user role (student/teacher/admin)
 * Replace with your backend API / database lookup in production
 */

window.ACADSTAT = window.ACADSTAT || {};
const ACADSTAT = window.ACADSTAT;

ACADSTAT.auth = {
  currentUser: null,

  /** Mock user database - replace with API call to your backend */
  users: [
    { email: 'student', password: 'student123', role: 'student', name: 'Ram Kumar Sharma', username: '_ramkumarsharma' },
    { email: '_ramkumarsharma', password: 'student123', role: 'student', name: 'Ram Kumar Sharma', username: '_ramkumarsharma' },
    { email: 'teacher', password: 'teacher123', role: 'teacher', name: 'John Teacher', username: '_johnteacher' },
    { email: '_johnteacher', password: 'teacher123', role: 'teacher', name: 'John Teacher', username: '_johnteacher' },
    { email: 'admin', password: 'admin123', role: 'admin', name: 'Admin Guru', username: '_adminguru' },
    { email: '_adminguru', password: 'admin123', role: 'admin', name: 'Admin Guru', username: '_adminguru' },
  ],

  login(emailOrUsername, password) {
    const user = this.users.find(u =>
      (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );
    if (user) {
      this.currentUser = { ...user };
      delete this.currentUser.password;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('acadstat_user', JSON.stringify(this.currentUser));
      }
      return { success: true, user: this.currentUser };
    }
    return { success: false, message: 'Invalid email/username or password' };
  },

  logout() {
    this.currentUser = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('acadstat_user');
    }
  },

  getSession() {
    if (this.currentUser) return this.currentUser;
    try {
      const stored = localStorage.getItem('acadstat_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      }
    } catch (e) {}
    return null;
  },

  isStudent() { return this.currentUser?.role === 'student'; },
  isTeacher() { return this.currentUser?.role === 'teacher'; },
  isAdmin() { return this.currentUser?.role === 'admin'; },
};

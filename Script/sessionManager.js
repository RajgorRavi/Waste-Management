// Session Management JavaScript
class FrontendSessionManager {
  constructor() {
    this.sessionCheckInterval = null;
    this.warningShown = false;
    this.init();
  }

  init() {
    this.startSessionCheck();
    this.addLogoutHandler();
  }

  // Check session status every 5 minutes
  startSessionCheck() {
    this.sessionCheckInterval = setInterval(() => {
      this.checkSessionStatus();
    }, 5 * 60 * 1000); // 5 minutes
  }

  async checkSessionStatus() {
    try {
      const response = await fetch('/api/session-status');
      const data = await response.json();
      
      if (!data.isValid) {
        this.handleSessionExpired();
      } else if (data.timeRemaining < 10 * 60 * 1000 && !this.warningShown) {
        // Show warning if less than 10 minutes remaining
        this.showSessionWarning(data.timeRemaining);
      }
    } catch (error) {
      console.log('Session check failed:', error);
    }
  }

  showSessionWarning(timeRemaining) {
    this.warningShown = true;
    const minutes = Math.floor(timeRemaining / (60 * 1000));
    
    const warningDiv = document.createElement('div');
    warningDiv.className = 'session-warning show';
    warningDiv.innerHTML = `
      <h4>Session Expiring Soon!</h4>
      <p>Your session will expire in ${minutes} minutes. Do you want to extend it?</p>
      <button onclick="sessionManager.extendSession()" class="btn btn-primary">Extend Session</button>
      <button onclick="sessionManager.logout()" class="btn btn-secondary">Logout</button>
    `;
    
    document.body.appendChild(warningDiv);
    
    // Auto-remove warning after 30 seconds
    setTimeout(() => {
      if (warningDiv.parentNode) {
        warningDiv.parentNode.removeChild(warningDiv);
      }
      this.warningShown = false;
    }, 30000);
  }

  handleSessionExpired() {
    alert('Your session has expired. Please log in again.');
    window.location.href = '/';
  }

  async extendSession() {
    try {
      const response = await fetch('/api/extend-session', { method: 'POST' });
      if (response.ok) {
        // Remove warning
        const warning = document.querySelector('.session-warning');
        if (warning) {
          warning.parentNode.removeChild(warning);
        }
        this.warningShown = false;
      }
    } catch (error) {
      console.log('Failed to extend session:', error);
    }
  }

  addLogoutHandler() {
    // Add logout functionality to logout buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('logout-btn') || e.target.id === 'logout-btn') {
        e.preventDefault();
        this.logout();
      }
    });
  }

  async logout() {
    try {
      const response = await fetch('/logout', { method: 'POST' });
      if (response.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.log('Logout failed:', error);
      // Fallback: redirect anyway
      window.location.href = '/';
    }
  }

  destroy() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
    }
  }
}

// Initialize session manager when page loads
let sessionManager;
document.addEventListener('DOMContentLoaded', () => {
  sessionManager = new FrontendSessionManager();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (sessionManager) {
    sessionManager.destroy();
  }
});

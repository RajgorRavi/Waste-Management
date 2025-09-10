// User Profile JavaScript
class UserProfileManager {
  constructor() {
    this.isEditMode = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateSessionInfo();
    this.startSessionTimer();
  }

  bindEvents() {
    // Edit profile button
    const editBtn = document.getElementById('edit-profile-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => this.toggleEditMode());
    }

    // Logout buttons
    const logoutBtns = document.querySelectorAll('#logout-btn, #logout-profile-btn');
    logoutBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    });

    // Change password button
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
      changePasswordBtn.addEventListener('click', () => this.changePassword());
    }

    // Download data button
    const downloadDataBtn = document.getElementById('download-data-btn');
    if (downloadDataBtn) {
      downloadDataBtn.addEventListener('click', () => this.downloadUserData());
    }

    // Activity log button
    const activityLogBtn = document.getElementById('activity-log-btn');
    if (activityLogBtn) {
      activityLogBtn.addEventListener('click', () => this.viewActivityLog());
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    const editBtn = document.getElementById('edit-profile-btn');
    const profileCard = document.querySelector('.profile-card');

    if (this.isEditMode) {
      profileCard.classList.add('edit-mode');
      editBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
      editBtn.classList.remove('btn-primary');
      editBtn.classList.add('btn-success');
      
      // Show input fields
      document.getElementById('display-name').style.display = 'none';
      document.getElementById('edit-name').style.display = 'block';
      document.getElementById('display-email').style.display = 'none';
      document.getElementById('edit-email').style.display = 'block';
    } else {
      profileCard.classList.remove('edit-mode');
      editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
      editBtn.classList.remove('btn-success');
      editBtn.classList.add('btn-primary');
      
      // Save changes and show display fields
      this.saveProfileChanges();
    }
  }

  async saveProfileChanges() {
    const newName = document.getElementById('edit-name').value;
    const newEmail = document.getElementById('edit-email').value;

    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail
        })
      });

      if (response.ok) {
        // Update display fields
        document.getElementById('display-name').textContent = newName;
        document.getElementById('display-email').textContent = newEmail;
        
        // Update profile header
        document.querySelector('.profile-info h1').textContent = newName;
        
        this.showNotification('Profile updated successfully!', 'success');
      } else {
        this.showNotification('Failed to update profile. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      this.showNotification('An error occurred while updating profile.', 'error');
    }

    // Hide input fields and show display fields
    document.getElementById('display-name').style.display = 'block';
    document.getElementById('edit-name').style.display = 'none';
    document.getElementById('display-email').style.display = 'block';
    document.getElementById('edit-email').style.display = 'none';
  }

  async logout() {
    if (confirm('Are you sure you want to logout?')) {
      try {
        const response = await fetch('/logout', { method: 'POST' });
        if (response.ok) {
          this.showNotification('Logging out...', 'info');
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        }
      } catch (error) {
        console.error('Logout failed:', error);
        window.location.href = '/';
      }
    }
  }

  changePassword() {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.length >= 6) {
      // Here you would typically send a request to change password
      this.showNotification('Password change functionality will be implemented soon.', 'info');
    } else if (newPassword !== null) {
      this.showNotification('Password must be at least 6 characters long.', 'error');
    }
  }

  async downloadUserData() {
    try {
      this.showNotification('Preparing your data for download...', 'info');
      
      const response = await fetch('/api/download-user-data');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `user-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        this.showNotification('Data downloaded successfully!', 'success');
      } else {
        this.showNotification('Failed to download data.', 'error');
      }
    } catch (error) {
      console.error('Error downloading data:', error);
      this.showNotification('An error occurred while downloading data.', 'error');
    }
  }

  viewActivityLog() {
    // Open activity log in a new window or modal
    this.showNotification('Activity log feature will be implemented soon.', 'info');
  }

  updateSessionInfo() {
    if (typeof userInfo !== 'undefined' && userInfo) {
      const sessionDuration = Math.floor(userInfo.sessionDuration / 60000);
      const sessionElement = document.getElementById('session-duration');
      if (sessionElement) {
        sessionElement.textContent = `${sessionDuration} minutes`;
      }

      const lastActivityElement = document.getElementById('last-activity');
      if (lastActivityElement) {
        lastActivityElement.textContent = new Date().toLocaleString();
      }
    }
  }

  startSessionTimer() {
    // Update session duration every minute
    setInterval(() => {
      this.updateSessionInfo();
    }, 60000);
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${this.getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          border-radius: 5px;
          color: white;
          font-weight: bold;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 400px;
          animation: slideIn 0.3s ease;
        }
        .notification-success { background-color: #27ae60; }
        .notification-error { background-color: #e74c3c; }
        .notification-info { background-color: #3498db; }
        .notification-close {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          margin-left: auto;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(styles);
    }

    // Add to page
    document.body.appendChild(notification);

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  getNotificationIcon(type) {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'exclamation-triangle';
      case 'info': return 'info-circle';
      default: return 'info-circle';
    }
  }
}

// Initialize profile manager when page loads
let profileManager;
document.addEventListener('DOMContentLoaded', () => {
  profileManager = new UserProfileManager();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (profileManager) {
    // Any cleanup needed
  }
});

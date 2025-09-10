class SessionManager {
  // Create session data
  static createSession(req, userData) {
    req.session.employeeId = userData.employeeId;
    req.session.name = userData.name;
    req.session.email = userData.email;
    req.session.isLoggedIn = true;
    req.session.loginTime = new Date();
    req.session.lastActivity = new Date();
  }

  // Update last activity
  static updateActivity(req) {
    if (req.session) {
      req.session.lastActivity = new Date();
    }
  }

  // Check if session is valid
  static isValidSession(req) {
    return req.session && req.session.isLoggedIn;
  }

  // Get session duration
  static getSessionDuration(req) {
    if (!req.session || !req.session.loginTime) return 0;
    return Date.now() - new Date(req.session.loginTime).getTime();
  }

  // Check if session is expired (inactive for more than 2 hours)
  static isSessionExpired(req) {
    if (!req.session || !req.session.lastActivity) return true;
    const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    return Date.now() - new Date(req.session.lastActivity).getTime() > twoHours;
  }

  // Destroy session
  static destroySession(req, res, callback) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return callback(err);
      }
      res.clearCookie('connect.sid');
      callback(null);
    });
  }

  // Get user info from session
  static getUserInfo(req) {
    if (!this.isValidSession(req)) return null;
    
    return {
      employeeId: req.session.employeeId,
      name: req.session.name,
      email: req.session.email,
      loginTime: req.session.loginTime,
      lastActivity: req.session.lastActivity,
      sessionDuration: this.getSessionDuration(req)
    };
  }
}

module.exports = SessionManager;

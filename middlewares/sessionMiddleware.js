const SessionManager = require('../utils/sessionManager');

// Middleware to track user activity and update session
function sessionActivityTracker(req, res, next) {
  // Update last activity for authenticated users
  if (SessionManager.isValidSession(req)) {
    // Check if session is expired
    if (SessionManager.isSessionExpired(req)) {
      return SessionManager.destroySession(req, res, (err) => {
        if (err) {
          console.error('Error destroying expired session:', err);
        }
        return res.redirect('/');
      });
    }
    
    // Update activity timestamp
    SessionManager.updateActivity(req);
  }
  
  next();
}

// Enhanced authentication middleware with session validation
function enhancedRequireAuth(req, res, next) {
  if (!SessionManager.isValidSession(req)) {
    return res.redirect("/");
  }
  
  // Check if session is expired
  if (SessionManager.isSessionExpired(req)) {
    return SessionManager.destroySession(req, res, (err) => {
      if (err) {
        console.error('Error destroying expired session:', err);
      }
      return res.redirect('/');
    });
  }
  
  // Update activity and continue
  SessionManager.updateActivity(req);
  next();
}

// Middleware to add session data to all responses
function addSessionToLocals(req, res, next) {
  res.locals.session = SessionManager.getUserInfo(req);
  res.locals.isLoggedIn = SessionManager.isValidSession(req);
  next();
}

module.exports = {
  sessionActivityTracker,
  enhancedRequireAuth,
  addSessionToLocals
};

const express = require("express");
const router = express.Router();
const SessionManager = require("../utils/sessionManager");
const {
  handelEmployeeSignUp,
  handelEmployeeLogin,
  handelEmployeeLogout,
  requireAuth,
  redirectIfLoggedIn
} = require("../controllers/employee");

router.get("/", redirectIfLoggedIn, (req, res) => {
  return res.render("index")
});

router.get("/signup", redirectIfLoggedIn, (req, res) => {
  return res.render("signupPage")
});

router.get("/forgetpassword", redirectIfLoggedIn, (req, res) => {
  return res.render("forget")
});

router.get("/employeeHomePage", requireAuth, (req, res) => {
  const userInfo = SessionManager.getUserInfo(req);
  return res.render("employeeHomePage", {
    employeeName: userInfo.name,
    employeeId: userInfo.employeeId,
    loginTime: userInfo.loginTime,
    sessionDuration: Math.floor(userInfo.sessionDuration / (1000 * 60)), // in minutes
    userInfo: userInfo
  });
});

router.get("/userProfile", requireAuth, (req, res) => {
  try {
    const userInfo = SessionManager.getUserInfo(req);
    console.log("User Profile Route - UserInfo:", userInfo); // Debug log
    return res.render("userProfile", {
      userInfo: userInfo
    });
  } catch (error) {
    console.error("Error in userProfile route:", error);
    return res.status(500).send("Internal Server Error");
  }
});


router.post("/signUpEmployee", redirectIfLoggedIn, handelEmployeeSignUp);
router.post("/login", redirectIfLoggedIn, handelEmployeeLogin);
router.post("/logout", requireAuth, handelEmployeeLogout);

// API routes for session management
router.get("/api/session-status", requireAuth, (req, res) => {
  const userInfo = SessionManager.getUserInfo(req);
  const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const timeRemaining = twoHours - (Date.now() - new Date(userInfo.lastActivity).getTime());
  
  res.json({
    isValid: timeRemaining > 0,
    timeRemaining: Math.max(0, timeRemaining),
    sessionDuration: userInfo.sessionDuration
  });
});

router.get("/api/session-info", requireAuth, (req, res) => {
  const userInfo = SessionManager.getUserInfo(req);
  res.json({
    isValid: true,
    sessionDuration: userInfo.sessionDuration,
    name: userInfo.name,
    employeeId: userInfo.employeeId
  });
});

router.post("/api/extend-session", requireAuth, (req, res) => {
  SessionManager.updateActivity(req);
  res.json({ success: true, message: "Session extended" });
});

// Profile management APIs
router.post("/api/update-profile", requireAuth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const employeeId = req.session.employeeId;
    
    // Update employee in database
    const employee = require("../models/employee");
    await employee.findOneAndUpdate(
      { employeeId: employeeId },
      { name: name, email: email },
      { new: true }
    );
    
    // Update session data
    req.session.name = name;
    req.session.email = email;
    SessionManager.updateActivity(req);
    
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});

router.get("/api/download-user-data", requireAuth, (req, res) => {
  const userInfo = SessionManager.getUserInfo(req);
  const userData = {
    profile: {
      name: userInfo.name,
      employeeId: userInfo.employeeId,
      email: userInfo.email
    },
    session: {
      loginTime: userInfo.loginTime,
      sessionDuration: userInfo.sessionDuration,
      lastActivity: userInfo.lastActivity
    },
    stats: {
      tasksCompleted: 24,
      wasteCollections: 156,
      efficiencyRate: "89%",
      daysActive: 12
    },
    downloadedAt: new Date().toISOString()
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="user-data-${userInfo.employeeId}.json"`);
  res.json(userData);
});

module.exports = router;
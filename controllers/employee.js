const employee = require("../models/employee");
const SessionManager = require("../utils/sessionManager");

async function handelEmployeeSignUp(req, res) {
  const { name, email, password, employeeId } = req.body;
  try {
    const newEmployee = await employee.create({
      name,
      email,
      password,
      employeeId
    });
    
    // Create session after successful signup
    SessionManager.createSession(req, {
      employeeId: newEmployee.employeeId,
      name: newEmployee.name,
      email: newEmployee.email
    });
    
    return res.redirect("/employeeHomePage");
  } catch (err) {
    console.error("Error during employee signup:", err);
    return res.render("signupPage", {
      error: "An error occurred during signup. Please try again."
    });
  }
}


async function handelEmployeeLogin(req,res) {
  const { password,employeeId  } = req.body;
  const findEmployee = await employee.findOne({ password,employeeId });

  if (!findEmployee)
    return res.render("index", {
      error: "Invalid Username or Password",
    });

  // Create session after successful login
  SessionManager.createSession(req, {
    employeeId: findEmployee.employeeId,
    name: findEmployee.name,
    email: findEmployee.email
  });

  return res.redirect("/employeeHomePage");
}

async function handelEmployeeLogout(req, res) {
  SessionManager.destroySession(req, res, (err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Could not log out" });
    }
    return res.redirect("/");
  });
}

// Middleware to check if user is logged in
function requireAuth(req, res, next) {
  console.log("RequireAuth - Session check:", SessionManager.isValidSession(req)); // Debug
  if (SessionManager.isValidSession(req)) {
    return next();
  } else {
    console.log("RequireAuth - Redirecting to login"); // Debug
    return res.redirect("/");
  }
}

// Middleware to check if user is already logged in (for login/signup pages)
function redirectIfLoggedIn(req, res, next) {
  if (SessionManager.isValidSession(req)) {
    return res.redirect("/employeeHomePage");
  } else {
    return next();
  }
}

module.exports = {
  handelEmployeeSignUp,
  handelEmployeeLogin,
  handelEmployeeLogout,
  requireAuth,
  redirectIfLoggedIn
};

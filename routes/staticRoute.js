const express = require("express");
const router = express.Router();
const {handelEmployeeSignUp,handelEmployeeLogin} = require("../controllers/employee")

router.get("/",  (req, res) => {
  return res.render("index")
});

router.get("/signup",  (req, res) => {
  return res.render("signupPage")
});
router.get("/forgetpassword",  (req, res) => {
  return res.render("forget")
});
router.get("/employeeHomePage",  (req, res) => {
  return res.render("employeeHomePage")
});


router.post("/signUpEmployee",handelEmployeeSignUp);
router.post("/login",handelEmployeeLogin);

module.exports = router;
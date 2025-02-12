const employee = require("../models/employee");
async function handelEmployeeSignUp(req, res) {
  const { name, email, password, employeeId } = req.body;
  try {
    await employee.create({
      name,
      email,
      password,
      employeeId
    });
    return res.redirect("/");
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

  return res.redirect("/employeeHomePage");
}


module.exports = {
  handelEmployeeSignUp,handelEmployeeLogin
};

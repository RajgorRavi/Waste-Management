const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

employeeSchema.index({ employeeId: 1 }, { unique: true });

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;

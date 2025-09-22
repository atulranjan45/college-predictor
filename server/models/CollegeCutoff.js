const mongoose = require("mongoose");

const collegeCutoffSchema = new mongoose.Schema({
  CollegeName: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  // If you want to link descriptions later
  // collegeDescription: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "CollegeDescription",
  // },
  GOPEN: {
    type: Number,
  },
  GOBC: {
    type: Number,
  },
  NT1: {
    type: Number,
  },
  NT2: {
    type: Number,
  },
  NT3: {
    type: Number,
  },
  SC: {
    type: Number,
  },
  ST: {
    type: Number,
  },
  TFWS: {
    type: Number,
  },
});

module.exports = mongoose.model("CollegeCutoff", collegeCutoffSchema);

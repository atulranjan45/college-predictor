const CollegeCutoff = require("../models/CollegeCutoff");
const CollegeDescription = require("../models/CollegeDescription");

// ========================== Add New College ==========================
exports.addCollegeCutoffHandler = async (req, res) => {
  try {
    const {
      collegeName,
      branch,
      about = "Not Available",
      placementPercentage = "Not Available",
      fees = "Not Available",
    } = req.body;

    if (!collegeName || !branch) {
      return res.status(403).json({
        success: false,
        message: "Please enter all details...",
      });
    }

    // check if college exists
    const existingCollege = await CollegeCutoff.findOne({
      collegeName,
      branch,
    });

    if (existingCollege) {
      return res.status(403).json({
        success: false,
        message:
          "College already added. Use updateCollege functionality to update details.",
      });
    }

    // create CollegeDescription first
    const collegeDescription = await CollegeDescription.create({
      about,
      placementPercentage,
      fees,
    });

    // create new CollegeCutoff entry
    await CollegeCutoff.create({
      collegeName,
      branch,
      collegeDescription: collegeDescription._id,
    });

    return res.status(200).json({
      success: true,
      message: "New college added successfully.",
    });
  } catch (error) {
    console.error("Error in addCollegeCutoffHandler:", error);
    return res.status(500).json({
      success: false,
      message: "Error in adding new college to database.",
    });
  }
};

// ========================== Update College Cutoff ==========================
exports.updateCollegeCutoffHandler = async (req, res) => {
  try {
    const { collegeName, branch } = req.body;

    if (!collegeName || !branch) {
      return res.status(403).json({
        success: false,
        message: "Please enter all details...",
      });
    }

    const college = await CollegeCutoff.findOne({ collegeName, branch });

    if (!college) {
      return res.status(403).json({
        success: false,
        message:
          "College not found. Use addCollege functionality to add new college.",
      });
    }

    // Update basic fields (cutoffs can be added here later)
    college.collegeName = collegeName;
    college.branch = branch;

    await college.save();

    return res.status(200).json({
      success: true,
      message: "College cutoff updated successfully.",
    });
  } catch (error) {
    console.error("Error in updateCollegeCutoffHandler:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating college cutoffs.",
    });
  }
};

// ========================== Update College Description ==========================
exports.updateCollegeDescriptionHandler = async (req, res) => {
  try {
    const {
      collegeName,
      branch,
      about = "Not Available",
      placementPercentage = "Not Available",
      fees = "Not Available",
    } = req.body;

    if (!collegeName || !branch) {
      return res.status(403).json({
        success: false,
        message: "Please enter all details...",
      });
    }

    const college = await CollegeCutoff.findOne({ collegeName, branch });

    if (!college) {
      return res.status(403).json({
        success: false,
        message: "College not found in database.",
      });
    }

    const collegeDescriptionID = college.collegeDescription;

    if (collegeDescriptionID) {
      // Update existing CollegeDescription
      await CollegeDescription.findByIdAndUpdate(collegeDescriptionID, {
        about,
        placementPercentage,
        fees,
      });
    } else {
      // Create new CollegeDescription and attach to college
      const newDesc = await CollegeDescription.create({
        about,
        placementPercentage,
        fees,
      });
      college.collegeDescription = newDesc._id;
      await college.save();
    }

    return res.status(200).json({
      success: true,
      message: "College description updated successfully.",
    });
  } catch (error) {
    console.error("Error in updateCollegeDescriptionHandler:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating college description.",
    });
  }
};

// ========================== Predict Colleges ==========================
exports.getCollegeDataHandler = async (req, res) => {
  try {
    let { percentile, branch, category } = req.body;

    // ensure percentile is a number
    percentile = Number(percentile);

    if (!percentile || !category || !branch) {
      return res.status(403).json({
        success: false,
        message: "Please enter all details...",
      });
    }

    // query colleges where cutoff for category <= percentile
    const result = await CollegeCutoff.find({
      [category]: { $lte: percentile },
      branch: branch,
    })
      .select({ _id: 0, collegeName: 1, branch: 1, [category]: 1 })
      .sort({ [category]: -1 });

    return res.status(200).json({
      success: true,
      data: result,
      message: "Data fetched successfully.",
    });
  } catch (error) {
    console.error("Error in getCollegeDataHandler:", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting college lists.",
    });
  }
};

const User = require("../models/User.js");
const Job = require("../models/Job.js");
const { parseResume } = require("../utils/resumeParser.js");
const { fetchLinkedInJobs, fetchNaukriJobs } = require("../utils/jobFetchers.js");
const { notifyNewJobs } = require("../sockets/notifications.js");

async function uploadResume(req, res) {
  const { file } = req;
  if (!file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const resumeData = await parseResume(file.buffer, file.mimetype);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resumeData },
      { new: true }
    );
    res.json({ message: "Resume uploaded and parsed", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to parse resume" });
  }
}

async function getJobRecommendations(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const { skills } = user.resumeData;

    // Fetch jobs from LinkedIn and Naukri
    const linkedInJobs = await fetchLinkedInJobs(skills.join(","), "remote");
    const naukriJobs = await fetchNaukriJobs(skills.join(","), "remote");

    // Combine job results
    const allJobs = [...linkedInJobs, ...naukriJobs];

    res.json({ jobs: allJobs });

    // Notify user in real-time
    allJobs.forEach((job) => notifyNewJobs(req.io, req.user.id, job));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job recommendations" });
  }
}

module.exports = { uploadResume, getJobRecommendations };
